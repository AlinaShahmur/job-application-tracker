import './Dashboard.css'
import * as V from 'victory'
import { VictoryBar } from 'victory';
import { useEffect, useState } from 'react';
import { fetchData } from '../../utils/request_client';
import { BASE_URL } from '../../utils/constants';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';
import Loader from '../UI/Loader';


function Dashboard() {
    const { getIdTokenClaims } = useAuth0();
    const [percentages , setPercentages] : any = useState([]);
    const process = useSelector((state: any) => state.process.currentProcess);
    useEffect(() => {
        const fetchApplications = async () => {
            const token: any = await getIdTokenClaims();                
            const res = await fetchData('GET', null,`${BASE_URL}/api/sources/percentages`, token.__raw, process._id);
            console.log({res});
            setPercentages(res.percentage);
        }
        fetchApplications()
    },[])
    const hasResponses = percentages.some((item: any) => item.percentage > 0);
    
    const withResponseDashboardContent = hasResponses 
                                        ? (<div className = 'dashboard__item dashboard__without-response'>

                                            <h3>The correlation between total amount of applications and applications with response in the source context </h3>
                                            <V.VictoryChart domainPadding={10} theme={V.VictoryTheme.material}>
                                                <V.VictoryAxis
                                                    tickValues={[1, 2, 3, 4]}
                                                    tickFormat={percentages.map((percentage: any) => percentage.source)}
                                                    label = 'Sources'
                                                    style={{
                                                        axisLabel: { padding: 36 },
                                                        tickLabels: { padding: 8, fontSize: 8 }
                                                    }}
                                                />
                                                <V.VictoryAxis
                                                    dependentAxis          
                                                    tickFormat={(x) => (x)}
                                                    label = 'Applications correlation'
                                                    style={{
                                                        axisLabel: { padding: 36 },
                                                        tickLabels: { padding: 8 }
                                                    }}
                                                />
                                                <VictoryBar 
                                                    animate={{
                                                        onEnter: {
                                                        duration: 500,
                                                        }
                                                    }}
                                                    data = {percentages}
                                                    x = 'source'
                                                    y = 'percentage'
                                                />
                                            </V.VictoryChart>
                                            </div>) 
                                            : <h3>You have no applications with reponses</h3>
                                    
    return (
        <div className = 'dashboard'>
            <h1>Dashboard</h1>
            {percentages.length > 0
            ? withResponseDashboardContent
            : <Loader size = {15}/> }
        </div> 

    )
}

export default Dashboard