import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { processActions } from "../../store/process-store";
import CreateApplication from "../Applications/CreateApplication";
import styles from './ProcessPage.module.css'

export default function ProcessPage(props: any) {
    const location: any = useLocation();
    const [isCreateApplicationOpen, setIsCreateApplicationOpen] = useState(false);
    const dispatch = useDispatch();
    const { process } = location.state;
    useEffect(() => {
        dispatch(processActions.setCurrentProcess(process));
    })

    return (
        <React.Fragment>
            <h1 style={{textAlign: "center", color: "#8a996c"}}>Process - {process.name}</h1>
            <div className = {styles["process-page"]}>
                <Link to = {`${location.pathname}/applications`} state = {{process}}>Applications</Link>
                <Link to = {`${location.pathname}/dashboard`} state = {{process}}>Dashboard</Link>
                <button onClick={() => setIsCreateApplicationOpen(true)}>Create Application</button>
                {isCreateApplicationOpen && <CreateApplication isEdit = {false} onClose = {() => setIsCreateApplicationOpen(false)}/>}
            </div>
        </React.Fragment>
    )
}