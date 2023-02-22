import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Processes from "./Processes";
import ProcessModal from "./ProcessModal";
import classes from './ProcessesPage.module.css';
import { getProcesses } from "../../store/process-actions";
import { BASE_URL } from "../../utils/constants";
import { fetchData } from "../../utils/request_client";

let isProcessesFetched = false;

export const ProcessesPage: React.FC = () => {
    const { user, getIdTokenClaims  }: any = useAuth0();
    const [isCreateProcessShow, setIsCreateProcessShow] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
      const fetchProcesses = async function() {
        const token: any = await getIdTokenClaims();
        await fetchData('GET', null, `${BASE_URL}/api/users/${user.email}`, token.__raw);
        if (!isProcessesFetched) {

          isProcessesFetched = true;
          dispatch(getProcesses(user.email, token.__raw));
        }
      }
      fetchProcesses();
    },[user]);

    return (
        <div className={classes['process-page']}>
            <h1>Welcome, {user.name}</h1>
            <h3>My opened job search processes:</h3>
            <Processes/>
            {isCreateProcessShow && <ProcessModal isEdit = {false} onClose = {() =>  setIsCreateProcessShow(false)}/>}
            <button className={classes['create-new-btn']} onClick={() => setIsCreateProcessShow(true)}>Create New</button>
        </div>
    )
}