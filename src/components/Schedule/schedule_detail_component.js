import React from 'react';

import services from '../../services';
const moment = require('moment');

const Timeformat = 'HH:mm';
const dateFormat = 'YYYY-MM-DD';

class ScheduleDetailsComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
         data:[],
         touser:{}
          }
      }
     componentDidUpdate(PrevProp){
        if(this.props.id && PrevProp.id!==this.props.id)
          {
              this.getdata(this.props.id);
          }
      }
      getdata = async ( id) => {
        let _data = await services.apiCall.requestApi("/schedule/"+id,{},'get')
        if(_data){
            this.setState({
                data : _data
            })
            this.getUser(_data.toUserId);
        }
      }

      getUser = async ( id) => {
        let _data = await services.apiCall.requestApi("/User/"+id,{},'get')
        if(_data){
            this.setState({
                touser : _data
            })
        }
      }
    render(){
        return(
            <div className="inner-container">
            <div className="outer-space">
            <h2 className="heading-table">Schedule</h2>
            <div className="white-box schedule-pera mb40">
                <div className="row">
                    <div className="col-md-2"><span className="font-weight-500">Title</span></div>
                    <div className="col-md-4"><span className="mr-3 font-weight-500 collon">:-</span>{this.state.data.title}</div>
                    <div className="col-md-2"><span className="font-weight-500">Source Model</span></div>
                    <div className="col-md-4"><span className="mr-3 font-weight-500 collon">:-</span>Parcel</div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-2"><span className="font-weight-500">From</span></div>
                    <div className="col-md-4"><span className="mr-3 font-weight-500 collon">:-</span>{this.state.touser.fullName}</div>
                    <div className="col-md-2"><span className="font-weight-500">Entity</span></div>
                    <div className="col-md-4"><span className="mr-3 font-weight-500 collon">:-</span>{this.state.data.entity}</div>
                </div>
                <div className="row mt-2">
                <div className="col-md-2"><span className="font-weight-500">Date/Time</span></div>
                <div className="col-md-4"><span className="mr-3 font-weight-500 collon">:-</span>{moment(this.state.data.date).format('DD/MM/YYYY')} {this.state.data.time}</div>
                
                </div>
                <div className="row mt-2">
                    <div className="col-md-2"><span className="font-weight-500">Discription</span></div>
                    <div className="col-md-10">
                    <p><span className="mr-3 font-weight-500 collon">:-</span>{this.state.data.description}</p>
                    </div>
                </div>
                <div className="row mt-2">
                <div className="col-md-2"><span className="font-weight-500">Observation</span></div>
                <div className="col-md-10">
                <p><span className="mr-3 font-weight-500 collon">:-</span> {this.state.data.observation}</p>
                </div>
                </div>
                </div>
                <div className="row mt-3 btns-box">
                <div className="col-md-12 text-center">
                   <a href={`create_schedule?id=${this.props.id}`} > <button className="btn btn-theme">RESCHEDULE</button></a>
                    {/* <button className="btn btn-black">RESEND</button> */}
                    <a href={`schedule`} >  <button className="btn btn-yellow">CANCIL</button></a>
                </div>
                </div>
            </div>
            </div>
        )
    }
}

export default ScheduleDetailsComponent;