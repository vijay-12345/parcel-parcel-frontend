import React from 'react';
import { Link , withRouter } from 'react-router-dom';
import services from '../../services';
import { Select } from 'antd';
import Lang from '../../lang'
import { Button} from '@progress/kendo-react-buttons'

const {Option} = Select;

const data = {
  Filters:null,
  IsPagination:false,
  Page:0,
  PageSize:0,
  IsSortTypeDESC:false,
  SortBy:''
}

class DashboardGroup extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      grpList : [],
      grpIdSelect : '',
      permList : [],
      grpPermission : [],
      grpPerm : []
    }
  }

  componentDidMount() {
    this.getGroupList();
    this.getPermissionList();
    this.getGroupPermission();
  }

  handleChange = (e) => {
    console.log(e)
    // this.setState({
    //   grpIdSelect : e
    // })
    this.getGroupPermission(e)
  }

  handleCheck = (e,id,name) => {

    console.log("check",e.target.checked,name,id,e.target.name,name)
    let data = this.state.grpPerm
    if(!data[id]){
      data[id] = {
        permissionid:id,
        isRead:false, 
        isWrite:false,
        isUpdate:false, 
        isDelete:false
      }
    }
    data[id][name] = e.target.checked
    this.setState({
      grpPerm : data
    })
  }

  getGroupList = async () => {
    let res = await services.apiCall.requestApi('/Groups/AllGroups',data,'post')
    if(res){
      this.setState({
        grpList : res
      })
    }
  }

  getGroupPermission = async (id) => {
    let grpId = id ? id : this.props.location.state.groupID
    let grpPermission = await services.apiCall.requestApi(`/GroupPermission/PermissionsByGroupID/${grpId}`,data,'get')
    if(grpPermission){
      let data = {}
      if(grpPermission.length > 0){
        grpPermission.map((per)=>{
          data[per.permissionid] = per
        })
      }
      this.setState({
        grpPerm : data
      })
    }
  }

  handleSave = async () => {
      let permission = []
      Object.keys(this.state.grpPerm).map((_k)=>{
        permission.push(this.state.grpPerm[_k])
      })
      console.log(this.state.grpPerm,permission)
      let data = {
        permissionPermissions : permission,
        Groupid : this.props.location.state.groupID,
        AnotherGroup : []
      }
      
      let res = await services.apiCall.requestApi('/GroupPermission/Create',data,'post');
      if(res){
        this.props.history.push({
          pathname : "/admin_dashboard_groups"
        })
      }

  }

  handleRoute=() => {
    this.props.history.push({
      pathname : 'admin_dashboard_group_user',
      state : {
        groupName:this.props.location.state.groupName,
        groupID:this.props.location.state.groupID
      }
    })
  }

  getPermissionList = async () => {
    let res = await services.apiCall.requestApi('/Permission/GetAll',data,'post')
    if(res){
      this.setState({
        permList : res
      })
    }
  }
    render(){
        console.log("Permisssion",this.props)
        return (
           <div className="inner-container">
               <div className="outer-space">
               <div className="row">
                <div className="col-md-12 order-sm-1 order-2">
                    <div className="heading d-md-flex align-items-center">
                        <span className="sivdp-icon sivdp-users font-23 mr-3 ml-2 text-grey"></span>
                        <h3>{this.props.location.state.groupName}</h3>
                        <Button onClick={this.handleRoute} className="btn btn-theme mr-2 btn-sm">+ {(Lang.langCheck.langRequest("Assign")).toUpperCase()}</Button >
                        <div className="col-md-6 order-sm-1 order-2">
                          <Select 
                            className="col-md-6 order-sm-1 order-2"
                            size="middle"
                            showSearch
                            optionFilterProp={'children'}
                            onChange={this.handleChange}
                            placeholder={Lang.langCheck.langRequest("Select Group to Copy Permissions")}
                          >
                             {
                               this.state.grpList && this.state.grpList.map((_g,i)=>(
                                  _g.status === 'Active' &&
                                  <Option key={i} value={_g.id}>{_g.groupName}</Option>
                               ))
                             }
                          </Select>
                       </div>
                        {/* <button type="button" className="btn drop-down-black btn-primary dropdown-toggle" data-toggle="dropdown">
                        Opções
                        </button>
                        <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">Opções</a>
                        <a className="dropdown-item" href="#">Opções</a>
                        <a className="dropdown-item" href="#">Opções</a>
                        </div> */}
                    </div>
                    <p className="custom-well">Início</p>
                </div>
                </div>
                {/* <div className="white-box mt-4 mb40">
                  <div className="row top-serch">
                     <div className="col-md-10 form-inline">
                       <div className="form-group ">
                          <Select 
                            className="form-control"
                            size="middle"
                            mode="multiple"
                            onChange={this.handleChange}
                            placeholder="Select Group to Copy Permissions"
                          >
                             {
                               this.state.grpList && this.state.grpList.map((_g,i)=>(
                                  _g.status === 'Active' &&
                                  <Option key={i} value={_g.id}>{_g.groupName}</Option>
                               ))
                             }
                          </Select>
                       </div>
                 
                     </div>
                     <div className="col-md-2  creat-custom">
                      <Link to={{pathname:'/admin_dashboard_group_user',state:{groupName:this.props.location.state.groupName,groupID:this.props.location.state.groupID}}} className="btn btn-theme"><i className="fas fa-plus mr-1 font-14" aria-hidden="true"></i>ASSIGN USER</Link>
                     </div>
                    </div>
                  </div> */}
                </div>
           
                <div className="container-fluid">
                   {/* <h2 className="heading-table">{this.props.location.state.groupName} Description goes here</h2> */}
                   <div className="table-responsive table-section">
                    {/* <h3> A pesquisa retornou { this.state.totalcount} resultados </h3> */}
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>{Lang.langCheck.langRequest("Permissions")}</th>
                          <th>{Lang.langCheck.langRequest("Read")}</th>
                          <th>{Lang.langCheck.langRequest("Write")}</th>
                          <th>{Lang.langCheck.langRequest("Update")}</th>
                          <th>{Lang.langCheck.langRequest("Delete")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.permList.length > 0 && 
                          this.state.permList.map((_p,i)=>(
                            <tr key={`row${i}`}>
                              <td>{_p.name}</td>
                              <td>
                                <label>
                                  <input type='checkbox' checked={this.state.grpPerm[_p.id] ? this.state.grpPerm[_p.id].isRead : false} onChange={(e)=>this.handleCheck(e,_p.id,"isRead")}/>
                                </label>
                              </td>
                              <td>
                                <label>
                                  <input type="checkbox" checked={this.state.grpPerm[_p.id] ? this.state.grpPerm[_p.id].isWrite : false} onChange={(e)=>this.handleCheck(e,_p.id,'isWrite')}/>
                                </label>
                              </td>
                              <td>
                                <label>
                                  <input type="checkbox" checked={this.state.grpPerm[_p.id] ?this.state.grpPerm[_p.id].isUpdate : false} onChange={(e)=>this.handleCheck(e,_p.id,'isUpdate')} />
                                </label>
                              </td>
                              <td>
                                <label>
                                  <input type="checkbox" checked={this.state.grpPerm[_p.id] ? this.state.grpPerm[_p.id].isDelete : false} onChange={(e)=>this.handleCheck(e,_p.id,'isDelete')} />
                                </label>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                    </div>

                   <div className="row mb-3">
                     <div className="col-sm-12 text-center">
                          <button className="btn btn-theme mr-3" onClick={this.handleSave}>{Lang.langCheck.langRequest("SAVE")}</button>
                          <Link to='/admin_dashboard_groups' className="btn btn-black">{Lang.langCheck.langRequest("CANCEL")}</Link>
                     </div>
                   </div>
                </div>
              </div>
        )
    }
}

export default withRouter(DashboardGroup);