
import React, { Component } from 'react';
import $ from 'jquery'
import RightPopModalForm from './RightPopModalForm';

import { Button } from '@progress/kendo-react-buttons'
import services from '../../services';
import EntityDetails from './EntityDetails';

const queryString = require('query-string');
var moment = require('moment')
const dateFormat = "YYYY-MM-DD";

let defaultRequest = {
    "Filters": null,
    "SortBy": "",
    "IsSortTypeDESC": true,
    "IsPagination": false,
    "Page": 2,
    "PageSize": 2
};
const servicesMenuArray = [
    { "main": "Tx. Aguardente", name: "Taxas referentes à comercialização de aguardente" },
    { "main": "Tx. Vinhos", name: "Taxas referentes à comercialização de vinhos no mercado nacional, estrangeiro e vinho modificado" },
    { "main": "Selos e Cápsulas", name: "Compras de Selos e/ou Cápsulas" },
    { "main": "req. serviços", name: "Requisições de serviço" },
    { "main": "fiscalização", name: "Custos de fiscalização" },
    { "main": "medidas de intervenção", name: "Taxas referentes às Medidas de Intervenção" },
    { "main": "artigos diversos", name: "Artigos diversos", api: "" },
    { "main": "juros de mora", name: "Juros de Mora" },
    { "main": "observações", name: "Observações diversas" },
]

class RevenueEntityAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entity_details: this.props.entity_details
        }
    }

    componentDidMount() {
        this.getcurrencyList();
        this.getTaxList();
        this.getTransMethods();
        this.createState();
    }
    componentDidUpdate(preProp) {
        console.log("entity_details",this.props.entity_details)
        if (preProp.date !== this.props.date) {
            this.createState()
        }
    }

    createState = () => {
        if (this.props.entity_details && this.props.entity_details.billingAddress) {
            let billingAddress = [...this.props.entity_details.billingAddress]
            let billobj = null;
            billingAddress.map((_r, i) => {
                if (parseInt(_r.suggested) === 1)
                    billobj = _r;
            });
            this.setState({
                entity_details: this.props.entity_details,
                billing_address: billobj
            })
        }

    }

    getcurrencyList = async () => {
        let link = "Revenue/Currency/GetAll"
        let res = await services.apiCall.requestApi(link, defaultRequest);
        if (res) {
            this.setState({
                currency_list: res
            });
        }
    }
    getTaxList = async () => {
        let link = "Revenue/Tax/GetAll"
        let res = await services.apiCall.requestApi(link, defaultRequest);
        if (res) {
            this.setState({
                tax_list: res
            });
        }
    }
    getTransMethods = async () => {
        let link = "Revenue/TransactionMethod/GetAll"
        let res = await services.apiCall.requestApi(link, defaultRequest);
        if (res) {
            this.setState({
                TransMethods_list: res
            });
        }
    }


    getBillingAddress = () => {
        let billobj = { ...this.state.billing_address }
        if (billobj.address_line1) {
            return (
                <>
                    <p><strong>Morada: </strong>{billobj.address_line1 || ""} </p>
                    <p><strong>Localidade: </strong>{billobj.address_line2  || ""}</p>
                    <p><strong>Código Postal: </strong> {billobj.pin  || ""}</p>
                    <p><strong>Distrito: </strong> {billobj.desdis || ""}, <strong>Concelho: </strong> {billobj.descon || ""}, <strong>Freguesia: </strong> {billobj.desfrg || ""} </p>
                </>
            )
        }
        return (
            <></>
        )
    }

    closePopup = () => {
        $(".left-popup").trigger('click');
    }

    getEntityDetails = (id) => {
        if (this.props.getEntityDetails) {
            this.props.getEntityDetails(id)
        }

    }

    updateServiceslist=(list)=>{
        this.props.updateServiceslist(list)
    }
    updateNavDropdown = (action, pageName = "faturasRecibos", forfutureInvoice = 0) => {
        console.log("entityDetails", this.props.entity_details);
        const parsed = this.props.parsed;
        let popUpForm = (
            <RightPopModalForm
                closePopup={this.closePopup}
                date={new Date()}
                tab={action}
                userPage={this.props.userPage}
                pageName={pageName}
                forfutureInvoice={forfutureInvoice}
                optionMenuArray={servicesMenuArray}
                parsed={parsed}
                entity_details={this.props.entity_details}
                TransMethods_list={this.state.TransMethods_list}
                currency_list={this.state.currency_list}
                updateServiceslist={(list)=>this.updateServiceslist(list)}
                tax_list={this.state.tax_list}
                completeData={this.state.completeData}
                billing_address={this.state.billing_address || {}}
                getEntityDetails={(id) => this.getEntityDetails(id)}
                pageName={this.props.pageName}
                general_balance = {this.props.general_balance}
            />
        )
        this.setState({
            popUpForm
        })
        $("#revenuEntityactionpopupbutton").trigger("click");
    }


    render() {
        return (
            <div>
                {
                    this.props.entity_details && this.props.onlyEntityAction && this.props.entity_details.busEntidade && this.props.entity_details.busEntidade.nome &&
                    <>
                        {
                            <Button onClick={() => this.updateNavDropdown("Adicionar Movimento", this.state.name, 0)} primary={true} className="k-button btn-theme mr-2  k-primary">EfetuarVenda</Button>
                        }
                        {
                            <Button primary={true} onClick={() => this.updateNavDropdown('Add_Amount', this.state.name)} className="k-button btn-theme mr-2  k-primary">Depositor Efetuados</Button>
                        }
                        {
                            <Button onClick={() => this.updateNavDropdown("Adicionar Movimento", this.state.name, 1)} primary={true} className="k-button btn-theme mr-2  k-primary">Fdha de Caixa</Button>
                        }
                    </>

                }
                {
                    this.props.entity_details && !this.props.onlyEntityAction && this.props.entity_details.busEntidade && this.props.entity_details.busEntidade.nome &&
                    <div className="row">
                        {
                            this.props.entity_details.billingAddress && this.props.entity_details.billingAddress > 1 &&
                            <div className="col-md-12">
                                <div id="changeaddressNote">
                                    <span className="k-icon k-i-information"></span>  Selecione a morada de faturação
                                    </div>
                            </div>
                        }

                        <div className="tab-section col-md-2">
                            <div className="innerBox">
                                <div className="display-content">
                                    <p><strong>Entidade</strong></p>
                                    <p>{this.props.entity_details.busEntidade.nome}</p>
                                </div>
                            </div>
                        </div>
                        <div className="tab-section col-md-2">
                            <div className="innerBox">
                                <div className="display-content">
                                    <p><strong>Saldo atual</strong></p>
                                    {services.money.format(this.props.entity_details.currentEntityBalance)}
                                </div>
                            </div>
                        </div>
                        <div className="tab-section col-md-5">
                            <div className="innerBox active cursor-pointer">
                                <div className="display-content">
                                    <div className="row">
                                        <div className="col-md-9">
                                            {this.getBillingAddress()}
                                        </div>
                                        <div className="col-md-3">
                                            <Button primary={true} onClick={() => this.updateNavDropdown('Alterar', this.state.name)} className="k-button btn-theme mr-2  k-primary">Alterar</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tab-section col-md-3">
                            <EntityDetails 
                            entity={this.props.entity_details.busEntidade} 
                            onlyDetails={true} 
                            billobj={this.state.billing_address}
                            />
                        </div>
                        <div className="col-md-3">
                        {
                            this.props.Actionlist ?
                                <>
                                    {
                                        this.props.Actionlist.valor &&
                                        <Button primary={true} onClick={() => this.updateNavDropdown('Add_Amount', this.state.name)} className="k-button btn-theme mr-2  k-primary">Adicionar valor</Button>

                                    }
                                    {
                                        this.props.Actionlist.Movimento &&
                                        <Button onClick={() => this.updateNavDropdown("Adicionar Movimento", this.state.name, 0)} primary={true} className="k-button btn-theme mr-2  k-primary">Adicionar Movimento</Button>

                                    }
                                    {
                                        this.props.Actionlist.recibo &&
                                        <Button onClick={() => this.updateNavDropdown("Adicionar Movimento", this.state.name, 1)} primary={true} className="k-button btn-theme mr-2  k-primary">Criar recibo</Button>

                                    }
                                </> :
                                <>
                                    <Button primary={true} onClick={() => this.updateNavDropdown('Add_Amount', this.state.name)} className="k-button btn-theme mr-2  k-primary">Adicionar valor</Button>
                                    {/* <Button onClick={() => this.updateNavDropdown("Adicionar Movimento", this.state.name, 0)} primary={true} className="k-button btn-theme mr-2  k-primary">Adicionar Movimento</Button>
                                    <Button onClick={() => this.updateNavDropdown("Adicionar Movimento", this.state.name, 1)} primary={true} className="k-button btn-theme mr-2  k-primary">Criar recibo</Button> */}

                                </>


                        }
                        </div>

                    </div >
                }
                {
                    <div>
                        <button className="hidden" data-toggle="modal" data-target="#revenuEntityactionpopup" id="revenuEntityactionpopupbutton"></button>
                        <div className="modal left-popup" id="revenuEntityactionpopup">
                            <div className="modal-dialog modal-lg">
                                {
                                    this.state.popUpForm
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
export default RevenueEntityAction;