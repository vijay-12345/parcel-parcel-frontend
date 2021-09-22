import React from 'react';
import SideBar from '../../components/modules/left_sidebar';
import NavBar from '../../components/common/navbar';
import DashboardSchedule from '../../components/MainPageComponent/dashboard_schedule';

class DashboardCreateSchedulePage extends React.Component{
    render(){
        return (
            <div className="dashboard">
                <NavBar />
                <SideBar />
                <DashboardSchedule />
            </div>
        )
    }
}

export default DashboardCreateSchedulePage;