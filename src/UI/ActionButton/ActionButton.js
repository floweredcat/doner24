import styles from "./styles.module.css";

export const ActionButton = () => {}


ActionButton.Counter = ({onclick, children}) => (
  <button
    onClick={onclick}
    className={styles.action}>
      {children}
    </button>
)

ActionButton.Add = ({onclick, children}) => (
  <button
  onClick={onclick}
  className={styles.add}>
    {children}
  </button>
)