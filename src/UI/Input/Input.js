import styles from './styles.module.css'

export const Input = ({handleChange, name, placeholder, minLength=2, type="text", value, required}) => (
  <input
    className={styles.input}
    placeholder={placeholder}
    id={name}
    name={name}
    type={type}
    onChange={handleChange}
    value={value}
    required={required}
    minLength={minLength}
/>)