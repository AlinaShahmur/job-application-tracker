import './Dashboard.css'
import * as V from 'victory'
import { VictoryBar } from 'victory';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../utils/request_client';
import { BASE_URL_DEV } from '../../utils/constants';

const testData = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
];

function Dashboard() {
    //const applications = useSelector((state: any) => state.application.applications);
    const [applications, setApplications] = useState([]);
    const [totalApplications, setTotalApplications] = useState(0);
    useEffect(() => {
        const fetchApplications = async () => {
            const res = await fetchData('GET', null,`${BASE_URL_DEV}/applications/all`);
            setApplications(res.data);
            setTotalApplications(res.totalCount);
            console.log("fetchData")
        }
        fetchApplications()
    },[])
    let allSources = applications.reduce((prevValue: any, currValue: any) => {
         if (!prevValue.includes(currValue.source)) {
             prevValue.push(currValue.source)
         }
         return prevValue
    },[])
    let arr: any[] = [];
    allSources.forEach((item: any) => {
        let obj: any = {}
        obj['source'] = item;
        let applWithResp = applications.filter((apps:any) => apps.source === item && apps.stage !== 'CV was sent').length
        obj['percentages'] = applWithResp/totalApplications
        arr.push(obj)
    })
    console.log(arr)
    return (
        <div className = 'dashboard'>
            <div className = 'dashboard__item dashboard__without-response'>
                <h3>The correlation between total amount of applications and applications with response in the source context </h3>
                <V.VictoryChart domainPadding={10} theme={V.VictoryTheme.material}>
                    <V.VictoryAxis
                        tickValues={[1, 2, 3, 4]}
                        tickFormat={allSources}
                        label = 'Sources'
                        style={{
                            axisLabel: { padding: 36 },
                            tickLabels: { padding: 8 }
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
                        data = {arr}
                        x = 'source'
                        y = 'percentages'
                    />
                </V.VictoryChart>
            </div>
        </div>

    )
}

export default Dashboard