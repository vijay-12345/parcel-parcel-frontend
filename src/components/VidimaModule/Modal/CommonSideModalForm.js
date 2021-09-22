import React from 'react';
import SearchFilter from '../../filters/SearchFilter';
import services from '../../../services';
import Main from '../../../Pages/Demo/main';
import VindimaTransferencia from './vindima_transferencia';
import { Input } from '@progress/kendo-react-inputs';
import VindimaDesdobrar from './vindima_Desdobrar';
import { Calendar } from 'react-calendar';
import { DatePicker, Select } from 'antd'
import CalenderModal from '../../common/CalenderModal';
import EntityFilter from '../../common/EntityFilter';
import TlkTable from '../../tlelrik/table/tlkTable';
import $ from 'jquery'
import SecondPopup from '../../modules/SecondPopup';
import EntityAddresses from '../../EntityAddresses';
var moment = require('moment')
const dateFormat = "YYYY-MM-DD";
const { RangePicker } = DatePicker

const { Option } = Select

const listdefaultRequest = { "Filters": null, "SortBy": "", "IsSortTypeDESC": false, "IsPagination": false, "Page": 1, "PageSize": 100 }

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

const tabDetailArray = {
    'Payment details': {
        telrikApi: '/Vindima/paymentdetails/getall',
        filters: {
            Tabs: {
                "Detalhes de pagamentos": [
                    {
                        key: 'base',
                        displayKey: "Base",
                        inputType: "text"
                    }
                ]
            },
            checkbox: []
        },
        columnkeyMap: {
            "n_ficheiro": "Nº ficheiro",
            "ficheiro": "ficheiro",
            "entr": "entr",
            "tipo_Prd": "Tipo Prd",
            "valor_a_pagar": "valor a pagar",
            "base": "Base"
        },
        actionbuttons: { Edit: false, Redirect: false, Delete: false, detailPopUp: false },
        listdefaultRequest: listdefaultRequest,
        popUpHeadingFirst: "Detalhes de pagamentos",
        requestMethod: "post",
        popUpHeadingsecond: "Lorem Ipsom",
        groupfield: []
    },
    'Register Movement': {
        telrikApi: '/Vindima/RegisterMovements/getall',
        filters: {
            Tabs: {
                "Consultar movimentos do registo": [
                    {
                        key: 'base',
                        displayKey: "Base",
                        inputType: "text"
                    }
                ]
            },
            checkbox: []
        },
        columnkeyMap: {
            "n_viticultor": "n viticultor",
            "tipo_Prd": "Tipo Prd",
            "base": "Base",
            "valor_a_pagar": "valor a pagar",
            "valor_retido": "valor retido",
            "quantidade": "Quantidade",
            "valor_pipa": "valor pipa",
            "valor_pago": "valor pago",
            "outros_pagamentos": "outros pagamentos"
        },
        actionbuttons: { Edit: false, Redirect: false, Delete: false, detailPopUp: false },
        listdefaultRequest: listdefaultRequest,
        popUpHeadingFirst: "Consultar movimentos do registo",
        requestMethod: "post",
        popUpHeadingsecond: "Ficheiro",
        groupfield: []
    },
    'File Detail': {
        telrikApi: '/Vindima/FileDetail/GetAll',
        filters: {
            Tabs: {
                "Detalhes de pagamentos": [
                    {
                        key: 'nome',
                        displayKey: "Nome",
                        inputType: "text"
                    }
                ]
            },
            checkbox: []
        },
        columnkeyMap: {
            "nome": "Nome",
            "n_vit": "n vit",
            "nib": "Nib",
            "valor_a_pagar": "valor a pagar",
            "n_carta": "n carta",
            "estado": "Estado"
        },
        actionbuttons: { Edit: false, Redirect: false, Delete: false, detailPopUp: false },
        listdefaultRequest: listdefaultRequest,
        popUpHeadingFirst: "Detalhes de pagamentos",
        requestMethod: "post",
        popUpHeadingsecond: "Ficheiro",
        groupfield: []
    },
    'Payment File details': {
        telrikApi: '/Vindima/PaymentFileDetail/getall',
        filters: {
            Tabs: {
                " Detalhes do ficheiro": [
                    {
                        key: 'nome_ficheiro',
                        displayKey: "Nome ficheiro",
                        inputType: "text"
                    }
                ]
            },
            checkbox: []
        },
        columnkeyMap: {
            "n_vit": "Nº vit",
            "nome_ficheiro": "Nome ficheiro",
            "entr": "Entr",
            "tipo_Prd": "Tipo Prd",
            "valor_a_pagar": "valor a pagar",
            "quant": "Quant",
            "v_pipa": "v pipa",
            "v_pago": "v pago",
            "outros_pag": "Outros pag",
            "data_pag": "Data pag",
            "estado": "Estado"
        },
        actionbuttons: { Edit: false, Redirect: false, Delete: false, detailPopUp: false },
        listdefaultRequest: listdefaultRequest,
        popUpHeadingFirst: "Detalhes de ficheiro",
        requestMethod: "post",
        popUpHeadingsecond: "Ficheiro",
        groupfield: [
            { field: "Data pag" },
            { field: "Estado" }
        ]
    },
    'year_wise_detail': {
        telrikApi: '/Vindima/InformationYear/GetAll',
        listdefaultRequest: listdefaultRequest,
        popUpHeadingFirst: "Informação de totais por ano",
        popUpHeadingsecond: "Valores totais a pagar",
        requestMethod: "post",
    },
    'Dados do registo pré-selecionados': {
        telrikApi: '/Vindima/TransferProducer/Tipo',
        listdefaultRequest: listdefaultRequest,
        popUpHeadingFirst: "Dados do registo pré-selecionados",
        popUpHeadingsecond: "Valores totais a pagar",
        requestMethod: "post",
    },
    'Desdobrar transferência': {
        telrikApi: '/Vindima/InformationYear/GetAll',
        listdefaultRequest: listdefaultRequest,
        popUpHeading: "Desdobrar transferência",
        popUpHeadingsecond: "Valores totais a pagar",
        requestMethod: "post",
    },
    'Registar impressão manualmente': {
        telrikApi: '/Vindima/InformationYear/GetAll',
        listdefaultRequest: listdefaultRequest,
        popUpHeading: "Registar impressão manualmente",
        popUpHeadingsecond: "Valores totais a pagar",
        requestMethod: "post",
    },
    'Consultar Conta': {
        telrikApi: '/Revenue/EntityTransactionDetails',
        columnkeyMap: {
            "codart": "Tipo",
            "trans_no": "Referência",
            "desart": "Descrição",
            "trans_date": "Data",
            "quantidade": "Quantidade",
            "unidade": "Unidade",
            "un": "Valor Unit",
            "valor": "Valor",
            "iva": "Iva",
            "taxa_rate": "Taxa iva",
            "valor_cativo": "Valor Cat",
            "contab": "Contab"
        },
        tooltips: {
            "Valor Unit": "Valor Unitário",
            "Valor Cat": "Valor Cativo",
            "Contab": "Código Contabilístico"
        },
        notGroup: true,
        noDownloadButton: true,
        actionbuttons: { Edit: false, Redirect: false, Delete: false, commonPopup:"Complete Details" },
        listdefaultRequest: listdefaultRequest,
        popUpHeadingFirst: "Informação detalhada do documento",
        popUpHeadingsecond: "Valores totais a pagar",
        requestMethod: "post",
    },
    'Faturas pendentes': {
        telrikApi: '/Revenue/EntityTransactionDetails',
        columnkeyMap: {
            "codart": "Tipo",
            "trans_no": "Referência",
            "desart": "Descrição",
            "trans_date": "Data",
            "quantidade": "Quantidade",
            "unidade": "Unidade",
            "un": "Valor Unit",
            "valor": "Valor",
            "iva": "Iva",
            "taxa_rate": "Taxa iva",
            "valor_cativo": "Valor Cat",
            "contab": "Contab"
        },
        tooltips: {
            "Valor Unit": "Valor Unitário",
            "Valor Cat": "Valor Cativo",
            "Contab": "Código Contabilístico"
        },
        notGroup: true,
        noDownloadButton: true,
        actionbuttons: { Edit: false, Redirect: false, Delete: false, detailPopUp: false },
        listdefaultRequest: listdefaultRequest,
        popUpHeadingFirst: "Informação detalhada da fatura",
        popUpHeadingsecond: "Valores totais a pagar",
        requestMethod: "post",
    },
    'Instalações vínicas': {
        telrikApi: '/Vindima/paymentdetails/getall',
        columnkeyMap: {
            "n_ficheiro": "Nº ficheiro",
            "ficheiro": "ficheiro",
            "entr": "entr",
            "tipo_Prd": "Tipo Prd",
            "valor_a_pagar": "valor a pagar",
            "base": "Base"
        },
        actionbuttons: { Edit: false, Redirect: false, Delete: false, detailPopUp: false },
        listdefaultRequest: listdefaultRequest,
        popUpHeadingFirst: "Instalações vínicas",
        requestMethod: "post",
        popUpHeadingsecond: "Lorem Ipsom",
        groupfield: []
    },
    'Destinos declarados por produto': {
        telrikApi: '/Vindima/paymentdetails/getall',
        columnkeyMap: {
            "n_ficheiro": "Nº ficheiro",
            "ficheiro": "ficheiro",
            "entr": "entr",
            "tipo_Prd": "Tipo Prd",
            "valor_a_pagar": "valor a pagar",
            "base": "Base"
        },
        actionbuttons: { Edit: false, Redirect: false, Delete: false, detailPopUp: false },
        listdefaultRequest: listdefaultRequest,
        popUpHeadingFirst: "Destinos declarados por produto",
        requestMethod: "post",
        popUpHeadingsecond: "Lorem Ipsom",
        groupfield: [
            { field: 'ficheiro' },
            { field: 'entr' }
        ]
    },
    'Detalhes movimento': {
        telrikApi: '/Vindima/paymentdetails/getall',
        columnkeyMap: {
            "n_ficheiro": "Nº ficheiro",
            "ficheiro": "ficheiro",
            "entr": "entr",
            "tipo_Prd": "Tipo Prd",
            "valor_a_pagar": "valor a pagar",
            "base": "Base"
        },
        actionbuttons: { Edit: false, Redirect: false, Delete: false, detailPopUp: false },
        listdefaultRequest: listdefaultRequest,
        popUpHeadingFirst: "Detalhes movimento",
        requestMethod: "post",
        popUpHeadingsecond: "Lorem Ipsom",
        groupfield: []
    },
    'Preço de Vindima (Detalhe por Entidade)': {
        telrikApi: '/Vindima/paymentdetails/getall',
        columnkeyMap: {
            "n_ficheiro": "Nº ficheiro",
            "ficheiro": "ficheiro",
            "entr": "entr",
            "tipo_Prd": "Tipo Prd",
            "valor_a_pagar": "valor a pagar",
            "base": "Base"
        },
        actionbuttons: { Edit: false, Redirect: false, Delete: false, detailPopUp: false },
        listdefaultRequest: listdefaultRequest,
        popUpHeadingFirst: "Preço de Vindima (Detalhe por Entidade)",
        requestMethod: "post",
        popUpHeadingsecond: "Lorem Ipsom",
        groupfield: []
    },
    'Comentários associados': {
        telrikApi: '/Vindima/paymentdetails/getall',
        columnkeyMap: {
            "n_ficheiro": "Nº ficheiro",
            "ficheiro": "ficheiro",
            "entr": "entr",
            "tipo_Prd": "Tipo Prd",
            "valor_a_pagar": "valor a pagar",
            "base": "Base"
        },
        actionbuttons: { Edit: false, Redirect: false, Delete: false, detailPopUp: false },
        listdefaultRequest: listdefaultRequest,
        popUpHeadingFirst: "Comentários associados",
        requestMethod: "post",
        popUpHeadingsecond: "Lorem Ipsom",
        groupfield: []
    },
    'Sinalizar': {
        flagcolors: {
            Nenhum: "", Verde: "green", Azul: "blue", Amarelo: "yellow", Vermelho: "red"
        }
    },
    "Alterar prazo de pagamento": {

    },
    "Processar fatura": {

    },
    "Credit Details":{
        popUpHeadingFirst : "Detalhe movimento (crédito)"

    }

}


class VindimaModalForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            listData: [],
            popUpDetail: {},
            filterData: {},
            popUpForm:{},
            telkikTable: "",
            propRow: {},
            tipoList: [],
            entity_details: {
                busEntidade: {},
                billingAddress: [],
                captive_balance: null,
                accumulated_previous: null,
                currentEntityBalance: null
            },
            Calendardate: null,
            remove_tax: null

        }
    }

    componentDidMount() {
        this.setMainState()
    }
    componentDidUpdate(preProp) {
        if (preProp.date !== this.props.date) {
            this.setMainState()
        }
    }


    setMainState = () => {

        let popUpDetail = tabDetailArray[this.props.tab]
        this.setState({
            popUpDetail,
            telkikTable: "",
            propRow: this.props.data ? this.props.data : this.props.row ? this.props.row : {}
        }, () => {
            this.getPopUpListData()
        })
    }

    getEntityDetails = async (entity_id) => {
        let Request = {};
        let Calendardate = this.props.data.deadline_date ? this.props.data.deadline_date : this.props.data.issue_date_time
        Calendardate = moment(Calendardate).format(dateFormat);
        Request.entityId = parseInt(entity_id);
        let link = "/Revenue/getEntityDetail"
        let res = await services.apiCall.requestApi(link, Request);
        if (res) {
            this.setState({
                Calendardate: Calendardate,
                entity_details: res
            }, () => this.getSpecificTransection());
        }
    }



    getPopUpListData = async () => {
        console.log("tab name", this.props.tab)
        if (this.props.tab === "Consultar Conta"
            || this.props.tab === "Faturas pendentes"
            || this.props.tab === "Alterar prazo de pagamento"
            || this.props.tab === "Sinalizar"
            || this.props.tab === "Processar fatura"
        ) {
            this.getEntityDetails(this.props.data.busEntidade.nifap);
        } else if (this.state.popUpDetail && this.state.popUpDetail.listdefaultRequest) {
            let Request = this.state.popUpDetail.listdefaultRequest;
            let method = this.state.popUpDetail.requestMethod;
            let link = this.state.popUpDetail.telrikApi;
            let res = await services.apiCall.requestApi(link, Request, method)
            if (res) {
                if (this.state.popUpDetail.columnkeyMap) {
                    let columnkeyMap = this.state.popUpDetail.columnkeyMap;
                    res.map((_row, index) => (
                        Object.keys(columnkeyMap).map(function (key) {
                            _row[columnkeyMap[key]] = _row[key]
                        })
                    ));
                    this.setState({
                        data: res,
                        filterData: res,
                        totalcount: window.localStorage.getItem('table_total')
                    }, () => this.createTabel())
                } else {
                    if (this.props.tab === 'Dados do registo pré-selecionados') {
                        this.setState({
                            tipoList: res,
                            totalcount: window.localStorage.getItem('table_total')
                        })
                    } else {
                        this.setState({
                            listData: res,
                            totalcount: window.localStorage.getItem('table_total')
                        })
                    }
                }
            }
        }
    }


    handleFilter = (data) => {
        this.setState({
            filterData: data
        }, () => this.createTabel())
    }

    createTabel = () => {
        if (!this.state.popUpDetail.columnkeyMap)
            return;
        let actionbuttons = this.state.popUpDetail.actionbuttons;
        let columnkeyMap = this.state.popUpDetail.columnkeyMap;
        let columnlist = Object.keys(columnkeyMap).map(function (key) {
            return { field: columnkeyMap[key], columnMenuType: 'checkbox' }
        });
        let data = this.state.filterData;
        let telkikTable =
            <TlkTable
                date={new Date()}
                groupfield={this.state.popUpDetail.groupfield}
                notAction={this.state.popUpDetail.notAction}
                noDownloadButton={this.state.popUpDetail.noDownloadButton}
                tooltips={this.state.popUpDetail.tooltips}
                notGroup={this.state.popUpDetail.notGroup}
                list={data}
                modulename={this.props.tab}
                actionbuttons={actionbuttons}
                columnlist={columnlist}
                ActionPerform={(action, id) => this.ActionPerform(action, id)} />
        this.setState({
            telkikTable: telkikTable
        })
    }

    closePopup=()=>{
        $(".left-popup2").trigger('click');
    }

    ActionPerform = (action, row) => {
        if (action === 'Complete Details') {
            let popUpForm2 =  <SecondPopup
                    popUpHeading={action}
                    row={row}
                />
            
            this.props.updatepopUpForm2(popUpForm2);
           
        }
    }

    tarnsectiondatePiceker = (date = "") => {
        let datePicker = "";
        datePicker = (<DatePicker
            className="form-control"
            size="middle"
            placeholder="Data de transecção"
            format={dateFormat}
            onChange={this.handleDate}
        />)

        if (date) {
            date = moment(date).format(dateFormat);
            datePicker = (<DatePicker
                className="form-control"
                size="middle"
                placeholder="Data de transecção"
                value={moment(date, dateFormat)}
                format={dateFormat}
                onChange={this.handleDate}
            />)
        }
        return datePicker;
    }

    handleDate = (e) => {

    }


    getSpecificTransection = async () => {

        let Request = {
            "invoiceId": this.props.data.id,
            "Filters": null,
            "SortBy": "",
            "IsSortTypeDESC": false,
            "IsPagination": false,
            "Page": 1,
            "PageSize": 1
        };
        this.setState({
            totalcount: 0
        });
        let method = this.state.popUpDetail.requestMethod;
        let link = "Revenue/GetAlottedServicesByInvoice";
        let columnkeyMap = this.state.popUpDetail.columnkeyMap;
        if (!columnkeyMap) {
            return
        }
        let res = await services.apiCall.requestApi(link, Request, method);
        if (res) {
            res.map((_r, index) => {

                Object.keys(columnkeyMap).map(function (key) {
                    if (key === "trans_no") {
                        _r[columnkeyMap[key]] = "AE20E" + _r.trans_id
                    }
                    else if (key === "desart") {
                        _r[columnkeyMap[key]] = _r.service.desart
                    } else if (key === "codart") {
                        _r[columnkeyMap[key]] = _r.service.codart
                    } else if (key === "trans_date") {
                        _r[columnkeyMap[key]] = moment(_r.date).format(dateFormat)
                    } else if (key === "quantidade") {
                        _r[columnkeyMap[key]] = _r.unit
                    } else if (key === "unidade") {
                        _r[columnkeyMap[key]] = _r.service.uniart
                    } else if (key === "valor") {
                        _r[columnkeyMap[key]] = services.money.format(_r.valor);
                    } else if (key === "iva") {
                        _r[columnkeyMap[key]] = services.money.format(_r.service_tax);
                    } else if (key === "contab") {
                        _r[columnkeyMap[key]] = services.money.format(_r.service.ctbart);
                    } else if (key === "valor_cativo") {
                        _r[columnkeyMap[key]] = services.money.format(_r.valor_cativo);
                    } else if (key === "un") {
                        _r[columnkeyMap[key]] = services.money.format(_r.service.valart);
                    }

                })
            });

            this.setState({
                data: res,
                filterData: res,
                totalcount: res.length,
            }, () => this.createTabel())
        }
    }

    sortData = (list) => {
        let sortListData = list.sort(
            function (a, b) {
                if (a.year < b.year)
                    return 1;
                else
                    return -1;
            }
        )

        return sortListData
    }

    changeRemovetax = (remove_tax) => {
        console.log("changeRemovetax function is ",remove_tax);
        this.setState({
            remove_tax:remove_tax
        })
    }

    handleSubmitData = (data) => {
        console.log("DATAPROPS", data);
        let link = "/Revenue/UpdateInvoice/" + data.id;
        console.log("remove_tax State is",this.state.remove_tax);
        let Request = {
            remove_tax: this.state.remove_tax
        }
        let res = services.apiCall.requestApi(link, Request, "post");
        if (res) {
            this.props.closePopup()
        }
    }

    changeflag = (color) => {

        let propRow = { ...this.state.propRow }
        propRow.flag = color;
        this.setState({
            propRow
        })
    }

    updateFlagColor = async () => {
        let propRow = { ...this.state.propRow }
        let link = "/Revenue/UpdateInvoice/" + this.props.data.id;
        let Request = {
            flag: propRow.flag
        }
        let res = await services.apiCall.requestApi(link, Request, "post");
        if (res) {
            this.props.closePopup()
        }
    }

    onCalenderChange = (value) => {
        this.setState({
            Calendardate: value
        })
    }

    saveInvoiceDate = async () => {
        let link = "/Revenue/UpdateInvoice/" + this.props.data.id;
        let Request = {
            date: this.state.Calendardate
        }
        let res = await services.apiCall.requestApi(link, Request, "post");
        if (res) {
            this.props.closePopup()
        }
    }
    getselectedEntity = (entity) => {

    }

    render() {
        console.log("DATA", this.props.data)
        if (this.props.tab === "Credit Details" ){
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">{this.state.popUpDetail.popUpHeadingFirst}</h4>
                        <a href="#" onClick={() => this.props.closePopup()} className="remoove mr-2">FECHAR</a>
                    </div>
                    <div className="modal-body">
                        <div className="details">
                        <div className="text-center">
                            {
                                <EntityAddresses
                                    entity_details={this.props.data}
                                />
                            }
                                    <div className="row mb-5">
                                        <div className="col-md-6">
                                            <h5>Data</h5>
                                            <p>{this.props.data.Data}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Entrada</h5>
                                            <p>{this.props.data.Entrada}</p>

                                        </div>
                                    </div>
                                    <div className="row mb-5">
                                        <div className="col-md-4">
                                            <h5>Nº Doc</h5>
                                            {this.props.data["Nº Doc"]}
                                        </div>
                                        <div className="col-md-4">
                                            <h5>Observações</h5>
                                            {this.props.data.extra_text}
                                        </div>
                                        <div className="col-md-4">
                                            <h5>Sinalizada</h5>
                                            {this.props.data.flag}
                                        </div>
                                    </div>
                                </div>

                        </div>
                    </div>
                </div>
            )
                    
        }else if (this.props.tab === 'Payment details' || this.props.tab === 'Payment File details' || this.props.tab === 'Register Movement' || this.props.tab === 'File Detail') {
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">{this.state.popUpDetail.popUpHeadingFirst}</h4>
                        <a href="#" onClick={() => this.props.closePopup()} className="remoove mr-2">FECHAR</a>
                    </div>
                    <div className="modal-body">
                        <div className="details">
                            <SearchFilter filters={this.state.popUpDetail.filters} handleFilter={(data) => this.handleFilter(data)} data={this.state.data} />
                            <div className="mt-4">
                                {
                                    this.state.telkikTable
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (this.props.tab === 'year_wise_detail') {
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">{this.state.popUpDetail.popUpHeadingFirst}</h4>
                        <a href="#" onClick={() => this.props.closePopup()} className="remoove mr-2">FECHAR</a>
                    </div>
                    <div className="modal-body">
                        <div className="details">
                            <div className="mt-4">
                                {
                                    this.sortData(this.state.listData).map((_row, i) => (
                                        <div className="mb-5 text-center">
                                            <h4>{_row.year}</h4>
                                            <h6>{_row.value}</h6>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (this.props.tab === 'Dados do registo pré-selecionados') {
            return (
                <VindimaTransferencia
                    closePopup={() => this.props.closePopup()}
                    date={new Date()}
                    data={this.props.data}
                    tipoList={this.state.tipoList}
                    popUpHeadingFirst={this.state.popUpDetail.popUpHeadingFirst}
                    handleSubmitData={(data) => this.handleSubmitData(data)}
                />
            )
        } else if (this.props.tab === 'Desdobrar transferência') {
            return (
                <VindimaDesdobrar
                    date={new Date()}
                    closePopup={() => this.props.closePopup()}
                    data={this.props.data}
                    handleSubmitData={(data) => this.handleSubmitData(data)}
                    popUpHeadingFirst={this.state.popUpDetail.popUpHeading}
                />
            )
        } else if (this.props.tab === 'Registar impressão manualmente') {
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">{this.state.popUpDetail.popUpHeading}</h4>
                        <a href="#" onClick={() => this.props.closePopup()} className="remoove mr-2">FECHAR</a>
                    </div>
                    <div className="modal-body">
                        <div className="details">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-box active-grey mb-2">
                                        <Input
                                            style={{ width: "100%" }}
                                            className="input-1"
                                            name="n_folha"
                                            value={''}
                                            label="Nº Folha"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-box active-grey mb-2">
                                        <Input
                                            style={{ width: "100%" }}
                                            className="input-1"
                                            name="n_de_carta"
                                            value={''}
                                            label="Nº de carta"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="input-box active-grey mb-2">
                                        <Input
                                            style={{ width: "100%" }}
                                            className="input-1"
                                            name="motive"
                                            value={''}
                                            label="Motiva"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (this.props.tab === 'Consultar Conta') {
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">{this.state.popUpDetail.popUpHeadingFirst}</h4>
                        <ul className="navbar-nav custom-menu float-right mr-2 user-alert-head">
                            <li className="nav-item dropdown">
                                {/* <a className="nav-link d-flex justify-content-between remoove" href="#" id="navbardrop" data-toggle="dropdown">
                                    imprimir
                                </a> */}
                                <div className="dropdown-menu user-alert">
                                    <a className="dropdown-item" href="#">
                                        <span className="content">
                                            <p> nº cópias guia <input type="number" id="numberofcopies" /></p>
                                            <p> <input type="checkbox" checked={true} /> Pré-visualizar</p>
                                        </span>
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        <span className="content">
                                            <p>imprimir</p>
                                        </span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                        <a href="#" onClick={() => this.props.closePopup()} className="remoove mr-2">FECHAR</a>
                    </div>
                    <div className="modal-body">
                        {
                            this.props.data &&
                            <div className="details">

                                <div className="text-center">
                                    <EntityAddresses
                                        entity_details={this.props.data}
                                    />
                                    
                                    <div className="row mb-5">
                                        <div className="col-md-6">
                                            <h5>Data doc.</h5>
                                            <p>{this.props.data.Data}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Nº doc.</h5>
                                            <p>{this.props.data["Nº Doc"]}</p>

                                        </div>
                                    </div>
                                    <div className="row mb-5">
                                        <div className="col-md-4">
                                            <h5>Valor total</h5>
                                            {services.money.format(this.props.data.total_amount)}
                                        </div>
                                        <div className="col-md-4">
                                            <h5>IVA</h5>
                                            {this.props.data.iva}
                                        </div>
                                        <div className="col-md-4">
                                            <h5>Qtd. total</h5>
                                            {this.props.data.QtyTotal}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    {
                                        this.state.telkikTable
                                    }
                                </div>
                            </div>

                        }
                    </div>
                </div>
            )
        } else if (this.props.tab === 'Faturas pendentes') {
            console.log("row", this.state.data)
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">{this.state.popUpDetail.popUpHeadingFirst}</h4>
                        <ul className="navbar-nav custom-menu float-right mr-2 user-alert-head">
                            <li className="nav-item dropdown">
                                <a className="nav-link d-flex justify-content-between remoove" href="#" id="navbardrop" data-toggle="dropdown">
                                   imprimir
                                </a>
                                <div className="dropdown-menu user-alert">
                                    <a className="dropdown-item" href="#">
                                        <span className="content">
                                            <p> nº cópias guia <input type="number" id="numberofcopies" /></p>
                                            <p> <input type="checkbox" checked={true} /> Pré-visualizar</p>
                                        </span>
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        <span className="content">
                                            <p>imprimir</p>
                                        </span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                        <a href="#" onClick={() => this.props.closePopup()} className="remoove mr-2">FECHAR</a>
                    </div>
                    <div className="modal-body">
                        {
                            this.props.data &&
                            <div className="details">
                                <div className="text-center">
                                    <div className="row mb-5">
                                        <div className="col-md-6">
                                            <h5>Nº Entidade</h5>
                                            <p>{this.state.entity_details.busEntidade.nifap}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <h5>entidade</h5>
                                            <p>{this.state.entity_details.busEntidade.nome}</p>
                                        </div>
                                    </div>
                                    <div className="row mb-5">
                                        <div className="col-md-6">
                                            <h5>Data doc.</h5>
                                            <p>{this.props.data.deadline_date}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Nº doc.</h5>
                                            <p>{this.props.data["Nº Doc"]}</p>

                                        </div>
                                    </div>
                                    <div className="row mb-5">
                                        <div className="col-md-4">
                                            <h5>Valor total</h5>
                                            {services.money.format(this.props.data.total_amount)}
                                        </div>
                                        <div className="col-md-4">
                                            <h5>IVA</h5>
                                            {this.props.data.iva}
                                        </div>
                                        <div className="col-md-4">
                                            <h5>Qtd. total</h5>
                                            {this.props.data.QtyTotal}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    {
                                        this.state.telkikTable
                                    }
                                </div>
                            </div>


                        }
                    </div>
                </div>
            )
        } else if (this.props.tab === 'Alterar prazo de pagamento') {
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">{this.props.tab}</h4>
                        <a href="#" onClick={() => this.saveInvoiceDate()} className="remoove text-success mr-4">CONFIRMAR</a>
                        <a href="#" onClick={() => this.props.closePopup()} className="remoove ">Cancelar</a>
                    </div>
                    <div className="modal-body">
                        {
                            this.props.data &&
                            <div className="details">
                                <div className="text-center">
                                    <div className="row mb-5">
                                        <div className="col-md-4">
                                            <h5>Nº Entidade</h5>
                                            <p>{this.state.entity_details.busEntidade.nifap}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h5>entidade</h5>
                                            <p>{this.state.entity_details.busEntidade.nome}</p>
                                        </div>
                                    </div>
                                    <div className="row mb-5">
                                        <div className="col-md-4">
                                            <h5>nº documento</h5>
                                            <p>{this.props.data["Nº Doc"]}</p>
                                        </div>
                                    </div>
                                    {/* <div className="row mb-5">
                                        <div className="col-md-4">
                                            <select className="custome-drop-down" value="">
                                                <option value="">Selecione casta </option>

                                            </select>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="mt-4">
                                    <div className="site-calendar-demo-card">
                                        <CalenderModal
                                            date={new Date()}
                                            selectedDate={this.state.Calendardate}
                                            onCalenderChange={(value) => this.onCalenderChange(value)}
                                        />
                                    </div>
                                </div>
                            </div>

                        }
                    </div>
                </div>
            )
        } else if (this.props.tab === 'Sinalizar') {
            console.log("datafgftcrv", this.state.data)
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">{this.props.tab}</h4>
                        <a href="#" onClick={() => this.updateFlagColor()} className="remoove text-success mr-4">CONFIRMAR</a>
                        <a href="#" onClick={() => this.props.closePopup()} className="remoove ">FECHAR</a>
                    </div>
                    <div className="modal-body">
                        {
                            this.props.data &&
                            <div className="details">
                                <div className="row mb-5">
                                    <div className="col-md-4">
                                        <h5>Nº Entidade</h5>
                                        <p>{this.state.entity_details.busEntidade.nifap}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <h5>entidade</h5>
                                        <p>{this.state.entity_details.busEntidade.nome}</p>
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-md-4">
                                        <h5>Nº Doc</h5>
                                        <p>{this.props.data.no}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p><strong>Valor total (c/ iva)</strong></p>
                                        <p>{services.money.format(this.props.data.total_amount)}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <h5>Valor pago</h5>
                                        <p>{services.money.format(this.props.data.amount_paid)}</p>
                                    </div>

                                    <div className="col-md-4">
                                        <h5>Valor cativo</h5>
                                        <p>{services.money.format(this.props.data.valor_cativo)}</p>
                                    </div>
                                </div>


                                <div className="row mb-5">
                                    <div className="col-md-6 mt-4">
                                        <h5>selecionar sinalizador</h5>
                                    </div>
                                </div>
                                {
                                    this.state.popUpDetail && this.state.popUpDetail.flagcolors &&
                                    Object.keys(this.state.popUpDetail.flagcolors).map((name) => (
                                        <div key={name} className="row mb-5">
                                            <div className="col-md-3">
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <input type="radio"
                                                        checked={this.state.propRow.flag === this.state.popUpDetail.flagcolors[name]}
                                                        className="custom-control-input"
                                                        id="customRadio"
                                                        name={name}
                                                        value={name} />
                                                    <label onClick={() => this.changeflag(this.state.popUpDetail.flagcolors[name])} className="custom-control-label" htmlFor={name}>{name}</label>
                                                </div>
                                            </div>
                                            {
                                                this.state.popUpDetail.flagcolors[name] &&
                                                <div className="col-md-3">
                                                    <i className="fa fa-flag ml-5" aria-hidden="true" style={{ color: this.state.popUpDetail.flagcolors[name] }}></i>
                                                </div>
                                            }
                                        </div>
                                    ))
                                }
                            </div>

                        }
                    </div>
                </div>
            )
        } else if (this.props.tab === 'Processar fatura') {
            console.log("Processar fatura", this.props);
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">{this.props.tab}</h4>
                        <a href="#" onClick={() => this.handleSubmitData(this.props.data)} className="remoove text-success mr-4">CONFIRMAR</a>
                        <a href="#" onClick={() => this.props.closePopup()} className="remoove ">FECHAR</a>
                    </div>
                    <div className="modal-body">
                        {
                            this.props.data &&
                            <>
                                <div className="row" style={{ marginTop: "20px" }}>
                                    {/* <div className="col-md-4">
                                        {this.tarnsectiondatePiceker(this.props.data.data)}
                                    </div> */}
                                    {/* <div className="col-md-4">
                                        <p><strong>qnt. total</strong></p>
                                        <p>{this.props.data.QtyTotal}</p>
                                    </div> */}
                                    <div className="col-md-8">
                                        <p><strong>Nº Doc</strong></p>
                                        <p>{this.props.data.no}</p>
                                    </div>

                                </div>
                                <div className="row" style={{ marginTop: "20px" }}>
                                    <div className="col-md-6">
                                        <p><strong>Nº Entidade devedora</strong></p>
                                        <p>{this.state.entity_details.busEntidade.nifap}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><strong>nome entidade devedora</strong> </p>
                                        <p>{this.state.entity_details.busEntidade.nome}</p>
                                    </div>
                                </div>
                                {/* <div className="row" style={{ marginTop: "20px" }}>
                                    <div className="col-md-12">
                                        <p><strong>Morada</strong></p>
                                        {
                                            this.props.data.billingAddressDetail &&
                                            <p>
                                                {this.props.data.billingAddressDetail.address_line1 + ", "}
                                                {this.props.data.billingAddressDetail.address_line2 + ", "}
                                                {this.props.data.billingAddressDetail.city + " "}
                                            ( {this.props.data.billingAddressDetail.pin} )
                                                {this.props.data.billingAddressDetail.state + ", "}
                                                {this.props.data.billingAddressDetail.country}
                                            </p>

                                        }

                                    </div>
                                </div> */}
                                <div className="row" style={{ marginTop: "20px" }}>
                                    <div className="col-md-12">
                                        {/* <EntityFilter modulename="revenue" getselectedEntity={(value)=>this.getselectedEntity(value)} /> */}

                                    </div>
                                </div>
                                <div className="row " style={{ marginTop: "20px" }}>
                                    <div className="col-md-6">
                                        <p><strong>Nº contribuinte</strong></p>
                                        <p>{this.props.data.vat_no}  </p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><strong>Saldo atual</strong></p>
                                        <p>{this.props.data.current_balance}</p>
                                    </div>
                                </div>
                                <div className="row " style={{ marginTop: "20px" }}>
                                    <div className="col-md-4">
                                        <p><strong>Valor total (c/ iva)</strong></p>
                                        <p>{services.money.format(this.props.data.total_amount)}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p><strong>Iva aplicado</strong></p>
                                        <p>{this.props.data.iva}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p><strong>Limite de pagamento</strong></p>
                                        <p>{services.money.format(this.props.data.total_amount - this.props.data.amount_paid)}</p>
                                    </div>
                                </div>
                                
                                <div className="row " style={{ marginTop: "20px" }}>
                                    <div className="col-md-4">
                                        <p><strong>Data inicio p/ o cálculo</strong></p>
                                        <p>{moment(this.props.data.issue_date_time).format(dateFormat)}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p><strong>Dias</strong></p>
                                        <p>30</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p><strong>Valor Juros de Mora</strong></p>
                                        <p>{this.props.data.iva}</p>
                                    </div>
                                </div>
                                <div className="row " style={{ marginTop: "20px" }}>
                                    <div className="col-md-4">
                                        <input type="radio" name="remove_tax" value="1" onClick={() => this.changeRemovetax(1)}/>Remover Juros de Mora
                                        {/* <label onClick={() => this.changeRemovetax("1")}>Remover Juros de Mora</label> */}
                                    </div>
                                    <div className="col-md-4">
                                        <input type="radio" name="remove_tax" value="0" onClick={() => this.changeRemovetax(0)}/>Criar fatura com Juros de Mora
                                        {/* <label onClick={() => this.changeRemovetax("0")}>Criar fatura com Juros de Mora</label> */}
                                    </div>
                                </div>
                                <div className="row " style={{ marginTop: "20px" }}>
                                    <div className="col-md-4">
                                        <p><strong>Valor em pagamento</strong></p>
                                        <p>{services.money.format(this.props.data.total_amount)}</p>
                                    </div>
                                    {/* <div className="col-md-4">
                                        <input type="text" />
                                    </div> */}
                                    {/* <div className="col-md-4">
                                        <p><strong>Valor a pagar (final)</strong></p>
                                        <p>{parseFloat(this.props.data.total_amount) + parseFloat(this.props.data.iva)}</p>

                                    </div> */}
                                </div>
                                {/* <h5>Meio de pagamento </h5>
                                <div className="row " style={{ marginTop: "20px" }}>
                                    <div className="col-md-4">
                                        <input type="radio" name="selecttransMehod" />Conta-corrente
                                    </div>
                                    <div className="col-md-4">
                                        <input type="radio" name="selecttransMehod" />Caixa
                                    </div>
                                </div> */}


                            </>
                        }
                    </div>
                </div>

            )
        } else if (this.props.tab === 'Instalações vínicas') {
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">{this.state.popUpDetail.popUpHeadingFirst}</h4>
                        <a href="#" onClick={() => this.props.closePopup()} className="remoove mr-2">FECHAR</a>
                    </div>
                    <div className="modal-body">
                        <div>
                            <h4>nº ivv</h4>
                            <h5>122345688</h5>
                        </div>
                        <div className="details">
                            <div className="mt-4">
                                {
                                    this.state.telkikTable
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (this.props.tab === 'Destinos declarados por produto') {
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">{this.state.popUpDetail.popUpHeadingFirst}</h4>
                        <a href="#" onClick={() => this.props.closePopup()} className="remoove mr-2">FECHAR</a>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-6">
                                <h6>Nr DCP</h6>
                                <h6>#######</h6>
                            </div>
                            <div className="col-md-6">
                                <h6>Títular da DCP</h6>
                                <h6>Lorem Ipsum</h6>
                            </div>
                        </div>
                        <div className="details">
                            <div className="mt-4">
                                {
                                    this.state.telkikTable
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (this.props.tab === "Definir intervalo de registos") {
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">Definir intervalo de registos</h4>
                        {/* <a href="#" onClick={() => this.props.closePopup()} className="remoove mr-2">IMPRIMIR</a> */}
                        <a href="#" onClick={() => this.props.closePopup()} className="remoove mr-2">CANCELAR</a>
                    </div>
                    <div className="modal-body">
                        <RangePicker
                            dateRender={current => {
                                const style = {};
                                if (current.date() === 1) {
                                    style.border = '1px solid #1890ff';
                                    style.borderRadius = '50%';
                                }
                                return (
                                    <div className="ant-picker-cell-inner" style={style}>
                                        {current.date()}
                                    </div>
                                );
                            }}
                        />
                        <div style={{ marginTop: "50px" }}>
                            <h5>Ordem dos dados</h5>
                            <span>
                                <input type="checkbox" checked={true} /> Crescente
                                <input type="checkbox" /> Decrescente
                            </span>
                        </div>
                    </div>
                </div>
            )
        } else if (this.props.tab === "Preencher/Validar nº IVV") {
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">Preencher/Validar nº IVV</h4>
                        {/* <a href="#" onClick={() => this.props.closePopup()} className="remoove mr-2">IMPRIMIR</a> */}
                        <a href="#" onClick={() => this.props.closePopup()} className="remoove mr-2">CANCELAR</a>
                    </div>
                    <div className="modal-body">
                        <SearchFilter />
                        <div style={{ marginTop: "50px", marginBottom: "60px" }}>
                            <h5>Lorem ipsum dolalr sit amet</h5>
                            <h6>0123456789</h6>
                            <input type="text" value="nº IVV" />
                        </div>
                    </div>
                </div>
            )
        } else if (this.props.tab === 'Anular fatura') {
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">{this.props.tab}</h4>
                        <a href="#" onClick={() => this.handleSubmitData()} className="remoove text-success mr-4">CONFIRMAR</a>
                        <a href="#" onClick={() => this.props.closePopup()} className="remoove ">FECHAR</a>
                    </div>
                    <div className="modal-body">
                    </div>
                </div>
            )
        } else if (this.props.tab === 'Comentários associados ao registo') {
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">{this.props.tab}</h4>
                        <a href="#" onClick={() => this.props.closePopup()} className="remoove ">FECHAR</a>
                    </div>
                    <div className="modal-body">
                        <p>nº dcp</p>
                        <p>Lorem ipsum</p>
                        <div id={`accordion-1`} className="custom-accordtion">
                            <div className="card">
                                <div className="card-header">
                                    <a className="collapsed card-link d-flex justify-content-between align-items-center" data-toggle="collapse" href={`#collapse-1`}>
                                        <p>Data 1</p><span className="toggle-arrow"><i className="fas fa-chevron-down"></i></span>
                                    </a>
                                </div>
                                <div id={`collapse-1`} className="collapse">
                                    <div className="card-body">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu dui vel nisi cursus pulvinar. Nam tempus risus et ante egestas, at aliquam diam malesuada. Maecenas quis vehicula erat. Mauris ac lacus ut tortor pharetra egestas. Phasellus tincidunt justo sapien, at volutpat libero venenatis sed. Vestibulum commodo ligula ipsum, quis lacinia neque accumsan at. Aliquam elementum sapien a vulputate consequat. Maecenas rhoncus ligula ac massa imperdiet, ac faucibus ligula aliquam. Quisque vitae diam malesuada, sagittis velit id, malesuada risus.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id={`accordion-2`} className="custom-accordtion">
                            <div className="card">
                                <div className="card-header">
                                    <a className="collapsed card-link d-flex justify-content-between align-items-center" data-toggle="collapse" href={`#collapse-2`}>
                                        <p>Data 2</p><span className="toggle-arrow"><i className="fas fa-chevron-down"></i></span>
                                    </a>
                                </div>
                                <div id={`collapse-2`} className="collapse">
                                    <div className="card-body">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu dui vel nisi cursus pulvinar. Nam tempus risus et ante egestas, at aliquam diam malesuada. Maecenas quis vehicula erat. Mauris ac lacus ut tortor pharetra egestas. Phasellus tincidunt justo sapien, at volutpat libero venenatis sed. Vestibulum commodo ligula ipsum, quis lacinia neque accumsan at. Aliquam elementum sapien a vulputate consequat. Maecenas rhoncus ligula ac massa imperdiet, ac faucibus ligula aliquam. Quisque vitae diam malesuada, sagittis velit id, malesuada risus.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (this.props.tab === 'Detalhes movimento') {
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">{this.state.popUpDetail.popUpHeadingFirst}</h4>
                        <a href="#" onClick={() => this.props.closePopup()} className="remoove mr-2">FECHAR</a>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-6">
                                <p>Nº Entidade</p>
                                <p>Lorem Ipsum</p>
                            </div>
                            <div className="col-md-6">
                                <p>Entidade</p>
                                <p>Lorem Ipsum</p>
                            </div>
                        </div>

                        <div className="details">
                            <div className="mt-4">
                                {
                                    this.state.telkikTable
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (this.props.tab === 'Preço de Vindima (Detalhe por Entidade)') {
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">{this.state.popUpDetail.popUpHeadingFirst}</h4>
                        <a href="#" onClick={() => this.props.closePopup()} className="remoove mr-2">FECHAR</a>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-4">
                                <p>Entidade Compradora</p>
                                <p>Lorem Ipsum</p>
                            </div>
                            <div style={{ marginTop: "0px" }} className="tab-section col-md-8">
                                <div className="innerBox">
                                    <div className="display-content">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <p>Média / Total</p>
                                            </div>
                                            <div className="col-md-4">
                                                <p>Preço Pipa</p>
                                                <p>xxxxxxxx</p>
                                            </div>
                                            <div className="col-md-4">
                                                <p>Quantidade</p>
                                                <p>xxxxxxxx</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="details">
                            <div className="mt-4">
                                {
                                    this.state.telkikTable
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (this.props.tab === 'Comentários associados') {
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">{this.state.popUpDetail.popUpHeadingFirst}</h4>
                        <a href="#" onClick={() => this.props.closePopup()} className="remoove mr-2">FECHAR</a>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-6">
                                <p>Nº dcp</p>
                                <p>Lorem Ipsum</p>
                            </div>
                            <div className="col-md-6">
                                <p>Entidade</p>
                                <p>Lorem Ipsum</p>
                            </div>
                        </div>

                        <div className="details">
                            <div className="mt-4">
                                {
                                    this.state.telkikTable
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <a href="#" onClick={() => this.props.closePopup()} className="remoove mr-2">FECHAR</a>
                    </div>
                    <div className="modal-body">
                        <div className="details">
                            <div className="mt-4">
                                To Do
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default VindimaModalForm;