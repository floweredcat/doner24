import { useSelector } from 'react-redux'
import styles from './styles.module.css'
import { selectFolderById } from '../../store/folders/selectors'
import { Link } from 'react-router-dom'

export const MainFolder = ({folderId, linkTo}) => {
  const folder = useSelector(state => selectFolderById(state, {folderId}))
  return (
  <Link to={linkTo} className={styles.root}>
    {folder?.NAME}
  </Link>
)}