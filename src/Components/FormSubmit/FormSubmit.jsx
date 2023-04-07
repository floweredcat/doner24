import styles from "./styles.module.css";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { selectCartDishIds } from "../../store/cart/selectors";
import { addRemote } from "../../store/cart/thunks/addRemote";
import { cartSliceActions } from "../../store/cart";
import { Button } from "../Button/Button";

const DELIVERY_TYPES = {
  delivery: "доставка",
  pickup: "самовывоз",
};

export const FormSubmit = ({ toggleFunction }) => {
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
  const onSubmit = (e) => {
    e.preventDefault();
    addRemote(form)
    .then(data => {
      setForm(initialValues);
      if (data.OK) {
        alert('Спасибо за заказ!')
        dispatch(cartSliceActions.cleanCart());
        navigate(redirectedAdress)
      }
      else {
        alert('Упс! Что-то пошло не так(')
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
  }, 500);

  return (
    <div className={styles.cartContainer}>
    <form
      className={styles.form}
      onSubmit={onSubmit}>
      <h2 className={classNames(styles.title)}>Информация</h2>
      <button
        type="button"
        onClick={() => toggleFunction()}
        className={styles.back}></button>
      <div className={styles.account}>
        <div className={styles.delivery}>{`Доставка: ${500}`}</div>
        <div className={styles.result}>{`Итого: ${result}`}</div>
      </div>
      <input
        className={classNames(styles.input)}
        placeholder="Телефон"
        id="phone"
        name="phone"
        type="text"
        onChange={handleChange}
        value={form.phone}
      />
      <input
        required
        className={classNames(styles.input)}
        placeholder="Имя"
        id="name"
        name="name"
        type="text"
        onChange={handleChange}
        value={form.name}
      />
      <div className={styles.togglesContainer}>
        <button
          type="button"
          className={classNames(styles.toggle, {
            [styles.toggleActive]: isActive,
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
            [styles.toggleActive]: !isActive,
          })}
          onClick={() => {
            toggleActive();
            setForm({...form, isdelivery: false});
            setDeliveryType(DELIVERY_TYPES.pickup);
          }}>
          Самовывоз
        </button>
      </div>
      {deliveryType === DELIVERY_TYPES.delivery && (
        <>
        <input
          className={classNames(styles.input)}
          placeholder="Улица\мкр"
          id="raion"
          name="raion"
          type="text"
          onChange={handleChange}
          value={form.raion}
        />
            <input
              className={classNames(styles.input)}
              placeholder="Дом"
              id="dom"
              name="dom"
              type="number"
              onChange={handleChange}
              value={form.dom}
            />
            <input
              className={classNames(styles.input)}
              placeholder="Кв."
              id="kv"
              name="kv"
              type="text"
              onChange={handleChange}
              value={form.kv}
            />
            <input
              className={classNames(styles.input)}
              placeholder="Подъезд"
              id="pd"
              name="pd"
              type="number"
              onChange={handleChange}
              value={form.pd || ""}
            />
            <input
              className={classNames(styles.input)}
              placeholder="Этаж"
              id="et"
              name="et"
              type="number"
              onChange={handleChange}
              value={form.et || ""}
            />
        </>
      )}
      <input
        className={classNames(styles.input)}
        placeholder="Комментарии"
        id="comments"
        name="comments"
        type="text"
        onChange={handleChange}
        value={form.comments}
      />
    </form>
    <Button title={"Оформить заказ"} onclick={onSubmit} type='submit' />
    </div>
  );
};
