import React from 'react';
import { toast } from 'react-toastify';
import services from '../../services';
import $ from 'jquery'
import { DatePicker, Checkbox, Select } from 'antd';
import { TimePicker } from 'antd';
import FormNavbar from '../common/wizard_navbar';
import FormleftNev from '../common/FormleftNev';
import Lang from '../../lang'
import { Input } from '@progress/kendo-react-inputs';
const moment = require('moment');

const Timeformat = 'HH:mm';
const dateFormat = 'YYYY-MM-DD';



class Scheduleform extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        data:{
          date:this.ShowCurrentDate(),
          time:"12:00"
        },
        Datetime : '',
        Time:"00;00",
        Users:[],
        SortBy:'ID',
        SortType:false,
        Paginate:false,
        Page:1,
        PageSize:10,
        Filters : null,
        datePicker:"",
        timepicker:""
      }
  }


  createInputs(nevkey){
    let inputs= this.props.InputFieldsAll[nevkey].map((row,i) =>{
        switch(row.type){
            case "dropdown" :
            return (
                <div className="col-md-3">
                <div className="input-box active-grey mt-4">
                  {/* <label className="input-label">{row.display}</label> */}
                  <select type={row.type} className="form-control" value={this.state.data[row.key]} onChange={this.handleChange} placeholder={row.display} name={row.key}>
                      <option selected value="">{Lang.langCheck.langRequest("Select User")}</option>
                      {
                        this.state.Users.map((_row,index)=>(
                          (_row.id==this.state.data.toUserId)?
                            <option value={_row.id} >{_row.fullName}</option>
                              : 
                            <option value={_row.id}>{_row.fullName}</option>
                         ))
                      }
                  </select>
                </div>
             </div>
            )
            break;
            case "date" : 
            return (
                <div className="col-md-3">
                      <div className="input-box active-grey mt-4">
                     {
                       this.state.datePicker
                     }
                      </div>
                </div>
            )
            break;
            case "time" : 
            return (
                <div className="col-md-3">
                      <div className="input-box active-grey mt-4">
                      {
                        this.state.timepicker
                      }
                      </div>
                </div>
            )
            break;
            default :
            return (
                <div className="col-md-12">
                      <div className="input-box active-grey">
                        {
                          row.type === 'textarea' ?
                          <>
                            <label className="input-label">{row.display}</label>
                            <textarea style={{height:"150px"}} rows="3" className="input-1" value={this.state.data[row.key]} onChange={this.handleChange} placeholder={row.display} name={row.key}  />
                          </>
                          :
                          // <input type={row.type} className="input-1" value={this.state.data[row.key]} onChange={this.handleChange} placeholder={row.display} name={row.key}  />
                          <Input
                            name={row.key}
                            type={row.type}
                            style={{ width: "100%",marginTop:"3px" }}
                            className="input-1"
                            label={row.display}
                            onChange={this.handleChange}
                            value={this.state.data[row.key]}
                          />
                        }
                      </div>
                </div>
            )
        }
    });
    return inputs
}


createInputFields = () => {
    
    let  InputFieldsdivs = Object.keys(this.props.InputFieldsAll).map((nevkey) =>{
        return  (<div className="bg-white middle p20" id={nevkey}>
                    <div className="head">
                    <h2> {Lang.langCheck.langRequest(`${nevkey}`)}</h2>
                    <p className="font-14">{/*"Lorem ipsum dolor sit amet, consetetur sadipscing elitrdiam"*/}</p>
                    </div>
                    <div className="row">
                    { this.createInputs(nevkey)  }
                    </div>
                </div>
        )
        });
    
return InputFieldsdivs;
}


  handleDatePicker = () => {
   let date =this.state.data.date?this.state.data.date:this.ShowCurrentDate()
   console.log("....date",date,moment(`${date}`,dateFormat),this.ShowCurrentDate())
    let datePicker =    (<DatePicker 
            className="form-control"
            size="middle"
            placeholder={Lang.langCheck.langRequest("Date")}
            name="date"
            defaultValue={moment(date,dateFormat)}
            onChange={this.handleDate}
        />)
        this.setState({datePicker},()=>this.handleTmePicker())
        // return datePicker;
}

handleTmePicker = () => {
  let time=this.state.data.time?this.state.data.time:"12:00";
  console.log("time",time)
  let timepicker =    (<TimePicker 
    className="form-control"
    size="middle"
    name="time"
    defaultValue={moment(time,Timeformat)}
    placeholder={Lang.langCheck.langRequest("Time")}
    format={Timeformat}
    onChange={this.handleTime}
/>)
  this.setState({timepicker})
  // return timepicker
}

  ShowCurrentDate=()=>{
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return (date + '/' + month + '/' + year);

   }

  componentDidMount() {
    let  data ={
      Filters:this.state.Filters,
      SortBy:this.state.SortBy,
      IsSortTypeDESC:this.state.SortType,
      IsPagination:this.state.Paginate,
      Page:this.state.Page,
      PageSize:this.state.PageSize
      };
    this.getUserList(data);
  }

  //  handleChange = (e) => {
  //       this.setState({
  //           [e.target.name] : e.target.value
  //       })
  //   }

  componentDidUpdate(PrevProp){
    // services.lablecheck.setlable();
    if(this.props.id && PrevProp.id!==this.props.id)
      { 
          console.log("mount")
          this.getdata(this.props.id);
          // this.handleDatePicker()
      }
    else if(PrevProp.detail !== this.props.detail && this.props.id === ''){
      console.log("Update")
      let detail = this.props.detail
      let data = {}
      if(Object.keys(detail).length > 0){
        data = {
          ...detail,
          date:moment(detail.start).format(dateFormat),
          time:moment(detail.start).format(Timeformat)
        }
      }
      this.setState({
        data : data
      },()=>this.handleDatePicker())
    }
  }
  handleTime = (e) => {
    this.setState({
      time : e ? moment(e._d).format(Timeformat) : ''
    })
  }

  handleChange = (e) => {
    let data= {...this.state.data};
    data[e.target.name]=e.target.value;
    console.log(data);
    this.setState({
      data : data
    })
 }

  handleDate = (e) => {
    this.setState({
      date : e ? moment(e._d).format(dateFormat) : ''
    })
  }

  getUserList = async ( data) => {
    let _data = await services.apiCall.requestApi("/User/getall",data,'post')
    if(_data){
        this.setState({
          Users : _data
        })
    }
  }

  getdata = async ( id) => {
    let _data = await services.apiCall.requestApi("/schedule/"+id,{},'get')
    if(_data){
        let detail = this.props.detail
        let data = {
          ..._data,
          ...detail,
          date:moment(detail.start).format(dateFormat),
          time:moment(detail.start).format(Timeformat),
        }
        this.setState({
            data : data
        },()=>this.handleDatePicker());
    }
  }
  
  handleSubmit=(e,backUrl)=>{
    e.preventDefault();
    // Get form
    var form = $('#submitform')[0];
    let detail = this.props.detail
    // Create an FormData object
    var formData = new FormData(form);
    var object = {};
    let end_date = moment(detail.end).format(dateFormat)
    let end_time = moment(detail.end).format(Timeformat)
    formData.forEach((value, key) => {object[key] = value});
    let start_date=moment(formData.date).format(dateFormat)
    let start_time=moment(formData.time).format(Timeformat)
    object.toUserId=parseInt(object.toUserId);
    object.enddate=end_date+'T'+end_time
    object.isAllDay=detail.isAllDay === "false" ? false : true
    object.startdate=start_date+'T'+start_time
    object.recurrenceRule=detail.recurrenceRule ? detail.recurrenceRule : ''
    // object.title=detail.title

    var json = JSON.stringify(object);
    
    // this.setState({xvalue: json});
    var url = $(form).attr('action');
    this.handleactionSubmit(backUrl,url,json);
   }

   handleactionSubmit = async (backUrl,url,data) => {
      let res = await services.apiCall.requestApi(url,data,'post')
      if(res){
        if(backUrl){
          window.location= backUrl;
        }
      }
  }

    render(){
      console.log("id=",this.state.data);
        return (
          <div className="dashboard">
          <FormNavbar to={'/schedule'} handleSubmit={(e,url)=>this.handleSubmit(e,url)} type="tesouraria" headName={this.props.id ? Lang.langCheck.langRequest("Edit Schedule") : Lang.langCheck.langRequest("Create New Schedule")} />
          <div className="full-container edit-ward">
          <FormleftNev InputFieldsAll={this.props.InputFieldsAll} />
           <div className="right-section">
             <form id="submitform" action={this.props.id?'schedules/create/'+this.props.id:'schedules/create'}>
                  {/* <div className="outer-space"> */}
                    <div>
                    {/* <h2 className="heading-table mt-0">{
                      this.props.id ? Lang.langCheck.langRequest("Edit Schedule"):Lang.langCheck.langRequest("Create New Schedule")
                    }</h2> */}
                      <div className="row top-serch">
                        {
                          this.createInputFields()
                        }
                        {/* <div className="col-md-3">
                            <div className="form-group ">
                            <input type="text" className="form-control" placeholder="Title" value={this.state.data.title} name='title' onChange={this.handleChange}/>
                          </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group ">
                            <input type="text" className="form-control" placeholder="Entity" value={this.state.data.entity} name='entity' onChange={this.handleChange}/>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group ">
                            <input type="text" className="form-control" placeholder="Details of Selected Entity" name='details' value={this.state.data.details} onChange={this.handleChange} />
                        </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group ">
                            <select className="form-control" placeholder="toUserId" name='toUserId' onChange={this.handleChange} >
                              {
                                 this.state.Users.map((_row,index)=>(
                                  (_row.id==this.state.data.toUserId)?
                                    <option value={_row.id} selected >{_row.fullName}</option>
                                      : 
                                    <option value={_row.id}>{_row.fullName}</option>
                                 ))
                              }
                            </select>
                            
                        </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group ">
                            <input type="text" className="form-control" name="purposeTitle" placeholder="Purpose Title" value={this.state.data.purposeTitle} onChange={this.handleChange} />
                        </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group calender-field position-relative">
                         {
                                this.props.id?
                                this.state.datePicker
                                : <DatePicker 
                                className="form-control"
                                size="middle"
                                defaultValue={moment(`${this.state.data.date}`,dateFormat)}
                                format={dateFormat}
                                name="date"
                                placeholder="Date"
                                onChange={this.handleDate}
                                />
                         }
                         
                          </div>
                        </div>
                        <div className="col-md-3">
                        <div className="form-group calender-field position-relative">
                        {
                            this.props.id?
                                this.state.timepicker
                                  :
                              <TimePicker 
                                className="form-control"
                                size="middle"
                                name="time"
                                defaultValue={moment(`${this.state.data.time}`,Timeformat)}
                                placeholder="time"
                                format={Timeformat}
                                onChange={this.handleTime}
                             />
                            }
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group ">
                            <textarea placeholder="description" className="form-control" name='description' rows="3" value={this.state.data.description} onChange={this.handleChange} ></textarea>
                        </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group ">
                            <textarea placeholder="Observation" className="form-control" rows="3" name='observation' value={this.state.data.observation} onChange={this.handleChange} ></textarea>
                        </div>
                        </div> */}
                      </div>
                    
                      {/* <div className="row mt-4">
                        <div className="col-md-12 text-center">
                          <button className="btn btn-theme mr-4" onClick={this.handleSubmit}>{ this.props.id ? "Edit Schedule":"Create Schedule"}</button>
                        </div>
                      </div> */}
                        </div>
                      {/* </div> */}
                  </form>
                  </div>
                  </div>
              </div>
        )
    }
}

export default Scheduleform;