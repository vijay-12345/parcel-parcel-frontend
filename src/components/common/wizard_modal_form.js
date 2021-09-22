import React from 'react';
import { DatePicker, Progress } from 'antd';
import SearchFilter from '../filters/SearchFilter';
import Main from '../../Pages/Demo/main';
import Lang from '../../lang'
import { toast } from 'react-toastify';
import { Input } from '@progress/kendo-react-inputs';
import services from '../../services';
import { Button } from '@progress/kendo-react-buttons'
import MatrixModalForm from './matrixArticleModalForm';
var moment = require('moment')

const filters = {
    Tabs: {
        Entidade: [
            {
                key: 'ivpdInstallmentNO',
                displayKey: "NparcelaIVPD",
                inputType: "text"
            },
            {
                key: 'cdInstallmentNO',
                displayKey: "NParcelaCd",
                inputType: "text"
            },
            {
                key: 'declaration',
                displayKey: "Declaracao",
                inputType: "text"
            }
        ]
    },
    checkbox: [
    ]
}

class WizardModalForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            telkikTable: "",
            Comment: '',
            moduleData: []
        }
    }

    componentDidMount() {
        this.setMainState()
    }
    componentDidUpdate(preProp) {
        if (preProp.date != this.props.date) {
            this.setMainState()
        }
    }
    setMainState = () => {
        console.log(this.props.moduledata);
        this.setState({
            data: this.props.data ? this.props.data : {},
            moduleData: this.props.moduledata
        });
    }



    handleDate = (e) => {
        let data = { ...this.state.data }
        data['startDate'] = e && e._d && moment(e._d).format('MM-DD-YYYY')
        this.setState({
            data
        })
    }

    handleChange = (e) => {
        let data = { ...this.state.data }
        data[e.target.name] = e.target.value

        this.setState({
            data
        })
    }

    Submitform = () => {
        let data = { ...this.state.data }
        let error=null;
        if (this.props.moduledata) {
            let index = (this.state.moduleData).length
            let dataarray = [...this.state.moduleData];
            dataarray[index] = data;
            console.log('this data:', data);

            if (data.pctcasta) {
                let castasum = 0;
                dataarray.map((_row, index) => {
                    castasum += parseInt(_row.pctcasta)
                });
                if (castasum > 100) {
                    toast.error("O valor total de castas não poderá ser superior a 100%")
                    return false;
                }
            }
            if(this.props.tab=="matrixArticle" && !(data.nrartigo>=0))
             error = {
                errors : {
                   "nrartigo" : ["nrartigo parte deve estar em Fração ou Inteiro"]
                } 
             }
            
             if (!error)
            this.props.getpopUpdata(dataarray, this.props.tab);
            else  
            services.errorCheck.error(error);

        } else {

            this.props.getpopUpdata(data, this.props.tab);
        }
        if (!error)
        this.props.closePopup();
    }

    getFilters() {
        return null;
    }

    handleFilter = (data) => {

    }

    handleComment = (e) => {
        this.setState({
            Comment: e.target.value
        })
    }

    handleChangeCasta = (e) => {
        let data = { ...this.state.data }
        data[e.target.name] = e.target.value;
        let Duro = {};
        let Casta = {};
        this.props.all_list.DouroPort.map((_row, index) => {
            if (parseInt(_row.duroid) === parseInt(e.target.value)) {
                Duro = _row
            }
        })
        this.props.all_list.Casta.map((_row, index) => {
            if (parseInt(_row.codcasta) === parseInt(data.codcasta)) {
                Casta = _row
            }
        })
        if(Casta.doporto==Casta.dodouro)
        {
            data.douroPort= Casta.doporto;
        }
        data.Estado = "A";
        data.dtact = Casta.dtact;
        data.hract = Casta.hract;
        data.usr = Casta.usr;
        data.wks = Casta.wks;
        data.idcor = Casta.idcor;
        data.idsinonimo = Duro.idsinonimo;
        data.st = Casta.st;
        data.disponivel = true;
        ///Not clear
        data.tipo = this.state.data.douroPort;
        data.predioarranque = "N/A";
        data.tipoha = "N/A";
        
        this.setState({
            data
        });
    }

    handleAuditSubmit = () => {
        if (this.props.handleAuditSubmit) {
            this.props.handleAuditSubmit(this.state.Comment, this.state.data[Lang.langCheck.langRequest("id")])
        }
    }



    render() {

        if (this.props.tab === "castaparc") {
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">Gerir Castas</h4>
                        <Button onClick={() => this.Submitform()} className="btn btn-success btn-sm text-uppercase mr-3">Guardar</Button>
                        <a href="#" onClick={() => this.props.closePopup()} className="remoove mr-2">CANCELAR</a>
                    </div>
                    <div className="modal-body">
                        <div className="details">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="input-box active-grey mb-2">
                                        {/* <label className="input-label">Casta</label>
                                 <input type="text" className="input-1" placeholder="Casta" />
                               */}
                                        <label className="input-label">Casta</label>
                                        <select className="custome-drop-down" value={this.state.data.codcasta || ""} name="codcasta" onChange={(e) => this.handleChangeCasta(e)}>
                                            <option value="">Selecione casta </option>
                                            {
                                                this.props.all_list.Casta &&
                                                this.props.all_list.Casta.map((_row, index) => (
                                                    <option value={_row.codcasta}>{_row.descasta}</option>
                                                ))
                                            }
                                        </select>
                                        {/* <Input
                                    type="text"
                                    style={{ width: "100%"}}
                                    className="input-1"
                                    name="casta" 
                                    value={this.state.data.casta || ""}
                                    label="Casta"
                                    onChange={(e)=>this.handleChange(e)}
                                /> */}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-box active-grey mb-2">
                                        <label className="input-label">Tipo Casta</label>
                                        <select className="custome-drop-down" value={this.state.data.douroPort || ""} name="douroPort" onChange={(e) => this.handleChange(e)}>
                                            <option value="">Selecione Tipo Casta </option>
                                            {
                                                this.props.all_list.DouroPort &&
                                                this.props.all_list.DouroPort.map((_row, index) => (
                                                    <option value={_row.duroid}>{_row.desduro}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-box active-grey mb-2">
                                        <label className="input-label">Cor</label>
                                        <select className="custome-drop-down" value={this.state.data.idcor || ""} name="idcor" onChange={(e) => this.handleChange(e)}>
                                            <option value="">Selecione Côr </option>
                                            {
                                                this.props.all_list.colors &&
                                                this.props.all_list.colors.map((_row, index) => (
                                                    <option value={_row.idcor}>{_row.descor}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="input-box active-grey mb-2">
                                        <label className="input-label">Sinônimos</label>
                                        <select className="custome-drop-down" value={this.state.data.idsinonimo || ""} name="idsinonimo" onChange={(e) => this.handleChange(e)}>
                                            <option value="">Selecione Sinônimos </option>
                                            {
                                                this.props.all_list.Sinonimo &&
                                                this.props.all_list.Sinonimo.map((_row, index) => (
                                                    <option value={_row.idsinonimo}>{_row.descasta}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-box active-grey mb-2">
                                        {/* <label className="input-label">Percentagem </label>
                                 <input type="text" className="input-1" placeholder="Enter Percentagem" /> */}
                                        <Input
                                            type="number"
                                            style={{ width: "100%" }}
                                            className="input-1"
                                            name="pctcasta"
                                            value={this.state.data.pctcasta || ""}
                                            label="Percentagem"
                                            onChange={(e) => this.handleChange(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-box active-grey mb-2">
                                        {/* <label className="input-label">Fator Castas </label>
                                 <input type="text" className="input-1" placeholder="Enter Fator Castas" /> */}
                                        <Input
                                            type="number"
                                            style={{ width: "100%" }}
                                            className="input-1"
                                            name="varietiesFactor"
                                            value={this.state.data.varietiesFactor || ""}
                                            label="Fator Castas"
                                            onChange={(e) => this.handleChange(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-box active-grey mb-2">
                                        {/* <label className="input-label">Fator Do Porto </label>
                                 <input type="text" className="input-1" placeholder="Enter Fator Do Porto" /> */}
                                        <Input
                                            type="number"
                                            style={{ width: "100%" }}
                                            className="input-1"
                                            name="portFactor"
                                            label="Fator DO Porto"
                                            value={this.state.data.portFactor || ""}
                                            onChange={(e) => this.handleChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        // else if (this.props.tab === 'legalFramework') {
        //     return (
        //         <MatrixModalForm data={this.state.data} />
        //     )
        // }
        else if (this.props.tab === 'Registo') {
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">Registo de alterações</h4>
                        <button type="button" onClick={() => this.handleAuditSubmit()} className="btn btn-success btn-sm text-uppercase mr-3">Guardar</button>
                        <a href="#" onClick={() => this.props.closePopup()} className="remoove mr-2">CANCELAR</a>
                    </div>
                    <div className="modal-body">
                        <div className="details">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <div className="input-box active-grey">
                                            <label className="input-label">Observações</label>
                                            <textarea onChange={(e) => this.handleComment(e)} className="form-control heigh-auto" rows="4" placeholder="enter Observações"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3>Ultima alterações</h3>
                            <div className="row">
                                <div className="col-md-6">
                                    <p>Versao</p>
                                    <h3>4</h3>
                                </div>
                                <div className="col-md-6">
                                    <p>Movimento</p>
                                    <h3>Alterações</h3>
                                </div>
                                <div className="col-md-12">
                                    <p>Observações</p>
                                    <h3>{this.state.data[Lang.langCheck.langRequest("Comment")] ? this.state.data[Lang.langCheck.langRequest("Comment")] : "N/A"}</h3>
                                </div>
                                <div className="col-md-12">
                                    <p>Origem</p>
                                    <h3>n/a</h3>
                                </div>
                                <div className="col-md-12">
                                    <p>Processo</p>
                                    <h3>13134</h3>
                                </div>
                                <div className="col-md-6">
                                    <p>Ano</p>
                                    <h3>2014</h3>
                                </div>
                                <div className="col-md-6">
                                    <p>Eencontro</p>
                                    <h3>{this.state.data[Lang.langCheck.langRequest("Date")]}</h3>
                                </div>
                                <div className="col-md-12">
                                    <p>Utilizador</p>
                                    <h3>{this.state.data[Lang.langCheck.langRequest("Username")]}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (this.props.tab === 'matrixArticle') {
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">Inserir Artigo Matricial</h4>
                        <button type="button" onClick={() => this.Submitform()} className="btn btn-success btn-sm text-uppercase mr-3">Guardar</button>
                        <a href="#" onClick={() => this.props.closePopup()} className="remoove mr-2">CANCELAR</a>
                    </div>
                    <div className="modal-body">
                        <div className="details">
                        <div className="col-md-6">
                             <div className="input-box active-grey mb-2">
                                        {/* <label className="input-label">Percentagem </label>
                                 <input type="text" className="input-1" placeholder="Enter Percentagem" /> */}
                                        <Input
                                            type="text"
                                            style={{ width: "100%" }}
                                            className="input-1"
                                            name="nrartigo"
                                            value={this.state.data.nrartigo || ""}
                                            label="Nº Artigo"
                                            onChange={(e) => this.handleChange(e)}
                                        />
                                    </div>
                                </div>

                              
                                <div className="col-md-6">
                                    <div className="input-box active-grey mb-2">
                                        {/* <label className="input-label">Fator Castas </label>
                                 <input type="text" className="input-1" placeholder="Enter Fator Castas" /> */}
                                        <Input
                                            type="text"
                                            style={{ width: "100%" }}
                                            className="input-1"
                                            name="fraccao"
                                            value={this.state.data.fraccao || ""}
                                            label="Fração"
                                            onChange={(e) => this.handleChange(e)}
                                        />
                                    </div>
                                </div>
                                
                             
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default WizardModalForm;