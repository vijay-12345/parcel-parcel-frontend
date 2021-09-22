import React from 'react';
import SideBar from '../../components/modules/left_sidebar';
import NavBar from '../../components/common/navbar';
import DashboardGroupUser from '../../components/Groups/dashboard_group_user';
const Administration=false;

class AdminDashboardGroupUserPage extends React.Component{
    render(){
        return (
            <div className="dashboard">
                <NavBar />
                <SideBar Administration={Administration} />
                <DashboardGroupUser />    
            </div>
        )
    }
}
export default AdminDashboardGroupUserPage;