import { useEffect } from "react"
import { Button } from "../../Components/Button/Button"
import styles from "./styles.module.css"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { loadMainFoldersIfNotExist } from "../../store/folders/thunks/LoadMainFoldersIfNotExist"
import { selectFoldersIds } from "../../store/folders/selectors"
import { MainFolder } from "../../Components/MainFolder/MainFolder"
import { nanoid } from "nanoid"

export const Main = () => {
  const {idsrv, type, value} = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadMainFoldersIfNotExist({idsrv}));
  }, [dispatch]);
  const folders = useSelector(state => selectFoldersIds(state))
  return (
    <div className={styles.root}>
      <div className={styles.navContainer}>
        {folders.map((folderId) => {
          const linkTo = type && value ? `/${idsrv}/${type}/${value}/folder/${folderId}` : `/${idsrv}/folder/${folderId}`
          return (
            <MainFolder folderId={folderId} linkTo={linkTo} key={nanoid()} />
          )
        })}
      </div>
      {/* <div className={styles.contacts}>
        Contacts
      </div>
      <div className={styles.actions}>
        <Button onclick={() => console.log('Call Waiter')} title={"Call waiter"}></Button>
        <Button onclick={() => console.log('Get amount')} title={"Get amount"}></Button>
      </div> */}
    </div>
  )
}