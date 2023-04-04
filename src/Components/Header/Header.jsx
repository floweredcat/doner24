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
import { useParams } from "react-router-dom";

export const Header = () => {
  const {id, type, value} = useParams();
  console.log(id, type, value)
  console.log(id)
  const isLoading = useSelector(selectFoldersIsLoading);
  const foldersIds = useSelector(selectFoldersIds);
  const [activeIndex, setActiveIndex] = useState();
  useEffect(() => {
    setActiveIndex(foldersIds[0]);
  }, [foldersIds[0]]);
  useLoadFolders({id});

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
      <Menu activeIndex={activeIndex} id={id} />
    </>
  );
};
