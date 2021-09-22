
import React, { Component } from 'react';
import $ from 'jquery'
import { Button } from '@progress/kendo-react-buttons'
import services from '../../services';
import EntityDetails from './EntityDetails';
import InstructionMessage from '../VidimaModule/Modal/InstructionMessage';
import SearchFilter from '../filters/SearchFilter';
import TlkTable from '../tlelrik/table/tlkTable';
import { toast } from 'react-toastify';
import { DatePicker, Select } from 'antd'
import RevenueEntityAction from './RevenueEntityAction';

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
const tabDetailArray = {
    'Adicionar Movimento': {
        tabWiseApi: {
            'Tx. Aguardente': {
                api: '/Vindima/FilesCreateBank/GetAll',
                columnkeyMap: {
                    "TP": "TP",
                    "Ano": "Ano",
                    "Num": "Num",
                    "descrição": "descrição",
                    "data": "data",
                    "Qt": "Qt",
                    "Un": "Un",
                    "valor": "valor",
                    "iva": "iva",
                    "Valor cat.": "Valor cat.",
                    "Contab": "Contab"
                },
                notAction: true,
                actionbuttons: { Edit: false, Redirect: false, Delete: false }

            },
            'Tx. Vinhos': {
                api: '/Vindima/PaymentNotSent/GetAll',
                columnkeyMap: {
                    "TP": "TP",
                    "Ano": "Ano",
                    "Num": "Num",
                    "descrição": "descrição",
                    "data": "data",
                    "Qt": "Qt",
                    "Un": "Un",
                    "valor": "valor",
                    "iva": "iva",
                    "Valor cat.": "Valor cat.",
                    "Contab": "Contab"
                },
                notAction: true,
                actionbuttons: { Edit: false, Redirect: false, Delete: false }
            },
            'Selos e Cápsulas': {
                api: '/Vindima/PaymentConfirmation/getall',
                columnkeyMap: {
                    "TP": "TP",
                    "Ano": "Ano",
                    "Num": "Num",
                    "descrição": "descrição",
                    "data": "data",
                    "Qt": "Qt",
                    "Un": "Un",
                    "valor": "valor",
                    "iva": "iva",
                    "Valor cat.": "Valor cat.",
                    "Contab": "Contab"
                },
                notAction: true,
                actionbuttons: { Edit: false, Redirect: false, Delete: false }
            },
            'req. serviços': {
                api: '/Vindima/LQBase/getall',
                columnkeyMap: {
                    "TP": "TP",
                    "Ano": "Ano",
                    "Num": "Num",
                    "descrição": "descrição",
                    "data": "data",
                    "Qt": "Qt",
                    "Un": "Un",
                    "valor": "valor",
                    "iva": "iva",
                    "Valor cat.": "Valor cat.",
                    "Contab": "Contab"
                },
                notAction: true,
                actionbuttons: { Edit: false, Redirect: false, Delete: false }
            },
            'fiscalização': {
                api: '/Vindima/LQBase/getall',
                columnkeyMap: {
                    "TP": "TP",
                    "Ano": "Ano",
                    "Num": "Num",
                    "descrição": "descrição",
                    "data": "data",
                    "Qt": "Qt",
                    "Un": "Un",
                    "valor": "valor",
                    "iva": "iva",
                    "Valor cat.": "Valor cat.",
                    "Contab": "Contab"
                },
                notAction: true,
                actionbuttons: { Edit: false, Redirect: false, Delete: false }
            },
            'medidas de intervenção': {
                api: '/Vindima/LQBase/getall',
                columnkeyMap: {
                    "TP": "TP",
                    "Ano": "Ano",
                    "Num": "Num",
                    "descrição": "descrição",
                    "data": "data",
                    "Qt": "Qt",
                    "Un": "Un",
                    "valor": "valor",
                    "iva": "iva",
                    "Valor cat.": "Valor cat.",
                    "Contab": "Contab"
                },
                notAction: true,
                actionbuttons: { Edit: false, Redirect: false, Delete: false }
            },
            'artigos diversos': {
                api: '/Revenue/Artigo/GetAll',
                columnkeyMap: {
                    "codart": "Tipo Conta",
                    "desart": "Descrição",
                    "uniart": "UN",
                    "QT": "QT",
                    "tax": "IVA",
                    "valart": "Valor UN",
                    "valor": "Valor",
                    "ctbart": "Ctbart",
                    "recart": "Recart"
                },
                notAction: true,
                actionbuttons: { Edit: false, Redirect: false, Delete: false }
            },
            'juros de mora': {
                api: '/Vindima/LQBase/getall',
                columnkeyMap: {
                    "TP": "TP",
                    "Ano": "Ano",
                    "Num": "Num",
                    "descrição": "descrição",
                    "data": "data",
                    "Qt": "Qt",
                    "Un": "Un",
                    "valor": "valor",
                    "iva": "iva",
                    "Valor cat.": "Valor cat.",
                    "Contab": "Contab"
                },
                notAction: true,
                actionbuttons: { Edit: false, Redirect: false, Delete: false }
            }
        }
    }
}
let listdefaultRequest = { "Filters": null, "SortBy": "", "IsSortTypeDESC": false, "IsPagination": false, "Page": 1, "PageSize": 100 }

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

const filters = {
    Tabs: {},
    checkbox: []
};

const SelectedServices = {
    columnkeyMap: {
        "codart": "Codart",
        "Descrição": "Descrição",
        "unit": "Unidade",
        "per_services_amount": "Quantidade de serviços",
        "service_tax": "Iva",
        "tax_type": "Iva Tipo",
        "tax_percent": "Iva %",
        "valor_cativo": "Iva Cativo",
        "valor": "Valor"
    },
    actionbuttons: { Edit: false, Redirect: false, Delete: true, detailPopUp: false },
}

class RevenueServicesAllot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // entity_details: null,
            popUpDetail: {},
            forFilter: {},
            tax_list: [],
            AddServices: {},
            services_charge: 0,
            servicesList: true,
            request: {},
            temp_services: {},
            temp_popup_array: [],
            temp_services_array: [],
            future_payment: 0,
            deadline_date: null,
            amount_to_be_used: 0,
            finalInvoiceTable: null
        }
    }

    componentDidMount() {
        this.getTaxList();
    }

    componentDidUpdate(preProp) {
        if (preProp.date !== this.props.date) {
            // this.setState({
            //     popUpDetail: {},
            //     forFilter: {},

            //     AddServices: {},
            //     services_charge: 0,
            //     servicesList: true,
            //     request: {},
            //     temp_services: {},
            //     temp_popup_array: [],
            //     temp_services_array: [],
            //     future_payment: 0,
            //     deadline_date: null,
            //     amount_to_be_used: 0,
            //     finalInvoiceTable: null
            // })
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

    getFilters = (customfilters) => {
        let applyedfilter = { ...customfilters.filterCheckbox, ...customfilters.filters }
        delete applyedfilter.entity;
        console.log("data", applyedfilter);
        this.setState({
            applyedfilter,
        }, () =>
            this.getEntityDetails(applyedfilter.entity_id)
        );
    }

    getEntityDetails = async (entity_id) => {
        let Request = {};
        this.setState({
            entity_details: null
        });
        Request.entityId = parseInt(entity_id);
        let link = "/Revenue/getEntityDetail"
        let res = await services.apiCall.requestApi(link, Request);
        if (res) {
            this.setState({
                entity_details: res
            });
        }
    }



    handleFilter = (data) => {
        // this.setState({
        //     filterData: data
        // }, () => this.createTabel())
    }

    popupTabTable = (tabName) => {
        let popUpDetail = tabDetailArray[this.props.tab] ? tabDetailArray[this.props.tab] : {}
        this.setState({
            popUpDetail,
        }, () => {
            this.getPopUpListData(tabName)
        })
    }

    getPopUpListData = async (tabName = "") => {
        console.log("tabName", tabName);
        if (this.state.popUpDetail.tabWiseApi && this.state.popUpDetail.tabWiseApi[tabName]) {
            let popUpDetail = this.state.popUpDetail.tabWiseApi[tabName];
            let res = []
            if (this.props.tab === "Adicionar Movimento") {
                this.getDocumentlist(tabName);
            }
        }
    }

    getDocumentlist = async (tabName = "") => {
        let returnArray = [];
        let popUpDetail = this.state.popUpDetail.tabWiseApi[tabName];
        let Request = listdefaultRequest;
        let link = popUpDetail.api;
        let res = await services.apiCall.requestApi(link, Request, 'post')
        if (res) {
            if (popUpDetail.columnkeyMap) {
                let columnkeyMap = popUpDetail.columnkeyMap;
                res.map((_row, index) => (
                    Object.keys(columnkeyMap).map(function (key) {
                        if (key === "QT") {
                            _row[columnkeyMap[key]] = 0;

                        } else
                            _row[columnkeyMap[key]] = _row[key]
                    })
                ));
            }
            this.setState({
                data: res,
                popUpDetail: popUpDetail,
                filterData: res,
                totalcount: res.length
            }, () => this.createTabel());

        }

    }

    createTabel = () => {
        // let actionbuttons = this.state.popUpDetail.actionbuttons;
        let actionbuttons = SelectedServices.actionbuttons;
        let columnkeyMap = this.state.popUpDetail.columnkeyMap;
        let columnlist = Object.keys(columnkeyMap).map(function (key) {
            return { field: columnkeyMap[key], columnMenuType: 'checkbox' }
        });
        let data;
        // let data=  [...this.state.filterData];

        if (this.state.popUpDetail.api === "/Revenue/Artigo/GetAll") {
            data = [...this.state.filterData];
        }
        else {
            data = null;
        }

        let telkikTable = (<TlkTable
            date={new Date()}
            groupfield={this.state.popUpDetail.groupfield}
            notAction={this.state.popUpDetail.notAction}
            list={data}
            tax_list={this.state.tax_list}
            noDownloadButton={true}
            modulename={this.props.tab}
            deleteFunc={(id) => this.handleDelete(id)}
            actionbuttons={actionbuttons}
            columnlist={columnlist}
            ActionPerform={(action, id) => this.ActionPerform(action, id)} />)
        this.setState({
            telkikTable: telkikTable
        })
    }

    ActionPerform = (action, row) => {

        if (action === "AddServices") {
            let AddServices = { ...this.state.AddServices }
            AddServices = row;

            this.setState({ AddServices }, () => this.setServicescharge())
        }
    }

    setServicescharge = () => {
        let AddServices = { ...this.state.AddServices }
        let Totalvalor = 0;
        console.log("services", AddServices);
        Object.keys(AddServices).map((_r) => {
            Totalvalor += parseFloat(AddServices[_r].Valor);
        })
        let services_charge = parseFloat(Totalvalor, 2)
        console.log("services", services_charge);
        this.setState({ services_charge })
    }


    SetAllServices = () => {
        let AddServices = { ...this.state.AddServices };
        if (!AddServices) {
            toast.error("Selecione pelo menos um serviço");
            return;
        }
        let date = moment(new Date()).format(dateFormat);
        let forFilter = { ...this.state.forFilter }
        let entity_id = 0;
        if (this.state.entity_details && this.state.entity_details.busEntidade)
            entity_id = this.state.entity_details.busEntidade.nifap
        let request = {
            "entity_id": parseInt(entity_id),
            "total_amount": parseFloat(this.state.services_charge, 2),
            "total_services_amount": 0,
            "total_service_tax": 0,
            "total_valor_cativo_tax": 0,
            "local": window.localStorage.getItem('Local'),
            "deadline_date": this.props.forfutureInvoice === 0 ? null : forFilter.date ? forFilter.date : null,
            "future_payment": this.props.forfutureInvoice,
            services: AddServices
        }
        let amount_to_be_used = this.state.amount_to_be_used;
        if (parseFloat(this.state.amount_to_be_used) >= parseFloat(this.state.services_charge)) {
            amount_to_be_used = parseFloat(this.state.services_charge);
        }
        this.setState({
            finalInvoiceTable: null,
            request: request,
            amount_to_be_used,
            servicesList: this.state.servicesList ? false : true
        }, () => this.updateServiceslist())
    }

    updateServiceslist = async () => {
        let temp_services = { ...this.state.request };// JSON.parse('{"entity_id":10378872,"total_amount":185,"total_services_amount":0,"total_service_tax":0,"total_valor_cativo_tax":0,"local":"Porto","deadline_date":null,"future_payment":0,"services":{"1":{"id":1,"codart":"AAC  ","desart":"Aprovação de vinho sem DO e IG, com ano e casta   ","valart":15,"ctbart":7126,"recart":"D","uniart":"     ","numart":"N","estart":"A","netart":"S","tipart":"S","oriart":"T","Tipo Conta":"AAC  ","Descrição":"Aprovação de vinho sem DO e IG, com ano e casta   ","UN":"     ","QT":12,"Valor UN":15,"Valor":180,"Ctbart":7126,"Recart":"D","complete_services_amount":180,"tax_id":null,"tax_type":"","service_tax":0,"valor_cativo":0,"tax_percent":0},"2":{"id":2,"codart":"ABD  ","desart":"Emissão Cert. Análise DOURO via Web (Brasil)      ","valart":5,"ctbart":71224,"recart":"D","uniart":"     ","numart":"N","estart":"A","netart":"S","tipart":"S","oriart":"T","Tipo Conta":"ABD  ","Descrição":"Emissão Cert. Análise DOURO via Web (Brasil)      ","UN":"     ","QT":1,"Valor UN":5,"Valor":5,"Ctbart":71224,"Recart":"D","complete_services_amount":5,"tax_id":null,"tax_type":"","service_tax":0,"valor_cativo":0,"tax_percent":0}}}');
        var temp_popup_array = [];
        var temp_services_array = [];
        temp_services_array = Object.values(temp_services.services);
        temp_services.services = temp_services_array;
        temp_services_array.map((AddServices, index) => {
            temp_popup_array.push({
                "service_id": AddServices.id,
                "codart": AddServices.codart,
                "Descrição": AddServices.Descrição,
                "unit": AddServices['QT'],
                "per_services_amount": AddServices['Valor UN'],
                "service_tax": AddServices.service_tax,
                "valor_cativo": AddServices.valor_cativo,
                "tax_id": AddServices.tax_id,
                "tax_type": AddServices.tax_type,
                "tax_percent": AddServices.tax_percent,
                "valor": AddServices.Valor,
            });
        });
        this.setState({
            temp_popup_array,
            temp_services,
            temp_services_array
        }, () => {
            this.createAllotedTabel();
        });
    }


    createAllotedTabel = () => {
        let actionbuttons = SelectedServices.actionbuttons;
        let columnkeyMap = SelectedServices.columnkeyMap;
        let columnlist = Object.keys(columnkeyMap).map(function (key) {
            return { field: columnkeyMap[key], columnMenuType: 'checkbox' }
        });
        let data = [...this.state.temp_popup_array];
        let temp_services = { ...this.state.temp_services };
        temp_services.total_services_amount = 0;
        temp_services.total_service_tax = 0;
        temp_services.total_valor_cativo_tax = 0;

        let services_charge = 0;
        data.map((_row, index) => {
            Object.keys(columnkeyMap).map(function (key) {
                if (key === "per_services_amount") {
                    _row[columnkeyMap[key]] = services.money.format(_row[key])
                } else if (key === 'service_tax') {
                    _row[columnkeyMap[key]] = services.money.format(_row[key])
                } else if (key === 'valor_cativo') {
                    _row[columnkeyMap[key]] = services.money.format(_row[key])
                } else if (key === 'valor') {
                    _row[columnkeyMap[key]] = services.money.format(_row[key])
                } else
                    _row[columnkeyMap[key]] = _row[key]
            });
            temp_services.total_services_amount += parseFloat(_row['valor'])
            temp_services.total_service_tax += parseFloat(_row['service_tax'])
            temp_services.total_valor_cativo_tax += parseFloat(_row['valor_cativo'])
            services_charge += parseFloat(_row['valor'])
            _row['index'] = index;
        });
        let AddServices = { ...this.state.AddServices }
        console.log("AddServices", AddServices);
        let telkikTable = <TlkTable
            date={new Date()}
            groupfield={[]}
            notAction={false}
            noDownloadButton={true}
            customrow={AddServices}
            list={data}
            deleteFunc={(id) => this.handleDelete(id)}
            actionbuttons={actionbuttons}
            columnlist={columnlist}
            ActionPerform={(action, id) => this.ActionPerform(action, id)} />

        this.setState({
            finalInvoiceTable: null,
            telkikTable: telkikTable,
            services_charge: services_charge,
            totalcount: data.length,
            temp_services
        })
    }


    handleDelete = async (row) => {
        let temp_popup_array = [...this.state.temp_popup_array];
        let temp_services = { ...this.state.temp_services };
        let AddServices = { ...this.state.AddServices };
        let services = temp_services.services;
        delete AddServices[row.service_id];
        console.log("row", row);
        console.log("AddServices", this.state.AddServices);
        let index = parseInt(row.index);
        services = services.splice(index, 1);
        temp_services.services = services
        let temp_popup_array1 = temp_popup_array.slice(0, index);
        let temp_popup_array2 = temp_popup_array.slice(index + 1);
        temp_popup_array = temp_popup_array1.concat(temp_popup_array2);
        // temp_popup_array = temp_popup_array.splice(index,1);
        console.log("temp_popup_array", index, temp_popup_array);
        this.setState({
            AddServices,
            temp_popup_array,
            temp_services
        }, () => this.createAllotedTabel());
    }

    showServices = () => {
        let amount_to_be_used = this.state.amount_to_be_used;
        if (parseFloat(this.state.amount_to_be_used) >= parseFloat(this.state.services_charge)) {
            amount_to_be_used = parseFloat(this.state.services_charge);
        }
        this.setState({
            amount_to_be_used,
            servicesList: this.state.servicesList ? false : true
        })
    }

    saveServices = async () => {
        let AddServices = { ...this.state.AddServices };
        let date = moment(new Date()).format(dateFormat);
        let forFilter = { ...this.state.forFilter }
        if (!window.localStorage.getItem('Local')) {
            toast.error('por favor selecione um local');
            return;
        }
        if (this.props.forfutureInvoice == 0) {
            if (this.state.services_charge > this.state.entity_details.currentEntityBalance) {
                toast.error('Você não tem saldo suficiente');
                return;
            }
        }
        let temp_services = { ...this.state.temp_services };
        // console.log("good morning",temp_services);
        // console.log("deadline date",this.state.forFilter.date);
        let temp_services_req = {};
        temp_services_req['entity_id'] = temp_services['entity_id'];
        temp_services_req['total_amount'] = temp_services['total_amount'];
        // temp_services_req['future_payment'] = temp_services['future_payment'];
        temp_services_req['future_payment'] = this.state.future_payment;
        temp_services_req['deadline_date'] = this.state.future_payment ? this.state.deadline_date : null;
        if (this.state.future_payment === 1 && parseFloat(this.state.amount_to_be_used) > 0) {
            temp_services_req['amount_to_be_used'] = this.state.future_payment ? parseFloat(this.state.amount_to_be_used) : null;
        }
        temp_services_req['local'] = window.localStorage.getItem('Local');
        temp_services_req['total_services_amount'] = 0;
        temp_services_req['total_service_tax'] = 0;
        temp_services_req['total_valor_cativo_tax'] = 0;
        temp_services_req['services'] = [];
        temp_services['services'].map((value, index) => {
            temp_services_req['total_services_amount'] += parseFloat(value['complete_services_amount']);
            temp_services_req['total_service_tax'] += parseFloat(value['service_tax'], 2);
            temp_services_req['total_valor_cativo_tax'] += parseFloat(value['valor_cativo']);
            temp_services_req['services'].push({
                'service_id': value['id'],
                'unit': value['QT'],
                'per_services_amount': value['Valor UN'],
                // 'complete_services_amount':value['complete_services_amount'],
                'complete_services_amount': 0,
                'tax_id': value['tax_id'],
                'tax_type': value['tax_type'],
                'tax_percent': value['tax_percent'],
                'service_tax': value['service_tax'],
                'valor_cativo': value['valor_cativo'],
                'date': date,
                'valor': value['Valor']
            })
        })
        let api = "Revenue/Create";
        let res = await services.apiCall.requestApi(api, temp_services_req, 'post');
        if (res) {
            this.showFinaltable(res, temp_services['entity_id']);
        }
    }

    showFinaltable(data, entity_id) {
        //   data = [{"id":114,"ref_id":0,"ref_table":null,"document_type":"Invoice","document_url":null,"invoice_url":"StaticFiles/Invoice114_2020-11-0912.Pdf","document_size":null,"status":null,"cancel_invoice":null,"issue_date_time":"2020-10-14T10:29:24.613","deadline_date":"2020-10-30T00:00:00","flag":null,"extra_text":"Added","no":"2020-11-0912","pag_limit":null,"entity_id":10378872,"remove_tax":null,"is_paid":0,"total_item":1,"is_doc_generated":0,"for_invoice_id":null,"local":null,"iva":null,"amount_paid":500,"total_amount":2000,"amount_to_be_used":500,"service_tax":0,"valor_cativo":0,"busEntidade":{"codEntidade":41637,"nome":"4 PARTES - EMPREENDIMENTOS IMOBILIÁRIOS, UNIPESSOAL LDA","nifap":"10378872","codPais2nif":10,"nif":"502429917","codNaturezaJuridica2":34,"codRegimeIva2":2,"codCae2":68100,"dataInicioAtividade":"1990-10-16T00:00:00Z","codCirs2":null,"codPais2nacionalidade":10,"bi":null,"biValidade":null,"dataNascimento":null,"sexo":null,"codPais2moradaFiscal":10,"moradaFiscal":"RUA PEDRO HOMEM DE MELLO, Nº 334","localFiscal":"ALDOAR, FOZ DO DOURO E NEVOGILDE","localidadeFiscal":"PORTO","codigoPostalFiscal1":"4150","codigoPostalFiscal2":"598","codNut2":1,"formaObrigar":"ASSINATURA DE QUALQUER GERENTE OU ASSINATURA DE MANDATÁRIO OU PROCURADOR","codigoAcessoCartaoElec":"3135-8038-2072","codConservatoria2":275,"dataMatriculaConservatoria":"1990-10-16T00:00:00Z","dataEmissaoCRC":null,"codigoCertidaoPermanente":"3135-8038-2072","dataSubscricaoConservatoria":"2019-12-03T00:00:00Z","dataValidadeConservatoria":"2020-12-03T00:00:00Z","codTipoDiploma2":null,"numDR":null,"anoDR":null,"registoDefinitivo":null,"numMaxAssinaturas":"1","codDis":13,"codCon":12,"codConAux":1312,"codFrg":"16","ivdp_validado":null,"ivdp_numero":null,"ivdp_designacaoReduzida":null,"ivdp_codPaisEntidade":null,"ivdp_passaporte":null,"ivdp_dataValidadePassaporte":null,"ivdp_observacoes":null,"ivdp_website":null,"ivdp_codClassificacao":null,"ivdp_numIvv":null,"ivdp_numCasaDouro":null,"ivdp_numIvp":null,"ivdp_moradaCorrLinha1":null,"ivdp_moradaCorrLinha2":null,"ivdp_moradaCorrCodigoPostal1":null,"ivdp_moradaCorrCodigoPostal2":null,"ivdp_moradaCorrLocalidade":null,"importadoIfap":true,"ivdp_ativo":true},"allTransaction":[{"id":161,"parent_id":0,"currency_id":4,"invoice_id":114,"local":null,"billing_id":17,"vat_no":null,"entity_id":10378872,"entityacc_Id":0,"cashier_Id":44,"trans_no":null,"trans_type":"DR","trans_msg":"CDW  ","trans_method_id":5,"total_cr":null,"total_dr":500,"trans_date":"2020-10-14T10:29:24.66","base_currency":null,"trans_currency":null,"created_at":"2020-10-14T10:29:24.66","deleted_at":null,"comment":null,"captive_balance":0,"vat_rate":0,"current_balance":1678.9900000000002,"transactionDetail":null,"issueDocumentDetail":null,"billingAddressDetail":null,"debitDetai":null,"busEntidadeDetail":null,"bank":null,"useful_cashier":null,"cashier_place":null,"nome":null,"despagerecord":null,"accumulated_previous":0,"bead_no":0,"username":null}]}]
        let finalInvoiceTable = null;
        if (Array.isArray(data)) {
            toast.success('movimento alocado com sucesso');
            let columnkeyMap = {
                "no": "Referência",
                "Invoice_date": "Data",
                "local": "Caixa",
                "Amount_paid": "Quantia paga",
                "total_amount": "Total Valor",
                "invoiced_amount": "Valor Faturado"
            };
            var invoicecode=[];
            let actionbuttons = { Invoice_File: "Fatura" };
            data.map((_row, index) => {
                if (_row.invoiceHistory) {
                    _row.invoiceHistory.map((_r, i) => {
                        invoicecode=[];
                        if(_r.file_Link && _r.invoiceType){
                            invoicecode= _r.invoiceType.split("-");
                            if(invoicecode[0]==="IVF" || invoicecode[0]==="IVP" || invoicecode[0]=== "API"){
                                _row.document_url = "/api/" + _r.file_Link.replace("file:///C:/DevelopmentIVPD", "");
                            } else {
                                _row.invoice_url = "/api/" + _r.file_Link.replace("file:///C:/DevelopmentIVPD", "");
                            }
                        }
                    })
                }
                if (_row.document_type == "Invoice") {
                    _row.document_type = "Movements"
                }
                Object.keys(columnkeyMap).map(function (key) {
                    if (key === "n doc") {
                        _row[columnkeyMap[key]] = _row.no
                    } else if (key === "Entidade") {
                        _row[columnkeyMap[key]] = _row.busEntidade.nome

                    } else if (key === "Sinal") {
                        _row[columnkeyMap[key]] = _row['flag'];
                    } else if (key === "Invoice_date" || key === "issue_date_time") {
                        _row[columnkeyMap[key]] = moment(_row['issue_date_time']).format(dateFormat);
                    } else if (key === "pag_limit") {
                        _row[columnkeyMap[key]] = _row['deadline_date'] ? moment(_row['deadline_date']).format(dateFormat) : moment(_row['issue_date_time']).format(dateFormat);
                    } else if (key === "is_doc_generated") {
                        _row[columnkeyMap[key]] = parseInt(_row['is_doc_generated']) === 1 ? "Sim" : "Não";
                    } else if (key === "Interest_to_date") {
                        _row[columnkeyMap[key]] = services.money.format(_row.service_tax);
                    } else if (key === "Valor c/ IVA") {
                        _row[columnkeyMap[key]] = services.money.format(_row.total_amount);
                    } else if (key === "valor_cativo") {
                        _row[columnkeyMap[key]] = services.money.format(_row.valor_cativo);
                    } else if (key === "Valor IVA") {
                        _row[columnkeyMap[key]] = services.money.format(_row.iva);
                    } else if (key === "add_Amonut_text") {
                        _row[columnkeyMap[key]] = _row.allTransaction && _row.allTransaction[0] ? _row.allTransaction[0].comment : "";
                    } else if (key === "for_invoice_id") {
                        _row[columnkeyMap[key]] = _row.for_invoice_id ? "Pagamento da Fatura" : "Pagamento Antecipado";
                    } else if (key === "is_paid") {
                        _row[columnkeyMap[key]] = _row[key] === 0 ? "Pendente" : "Não Pendente";
                    } else if (key === "Amount_paid") {
                        _row[columnkeyMap[key]] = services.money.format(_row['amount_paid']);
                    } else if (key === "outgoingAmount" && _row['document_type'] === 'Invoice') {
                        _row[columnkeyMap[key]] = services.money.format(_row.total_amount);
                    } else if (key === "incomingAmount" && _row['document_type'] === 'Credit') {
                        _row[columnkeyMap[key]] = services.money.format(_row.total_amount);
                    } else if (key === "valor") {
                        _row["valor"] = _row.trans_type === "CR" ? _row.total_cr : "-" + _row.total_dr;
                        _row[columnkeyMap[key]] = services.money.format(_row["valor"]);
                    } else if (key === "nifap") {
                        _row[columnkeyMap[key]] = _row.busEntidadeDetail.nifap
                    } else if (key === "nome") {
                        if (_row["busEntidade"] != null) {
                            _row[columnkeyMap[key]] = _row["busEntidade"][key]
                        }
                        else {
                            _row[columnkeyMap[key]] = _row.busEntidadeDetail.nome
                        }
                    } else if (key === "trans_date") {
                        _row[columnkeyMap[key]] = moment(_row['trans_date']).format(dateFormat);
                    } else if (key === "current_balance") {
                        _row[columnkeyMap[key]] = services.money.format(_row["current_balance"]);
                    } else if (key === "total_amount") {
                        _row[columnkeyMap[key]] = services.money.format(_row["total_amount"]);
                    } else if (key === "invoiced_amount") {
                        _row[columnkeyMap[key]] = services.money.format(parseFloat(_row["total_amount"]) - parseFloat(_row['amount_paid']));
                    }
                    else if (key === "local") {
                        _row[columnkeyMap[key]] = _row["key"] || '';
                    }
                    else
                        _row[columnkeyMap[key]] = _row[key]
                })
            });
            let columnlist = Object.keys(columnkeyMap).map(function (key) {
                return { field: columnkeyMap[key], columnMenuType: 'checkbox' }
            });

            finalInvoiceTable = <TlkTable
                date={new Date()}
                groupfield={[]}
                notAction={false}
                noDownloadButton={true}
                list={data}
                actionbuttons={actionbuttons}
                columnlist={columnlist}
                ActionPerform={(action, id) => this.ActionPerform(action, id)} />
        }
        this.setState({
            temp_services: {},
            deadline_date: null,
            future_payment: null,
            temp_popup_array: [],
            AddServices: {},
            amount_to_be_used: 0,
            servicesList: this.state.servicesList ? false : true,
            finalInvoiceTable
        }, () => this.getEntityDetails(entity_id))
    }

    handleCheck = () => {
        this.setState({
            future_payment: this.state.future_payment === 1 ? 0 : 1
        })
    }

    handleDate = (e) => {
        console.log("valueof e", e._d);
        this.setState({
            deadline_date: moment(e._d, dateFormat)
        })
    }

    disabledDate = (current) => {
        return current && current <= moment().startOf('day');
    }

    tarnsectiondatePiceker = (date = "") => {

        let datePicker = "";
        datePicker = (<DatePicker
            className="form-control"
            size="middle"
            disabledDate={this.disabledDate}
            placeholder="Data de Pagamento"
            format={dateFormat}
            onChange={this.handleDate}
        />)

        if (date) {
            date = moment(date).format(dateFormat);
            datePicker = (<DatePicker
                className="form-control"
                size="middle"
                disabledDate={this.disabledDate}
                placeholder="Data de Pagamento"
                value={moment(date, dateFormat)}
                format={dateFormat}
                onChange={this.handleDate}
            />)
        }
        console.log("date check", datePicker);
        return datePicker;
    }

    amount_to_be_used = (e) => {
        if (parseFloat(e.target.value) > parseFloat(this.state.entity_details.currentEntityBalance)) {
            e.target.value = parseFloat(this.state.entity_details.currentEntityBalance).toFixed(2);
        }
        if (parseFloat(e.target.value) < 0) {
            e.target.value = 0
        }
        this.setState({
            amount_to_be_used: e.target.value
        })
    }

    render() {
        return (
            <div >
                <SearchFilter showEntity={true} filters={filters} handleFilter={(data) => this.handleFilter(data)} data={this.state.data} getFilter={(data) => this.getFilters(data)} />
                {/* {
                        <RevenueEntityAction
                            entity_details={this.state.entity_details}
                            closePopup={() => this.closePopup()}
                            Actionlist={{valor:true,Movimento:false,recibo:false}}
                            date={new Date()}
                            parsed={this.props.parsed}
                            userPage="caxica"
                            getEntityDetails={(id) => this.getEntityDetails(id)}
                        />
                } */}

                {
                    this.state.entity_details &&
                    <div className="row">
                         {
                            this.state.entity_details &&
                            <div className="col-md-4">
                                <div className="input-box  active-grey">
                                    <label className="input-label">Saldo actual</label>
                                    <input type="text" className="input-1" readOnly={true}
                                        value={services.money.format(this.state.entity_details.currentEntityBalance)} />
                                </div>
                            </div>
                        }
                        {
                            !this.state.servicesList && parseFloat(this.state.amount_to_be_used) > 0 && this.state.future_payment === 1 &&
                            <div className="col-md-4">
                                <div className="input-box  active-grey">
                                    <label className="input-label">Quantidade usada do saldo antecipado</label>
                                    <input type="text" className="input-1" readOnly={true}
                                        value={services.money.format(this.state.amount_to_be_used)} />
                                </div>
                            </div>
                        }
                        {
                            !this.state.servicesList && this.state.services_charge > 0 &&
                            <div className="col-md-4">
                                <div className="input-box  active-grey">
                                    <label className="input-label">Valor será faturado</label>
                                    <input type="text" className="input-1" readOnly={true}
                                        value={services.money.format(this.state.services_charge - this.state.amount_to_be_used)} />
                                </div>
                            </div>
                        }

                        {
                            this.state.servicesList ?
                                <div className="login-details-form">
                                    <a href="#" onClick={() => this.SetAllServices()} className="mr-2 k-button btn-theme k-primary">Adicionar</a>
                                    <ul className="nav nav-tabs">
                                        {
                                            servicesMenuArray.map((_option, i) => (
                                                i !== 8 ?
                                                    <li className="nav-item" key={i}>
                                                        <a className="nav-link" data-toggle="tab" onClick={() => this.popupTabTable(_option.main)} href={`#index-${i}`}>{_option.main}</a>
                                                    </li>
                                                    :
                                                    <li className="nav-item" key={i}>
                                                        <a className="nav-link" data-toggle="tab" href={`#index-${i}`}>{_option.main}</a>
                                                    </li>
                                            ))
                                        }
                                    </ul>
                                    <div className="tab-content">
                                        {
                                            servicesMenuArray.map((_option, i) => (
                                                i < 8 ?
                                                    <div className="tab-pane container fade" key={i} id={`index-${i}`}>
                                                        <h5>{_option.name}</h5>
                                                        {
                                                            i === 6 &&
                                                            <>
                                                                {

                                                                    <div className="row">
                                                                        <div className="col-md-3" style={{ paddingLeft: '80px' }}>
                                                                            <div className="custom-control custom-checkbox">
                                                                                <input type="checkbox" checked={this.state.future_payment} onChange={() => this.handleCheck()} className="custom-control-input" id="customCheck" name="future_payment" />
                                                                                <label className="custom-control-label" for="customCheck">Generate Invoice</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <div className="input-box  active-grey">
                                                                                <label className="input-label">Valor total dos serviços com imposto</label>
                                                                                <input type="text" className="input-1" readOnly={true}
                                                                                    value={services.money.format(this.state.services_charge)} style={{ height: "35px" }} />
                                                                            </div>
                                                                        </div>
                                                                        {

                                                                            this.state.future_payment === 1 &&
                                                                            <div className="col-md-3">
                                                                                <div className="input-box  active-grey">
                                                                                    {
                                                                                        this.tarnsectiondatePiceker(this.state.deadline_date)
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                        {

                                                                            this.state.future_payment === 1 &&
                                                                            <div className="col-md-3">
                                                                                <div className="input-box  active-grey">
                                                                                    <label className="input-label">Quantidade usada do saldo antecipado</label>
                                                                                    <input type="number" className="input-1"
                                                                                        onChange={(e) => this.amount_to_be_used(e)}
                                                                                        name="amount_to_be_used"
                                                                                        min={0}
                                                                                        max={this.state.entity_details.currentEntityBalance}
                                                                                        value={this.state.amount_to_be_used} style={{ height: "35px" }} />

                                                                                </div>
                                                                            </div>
                                                                        }

                                                                    </div>



                                                                }
                                                            </>
                                                        }
                                                        {
                                                            i === 7 &&
                                                            <div style={{ marginTop: "30px", display: "inline-flex" }}>
                                                                <input type="text" placeholder="valor" />
                                                                <Button primary={true} className="k-button btn-theme mr-2 k-primary">INSERIR</Button>
                                                            </div>
                                                        }
                                                        <div style={{ marginTop: "20px" }}>
                                                            {
                                                                this.state.telkikTable
                                                            }
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="tab-pane container fade" key={i} id={`index-${i}`}>
                                                        <h5 style={{ marginTop: "20px" }} >{_option.name}</h5>
                                                        <textarea placeholder="Observacos" style={{ width: "90%" }} rows={6} />
                                                    </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                :
                                <div className="login-details-form">
                                    <a href="#" onClick={() => this.showServices()} className="mr-2 k-button btn-theme k-primary">Serviços ou Artigos</a>
                                    {
                                        this.state.services_charge > 0 &&
                                        <a href="#" onClick={() => this.saveServices()} className="mr-2 k-button btn-theme k-primary">Finalizar</a>

                                    }

                                    <div style={{ marginTop: "20px" }}>
                                        {
                                            this.state.telkikTable
                                        }
                                    </div>
                                </div>
                        }
                        {
                            this.state.finalInvoiceTable &&
                            <div style={{ marginTop: "20px" }}>
                                {
                                    this.state.finalInvoiceTable
                                }
                            </div>
                        }
                    </div>
                }
            </div>

        );
    }
}
export default RevenueServicesAllot;