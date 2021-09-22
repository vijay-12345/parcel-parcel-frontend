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
const dateFormat = 'DD-MM-YYYY';

// codEstatuto  : "",
// currentAccount : false,
// description : "",
// moduleFiscalization : false, 
// moduleHarvard : false,
// moduleParcel : false,
// moduloConvocatoria : false,

const InputFieldsAll= {
    Detalhes:[
            // {
            //     key : "codEstatuto",
            //     type : "dropdown",
            //     display : Lang.langCheck.langRequest("Cod Estatuto")
            // },
            {
                key : "currentAccount",
                type : "checkbox",
                display : Lang.langCheck.langRequest("Conta Corrente")
            },
            {
                key : "moduleFiscalization",
                type : "checkbox",
                display : Lang.langCheck.langRequest("Módulo Fiscalização")
            },
            {
                key : "moduleHarvard",
                type : "checkbox",
                display : Lang.langCheck.langRequest("Módulo Fiscalização")
            },
            {
                key : "moduleParcel",
                type : "checkbox",
                display : Lang.langCheck.langRequest("Módulo Fiscalização")
            },
            {
                key : "moduloConvocatoria",
                type : "checkbox",
                display : Lang.langCheck.langRequest("Módulo Fiscalização")
            },
        ],
        Descrição : [
            {
                key : "description",
                type : "text",
                display : "Descrição"
            }
        ]
}

class EstatosDetailComponent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data : {},
            id:null
            // entityList : []
        }
    }

    componentDidMount() {
        console.log("hihguyft",this.props)
        if(this.props.id && this.props.id.location && this.props.id.location.state && this.props.id.location.state.estatos_id){
            this.getEstotusById(this.props.id.location.state.estatos_id)
        }
        // this.getEntityList()
    }


    // getEntityList = async () =>{
    //     let data = {
    //         modulename:"parcel"
    //     }
    //     let res = await services.apiCall.requestApi('/Entity/GetAll',data,'get');
    //     if(res){
    //         this.setState({
    //             entityList : res,
    //         })
    //     }
    // }

    createInputs(nevkey){
        // let id = this.props.id && this.props.id.location && this.props.id.location.state && this.props.id.location.state.estatos_id
        let inputs= this.props.InputFieldsAll[nevkey].map((row,i) =>{
            switch(row.type){
                // case "dropdown" :
                // return (
                //     <div className="col-md-3">
                //     <div className="input-box active-grey mt-3">
                //         <Select onChange={this.handleSelect} showSearch style={{width:"100%"}} placeholder={"Selecionar Entidade"} optionFilterProp='children' >
                //             {
                //                 this.state.entityList.map((_r,i)=>(
                //                     <Option key={i} value={_r.codEntidade}>{_r.nome}<br />{_r.nifap}</Option>
                //                 ))
                //             }
                //         </Select>
                //     </div>
                //  </div>
                // )
                // break;
                case "checkbox" : 
                return (
                    <div className="custom-control mt-3 ml-3 custom-checkbox">
                        <input type="checkbox" onChange={(e)=>this.handleCheck(e)} className="custom-control-input" id={`customCheck-${i}`} name={row.key} checked={this.state.data[row.key]}/>
                        <label className="custom-control-label" for={`customCheck-${i}`}>{row.display}</label>
                  </div>
                )
                break;
                default :
                return (
                    <div className="col-md-12">
                          <div className="input-box active-grey">
                           <Input
                                name={row.key}
                                type={row.type}
                                style={{ width: "100%" }}
                                className="input-1"
                                label={Lang.langCheck.langRequest(`${row.display}`)}
                                onChange={this.handleChange}
                                value={this.state.data[row.key]}
                            />
                          </div>
                    </div>
                )
            }
        });
        return inputs
    }

    // handleSelect = (value) => {
    //     let data = {...this.state.data}
    //     data['codEstatuto'] = value + ''
    //     this.setState({
    //         data
    //     })
    //  }

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

    getEstotusById = async (id) => {
        let estotusDetail = await services.apiCall.requestApi(`/Estatuto/${id}`,{},'get')
        console.log(estotusDetail)
        if(estotusDetail){
            // Object.keys(estotusDetail).map(_k => {
            //     if(_k === 'codEstatuto'){
            //         estotusDetail[_k] = Number(estotusDetail[_k])
            //     }
            // })
           this.setState({
               data : estotusDetail,
               id:id
           })
        }
    }

    handleChange = (e) => {
        let data = {...this.state.data}
        data[e.target.name] = e.target.value
        this.setState({
            data
        })
    }

    handleCheck = (e) => {
        let data = {...this.state.data}
        data[e.target.name] = e.target.checked
        this.setState({
            data
        })
    }

    handleSubmit = (e,backUrl) => {
        e.preventDefault();
        if(this.state.id){
            this.handleUpdateEstatuto(this.state.id,backUrl);
        }else{
            this.handleCreateEstuto(backUrl);
        }
    }

    handleUpdateEstatuto = async (id,backUrl) => {
        let data = {...this.state.data}
        console.log("update estitu",data,id)
        let res = await services.apiCall.requestApi(`/Estatuto/Edit/${id}`,data,'post')
        if(res){
            if(backUrl){
                this.props.history.push({
                    pathname : backUrl
                })
            }
        }
    }

    handleCreateEstuto = async (backUrl) => {
        let data = {...this.state.data}
        
        console.log("create estitu",data)

        let res = await services.apiCall.requestApi('/Estatuto/Create',data,'post')
        if(res){
           if(backUrl){
            this.props.history.push({
                pathname : '/admin_dashboard_estato'
            })
           }
        }
        
    }

    render(){
        console.log("state",this.state)
        return (
            <div className="dashboard">
            {
                (this.props.id && this.props.id.location && this.props.id.location.state && this.props.id.location.state.estatos_id) ?
                <FormNavbar to={'/admin_dashboard_estato'} handleSubmit={(e,url)=>this.handleSubmit(e,url)} type='auditing' headName="Editar Estatuto" />
                :
                <FormNavbar to={'/admin_dashboard_estato'} handleSubmit={(e,url)=>this.handleSubmit(e,url)} type='auditing' headName="Criar novo Estatuto" />
            }
            <div className="full-container edit-ward">
            <FormleftNev InputFieldsAll={InputFieldsAll}/>
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


export default withRouter(EstatosDetailComponent);