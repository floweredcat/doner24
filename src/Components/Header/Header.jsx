import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
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
import { nanoid } from "nanoid";
import { getOrgInfo } from "../../store/organization/thunks/getOrgInfo";
// import { gapi } from "gapi-script";
// import { getGoogleSheets } from "../../store/google/getGoogleSheets";

export const Header = () => {
  const dispatch = useDispatch()
  const {idsrv} = useParams();
  const isLoading = useSelector(selectFoldersIsLoading);
  const foldersIds = useSelector(selectFoldersIds);
  const [activeIndex, setActiveIndex] = useState(foldersIds[0]);
  useLoadFolders({idsrv});
  useEffect(() => {
    dispatch(getOrgInfo({idsrv}))
  }, [idsrv, dispatch])

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
    <div className={styles.header_wrapper}>
      <header
        id="header"
        className={classNames(styles.header)}>
        {foldersIds?.map((id) => {
          return (
            <Folder
              folderId={id}
              key={nanoid()}
              setActiveIndex={setActiveIndex}
              activeIndex={activeIndex || foldersIds[0]} />
          );
        })}
      </header>
    </div>
    <Menu id={activeIndex || foldersIds[0]} />
    </>
  );
};
