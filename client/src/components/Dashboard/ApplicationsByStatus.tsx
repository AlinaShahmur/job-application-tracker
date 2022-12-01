
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { VictoryContainer, VictoryPie } from "victory";
import { BASE_URL, STATUS_AND_COLORS } from "../../utils/constants";
import { fetchData } from "../../utils/request_client";
import styles from './ApplicationsByStatus.module.css';



function ApplicationsByStatus() {
    const { getIdTokenClaims } = useAuth0();
    const process = useSelector((state: any) => state.process.currentProcess);
    const [pending, setPending] = useState(0);
    const [rejected, setRejected] = useState(0);

    useEffect(() => {
        const fetchApplicationsQtyByStatuses = async () => {
            const token: any = await getIdTokenClaims();                
            const res = await fetchData('GET', null,`${BASE_URL}/api/applications/byStatuses`, token.__raw, process._id);
            console.log({res});
            
            setPending(res.pending);
            setRejected(res.rejected)
        }
        fetchApplicationsQtyByStatuses()
    }, []);

    return (
        <div className={styles["applications-by-status"]}>
            <h3>Applications in the "Status" context</h3>

            <VictoryPie 
                colorScale={[STATUS_AND_COLORS.pending, STATUS_AND_COLORS.rejected ]}  
                data={[
                    { x: "Pending", y: pending },
                    { x: "Rejected", y: rejected }
                ]}
                width={400} height={300}
                style={{ labels: { fontSize: 12 } }}
                labelRadius={10}
                labels = {({datum}) => datum.y > 0 ? `${datum.x} - ${datum.y}` : ""}
                containerComponent={<VictoryContainer responsive={false}/>}
            />
        </div>
    )
}

export default ApplicationsByStatus;