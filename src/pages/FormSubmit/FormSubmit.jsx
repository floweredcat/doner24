import styles from "./styles.module.css";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { selectCartDishIds } from "../../store/cart/selectors";
import { addRemote } from "../../store/cart/thunks/addRemote";
import { cartSliceActions } from "../../store/cart";
import { Button } from "../../Components/Button/Button";
import { CartHeader } from "../../Components/CartHeader/CartHeader";
import { separateAmount } from "../../helpers/separateAmount";
import { Input } from "../../UI/Input/Input";

const DELIVERY_TYPES = {
  delivery: "доставка",
  pickup: "самовывоз",
};

export const FormSubmit = () => {
  const {idsrv, type, value} = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [deliveryType, setDeliveryType] = useState("delivery");
  const redirectedAdress = type && value ? `/${idsrv}/${type}/${value}` : `/${idsrv}`
  const dishIds = useSelector(selectCartDishIds);
  const items = dishIds.map(el => (
    {
      idmenu: el.dishId,
      klv: el.count
    }
  ))
  const initialValues = {
    comments: "",
    idsrv: idsrv,
    isdelivery: deliveryType === DELIVERY_TYPES.delivery, //req
    name: "", //req
    items, //req
    phone: "",
    raion: "",
    dom: "",
    pd: null,
    et: null,
    kv: "",
  };
  const [form, setForm] = useState(initialValues)
  const [isActive, setActive] = useState(false);
  const toggleActive = () => {
    setActive(!isActive);
  };
  const isdelivery = deliveryType === DELIVERY_TYPES.delivery
  const onSubmit = (e) => {
    e.preventDefault();
    handleValudate().then(res => {
      if(res) {
        addRemote(form)
        .then(data => {
          setForm(initialValues);
          if (data.OK) {
            alert('Спасибо за заказ!')
            dispatch(cartSliceActions.cleanCart());
            navigate(redirectedAdress);
          }
          else {
            alert('Упс! Что-то пошло не так(')
          }
        })
      }
      else {
        alert('Необходимо заполнить форму')
      }
    })

  }
  const handleChange = (e) => {
    const newValue = e.target.value;
    const {name} = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };
  const result = dishIds.reduce((acc, item) => {
    return acc + item.amount
  }, isdelivery ? 500 : 0);

  const handleValudate = async () => {
    if (!isdelivery) {
      return form.phone.length >= 10 && form.name.length >= 2 && form.items.length !==0
    }
    else return (
    form.phone.length >= 10 
    && form.name.length >= 2 
    && form.items.length !==0 
    && form.raion.length >=2
    && form.kv 
    && form.pd
    && form.et
    && form.dom 
    )
  }

  return (
    <div className={styles.cartContainer}>
    <form
      className={styles.form}
      onSubmit={onSubmit}>
      <CartHeader title={"Оформить заказ"} />
        <div className={styles.togglesContainer}>
        <button
          type="button"
          className={classNames(styles.toggle, {
            [styles.toggleActive]: isdelivery,
          })}
          onClick={() => {
            toggleActive();
            setForm({...form, isdelivery: true});
            setDeliveryType(DELIVERY_TYPES.delivery)
          }}>
          Доставка
        </button>
        <button
          type="button"
          className={classNames(styles.toggle, {
            [styles.toggleActive]: !isdelivery,
          })}
          onClick={() => {
            toggleActive();
            setForm({...form, isdelivery: false});
            setDeliveryType(DELIVERY_TYPES.pickup);
          }}>
          Самовывоз
        </button>
      </div>
      <Input
        placeholder={"Телефон"}
        name={"phone"}
        handleChange={handleChange}
        value={form.phone}
        required
        minLength={9}
      />
      <Input
        placeholder={"Имя"}
        name={"name"}
        handleChange={handleChange}
        value={form.name}
        required
      />
      {isdelivery && (
      <>
        <Input
          placeholder={"Улица/мкр"}
          name={"raion"}
          handleChange={handleChange}
          value={form.raion || ""}
          required={isdelivery}
        />
        <Input
          placeholder={"Дом"}
          name={"dom"}
          handleChange={handleChange}
          value={form.dom || ""}
          required={isdelivery}
        />
        <Input
          placeholder={"Кв."}
          name={"kv"}
          handleChange={handleChange}
          value={form.kv || ""}
          required={isdelivery}
          minLength={1}
        />
        <Input
          placeholder={"Подъезд"}
          name={"pd"}
          handleChange={handleChange}
          value={form.pd || ""}
          required={isdelivery}
        />
        <Input
          placeholder={"Этаж"}
          name={"et"}
          handleChange={handleChange}
          value={form.et || ""}
          required={isdelivery}
          type={'number'}
        />
      </>
      )}
      <Input
        placeholder={"Комментарии"}
        name={"comments"}
        handleChange={handleChange}
        value={form.comments || ""}
      />
      <div className={styles.account}>
        {isdelivery && <div className={styles.delivery}>{`Доставка: ${500}`}</div>}
      <div className={styles.result}>{`Итого: ${separateAmount(result)}`}</div>
    </div>
      <button className={styles.submit} type="submit" onClick={onSubmit}>Оформить заказ</button>
    </form>
    </div>
  );
};
