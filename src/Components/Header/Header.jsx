import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFolderById,
  selectFolderIdsByFolderId,
  selectFoldersIsLoading,
} from "../../store/folders/selectors";
import { Folder } from "../Folder/Folder";
import classNames from "classnames";
import { Loading } from "../../pages/Loading/Loading";
import { Menu } from "../Menu/Menu";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { getOrgInfo } from "../../store/organization/thunks/getOrgInfo";
import { loadFoldersIfNotExist } from "../../store/folders/thunks/LoadFoldersIfNotExist";
import { CartHeader } from "../CartHeader/CartHeader";

export const Header = () => {
  const dispatch = useDispatch()
  const {idsrv, pid} = useParams();
  const isLoading = useSelector(selectFoldersIsLoading);
  const foldersIds = useSelector(state => selectFolderIdsByFolderId(state, {pid}))
  const [activeIndex, setActiveIndex] = useState();
  
  useEffect(() => {
    dispatch(getOrgInfo({idsrv}))
    dispatch(loadFoldersIfNotExist({idsrv, pid}))
  }, [idsrv, pid]);

  const isFolderEmpty = foldersIds?.length === 0;
  const folder = useSelector(state => selectFolderById(state, {folderId: pid}))
 
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
    <div className={styles.header_wrapper}>
      <CartHeader title={folder?.NAME}/>
      {!isFolderEmpty && 
      (<header
      id="header"
        className={classNames(styles.header)}>
        {foldersIds?.map((id, idx) => {
          return (
            <Folder
            idx={idx}
              folderId={id}
              key={nanoid()}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}/>
          );
        })}
      </header>)}
    </div>
    <Menu idfolder={isFolderEmpty ? pid : activeIndex}/>
    </>
  );
};
