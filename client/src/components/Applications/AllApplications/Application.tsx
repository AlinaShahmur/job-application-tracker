import { useLocation, useParams } from "react-router-dom";
import { pretiffyDate } from "../../../utils/utils";
import Wrapper from "../../UI/Wrapper";
import styles from './Application.module.css'

function Application() {
    let { id } = useParams();
    const location: any = useLocation()
    const { item } = location.state
    return (
        <div className = {styles.application}>
            <Wrapper width = {300} height = {200}>
                <div>
                    <h1>Commmon Information</h1>
                    <h3>{item.role} - {item.company_name}</h3> 
                    <p>{item.status}</p>
                </div>
            </Wrapper >
            <Wrapper width = {300} height = {'fit-content'}>
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
            </Wrapper>
        </div>

    )
}

export default Application