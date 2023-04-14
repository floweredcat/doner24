import classNames from 'classnames'
import styles from './styles.module.css'

export const Button = ({onclick, title, type='button', disabled=false, isActive= true}) => {
  return (
    <div className={styles.wrapper}>
    <button
    type={type}
      onClick={onclick}
      className={classNames(styles.button, {
        [styles.button_active]: isActive
      })}
      disabled={disabled}>
      {title}
    </button>
    </div>
  )
}