import classNames from "classnames";
import { useSelector } from "react-redux";
import { selectFolderNameById } from "../../store/folders/selectors";
import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const Folder = ({folderId, activeIndex, setActiveIndex, idx}) => {
  const {pid} = useParams()
  const folderName = useSelector((state) =>
    selectFolderNameById(state, { folderId, pid })
  );

  useEffect(() => {
    if (!activeIndex && idx===0) {
      setActiveIndex(folderId)
    }
  }, [])

  if (!folderName) {
    return null;
  }

  let isActive = () => activeIndex == folderId;

  return (
    <button
      onClick={() => setActiveIndex(folderId)}
      type='button'
      className={classNames(styles.link, {
        [styles.linkActive]: isActive(),
      })}>
      {folderName}
    </button>
  );
};
