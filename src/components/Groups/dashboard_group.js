import React from 'react';
import DashboardGroupmodule from './dashboard_group_module';
import services from '../../services';
import { Link, withRouter } from 'react-router-dom';
import TablePagination from '../common/TablePagination';
import TableHeader from '../common/table_header';
import DeleteModal from '../common/delete_modal';
import Main from '../../Pages/Demo/main';
import { Button} from '@progress/kendo-react-buttons'
import Lang from '../../lang'
import $ from 'jquery'
import TlkTable from '../tlelrik/table/tlkTable';


const columnkeyMap={
  groupName:Lang.langCheck.langRequest("Group Name"), 
  noofUsers:Lang.langCheck.langRequest("No Of Users"),
  obzervations :Lang.langCheck.langRequest("Observation"),
  status :Lang.langCheck.langRequest("Status")
}


class DashboardGroup extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        data : [],
        grpID : '',
        telkikTable : "",
        totalcount:'0',
        SortBy:'ID',
        SortType:false,
        Paginate:false,
        Page:1,
        PageSize:10,
        Filters : null,
        popUpForm : ''
      }
    }

    componentDidMount() {
      this.createpayload();
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
          this.getGroupList(data);
      }   
      getFilters = (data) => {
          if(data){
              console.log("data",data)
              this.setState({
                  Filters : data
              },()=>this.createpayload())
          }else{
              console.log("data Else",data)
              this.setState({
                  Filters : null
              },()=>this.createpayload())
          }
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

    handleGrpID = (id) => {
      console.log("jhjhjhjh",id)
      this.setState({
        grpID : id,
      },()=>this.showPopUpForm(this.state.grpID))
    }

    columnlist = Object.keys(columnkeyMap).map(function(key) {
      return  {field:columnkeyMap[key],columnMenuType:'checkbox'}
   });

    createTabel = ()=>{
      let actionbuttons= {GroupEdit:true,Redirect:true,Delete:true}     
      console.log("DATA",this.state.data);
        // let telkikTable = <Main date={new Date()} deleteFunc={(id)=>this.handleDelete(id)} list={this.state.data} actionbuttons={actionbuttons} columnlist={this.columnlist} ActionPerform={(action,id)=>this.ActionPerform(action,id)}/>
        let telkikTable = <TlkTable date={new Date()} modulename={"group"} deleteFunc={(id)=>this.handleDelete(id)} list={this.state.data} actionbuttons={actionbuttons} columnlist={this.columnlist} ActionPerform={(action,id)=>this.ActionPerform(action,id)}/>
        this.setState({
          telkikTable : telkikTable
        })
     }
  
     ActionPerform = (action,row) => {
          if(action=='Redirect'){
              this.props.history.push({
                  pathname:"/admin_dashboard_permissions",
                  state:{groupName:row['groupName'],groupID:row['id']}  
              })
          }else if(action == 'GroupEdit'){
              this.handleGrpID(row.id)
              // $(".popup-overlay, .popup-content").addClass("active");
          }
      }

    handleDelete = async(id) => {
      let res = await services.apiCall.requestApi(`/Groups/Delete/${id}`,{},'post');
      if(res){
        this.createpayload();
      }
    }

    getGroupList = async (data) => {
      let _grp = await services.apiCall.requestApi('/Groups/AllGroups',data,'post');
      if(_grp){
        _grp.map((_row,index)=>(
          Object.keys(columnkeyMap).map(function(key) {
            _row[columnkeyMap[key]] = _row[key]
          })
        ));
        this.setState({
          data : _grp,
          totalcount:window.localStorage.getItem('table_total')
        },()=>this.createTabel())
        // $(".popup-overlay, .popup-content").removeClass("active")
      }
    }

    showPopUpForm = (id) => {
      console.log("this.state.grpid",id)
      let popUpForm = (
        <DashboardGroupmodule grpId={id} groupList={()=>this.createpayload()} />
      )
      this.setState({
        popUpForm
      })
    }


    render(){
        
        return (
           <div className="inner-container">
               <div className="outer-space">
               <div className="row">
               <div className="col-md-8 order-sm-1 order-2">
                  <div className="heading d-md-flex align-items-center">
                     {/* <img src="imgs/icon1_gray.png" alt=""/> */}
                     <span className={`sivdp-icon sivdp-users font-23 mr-3 ml-2 text-grey`}></span>
                    <h3>{Lang.langCheck.langRequest("Group")}</h3>
                     <Button onClick={()=>this.handleGrpID('')} primary={true} data-toggle="modal" data-target="#new-group" className="btn btn-theme mr-2 btn-sm">+ INSERIR</Button>
                    
                     <Button primary={true} className="btn btn-theme mr-2 btn-sm dropdown-toggle" data-toggle="dropdown">
                     {("Opções").toUpperCase()}
                     </Button>
                     <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">Opções</a>
                        <a className="dropdown-item" href="#">Opções</a>
                        <a className="dropdown-item" href="#">Opções</a>
                     </div>
                  </div>
                  <p className="custom-well">Início</p>
               </div>
              
            </div>
                
                {/* <div className="white-box  mb40">
                  <div className="row top-serch">
                     <div className="col-md-12 form-inline">
                        <div className="form-group">
                        <button onClick={()=>this.handleGrpID('')} className="btn btn-theme mr-4" data-toggle="modal" data-target="#new-group">ADD NEW GROUP</button>
                    </div>
                     </div>
                    </div>
                  </div> */}
                </div>
                <div className="container-fluid">
                   <div className="table-responsive table-section">
                    <h3> A pesquisa retornou { this.state.totalcount} resultados </h3>
                    { this.state.telkikTable}
                    {/* <table className="table table-hover">
                      <thead>
                        <tr>
                          <TableHeader columename='Group Name' columnkey='groupName' func={(sort,columnkey)=>this.updatelistsort(sort,columnkey)} />
                          <TableHeader className="text-center" columename='No. of Users' columnkey='noofUsers' func={(sort,columnkey)=>this.updatelistsort(sort,columnkey)} />
                          <TableHeader className="text-center" columename='Observations' columnkey='obzervations' func={(sort,columnkey)=>this.updatelistsort(sort,columnkey)} />
                          <TableHeader className="text-center" columename='Status' columnkey='status' func={(sort,columnkey)=>this.updatelistsort(sort,columnkey)} />
                          <th>Action </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.data.map((_g,i)=>(
                            <a onClick={()=>this.handleGrpID(_g.id)} data-toggle="modal" data-target="#new-group"><i className="fas fa-edit text-active" aria-hidden="true"></i></a>
                          })
                            <tr key={`row${i}`}>
                              <td>{_g.groupName}</td>
                              <td>{_g.noofUsers}</td>
                              <td>{_g.obzervations}</td>
                              {
                                _g.status === 'Active' ?
                                <td className="text-active">{_g.status}</td> 
                                :
                                <td className="text-inactive">{_g.status}</td>
                              }
                              <td>
                                <div className="action">
                                  <Link to={{pathname:'/admin_dashboard_permissions',state:{groupName:_g.groupName,groupID:_g.id}}} ><i className="fas fa-list text-yellow" aria-hidden="true"></i></Link>
                                  <a onClick={()=>this.handleGrpID(_g.id)} data-toggle="modal" data-target="#new-group"><i className="fas fa-edit text-active" aria-hidden="true"></i></a>
                                  <DeleteModal id={_g.id} handleDelete={(id)=>this.handleDelete(id)} />
                                </div>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table> */}
                    </div>
                </div>
                {
                  // this.state.popupShow &&
                <div className="modal fade" id="new-group">
                <div className="modal-dialog modal-dialog-centered">
                  {
                    this.state.popUpForm
                  }
                </div>
                </div>
                }
                {/* <div className="popup-overlay">
                  <div className="popup-content">
                      <DashboardGroupmodule grpId={this.state.grpID} groupList={()=>this.createpayload()} />
                  </div>
                  </div> */}
            </div>
        )
    }
}

export default withRouter(DashboardGroup);