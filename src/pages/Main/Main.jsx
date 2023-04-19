import { useEffect } from "react"
import { Button } from "../../Components/Button/Button"
import styles from "./styles.module.css"
import { useDispatch } from "react-redux"
import { loadFoldersIfNotExist } from "../../store/folders/thunks/LoadFoldersIfNotExist"
import { useParams } from "react-router-dom"

export const Main = () => {
  const {idsrv} = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadFoldersIfNotExist({idsrv}));
  }, [dispatch]);
  return (
    <div className={styles.root}>
      <div className={styles.contacts}>
        Contacts
      </div>
      <div className={styles.actions}>
        <Button onclick={() => console.log('Call Waiter')} title={"Call waiter"}></Button>
        <Button onclick={() => console.log('Get amount')} title={"Get amount"}></Button>
      </div>
    </div>
  )
}