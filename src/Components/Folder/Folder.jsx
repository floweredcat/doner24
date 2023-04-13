import classNames from "classnames";
import { useSelector } from "react-redux";
import { selectFolderNameById } from "../../store/folders/selectors";
import styles from "./styles.module.css";

export const Folder = ({ folderId, setActiveIndex, activeIndex }) => {
  const folderName = useSelector((state) =>
    selectFolderNameById(state, { folderId })
  );

  if (!folderName) {
    return null;
  }

  let isActive = () => activeIndex == folderId;

  return (
    <button
      type="button"
      onClick={() => setActiveIndex(folderId)}
      className={classNames(styles.link, {
        [styles.linkActive]: isActive(),
      })}>
      {folderName}
    </button>
  );
};
