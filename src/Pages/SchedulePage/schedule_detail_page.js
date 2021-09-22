import React from 'react';
import ScheduleDetailsComponent from '../../components/Schedule/schedule_detail_component';
import NavBar from '../../components/common/navbar';
import SideBar from '../../components/modules/left_sidebar';



const queryString = require('query-string');


class ScheduleDetailPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           id:""
          }
    }
    
    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search);
        if(parsed.id){
            this.setState({
                id : parsed.id
            })
        }
    }
    render(){
        return (
            <div className="dashboard">
                <NavBar />
                <SideBar />
                <ScheduleDetailsComponent id={this.state.id}/>
            </div>
        )
    }
}

export default ScheduleDetailPage;