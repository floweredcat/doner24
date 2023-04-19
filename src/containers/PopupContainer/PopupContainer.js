import styles from "./styles.module.css";
import classNames from "classnames";
import { useEffect } from "react";

export const PopupContainer = ({ togglePopup, children }) => {
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        togglePopup();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const backgroundClickHandle = (e) => {
    if (e.target.className === styles.popup_wrapper) {
      togglePopup(null)
    }
  }

  return (
    <div className={styles.popup_wrapper} onClick={backgroundClickHandle}>
      <div className={styles.popup}>
        <button
          type="button"
          className={classNames(styles.button, styles.popup_closeButton)}
          onClick={() => togglePopup()}
        />
        {children}
      </div>
    </div>
  );
};
