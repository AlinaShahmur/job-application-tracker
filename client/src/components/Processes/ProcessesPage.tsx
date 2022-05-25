import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL_DEV } from "../../utils/constants";
import { fetchData } from "../../utils/request_client";
import Processes from "./Processes";
import ProcessModal from "./ProcessModal";
import classes from './ProcessesPage.module.css';

export default function ProcessesPage() {
    const { user }: any = useAuth0();
    const dispatch = useDispatch();
    const [isCreateProcessShow, setIsCreateProcessShow] = useState(false);
    const [isEditProcessShow, setIsEditProcessShow] = useState(false);
    const [processes, setProcesses] = useState([])
  
    useEffect(() => {
      const fetchUsers = async () => {
        if (!sessionStorage.getItem('user')) {
  
          const userData = await fetchData('get', null, `${BASE_URL_DEV}/users/${user.email}`)
          const targetUserObject = Object.assign(user, userData)
          sessionStorage.setItem('user', JSON.stringify(targetUserObject))
          console.log(targetUserObject.processes);
          dispatch({type: 'LOAD_PROCESSES', payload: targetUserObject.processes})
        }
        const user_data: any = sessionStorage.getItem('user')
        dispatch({type: 'LOAD_PROCESSES', payload: JSON.parse(user_data).processes})
      }
      fetchUsers();
    },[]);
    return (
        <div className={classes['process-page']}>
            <h1>Welcome, {user.name}</h1>
            <h3>My opened job search processes:</h3>
            <Processes onClickOpenEditHandler = {() => setIsEditProcessShow(true)}/>
            {isCreateProcessShow && <ProcessModal isEdit = {false} onClose = {() =>  setIsCreateProcessShow(false)}/>}
            {isEditProcessShow && <ProcessModal isEdit = {true} onClose = {() =>  setIsEditProcessShow(false)}/>}
            <button className={classes['create-new-btn']} onClick={() => setIsCreateProcessShow(true)}>Create New</button>
        </div>
    )
}