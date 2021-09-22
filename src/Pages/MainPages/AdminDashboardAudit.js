import React from 'react';
import SideBar from '../../components/modules/left_sidebar';
import NavBar from '../../components/common/navbar';
import DashboardAudit from '../../components/MainPageComponent/dashboard_audit';

const Administration=false;
class DashBoardPage extends React.Component{
    render(){
        return (
            <div className="dashboard">
                <NavBar />
                <SideBar Administration={Administration}/>
                <DashboardAudit />
            </div>
        )
    }
}

export default DashBoardPage;