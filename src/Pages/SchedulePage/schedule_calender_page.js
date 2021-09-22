import React from 'react';
import {Calendar} from 'antd'
import NavBar from '../../components/common/navbar';
import SideBar from '../../components/modules/left_sidebar';
import ScheduleFilterComponent from '../../components/Schedule/schedule_filter_component';



class ScheduleCalenderPage extends React.Component{
    render(){
        return (
            <div className="dashboard">
                <NavBar />
                <SideBar />
                <ScheduleFilterComponent />
                <div className="container-fluid">
                    <Calendar />
                </div>
            </div>
        )
    }
}

export default ScheduleCalenderPage;