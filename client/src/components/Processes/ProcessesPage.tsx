import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { fetchData } from "../../utils/request_client";
import Processes from "./Processes";
import ProcessModal from "./ProcessModal";
import classes from './ProcessesPage.module.css';
import { processActions } from "../../store/process-store";

export const ProcessesPage: React.FC = () => {
    const { user, getIdTokenClaims  }: any = useAuth0();
    const dispatch = useDispatch();

    const [isCreateProcessShow, setIsCreateProcessShow] = useState(false);
    const [isEditProcessShow, setIsEditProcessShow] = useState(false);
  
    useEffect(() => {
      const getProcesses = async function() {
        const token = await getIdTokenClaims();
        console.log({token})
        const data = await fetchData('get',null,`${BASE_URL}/processes/${user.email}`, token.__raw);
        dispatch(processActions.initialLoading(data.data));
      }
      getProcesses();
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