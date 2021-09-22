import React from 'react';
import SideBar from '../../components/modules/left_sidebar';
import NavBar from '../../components/common/navbar';
import DashboardGroup from '../../components/Groups/dashboard_group';
const Administration=false;
class AdminDashboardGroupPage extends React.Component{
    render(){
        return (
            <div className="dashboard">
                <NavBar />
                <SideBar Administration={Administration}/>
                <DashboardGroup />                
            </div>
        )
    }
}

export default AdminDashboardGroupPage;