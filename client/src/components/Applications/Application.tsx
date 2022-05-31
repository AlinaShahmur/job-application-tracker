import { application } from "express";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ICONS } from "../../utils/constants";
import { pretiffyDate } from "../../utils/utils";
import SvgIcon from "../Icons/SvgIcon";
import ImageViewer from "../UI/ImageViewer";
import styles from './Application.module.css'

function Application() {
    let { id } = useParams();
    const location: any = useLocation();
    const [isImageModalOpen, setIsImageModalOpen] = useState(false)
    const { item } = location.state
    return (
    <div>
        <div className = {styles.application}>
                <div>
                    <h1>Commmon Information</h1>
                    <h3>{item.role} - {item.company_name}</h3> 
                    <p>{item.status}</p>

                    <button onClick={() => setIsImageModalOpen(true) }>
                        <SvgIcon viewBox = {ICONS.viewBox.image_icon}
                                path = {ICONS.path.image_icon}
                                style = {{fill: "#8a996c", width: 15, height: 15}}
                            />
                    </button>

                </div>
                <div>
                    <h1>History</h1>
                    <div className={styles.timeline}>
                     {item.history.map((event: any, index: any) => (
                                    <div key = {event._id} className = {`${styles['timeline-container']} ${index % 2 === 0 ? styles['right'] : styles['left']}`}>
                                        <div className = {styles['timeline-content']}>
                                            <h5>{pretiffyDate(event.date)}</h5>  
                                            <p>{event.event}</p> 
                                        </div>
                                    </div>))}  
                    </div>
                    <div className = {styles[`timeline-container status ${item.status === 'rejected' ? 'red': ''}`]}>
                            {/* <div className = {styles['timeline-content status']}>
                                <h5>{item.status}</h5>  
                            </div> */}
                    </div>
                </div>
        </div>
        {isImageModalOpen && <ImageViewer src = {item.img} onClose = {() => setIsImageModalOpen(false)}/>}
    </div>

    )
}

export default Application