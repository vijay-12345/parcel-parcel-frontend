import React from 'react';
import services from '../../services';
import { withRouter } from 'react-router-dom';
import { DatePicker } from 'antd';
import TableHeader from '../common/table_header';
import TablePagination from '../common/TablePagination';
import DeleteModal from '../common/delete_modal';
import SearchFilter from '../filters/SearchFilter';
import Main from '../../Pages/Demo/main';
import Lang from '../../lang'
import TlkTable from '../tlelrik/table/tlkTable';


var moment = require('moment')

const dateFormat = "YYYY-MM-DD"

const filters={
  Tabs:{
      UserAssign:[
          {
              key : 'fullName',
              displayKey : ("Search By UserName"),
              inputType : "text"
          },
          {
              key : 'createdAt',
              displayKey : "Search By Date",
              inputType : "date"
          }
      ]
  },
  checkbox:[]
};

const columnkeyMap={
  fullName:Lang.langCheck.langRequest("Name"), 
  email:Lang.langCheck.langRequest("Email"),
  createdAt :Lang.langCheck.langRequest("Date of Creation"),
}

const columnkeyMap2={
  fullName:Lang.langCheck.langRequest("Name"), 
  email:Lang.langCheck.langRequest("Email"),
  grpDesc : Lang.langCheck.langRequest('Group Description'),
  createdAt : Lang.langCheck.langRequest("Date of Creation"),
}


class DashboardGroup extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        allUserData : [],
        grpUserList : [],
        filterAllUserData:[],
        telkikTable : '',
        telkikTable2 : '',
        UserName : '',
        Date : '',
        totalcount:'0',
        SortBy:'ID',
        SortType:false,
        Paginate:false,
        Page:1,
        PageSize:10,
        Filters : null,
        grpDesc:''
      }
    }

    componentDidMount() {
      this.createpayload();
      this.getGroupUsers();
    }

    createpayload = () =>{
      let  data ={
              Filters:this.state.Filters,
              SortBy:this.state.SortBy,
              IsSortTypeDESC:this.state.SortType,
              IsPagination:this.state.Paginate,
              Page:this.state.Page,
              PageSize:this.state.PageSize
          };
          this.getAllUsers(data);
      }   
      getFilters = (data) => {
          // if(data){
          //     console.log("data",data)
          //     this.setState({
          //         Filters : data
          //     },()=>this.createpayload())
          // }else{
          //     console.log("data Else",data)
          //     this.setState({
          //         Filters : null
          //     },()=>this.createpayload())
          // }
      }
  
      updatelistsort = (sort,key) => {
          this.setState({
              SortBy:key,
              SortType:sort
          },()=>this.createpayload())
      }
      updatelistpagenumsize = (PageSize, page_num) =>{
         
          this.setState({
              Page:page_num,
              PageSize:PageSize
          },()=>this.createpayload());
      }

    handleChange = (e) => {
      this.setState({
        [e.target.name] : e.target.value
      })
    }

    handleDate = (e) => {
      this.setState({
        Date : moment(e._d).format(dateFormat)
      })
    }

    handleSearch = () => {
      let data = {
        Date : this.state.Date,
        UserName : this.state.UserName
      }
      this.getFilters(data)
    }

    handleFilter=(data)=>{
      // let actionbuttons= {Edit:true,Redirect:false,Delete:true}    
      // let telkikTable = <TlkTable date={new Date()} modulename={"allUserList"} list={data} actionbuttons={actionbuttons} columnlist={this.columnlist} ActionPerform={(action,id)=>this.ActionPerform(action,id)}/>
      this.setState({
         telkikTable : null,
         filterAllUserData : data
      },()=>this.createTabel())
    }

    columnlist = Object.keys(columnkeyMap).map(function(key) {
      return  {field:columnkeyMap[key],columnMenuType:'checkbox'}
    });
    
    createTabel = ()=>{
      let actionbuttons= {Add:true,Edit:false,Redirect:false,Delete:false}     
      console.log("DATA",this.state.filterAllUserData);
        // let telkikTable = <Main date={new Date()} list={this.state.allUserData} actionbuttons={actionbuttons} columnlist={this.columnlist} ActionPerform={(action,id)=>this.ActionPerform(action,id)}/>
        let telkikTable = <TlkTable date={new Date()} modulename={"allUserList"} list={this.state.filterAllUserData} actionbuttons={actionbuttons} columnlist={this.columnlist} ActionPerform={(action,id)=>this.ActionPerform(action,id)}/>
        this.setState({
          telkikTable : telkikTable
        })
     }
    
     ActionPerform = (action,row) => {
          if(action=='Add'){
            this.handleAssignUserToGroup(row.id)
          }
      }

      columnlist2 = Object.keys(columnkeyMap2).map(function(key) {
        return  {field:columnkeyMap2[key],columnMenuType:'checkbox'}
      });
      
      createTabel2 = ()=>{
        let actionbuttons= {Edit:false,Redirect:false,Delete:true}     
        console.log("DATA11111",this.state.grpUserList);
          // let telkikTable2 = <Main date={new Date()} deleteFunc={(id)=>this.handleDeleteUserFromGroup(id)} list={this.state.grpUserList} actionbuttons={actionbuttons} columnlist={this.columnlist2} ActionPerform={(action,id)=>this.ActionPerform2(action,id)}/>
          let telkikTable2 = <TlkTable date={new Date()} modulename={"groupAssignUser"} deleteFunc={(id)=>this.handleDeleteUserFromGroup(id)} list={this.state.grpUserList} actionbuttons={actionbuttons} columnlist={this.columnlist2} ActionPerform={(action,id)=>this.ActionPerform2(action,id)}/>
          this.setState({
            telkikTable2 : telkikTable2
          })
       }
      
      ActionPerform2 = async  (action,row) => {
       
      }

    handleAssignUserToGroup = async (uId) => {
      let data = {
        GroupIds : this.props.location.state.groupID,
        UserID : uId
      }
      await services.apiCall.requestApi('/Groups/AssignUsertoGroup',data,'post');
      this.createpayload();
      this.getGroupUsers();
    }

    handleDeleteUserFromGroup = async (row) => {
      let data = {
        GroupIds : this.props.location.state.groupID,
        UserID : row.id
      }
      let res = await services.apiCall.requestApi('/Groups/DeleteUsertoGroup',data,'post')
      if(res){
        this.createpayload();
        this.getGroupUsers();
      }
    }

    handleUserList = () => {
      if(this.state.allUserData.length > 0 && this.state.grpUserList.length > 0){
        console.log("hii")
        let userData = []
        let grpUserId = this.state.grpUserList.map(_grp => {
          return _grp.id
        })
        for(let i=0;i<this.state.allUserData.length;i++){
          if(!grpUserId.includes(this.state.allUserData[i].id)){
            userData.push(this.state.allUserData[i])
          }
        }
        this.setState({
          allUserData : userData,
          filterAllUserData:userData,
          totalcount:userData.length
        },()=>this.createTabel())
      }
    }

    getGroupUsers = async () => {
      let grpId = this.props.location.state.groupID
      let grpUser = await services.apiCall.requestApi(`Groups/UsersByGroupID/${grpId}`,{},'post');
      if(grpUser){
        grpUser.users.map((_row,index)=>(
          Object.keys(columnkeyMap2).map(function(key) {
          if(key === 'createdAt'){
            _row[key] = moment(_row.createdAt).format(dateFormat)
          }
            _row[columnkeyMap2[key]] = _row[key]
          })
        ));
        console.log("....",grpUser.users)
        
        this.setState({
          grpUserList : grpUser.users,
          grpDesc: grpUser.groupDescription
        },()=>this.createTabel2(),
              this.createpayload())
      }
    }

    getAllUsers = async (data) => {
      let users = await services.apiCall.requestApi('/User/GetAll',data,'post');
      if(users){
        users.map((_row,index)=>(
          Object.keys(columnkeyMap).map(function(key) {
          if(key === 'createdAt'){
            _row[key] = moment(_row.createdAt).format(dateFormat)
          }
            _row[columnkeyMap[key]] = _row[key]
          })
        ));
        this.setState({
          allUserData : users,
          totalcount:window.localStorage.getItem('table_total')
        },()=>this.handleUserList()
        )
      }
    }

    render(){
        return (
           <div className="inner-container">
             <div className="outer-space">
              {/* <h2 className="heading-table">Add User to {this.props.location.state.groupName}</h2> */}
              <div className="row">
              <div className="col-md-8 order-sm-1 order-2">
                  <div className="heading d-md-flex align-items-center">
                      <span className="sivdp-icon sivdp-users font-23 mr-3 ml-2 text-grey"></span>
                      <h3>{this.props.location.state.groupName} {Lang.langCheck.langRequest("User Assign")}</h3>
                      {/* <Link to={'/create_user'} className="btn btn-theme mr-2 btn-sm">+ Inserir</Link > */}
                  
                      <button type="button" className="btn btn-theme mr-2 btn-sm dropdown-toggle" data-toggle="dropdown">
                      {("Opções").toUpperCase()}
                      </button>
                      {/* <button type="button" className="btn drop-down-black btn-primary dropdown-toggle" data-toggle="dropdown">
                      {("Opções").toUpperCase()}
                      </button> */}
                      <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">Opções</a>
                      <a className="dropdown-item" href="#">Opções</a>
                      <a className="dropdown-item" href="#">Opções</a>
                      </div>
                  </div>
                  <p className="custom-well">Início</p>
              </div>
              </div>
              <div className="mb-4">
                <SearchFilter filters={filters} handleFilter={(data)=>this.handleFilter(data)} data={this.state.allUserData} getFilter={(data)=>this.getFilters(data)} />
              </div>
              {/* <div className="white-box  mb40">
                <div className="row top-serch">
                   <div className="col-md-12 form-inline">
                     <div className="form-group ">
                        <input type="text" value={this.state.UserName} name="UserName" onChange={this.handleChange} className="form-control" placeholder="Enter User Name" />
                     </div>
                     <div className="form-group calender-field position-relative">
                        <DatePicker 
                          className="form-control"
                          size="middle"
                          name="Date"
                          placeholder="Search By Date"
                          onChange={this.handleDate}
                        />
                     </div>
                 
                  
                    <div className="form-group">
                      <button type="button" onClick={this.handleSearch} className="btn btn-theme mr-4">SEARCH</button>
                  </div>
                   </div>
                  
                  </div>
                </div> */}
              </div>
         
              <div className="container-fluid">
                <div className="table-responsive table-section">
                  {
                    this.state.telkikTable
                  }
                  {/* <table className="table table-hover">
                    <thead>
                      <tr>
                        <TableHeader columename='Name' columnkey='fullName' func={(sort,columnkey)=>this.updatelistsort(sort,columnkey)} />
                        <TableHeader className="text-center" columename='Email' columnkey='email' func={(sort,columnkey)=>this.updatelistsort(sort,columnkey)} />
                        <TableHeader className="text-center" columename='Date of Creation' columnkey='createdAt' func={(sort,columnkey)=>this.updatelistsort(sort,columnkey)} />
                        <th>Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.allUserData.length > 0 && this.state.allUserData.map((_u,i)=>(
                          <tr key={`row${i}`}>
                            <td>{_u.fullName}</td>
                            <td>{_u.email}</td>
                            <td>{moment(_u.createdAt).format("DD/MM/YYYY")}</td>
                            <td>
                              <div className="action">
                                <a onClick={()=>this.handleAssignUserToGroup(_u.id)}><i className="fas fa-plus-circle text-active"></i></a>
                              </div>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table> */}
                  {/* <div>
                    <TablePagination  totalcount={this.state.totalcount} PageSize={this.state.PageSize}  currentpage={this.state.Page} func={(PageSize, page_num)=>this.updatelistpagenumsize(PageSize, page_num)} />
                  </div> */}
                  </div>
                  <h2 className="heading-table mt-5 mb-4">{Lang.langCheck.langRequest("Users Assign to")} {Lang.langCheck.langRequest(`${(this.props.location.state.groupName).substring(0,5)}`) + " " +(this.props.location.state.groupName).substring(6,7) }</h2>
                 <div className="table-responsive table-section mb-4">
                   {
                     this.state.telkikTable2
                   }
                  {/* <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Group Description</th>
                        <th>Date of Creation</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.grpUserList.length > 0 && 
                        this.state.grpUserList.map((_gUser,i)=>(
                          <tr key={`row${i}`}>
                            <td>{_gUser.fullName}</td>
                            <td>{_gUser.email}</td>
                            <td>{this.state.grpDesc}</td>
                            <td>{_gUser.createdAt}</td>
                            <td>
                              <div className="action">
                                <DeleteModal id={_gUser.id} handleDelete={(id)=>this.handleDeleteUserFromGroup(id)} />
                              </div>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table> */}
                  </div>
              </div>
            </div>
        )
    }
}

export default withRouter(DashboardGroup);