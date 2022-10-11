import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { processActions } from "../../store/process-store";
import { BASE_URL } from "../../utils/constants";
import { fetchData } from "../../utils/request_client";
import { buildDeleteConfirmationObject } from "../../utils/utils";
import CreateApplication from "../Applications/CreateApplication";
import Alert from "../UI/Alert";
import styles from './ProcessPage.module.css'

export default function ProcessPage(props: any) {
    const location: any = useLocation();
    const navigate: any = useNavigate();
    const { getIdTokenClaims } = useAuth0();
    const dispatch = useDispatch();

    const [isCreateApplicationOpen, setIsCreateApplicationOpen] = useState(false);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

    const { process } = location.state;

    useEffect(() => {
        dispatch(processActions.setCurrentProcess(process));
    })

    const deleteProcessHandler = async () => {
        const token = await getIdTokenClaims();
        await fetchData("DELETE",null,`${BASE_URL}/processes/${process._id}`, token?.__raw);
        dispatch(processActions.deleteProcess(process._id));
        navigate("/");
        
    } 
    return (
        <React.Fragment>
            <h1 style={{textAlign: "center", color: "#8a996c"}}>Process - {process.name}</h1>
            <div className = {styles["process-page"]}>
                <Link to = {`${location.pathname}/applications`} state = {{process}}>Applications</Link>
                <Link to = {`${location.pathname}/dashboard`} state = {{process}}>Dashboard</Link>
                <button onClick={() => setIsCreateApplicationOpen(true)}>Create Application</button>
                {isCreateApplicationOpen && <CreateApplication isEdit = {false} onClose = {() => setIsCreateApplicationOpen(false)}/>}
                {isDeleteConfirmationOpen && <Alert 
                                                {...buildDeleteConfirmationObject('process')} 
                                                onBtnClick = {deleteProcessHandler} 
                                                onClose = {() => setIsDeleteConfirmationOpen(false)}
                                            />}
                <button onClick={() => setIsDeleteConfirmationOpen(true)} className="danger">Delete Process</button>
            </div>
        </React.Fragment>
    )
}