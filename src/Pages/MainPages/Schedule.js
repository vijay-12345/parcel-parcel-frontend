import React from 'react';
import SideBar from '../../components/modules/left_sidebar';
import NavBar from '../../components/common/navbar';
import ScheduleFilterComponent from '../../components/Schedule/schedule_filter_component';
import DashboardSchedule from '../../components/Schedule/dashboard_schedule_list';
import { Calendar } from 'antd';
import services from '../../services';
import TkCalender from '../../components/tlelrik/TkCalender';
import Main from '../Demo/main';
import { withRouter } from 'react-router-dom';
import Lang from '../../lang'
var moment = require('moment')

const dateFormat = 'YYYY-MM-DD';

const ScheduleCalenderdata = [{
    id: 0,
    title: "Holiday",
    start: new Date("2019-08-14T11:00:00Z"),
    end: new Date("2019-08-16T11:01:00Z"),
    isAllDay: false
}]

const columnkeyMap={
    title: Lang.langCheck.langRequest("Title"), 
    entity : Lang.langCheck.langRequest("Entity"),
    status : Lang.langCheck.langRequest("Status"),
    observation : Lang.langCheck.langRequest("Observation"),
    attendance : Lang.langCheck.langRequest("Attendance")
  }

class Schedule extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show : false,
            data : [],
            totalcount:'0',
            telkikTable : '',
            SortBy:'ID',
            SortType:false,
            Paginate:false,
            Page:1,
            PageSize:10,
            show : false,
            calData : {}
        }
    }
     componentDidMount() {
        this.createpayload();
    }
    updatelistsort(sort,key){
      this.setState({
          SortBy:key,
          SortType:sort
      },()=>this.createpayload())
  }
  updatelistpagenumsize(PageSize, page_num){
      this.setState({
          Page:page_num,
          PageSize:PageSize
      },()=>this.createpayload());
  }
     createpayload(){
      let  data ={
            Filters:this.getFilters(),
            SortBy:this.state.SortBy,
            IsSortTypeDESC:this.state.SortType,
            IsPagination:this.state.Paginate,
            Page:this.state.Page,
            PageSize:this.state.PageSize
        };
        this.getList(data);
    }  
    
    columnlist = Object.keys(columnkeyMap).map(function(key) {
        return  {field:columnkeyMap[key],columnMenuType:'checkbox'}
     });
    
    createTabel = ()=>{
    let actionbuttons= {Edit:true,Redirect:true,Delete:true}     
    console.log("DATA",this.state.data);
        let telkikTable = <Main date={new Date()} deleteFunc={(id)=>this.handleDelete(id)} list={this.state.data} actionbuttons={actionbuttons} columnlist={this.columnlist} ActionPerform={(action,id)=>this.ActionPerform(action,id)}/>
        this.setState({
        telkikTable : telkikTable
        })
    }

    ActionPerform = (action,row) => {
        if(action=='Edit'){
            // this.props.history.push({
            //     pathname:`/create_schedule?id=${row.id}`
            // })
            window.location = `/create_schedule?id=${row.id}`
        }
        if(action == 'Redirect'){
            // this.props.history.push({
            //     pathname:`/schedule_detail?id=${row.id}`
            // })
            window.location = `/schedule_detail?id=${row.id}`
        }
        if(action == 'Delete'){
            
        }
        if(action=='GotoSchedule'){
            let params = new URLSearchParams(row.dataItem).toString();
            window.location = `/create_schedule?`+params
        }
    }
    
    getFilters(){
        return null;
    }

    handleFilter=(data)=>{
        let actionbuttons= {Edit:true,Redirect:false,Delete:true}    
        let telkikTable = <Main date={new Date()} deleteFunc={(id)=>this.handleDelete(id)} list={data} actionbuttons={actionbuttons} columnlist={this.columnlist} ActionPerform={(action,id)=>this.ActionPerform(action,id)}/>
        this.setState({
           telkikTable
        })
    }

    handleDelete = (id) => {

    }
    
    getList = async (data ) => {
        let _data = await services.apiCall.requestApi("schedule/GetAll",data,'post')
        if(_data){
            let monthData = _data;
            // _data.map((_r,i)=>{
            //     if(_r.date){
            //         monthData.push(_r)
            //     }
            // })

            // _data.map((_row,index)=>(
            //     Object.keys(columnkeyMap).map(function(key) {
            //       _row[columnkeyMap[key]] = _row[key]
            //     })
            //   ));

            this.setState({
                data : _data,
                calData : monthData,
                totalcount:window.localStorage.getItem('table_total')
            },()=>this.createTabel())
        }
    }

    handleShow = (status) => {
        this.setState({
            show : status
        })
    }

    render(){
        console.log("fdf",this.state)
        return (
            <div className="dashboard">
                <NavBar />
                <SideBar />
                <ScheduleFilterComponent data={this.state.data} handleFilter={(data)=>this.handleFilter(data)} func={(status)=>this.handleShow(status)} status={this.state.show} />
                {
                    // !this.state.show ?
                    // <DashboardSchedule data={this.state} telkikTable={this.state.telkikTable} updatelistsort={(sort,columnkey)=>this.updatelistsort(sort,columnkey)} updatelistpagenumsize={(PageSize, page_num)=>this.updatelistpagenumsize(PageSize, page_num)} />
                    // :
                    this.state.calData.length > 0 &&
                    <TkCalender data={this.state.calData} ActionPerform={(action,row)=>this.ActionPerform(action,row)}/>
                }
            </div>
        )
    }
}

export default withRouter(Schedule);