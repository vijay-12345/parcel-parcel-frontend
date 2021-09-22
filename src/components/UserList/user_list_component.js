import React from 'react';
import services from '../../services';
import UserListFilterComponent from './user_list_filter_component';
import { Link, withRouter } from 'react-router-dom';
import TablePagination from '../common/TablePagination';
import TableHeader from '../common/table_header';
import DeleteModal from '../common/delete_modal';
import TitleBar from '../common/title_bar'
import SearchFilter from '../filters/SearchFilter';
import Main from '../../Pages/Demo/main';
import Lang from '../../lang'
import TlkTable from '../tlelrik/table/tlkTable';
var moment = require('moment')


const filters={
    Tabs:{
        Utilizador:[
            {
                key : 'name',
                displayKey : "Search By Name",
                inputType : "text"
            },
            {
                key : 'email',
                displayKey : "Search By Email",
                inputType : "text"
            },
            {
                key : 'lastLoginDate',
                displayKey : "Search By Date",
                inputType : "date"
            }
        ]
    },
    checkbox:[]
};


const format1 = "DD/MM/YYYY HH:mm:ss"


const columnkeyMap={
    name:Lang.langCheck.langRequest("Name"), 
    email:Lang.langCheck.langRequest("Email"),
    status :Lang.langCheck.langRequest("Status"),
    lastLoginDate :Lang.langCheck.langRequest("Last Login Date"),
  }

class UserListComponent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data : [],
            telkikTable : '',
            totalcount:'0',
            SortBy:'ID',
            SortType:false,
            Paginate:false,
            Page:1,
            PageSize:100,
            Filters : null,
            filterData : []
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
        this.getUserList(data);
    }   
    getUserList = async (data) => {
        let _user = await services.apiCall.requestApi('User',data,'get')
        if(_user){
            _user.map((_row,index)=>(
                Object.keys(columnkeyMap).map(function(key) {
                  _row[columnkeyMap[key]] = _row[key]
                    if(key === 'lastLoginDate' && _row[key]){
                       _row[columnkeyMap[key]] = moment(_row[key]).format(format1)
                    }
                })
              ));
            this.setState({
                data : _user,
                filterData : _user,
                totalcount:window.localStorage.getItem('table_total')
            },()=>this.createTabel())
        }
    }
    
    getFilters = (data) => {
       return null
    }

    handleFilter=(data)=>{
        this.setState({
            telkikTable:null,
            filterData : data
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
          let telkikTable = <TlkTable date={new Date()} modulename={"userList"} deleteFunc={(id)=>this.handleDelete(id)} list={this.state.filterData} actionbuttons={actionbuttons} columnlist={this.columnlist} ActionPerform={(action,id)=>this.ActionPerform(action,id)}/>
          this.setState({
            telkikTable : telkikTable
          })
       }
    
       ActionPerform = (action,row) => {
            if(action=='Edit'){
                this.props.history.push({
                    pathname:"/create_user?id="+row.id,
                    state:{user_id : row.id}  
                })
            }
        }

    render(){
        console.log("hjdsdk",this.state.Filters)
        return (
            <div className="inner-container">
            <div className="outer-space">
            <TitleBar path={'/create_user'} title="Utilizadores" logo="user" noOption={true}/>
            <SearchFilter filters={filters} handleFilter={(data)=>this.handleFilter(data)} data={this.state.data} getFilter={(data)=>this.getFilters(data)} />
            <div className="table-responsive table-section">
                <h3> A pesquisa retornou { this.state.totalcount} resultados </h3>
                {
                    this.state.telkikTable
                }
            </div>
            </div>
            </div>
        )
    }
}


export default withRouter(UserListComponent);