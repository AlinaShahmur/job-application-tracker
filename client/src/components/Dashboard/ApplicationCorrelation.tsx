import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as V from 'victory'
import { VictoryBar } from 'victory';
import { BASE_URL } from '../../utils/constants';
import { fetchData } from '../../utils/request_client';

export default function ApplicationCorrelation() {
    const { getIdTokenClaims } = useAuth0();
    const [percentages , setPercentages] : any = useState([]);
    const process = useSelector((state: any) => state.process.currentProcess);
    
    useEffect(() => {
        const fetchPercentages = async () => {
            const token: any = await getIdTokenClaims();                
            const res = await fetchData('GET', null,`${BASE_URL}/api/sources/percentages`, token.__raw, process._id);
            setPercentages(res.percentage);
        }
        fetchPercentages()
    }, []);

    const hasResponses = percentages.some((item: any) => item.percentage > 0);
    
    const withResponseDashboardContent = hasResponses ?
                                         (<V.VictoryChart domainPadding={10} theme={V.VictoryTheme.material}>
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
                                            </V.VictoryChart>) 
                                            : <p>You have no applications with reponses</p>;
                                    
    return (
        <div>
            <div className = 'dashboard__item'>
                <h3>The correlation between total amount of applications and applications with response in the "Source" context </h3>
                {withResponseDashboardContent}
            </div>
        </div>
    )
}