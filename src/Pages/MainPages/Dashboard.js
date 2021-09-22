import React from 'react';
import SideBar from '../../components/modules/left_sidebar';
import NavBar from '../../components/common/navbar';
import DashBoardComponent from '../../components/MainPageComponent/dashboard'
import DashBoardFilter from '../../components/MainPageComponent/dashboard_filter'

class DashBoardPage extends React.Component{
    render(){
        return (
            <div className="dashboard">
                <NavBar />
                <SideBar />
                {/* <DashBoardComponent /> */}
                <DashBoardFilter />
            </div>
        )
    }
}

export default DashBoardPage;