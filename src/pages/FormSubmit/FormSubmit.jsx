import styles from "./styles.module.css";
import classNames from "classnames";

import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
const initialValues = {
  phone: "",
  name: "",
  street: "",
  house: "",
  flat: "",
  entry: "",
  floor: "",
  comment: "",
  change: "",
};

const DELIVERY_TYPES = {
  delivery: "доставка",
  pickup: "самовывоз",
};

export const FormSubmit = ({ toggleFunction, result }) => {
  const [deliveryType, setDeliveryType] = useState("delivery");
  const [isActive, setActive] = useState(false);
  const toggleActive = () => {
    setActive(!isActive);
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form
      className={styles.form}
      onSubmit={formik.handleSubmit}>
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
        required
        className={classNames(styles.input)}
        placeholder="Телефон"
        id="phone"
        name="phone"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.number}
      />
      <input
        required
        className={classNames(styles.input)}
        placeholder="Имя"
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <input
        className={classNames(styles.input)}
        placeholder="Улица\мкр"
        id="street"
        name="street"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.street}
      />
      <div className={styles.togglesContainer}>
        <button
          type="button"
          className={classNames(styles.toggle, {
            [styles.toggleActive]: isActive,
          })}
          onClick={() => {
            toggleActive();
            setDeliveryType(DELIVERY_TYPES.delivery);
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
            setDeliveryType(DELIVERY_TYPES.pickup);
          }}>
          Самовывоз
        </button>
      </div>
      {deliveryType === DELIVERY_TYPES.delivery && (
        <>
          <div className={styles.inputContainer}>
            <input
              className={classNames(styles.input)}
              placeholder="Дом"
              id="flat"
              name="flat"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.flat}
            />
            <input
              className={classNames(styles.input)}
              placeholder="Кв."
              id="house"
              name="house"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.house}
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              className={classNames(styles.input)}
              placeholder="Подъезд"
              id="entry"
              name="entry"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.entry}
            />
            <input
              className={classNames(styles.input)}
              placeholder="Этаж"
              id="floor"
              name="floor"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.floor}
            />
          </div>
        </>
      )}

      <input
        className={classNames(styles.input)}
        placeholder="Комментарии"
        id="comments"
        name="comments"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.comment}
      />
      <input
        className={classNames(styles.input)}
        placeholder="Сдача с"
        id="change"
        name="change"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.change}
      />
      <button
        className={styles.button}
        type="submit">
        Оформить заказ
      </button>
    </form>
  );
};