import React from 'react';

import EstotusListComponent from '../../components/Estatos/estatos_list_component';
import NavBar from '../../components/common/navbar';
import SideBar from '../../components/modules/left_sidebar';
const Administration=false;

class EstotusListPage extends React.Component{
    render(){
        return(
            <div className="dashboard">
                <NavBar />
                <SideBar Administration={Administration}/>
                <div  className="container-fluid">
                    <EstotusListComponent />
                </div>
            </div>
        )
    }
}


export default EstotusListPage;