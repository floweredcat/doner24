import classNames from "classnames";
import { useSelector } from "react-redux";
import { selectFolderNameById } from "../../store/folders/selectors";
import styles from "./styles.module.css";
import { useParams } from "react-router-dom";

export const Folder = ({folderId, activeIndex, setActiveIndex, title}) => {
  const {pid} = useParams()
  const folderName = useSelector((state) =>
    selectFolderNameById(state, { folderId, pid })
  );

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
