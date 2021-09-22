import React from 'react';

import NavBar from '../../components/common/navbar';
import EntityRuleList from '../../components/EntityRule/entity_rule_list';
import SideBar from '../../components/modules/left_sidebar';
const Administration=false;

class EntityRuleListPage extends React.Component{
    render(){
        return(
            <div className="dashboard">
                <NavBar />
                <SideBar Administration={Administration}/>
                <div  className="container-fluid">
                    <EntityRuleList />
                </div>
            </div>
        )
    }
}


export default EntityRuleListPage;