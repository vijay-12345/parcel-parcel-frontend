import React from 'react';

import UserListComponent from '../../components/UserList/user_list_component';
import Sidebar from '../../components/modules/left_sidebar'
import NavBar from '../../components/common/navbar';
const Administration=false;

class UserListPage extends React.Component{
    render(){
        return(
            <div className="dashboard">
                <NavBar />
                <Sidebar Administration={Administration}/>
                <div  className="container-fluid">
                    <UserListComponent />
                </div>
            </div>
        )
    }
}


export default UserListPage;