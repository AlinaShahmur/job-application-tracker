import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { fetchData } from "../../utils/request_client";
import Processes from "./Processes";
import ProcessModal from "./ProcessModal";
import classes from './ProcessesPage.module.css';
import { processActions } from "../../store/process-store";
import ErrorBoundary from "../../utils/error-boundary";

export const ProcessesPage: React.FC = () => {
    const { user, getIdTokenClaims  }: any = useAuth0();
    
    const dispatch = useDispatch();
    const processes: any = useSelector((state: any) => state.process.processes);
    const [isCreateProcessShow, setIsCreateProcessShow] = useState(false);
  
    useEffect(() => {
      const getProcesses = async function() {
        const token: any = await getIdTokenClaims();
        console.log({processes});
        
        if (!processes.isFetched) {
          const data = await fetchData('get',null,`${BASE_URL}/api/processes/${user.email}`, token.__raw);
          dispatch(processActions.initialLoading(data));
        }

      }
      getProcesses();
    },[]);

    return (
      <ErrorBoundary>
        <div className={classes['process-page']}>
            <h1>Welcome, {user.name}</h1>
            <h3>My opened job search processes:</h3>
            <Processes/>
            {isCreateProcessShow && <ProcessModal isEdit = {false} onClose = {() =>  setIsCreateProcessShow(false)}/>}
            <button className={classes['create-new-btn']} onClick={() => setIsCreateProcessShow(true)}>Create New</button>
        </div>
        </ErrorBoundary>
    )
}