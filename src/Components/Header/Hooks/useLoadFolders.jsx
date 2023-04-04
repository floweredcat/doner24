import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadFoldersIfNotExist } from "../../../store/folders/thunks/LoadFoldersIfNotExist";

export const useLoadFolders = ({id}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadFoldersIfNotExist({id}));
  }, [dispatch]);
};
