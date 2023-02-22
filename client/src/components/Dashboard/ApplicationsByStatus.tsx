
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { VictoryContainer, VictoryLegend, VictoryPie } from "victory";
import { BASE_URL, STATUS_AND_COLORS } from "../../utils/constants";
import { fetchData } from "../../utils/request_client";
import Card from "../UI/Card";
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
            
            setPending(res.pending);
            setRejected(res.rejected)
        }
        fetchApplicationsQtyByStatuses()
    }, []);

    const chartData = [{title: "Pending", value: pending, color: STATUS_AND_COLORS.pending}, {title: "Rejected", value: rejected, color: STATUS_AND_COLORS.rejected}];

    return (
        <div className={styles["applications-by-status"]}>
            <Card>
                <h3>Applications in the "Status" context</h3>
                <svg width={270} height={400}>
                    <VictoryLegend x={70} y={10}
                            centerTitle
                            borderPadding={0}
                            standalone = {false}
                            orientation="horizontal"
                            gutter={20}
                            
                            data = {chartData.filter(x => x.value > 0).map(x => {
                                return {name: x.title, symbol: {fill: x.color}}
                            })}
                        />
                        <VictoryPie 
                            colorScale={[STATUS_AND_COLORS.pending, STATUS_AND_COLORS.rejected ]}  
                            data={chartData.map(x => {
                                return {x: x.title, y: x.value}
                            })}

                            width={270} height={300}
                            style={{ labels: { fontSize: 18 } }}
                            padding = {{
                                top: 100,
                                left: 60
                            }}
                            labelRadius={10}
                            standalone = {false}
                            labels = {({datum}) => datum.y > 0 ? `${datum.y}` : ""}
                            containerComponent={<VictoryContainer responsive={false}/>}
                        />
                </svg>
            </Card>       

        </div>
    )
}

export default ApplicationsByStatus;