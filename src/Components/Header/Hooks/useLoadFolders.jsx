import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { loadFoldersIfNotExist } from "../../../store/folders/thunks/LoadFoldersIfNotExist";

export const useLoadFolders = ({idsrv}) => {
  const {type, value} = useParams()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadFoldersIfNotExist({idsrv, type, value}));
  }, [dispatch]);
};
