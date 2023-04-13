import styles from './styles.module.css'

export const Button = ({onclick, title, type='button', disabled=false}) => {
  return (
    <div className={styles.wrapper}>
    <button
    type={type}
      onClick={onclick}
      className={styles.button}
      disabled={disabled}>
      {title}
    </button>
    </div>
  )
}