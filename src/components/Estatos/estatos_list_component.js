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
        Estatuto:[
            {
                key : 'moduleFiscalization',
                displayKey : "Procurar por Módulo Fiscalização",
                inputType : "text"
            },
            {
                key : 'moduleHarvard',
                displayKey : "Procurar por Módulo Vindima",
                inputType : "text"
            },
            {
                key : 'moduleParcel',
                displayKey : "Procurar por Módulo Parcela",
                inputType : "text"
            },
            {
                key : 'moduloConvocatoria',
                displayKey : "Procurar por Módulo Convocatoria",
                inputType : "text"
            }
        ]
    },
    checkbox:[]
};


const columnkeyMap={
    codEstatuto : "Cod Estatuto",
    description : "Descrição",
    currentAccount : "Conta Corrente",
    moduleFiscalization : "Módulo Fiscalização",
    moduleHarvard : "Módulo Vindima",
    moduleParcel : "Módulo Parcela", 
    moduloConvocatoria : "Módulo Convocatoria", 
  }

class EstotusListComponent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data : [],
            telkikTable : '',
            totalcount:'0',
            SortBy:'codEstatuto',
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
        this.getEstatosList(data);
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
        let res = await services.apiCall.requestApi(`/Estatuto/Delete/${row.codEstatuto}`,{},'post')
        if(res){
            console.log("res",row)
            this.createpayload();
        }
    }

    columnlist = Object.keys(columnkeyMap).map(function(key) {
        return  {field:columnkeyMap[key],columnMenuType:'checkbox'}
     });
  
      createTabel = ()=>{
        let actionbuttons= {Edit:true,Redirect:false,Delete:true}     
        console.log("DATA",this.state.data);
        //   let telkikTable = <Main date={new Date()} deleteFunc={(id)=>this.handleDelete(id)} list={this.state.data} actionbuttons={actionbuttons} columnlist={this.columnlist} ActionPerform={(action,id)=>this.ActionPerform(action,id)}/>
          let telkikTable = <TlkTable date={new Date()} modulename={"estatosList"} deleteFunc={(id)=>this.handleDelete(id)} list={this.state.filterData} actionbuttons={actionbuttons} columnlist={this.columnlist} ActionPerform={(action,id)=>this.ActionPerform(action,id)}/>
          this.setState({
            telkikTable : telkikTable
          })
       }
    
       ActionPerform = (action,row) => {
            if(action=='Edit'){
                console.log("row.codEstatuto",row)
                this.props.history.push({
                    pathname:"/estato_detail",
                    state:{estatos_id : row.codEstatuto}  
                })
            }
        }
    getEstatosList = async (data) => {
        let _user = await services.apiCall.requestApi('/Estatuto/GetAll',data,'post')
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
            <TitleBar path={'/estato_detail'} title="Estatuto" logo="auditing" />
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


export default withRouter(EstotusListComponent);