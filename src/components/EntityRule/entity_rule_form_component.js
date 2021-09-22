import React from 'react';
import { DatePicker, Checkbox, Select } from 'antd';
import { toast } from 'react-toastify';
import services from '../../services';
import { withRouter } from 'react-router-dom';
import FormleftNev from '../common/FormleftNev';
import FormNavbar from '../common/wizard_navbar';
import Lang from '../../lang'
import { Input } from '@progress/kendo-react-inputs';
const moment = require('moment');

const {Option} = Select

let apiFilters ={
    Filters:null,
    SortBy:'ID',
    Page:1,
    PageSize:100,
    Filters : null,
    IsSortTypeDESC:false,
    IsPagination:false,
};

class EntityRuleFormComponent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            codEstatuto : [],
            codEntidade : 0,
            ruleList : [],
            entityList : [],
            codEntidadeName : ''
        }
    }

    componentDidMount() {
        console.log("hihguyft",this.props)
        if(this.props.id && this.props.id.location && this.props.id.location.state && this.props.id.location.state.entidade_id){
            this.getEntidadeById(this.props.id.location.state.entidade_id)
        }else{
            this.getEntityList()
        }
        this.getEstatutoList()
    }

    getEntityList = async () =>{
        let data = {
            modulename:"parcel"
        }
        let res = await services.apiCall.requestApi('/Entity/GetAll',data,'get');
        if(res){
            this.setState({
                entityList : res,
            })
        }
    }

    getEstatutoList = async () =>{
        let res = await services.apiCall.requestApi('/Estatuto/GetAll',apiFilters,'post');
        if(res){
            this.setState({
                ruleList : res,
            })
        }
    }

    createInputs(nevkey){
        let id = this.props.id && this.props.id.location && this.props.id.location.state && this.props.id.location.state.entidade_id
        let inputs= this.props.InputFieldsAll[nevkey].map((row,i) =>{
            switch(row.type){
                case "dropdown" :
                return (
                    <div className="col-md-12">
                    <div className="input-box active-grey mt-3">
                        <Select 
                            onChange={this.handleSelect} 
                            mode="multiple" 
                            showSearch 
                            style={{width:"100%"}} 
                            placeholder={"Selecionar Estatuto"} 
                            optionFilterProp='children'
                            value={this.state.codEstatuto}
                        >
                            {
                                this.state.ruleList.map((_r,i)=>(
                                    <Option key={i} value={_r.codEstatuto}>{_r.description}</Option>
                                ))
                            }
                        </Select>
                    </div>
                 </div>
                )
                break;
                default :
                if(id){
                    return (
                        <div className="col-md-12">
                              <div className="input-box active-grey">
                               <Input
                                    readOnly
                                    style={{ width: "100%" }}
                                    className="input-1"
                                    label="Nome da Entidade"
                                    value={this.state.codEntidadeName}
                                />
                              </div>
                        </div>
                    )
                }else{
                    return (
                        <div className="col-md-12">
                        <div className="input-box active-grey mt-3">
                            <Select 
                                onChange={this.handleEntitySelect}
                                showSearch
                                style={{width:"100%"}} 
                                placeholder={"Selecionar Entidade"} 
                                optionFilterProp='children' 
                            >
                                {
                                    this.state.entityList.map((_r,i)=>(
                                        <Option key={i} value={_r.codEntidade}>{_r.nome}</Option>
                                    ))
                                }
                            </Select>
                        </div>
                     </div>
                    )
                }
            }
        });
        return inputs
    }

    handleSelect = (value) => {
        console.log("Select Estatuto",value)
        this.setState({
            codEstatuto : value
        })
     }

     handleEntitySelect = (value) => {
        this.setState({
            codEntidade : value
        })
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

    getEntidadeById = async (id) => {
        let resp = await services.apiCall.requestApi(`/BusEntidadeEstatuto/GetByID/${id}`,{},'get')
        console.log(resp)
        if(resp){
           this.setState({
                codEntidadeName : resp.codEntidadeName,
                codEstatuto : resp.codEstatuto,
                codEntidade : resp.codEntidade
           })
        }
    }

    handleSubmit = (e,backUrl) => {
        e.preventDefault();
        if(this.props && this.props.id && this.props.id.location && this.props.id.location.state && this.props.id.location.state.entidade_id){
            this.handleUpdateEntityEstatutoList(this.props.id.location.state.entidade_id,backUrl);
        }else{
            this.handleCreateEntityEstatutoList(backUrl);
        }
    }

    handleUpdateEntityEstatutoList = async (id,backUrl) => {
        let data = {
            codEntidade : this.state.codEntidade,
            codEstatuto : this.state.codEstatuto,
        }
        let res = await services.apiCall.requestApi(`/BusEntidadeEstatuto/Edit`,data,'post')
        if(res){
            if(backUrl){
                this.props.history.push({
                    pathname : backUrl
                })
            }
        }
    }

    handleCreateEntityEstatutoList = async (backUrl) => {
        let data = {
            codEntidade : this.state.codEntidade,
            codEstatuto : this.state.codEstatuto,
        }
        let res = await services.apiCall.requestApi('/BusEntidadeEstatuto/Create',data,'post')
        if(res){
           if(backUrl){
            this.props.history.push({
                pathname : '/entity_rule_list'
            })
           }
        }
        
    }

    render(){
        console.log("state",this.state)
        return (
            <div className="dashboard">
            {
                (this.props.id && this.props.id.location && this.props.id.location.state && this.props.id.location.state.entidade_id) ?
                <FormNavbar to={'/entity_rule_list'} handleSubmit={(e,url)=>this.handleSubmit(e,url)} type='auditing' headName="Editar Regra da Entidade" />
                :
                <FormNavbar to={'/entity_rule_list'} handleSubmit={(e,url)=>this.handleSubmit(e,url)} type='auditing' headName="Criar novo Regra da Entidade" />
            }
            <div className="full-container edit-ward">
            <FormleftNev InputFieldsAll={this.props.InputFieldsAll}/>
            <div className="right-section">
                
                <div className="row top-serch">
                    {
                        this.createInputFields()
                    }
                </div>
                </div>
                </div>
            </div>
        )
    }
}


export default withRouter(EntityRuleFormComponent);