import React from 'react';
// import SideBar from '../../components/modules/left_sidebar';
// import NavBar from '../../components/common/navbar';
import Scheduleform from '../../components/Schedule/schedule_form';
// import FormNavbar from '../../components/common/wizard_navbar';
// import FormleftNev from '../../components/common/FormleftNev';
import Lang from '../../lang'


const queryString = require('query-string');

const InputFieldsAll= {
    ScheduleDetail:[
        {
            key : "title",
            type : "text",
            display : Lang.langCheck.langRequest("Title")
        },
        {
            key : "entity",
            type : "text",
            display : Lang.langCheck.langRequest("Entity")
        },
        {
            key : "details",
            type : "text",
            display : Lang.langCheck.langRequest("Details of Selected Entity")
        }
    ],
    OtherDetails:[
        {
            key : "toUserId",
            type : "dropdown",
            display : Lang.langCheck.langRequest("Select User")
        },{
            key : "purposeTitle",
            type : "text",
            display : Lang.langCheck.langRequest("Purpose Title")
        },
        {
            key : "data",
            type : "date",
            display : Lang.langCheck.langRequest("Date")
        },
        {
            key : "time",
            type : "time",
            display : Lang.langCheck.langRequest("Time")
        }
    ],
    ScheduleDescription:[
        {
            key : "description",
            type : "textarea",
            display : Lang.langCheck.langRequest("Description")
        }
    ],
    ScheduleObservation:[
        {
            key : "observation",
            type : "textarea",
            display : Lang.langCheck.langRequest("Observation")
        }
    ]
    
}

class CreateSchedulePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           id:"",
           detail:{}
          }
    }
    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search);
        if(parsed.id){
            this.setState({
                id : parsed.id,
                detail:parsed
            })
        }else{
            this.setState({
                detail : parsed,
                id : ''
            })
        }
    }

    handleSubmit = () => {

    }
    
    render(){
        return (
                <Scheduleform id={this.state.id} detail={this.state.detail} InputFieldsAll={InputFieldsAll} />
        )
    }
}

export default CreateSchedulePage;