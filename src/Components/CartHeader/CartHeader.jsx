import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'

export const CartHeader = ({title}) => {
  const navigate = useNavigate()
  return (
    <div className={styles.cart_header}>
        <h2 className={styles.title}>{title}</h2>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.back}>Назад</button>
        {/* <button
          onClick={() => {
            if (window.confirm("Очистить корзину?")) {
              cleanCart();
              navigate(-1);
            }
          } }
          disabled={cartLenght === 0}
          className={styles.clean}></button> */}
        </div>
  )
}