import React from 'react';
import SideBar from '../../components/modules/left_sidebar';
import NavBar from '../../components/common/navbar';
import DashboardPermission from '../../components/Groups/dashboard_permission';

const Administration=false;
class AdminDashboardPermissions extends React.Component{
    render(){
        return (
            <div className="dashboard">
                <NavBar />
                <SideBar Administration={Administration} />
                <DashboardPermission />
            </div>
        )
    }
}

export default AdminDashboardPermissions;