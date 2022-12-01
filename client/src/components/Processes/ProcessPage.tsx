import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { processActions } from "../../store/process-store";
import { BASE_URL, ICONS } from "../../utils/constants";
import { fetchData } from "../../utils/request_client";
import { buildDeleteConfirmationObject } from "../../utils/utils";
import CreateApplication from "../Applications/CreateApplication";
import SvgIcon from "../Icons/SvgIcon";
import Alert from "../UI/Alert";
import ItemWrapper from "../UI/ItemWrapper";
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
        await fetchData("DELETE",null,`${BASE_URL}/api/processes/${process._id}`, token?.__raw);
        dispatch(processActions.deleteProcess(process._id));
        navigate("/");
        
    } 
    return (
        <React.Fragment>
            <h1 style={{textAlign: "center", color: "#8a996c"}}>Process - {process.name}</h1>
            <div className = {styles["process-page"]}>
                <ul>
                    <ItemWrapper>
                            <Link to = {`${location.pathname}/applications`} state = {{process}} >
                                Applications   
                                <SvgIcon path = {ICONS.path.file_icon}
                                    style = {{width: 13, height: 13, fill: "#000000", marginLeft: 10}}
                                    viewBox = {ICONS.viewBox.file_icon}
                                />                       
                            </Link>

                    </ItemWrapper>

                    <ItemWrapper>

                        <Link to = {`${location.pathname}/dashboard`} state = {{process}} className={styles["process-action-btn"]}>
                            Dashboard                           
                            <SvgIcon path = {ICONS.path.dashboard_icon}
                                style = {{width: 13, height: 13, fill: "#000000", marginLeft: 10}}
                                viewBox = {ICONS.viewBox.dashboard_icon}
                            />  
                        </Link>
                    </ItemWrapper>
                    <ItemWrapper>
                        <button className={styles["process-action-btn"]} onClick={() => setIsCreateApplicationOpen(true)}>
                            Create Application
                            <SvgIcon path = {ICONS.path.plus_icon}
                                style = {{width: 13, height: 13, fill: "#000000", marginLeft: 10}}
                                viewBox = {ICONS.viewBox.plus_icon}
                            />  
                        </button>
                    </ItemWrapper>
                    <ItemWrapper>
                        <button className={styles["process-action-btn"]} onClick={() => setIsDeleteConfirmationOpen(true)}>
                            Delete Process
                            <SvgIcon path = {ICONS.path.trash_can_icon}
                                style = {{width: 13, height: 13, fill: "#000000", marginLeft: 10}}
                                viewBox = {ICONS.viewBox.trash_can_icon}
                            />  
                        </button>
                    </ItemWrapper>
                    
                </ul>
            {isCreateApplicationOpen && <CreateApplication isEdit = {false} onClose = {() => setIsCreateApplicationOpen(false)}/>}
            {isDeleteConfirmationOpen && <Alert 
                                                {...buildDeleteConfirmationObject('process')} 
                                                    onBtnClick = {deleteProcessHandler} 
                                                    onClose = {() => setIsDeleteConfirmationOpen(false)}
                                        />}
            </div>
        </React.Fragment>
    )
}