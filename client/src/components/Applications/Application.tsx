
import { useAuth0 } from "@auth0/auth0-react";
import { SyntheticEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {  BASE_URL, ICONS } from "../../utils/constants";
import { fetchData } from "../../utils/request_client";
import { buildDeleteConfirmationObject, pretiffyDate } from "../../utils/utils";
import SvgIcon from "../Icons/SvgIcon";
import Alert from "../UI/Alert";
import ImageViewer from "../UI/ImageViewer";
import RoundButton from "../UI/RoundButton";
import AddStepModal from "./AddEvent";
import styles from './Application.module.css'
import CreateApplication from "./CreateApplication";

function Application() {
    const navigate: any = useNavigate();
    const location: any = useLocation();
    
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isEditApplicationOpen, setIsEditApplicationOpen] = useState(false);
    const [isAddStepModalOpen, setAddStepModalOpen] = useState(false);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

    const { getIdTokenClaims } = useAuth0();

    const process = useSelector((state: any) => state.process.currentProcess);
    const { item } = location.state;

    const deleteBtnClickHandler = async (e: SyntheticEvent) => {
        const token = await getIdTokenClaims();
        await fetchData("DELETE",null,`${BASE_URL}/api/applications/${item._id}`, token?.__raw);
        navigate(`/${process._id}/applications`);
    }

    return (
    <div>
        {isEditApplicationOpen && <CreateApplication
                                     isEdit = {true}
                                     application = {item}
                                     onClose = {() => setIsEditApplicationOpen(false)}
                                   />}
        <div className = {styles.application}>
                <div className={styles["common-information"]}>
                    <h1>Common Information</h1>
                    <h3>{item.role} - {item.company_name}</h3> 
                    <p>{item.status}</p>

                    <button onClick={() => setIsImageModalOpen(true) }>
                        <SvgIcon viewBox = {ICONS.viewBox.image_icon}
                                path = {ICONS.path.image_icon}
                                style = {{fill: "#8a996c", width: 15, height: 15}}
                            />
                    </button>
                    <button onClick = {() => setIsEditApplicationOpen(true)} className = "success">Edit</button>
                    <button onClick = {() => setIsDeleteConfirmationOpen(true)} className = "danger">Delete</button>
                </div>
                <div>
                    <div className={styles["history-header"]}>
                        <h1>History</h1>
                        <RoundButton 
                                viewBox = {ICONS.viewBox.plus_icon} 
                                path = {ICONS.path.plus_icon}
                                onClick = {() => setAddStepModalOpen(true)} 
                                background = "#339966" 
                                color = "#FFFFFF" 
                            >
                        </RoundButton>
                    </div>

                    
                    <div className={styles.timeline}>
                     {item.history.map((event: any, index: any) => (
                                    <div key = {event._id} className = {`${styles['timeline-container']} ${index % 2 === 0 ? styles['right'] : styles['left']}`}>
                                        <div className = {styles['timeline-content']}>
                                            <h5>{pretiffyDate(event.date)}</h5>  
                                            <p>{event.stage_name}</p> 
                                        </div>
                                    </div>))}
  
                    </div>
                    <div className = {styles[`timeline-container status ${item.status === 'rejected' ? 'red': ''}`]}>
                    </div>
                </div>
        </div>
        {isImageModalOpen && <ImageViewer 
                                src = {item.img} 
                                onClose = {() => setIsImageModalOpen(false)}
                            />}
        {isAddStepModalOpen && <AddStepModal 
                                onClose = {() => setAddStepModalOpen(false)} 
                                application_id = {item._id} 
                                history = {item.history} 
                                status = {item.status}
                                />}
        {isDeleteConfirmationOpen && <Alert 
                                                {...buildDeleteConfirmationObject('application')} 
                                                onBtnClick = {deleteBtnClickHandler} 
                                                onClose = {() => setIsDeleteConfirmationOpen(false)}
                                            />}       
    
    </div>

    )
}

export default Application