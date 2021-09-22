import React from 'react';
import services from '../../services';
import { Link, withRouter } from 'react-router-dom';
import TitleBar from '../common/title_bar'
import SearchFilter from '../filters/SearchFilter';
import Main from '../../Pages/Demo/main';
import Lang from '../../lang'
import TlkTable from '../tlelrik/table/tlkTable';

const filters={
    Tabs:{
        Entidade:[
            {
                key : 'codEntidadeName',
                displayKey : "Cod Nome da Entidade",
                inputType : "text"
            },
            {
                key : 'codEstatutoName',
                displayKey : "Cod Nome da Estatuto",
                inputType : "text"
            }
        ]
    },
    checkbox:[]
};


const columnkeyMap={
    codEntidadeName : "Cod Nome da Entidade",
    codEstatutoName : "Cod Nome da Estatuto",
  }

class EntityRuleListComponent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data : [],
            telkikTable : '',
            totalcount:'0',
            SortBy:'codEntidade',
            SortType:false,
            Paginate:true,
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
        this.getEntityRuleList(data);
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
        // let telkikTable = <Main date={new Date()} list={data} actionbuttons={actionbuttons} columnlist={this.columnlist} ActionPerform={(action,id)=>this.ActionPerform(action,id)}/>
        this.setState({
           telkikTable:null,
           filterData:data
        },()=>this.createTabel())
    }

    handleDelete = async (row) => {
        let res = await services.apiCall.requestApi(`/BusEntidadeEstatuto/Delete/${row.codEntidade}`,{},'post')
        if(res){
            console.log("res",res)
            this.createpayload();
        }
    }

    columnlist = Object.keys(columnkeyMap).map(function(key) {
        return  {field:columnkeyMap[key],columnMenuType:'checkbox'}
     });
  
      createTabel = ()=>{
        let actionbuttons= {Edit:true,Redirect:false,Delete:true}     
        console.log("DATA",this.state.filterData);
        //   let telkikTable = <Main date={new Date()} deleteFunc={(id)=>this.handleDelete(id)} list={this.state.filterData} actionbuttons={actionbuttons} columnlist={this.columnlist} ActionPerform={(action,id)=>this.ActionPerform(action,id)}/>
          let telkikTable = <TlkTable date={new Date()} modulename={"entityRule"} deleteFunc={(id)=>this.handleDelete(id)} list={this.state.filterData} actionbuttons={actionbuttons} columnlist={this.columnlist} ActionPerform={(action,id)=>this.ActionPerform(action,id)}/>
          this.setState({
            telkikTable : telkikTable
          })
       }
    
       ActionPerform = (action,row) => {
            if(action=='Edit'){
                console.log("row.codEntidade",row)
                this.props.history.push({
                    pathname:"/entity_rule_form",
                    state:{entidade_id : row.codEntidade}  
                })
            }
        }
    getEntityRuleList = async (data) => {
        let _user = await services.apiCall.requestApi('/BusEntidadeEstatuto/GetAll',data,'post')
        if(_user){
            _user.map((_row,index)=>(
                Object.keys(columnkeyMap).map(function(key) {
                  _row[columnkeyMap[key]] = _row[key]
                })
              ));
            this.setState({
                data : _user,
                filterData : _user,
                totalcount:window.localStorage.getItem('table_total')
            },()=>this.createTabel())
        }
    }

    render(){
        console.log("hjdsdk",this.state.Filters)
        return (
            <div className="inner-container">
            <div className="outer-space">
            <TitleBar path={'/entity_rule_form'} title="Regras da Entidade" logo="auditing" />
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


export default withRouter(EntityRuleListComponent);