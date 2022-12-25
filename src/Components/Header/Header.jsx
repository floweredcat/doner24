import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import {
  selectFoldersIds,
  selectFoldersIsLoading,
} from "../../store/folders/selectors";
import { Folder } from "../Folder/Folder";
import classNames from "classnames";
import { Loading } from "../../pages/Loading/Loading";
import { Menu } from "../Menu/Menu";
import { useLoadFolders } from "./Hooks/useLoadFolders";

export const Header = () => {
  const isLoading = useSelector(selectFoldersIsLoading);
  const foldersIds = useSelector(selectFoldersIds);
  const [activeIndex, setActiveIndex] = useState();
  useEffect(() => { setActiveIndex(foldersIds[0])}, [foldersIds[0]] )
  useLoadFolders();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <header
        id="header"
        className={classNames(styles.header)}>
        {foldersIds?.map((id) => {
          return (
            <Folder
              folderId={id}
              key={id}
              setActiveIndex={setActiveIndex}
              activeIndex={activeIndex}
            />
          );
        })}
      </header>
      <Menu activeIndex={activeIndex} />
    </>
  );
};
