import './Dashboard.css'
import ApplicationCorrelation from './ApplicationCorrelation';
import ApplicationsByStatus from './ApplicationsByStatus';


function Dashboard() {

    return (
        <div className = 'dashboard'>
            <h1>Dashboard</h1>
            <div className="dashboard-diagrams">
                <ApplicationCorrelation/>
                <ApplicationsByStatus/>
            </div>
        </div> 

    )
}

export default Dashboard