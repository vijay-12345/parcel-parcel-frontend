import React from 'react';
import { Modal,Space, Button, Tooltip, Calendar, Alert  } from 'antd';
import moment from 'moment';


class CalenderModal extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            value: moment('2017-01-25'),
           
        }
    }
    componentDidMount(){
        this.createState();
    }
    componentDidUpdate(preProp){
        if(preProp.date!=this.props.date){
            this.createState();
        }
    }

    createState=()=>{
        this.setState({
            value:moment(this.props.selectedDate),
          });
    }
    
    
    onSelect = value => {
        this.updateDate(value)
      };
    
      onPanelChange = value => {
        this.updateDate(value)
      };

      updateDate=(value)=>{
        this.setState({
            value,
          });
          this.props.onCalenderChange(value.format('YYYY-MM-DD'));
      }

      render() {
        const { value } = this.state;
        return (
          <>
            <Calendar fullscreen={false} value={value} onSelect={this.onSelect} onPanelChange={this.onPanelChange} />
          </>
        );
      }
}

export default CalenderModal;