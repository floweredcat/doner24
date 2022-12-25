import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadFoldersIfNotExist } from "../../../store/folders/thunks/LoadFoldersIfNotExist";

export const useLoadFolders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadFoldersIfNotExist);
  }, [dispatch]);
};
