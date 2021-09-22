import React from 'react';
import services from '../../services';
import SearchFilter from '../filters/SearchFilter';
import TableHeader from '../common/table_header';
import TablePagination from '../common/TablePagination';
import Main from '../../Pages/Demo/main';
import Lang from '../../lang'
import TitleBar from '../common/title_bar'
import TlkTable from '../tlelrik/table/tlkTable';
var moment = require('moment')


const filters={
  Tabs:{
      Audit:[
        {
            key : 'type',
            displayKey : "Module Type Search",
            inputType : "text"
        }
      ]
  },
  checkbox:[]
};

const columnkeyMap={
  activity:Lang.langCheck.langRequest("Activity"), 
  type:Lang.langCheck.langRequest("Type"),
  time :Lang.langCheck.langRequest("Time"),
  username :Lang.langCheck.langRequest("User"),
  date :Lang.langCheck.langRequest("Date")
}

class DashboardAudit extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      data : [],
      telkikTable:'',
      filterAuditData:[],
      totalcount:'0',
      SortBy:'id',
      SortType:false,
      Paginate:true,
      Page:1,
      PageSize:100,
      Filters : null
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
        this.getAuditList(data);
    }   
    getFilters = (data) => {
        // console.log("data",data)
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

    handleFilter=(data)=>{
      // let actionbuttons= {Edit:true,Redirect:false,Delete:true}    
      // let telkikTable = <Main date={new Date()} list={data} notAction={true} actionbuttons={actionbuttons} columnlist={this.columnlist} ActionPerform={(action,id)=>this.ActionPerform(action,id)}/>
      this.setState({
         telkikTable:null,
         filterAuditData:data
      },()=>this.createTabel())
  }

    handleDelete = async (id) => {
        let res = await services.apiCall.requestApi(`User/Delete/${id}`,'post')
        if(res){
            console.log("res",res)
            this.createpayload();
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

    columnlist = Object.keys(columnkeyMap).map(function(key) {
      return  {field:columnkeyMap[key],columnMenuType:'checkbox'}
   });

    createTabel = ()=>{
      let actionbuttons= {Edit:true,Redirect:false,Delete:true}     
      console.log("DATA",this.state.data);
        // let telkikTable = <Main date={new Date()} notAction={true} list={this.state.data} actionbuttons={actionbuttons} columnlist={this.columnlist} ActionPerform={(action,id)=>this.ActionPerform(action,id)}/>
        let telkikTable = <TlkTable date={new Date()} notAction={true} modulename={"auditList"} list={this.state.filterAuditData} actionbuttons={actionbuttons} columnlist={this.columnlist} ActionPerform={(action,id)=>this.ActionPerform(action,id)}/>
        this.setState({
          telkikTable : telkikTable
        })
     }
  
     ActionPerform = (action,row) => {
          if(action=='Edit'){
              this.props.history.push({
                  pathname:"/create_user",
                  state:{user_id : row.id}  
              })
          }
          // else if(action == 'Edit'){
            
          // }
      }

  getAuditList = async (data) => {
    let _r = await services.apiCall.requestApi('/auditlog/getall',data,'post');
    if(_r){
      _r.map((_row,index)=>(
        Object.keys(columnkeyMap).map(function(key) {
          if(key === 'time'){
            _row[key] = moment(_row.date).format('LTS')
          }else if(key === 'date'){
            _row[key] = moment(_row.date).format('DD-MM-YYYY')
          }
          _row[columnkeyMap[key]] = _row[key]
        })
      ));
      this.setState({
        data : _r,
        filterAuditData:_r,
        totalcount:window.localStorage.getItem('table_total')
      },()=>this.createTabel())
    }
  }

  render(){
      return (
          <div className="inner-container">
            <div className="outer-space">
            {/* <div className="row">
            <div className="col-md-8 order-sm-1 order-2">
                <div className="heading d-md-flex align-items-center">
                    <span className="sivdp-icon sivdp-auditing font-23 mr-3 ml-2 text-grey"></span>
                    <h3>{Lang.langCheck.langRequest("Audit")}</h3>
                    <button type="button" className="btn drop-down-black btn-primary dropdown-toggle" data-toggle="dropdown">
                    Opções
                    </button>
                    <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">Opções</a>
                    <a className="dropdown-item" href="#">Opções</a>
                    <a className="dropdown-item" href="#">Opções</a>
                    </div>
                </div>
                <p className="custom-well">Início</p>
            </div>
            </div> */}
            <TitleBar logo="auditing" title={Lang.langCheck.langRequest("Audit")} />
            <SearchFilter handleFilter={(data)=>this.handleFilter(data)} data={this.state.data} filters={filters} />
            {/* <h2 className="heading-table">Audit</h2> */}
            {/* <div className="white-box  mb40">
              <div className="row top-serch">
                  <div className="col-md-12 form-inline">
                    <div className="form-group ">
                      <input type="text" className="form-control" placeholder="Filter By Module" />
                    </div>
                  <div className="form-group">
                    <button className="btn btn-theme">APPLY</button>
                </div>
                <div className="form-group">
                  <button className="btn btn-black">CLEAR</button>
              </div>
                  </div>
                
                </div>
              </div> */}
            </div>
        
            <div className="container-fluid">
                {/* <h2 className="heading-table">Audit Logs</h2> */}
                <div className="table-responsive table-section">
                    <h3> A pesquisa retornou { this.state.totalcount} resultados </h3>
                    {
                      this.state.telkikTable
                    }
                  {/* <table className="table table-hover">
                    <thead>
                      <tr>
                        <TableHeader columename='Activity' columnkey='activity' func={(sort,columnkey)=>this.updatelistsort(sort,columnkey)} />
                        <TableHeader className="text-center" columename='Type' columnkey='type' func={(sort,columnkey)=>this.updatelistsort(sort,columnkey)} />
                        <TableHeader className="text-center" columename='Time' columnkey='time' func={(sort,columnkey)=>this.updatelistsort(sort,columnkey)} />
                        <TableHeader className="text-center" columename='User' columnkey='userID' func={(sort,columnkey)=>this.updatelistsort(sort,columnkey)} />
                        <TableHeader className="text-center" columename='Date' columnkey='date' func={(sort,columnkey)=>this.updatelistsort(sort,columnkey)} />
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.data.map((_a,i)=>(
                          <tr>
                            <td>{_a.activity}</td>
                            <td>{_a.type}</td>
                            <td>{moment(_a.date).format("LTS")}</td>
                            <td>{_a.userID}</td>
                            <td>{moment(_a.date).format("DD-MM-YYYY")}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table> */}
                  </div>
                  {/* <div className="mb-4">
                  <TablePagination  totalcount={this.state.totalcount} PageSize={this.state.PageSize}  currentpage={this.state.Page} func={(PageSize, page_num)=>this.updatelistpagenumsize(PageSize, page_num)} />
                  </div> */}
            </div>
        </div>
      )
  }
}

export default DashboardAudit;