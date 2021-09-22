import React from 'react';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons'
import { Calendar } from 'react-calendar';
import { DatePicker, Select } from 'antd'
import SearchFilter from '../filters/SearchFilter';
import Main from '../../Pages/Demo/main';
import services from '../../services';
import RevenueSecondModalForm from '../Revenue/secondModalReceitas';
import $ from 'jquery'
import InstructionMessage from '../VidimaModule/Modal/InstructionMessage';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import TlkTable from '../tlelrik/table/tlkTable';
import EntityFilter from './EntityFilter';
import { toast } from 'react-toastify';
import EntityAddress from './EntityAddress';
var moment = require('moment')
const dateFormat = "YYYY-MM-DD";

let listdefaultRequest = { "Filters": null, "SortBy": "", "IsSortTypeDESC": false, "IsPagination": false, "Page": 1, "PageSize": 100 }

let defaultRequest = {
    "Filters": null,
    "SortBy": "",
    "IsSortTypeDESC": true,
    "IsPagination": false,
    "Page": 2,
    "PageSize": 2
};
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
    'Abertura': {
        telrikApi: '',
        dataApi: 'Revenue/OpenCloseAmount/GetByDateCaixa',
        dataRequest:
        {
            date: moment(new Date()).format(dateFormat),
            caixa: "porto"
        },
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
        popUpHeadingFirst: "Abertura de caixa",
        requestMethod: "post",
        popUpHeadingsecond: "Lorem Ipsom",
        groupfield: []
    },
    'Fecho': {
        telrikApi: '',
        dataApi: 'Revenue/BoxClasp',
        dataRequest:
        {
            date: moment(new Date()).format(dateFormat),
            "Filters": null,
            "SortBy": "",
            "IsSortTypeDESC": false,
            "IsPagination": false,
            "Page": 1,
            "PageSize": 100
        },
        tabWiseApi: {
            1: {
                //  api: '/Vindima/FilesCreateBank/GetAll',
                columnkeyMap: {
                    "type": "Tipo",
                    "unit_amount": "Valor",
                    "quantity": "Qt",
                    "valor_total": "Valor total"
                },
                notAction: true,
                actionbuttons: { Edit: false, Redirect: false, Delete: false }
            },
            2: {
                //  api: '/Vindima/LQBase/getall',
                columnkeyMap: {
                    "trans_no": "nº movimento",
                    "comment": "descrição",
                    "trans_type": "operação",
                    "total_dr": "valor",
                    "description_pag_per_rec": "descrição pag./rec.",
                },
                notAction: true,
                actionbuttons: { Edit: true, Redirect: false, Delete: true }
            },
            3: {
                // api: '/Vindima/PaymentNotSent/GetAll',
                columnkeyMap: {
                    "trans_date": "Data entrada",
                    "useful_cashier": "Util. caixa",
                    "bank": "Banco",
                    "trans_no": "Nº Cheque",
                    "nome": "Entidade",
                    "total_cr": "Valor",
                },
                notAction: true,
                actionbuttons: { Edit: true, Redirect: false, Delete: true }
            },
            4: {
                // api: '/Vindima/PaymentNotSent/GetAll',
                columnkeyMap: {
                    "trans_date": "Data entrada",
                    "useful_cashier": "Util. caixa",
                    "bank": "Banco",
                    "trans_no": "Nº Cheque",
                    "nome": "Entidade",
                    "total_cr": "Valor",
                },
                notAction: true,
                actionbuttons: { Edit: true, Redirect: false, Delete: true }
            },
            5: {
                // api: '/Vindima/PaymentNotSent/GetAll',
                columnkeyMap: {
                    "trans_date": "Data entrada",
                    "useful_cashier": "Util. caixa",
                    "bank": "Banco",
                    "trans_no": "Nº Cheque",
                    "nome": "Entidade",
                    "total_cr": "Valor",
                },
                notAction: true,
                actionbuttons: { Edit: true, Redirect: false, Delete: true }
            },
            6: {
                //api: '/Vindima/PaymentConfirmation/getall',
                columnkeyMap: {
                    "nº talão": "nº talão",
                    "descrição": "descrição",
                    "Cheque": "Cheque",
                    "numerário": "numerário",
                    "Valor total": "Valor total"
                },
                notAction: true,
                actionbuttons: { Edit: true, Redirect: false, Delete: true }
            }

        }
    },
    'Conta corrente': {
        apidatakey: "issueDocumentDetails",
        columnkeyMap: {
            "ref_id": "nº doc",
            "document_type": "tipo",
            "deadline_date": "data",
            "user": "Utilizador",
            "Valor total": "Valor (c/ iva)",
            "vat": "iva",
            "accumulated": "acumulado"
        },

        actionbuttons: { Edit: false, commonPopup: "Documento associado", Delete: false }
    },

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


class RevenueModalForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            dataApidata: [],
            listData: [],
            popUpDetail: {},
            filterData: {},
            telkikTable: "",
            propRow: {},
            tipoList: [],
            popUpForm: '',
            forFilter: {},
            form: {},
            AddServices: {},
            servicesTax: 0,
            services_charge: 0,
            amountDetails: [],
            entity_details: {
                busEntidade: {},
                currentEntityBalance: 0,
                billingAddress: []
            },
            busentdistrito: [],
            busentconcelho: [],
            BusEntFreguesia: [],
            AmountDetailsInputs: null,
            PaymentMethod_id: null,
            billingAddress_id: null,
            tabWiseApiData: {},
            RequiredDetails: {
                dr_Recipts: {},
                cr_Depósitos: {},
                Balance_next_day_details: {}
            }
        }
    }

    componentDidMount() {
        this.getcurrencyList();
        this.getTaxList();
        this.getTransMethods();
        this.popupTabTable(this.props.tab)
    }

    componentDidUpdate(preProp) {
        if (preProp.date != this.props.date) {
            this.popupTabTable(this.props.tab)
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

    popupTabTable = (tabName) => {
        let popUpDetail = tabDetailArray[this.props.tab] ? tabDetailArray[this.props.tab] : {}
        let form = {}
        if (this.props.Invoice) {
            let paid = this.props.Invoice.amount_paid || 0
            form.total_cr = parseFloat((parseFloat(this.props.Invoice.total_amount) - parseFloat(paid)), 2)
        }
        this.setState({
            form,
            popUpDetail,
            entity_details: this.props.entity_details,
            forFilter: this.props.data | {}
        }, () => {
            this.getPopUpListData(tabName)
        })
    }

    getPopUpListData = async (tabName = "") => {
        if (this.state.popUpDetail.api && listdefaultRequest) {
            let Request = listdefaultRequest;
            let link = this.state.popUpDetail.api;
            let res = await services.apiCall.requestApi(link, Request, 'post')
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
                }
            }
        } else if (this.state.popUpDetail.apidatakey) {
            let res = this.props.completeData[this.state.popUpDetail.apidatakey];
            let totalDeatils = this.getDepositorsDetails(this.props.completeData.allTransaction);
            console.log("totalDeatils", totalDeatils);
            if (!res) {
                return
            }
            if (this.state.popUpDetail.columnkeyMap) {
                let columnkeyMap = this.state.popUpDetail.columnkeyMap;
                res.map((_row, index) => (
                    Object.keys(columnkeyMap).map(function (key) {
                        if (key === "deadline_date") {
                            _row[columnkeyMap[key]] = moment(_row[key]).format(dateFormat);
                        } else if (totalDeatils[0][key]) {
                            _row[columnkeyMap[key]] = totalDeatils[0][key]
                        } else
                            _row[columnkeyMap[key]] = _row[key]
                    })
                ));
            }
            this.setState({
                data: res,
                filterData: res,
                totalcount: res.length
            }, () => this.createTabel());
        } else if (this.state.popUpDetail.tabWiseApi && this.state.popUpDetail.tabWiseApi[tabName]) {
            let popUpDetail = this.state.popUpDetail.tabWiseApi[tabName];

            let res = []
            if (this.props.tab === "Adicionar Movimento") {
                this.getDocumentlist(tabName);
            } else {
                res = this.getSpecificTransection(tabName);
                if (popUpDetail.columnkeyMap) {
                    let columnkeyMap = popUpDetail.columnkeyMap;
                    res.map((_row, index) => (
                        Object.keys(columnkeyMap).map(function (key) {
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
        this.getDataApi()
    }

    createSpecificTable = async (tabName) => {
        let Request = this.state.popUpDetail.dataRequest;
        Request.transMethodId = tabName;
        Request.date = this.state.forFilter.date
        let link = "Revenue/CashValues";
        let tabWiseApiData = this.state.popUpDetail.tabWiseApi[tabName];
        let res = await services.apiCall.requestApi(link, Request, 'post')
        let data = [];
        if (res) {
            if (tabName === 2) {
                res.map((r, i) => {
                    if (r.transactionDetail) {
                        r.transactionDetail.map((_row) => {
                            _row.type = "Cash"
                            _row.valor_total = parseFloat(_row.unit_amount) * parseFloat(_row.quantity)
                            data.push(_row)
                        })
                    }
                })
            } else if (tabName === 6) {
                data = this.getDepositorsDetails(res)
            } else {
                data = res;
            }
        }
        tabWiseApiData.data = data;
        this.setState({
            tabWiseApiData
        }, () => {
            this.SpecificTableGenerate()
        })
    }

    getDepositorsDetails = (data) => {
        let RequiredDetails = {
            "nº talão": "",
            "descrição": "",
            "Cheque": 0,
            "numerário": 0,
            "Valor total": 0,
            "user": "",
            "totalAmount": 0,
            "vat": 0,
            "accumulated": 0,
            "Quantity_total": 0
        };

        data.map((r, i) => {
            RequiredDetails["nº talão"] = r.bead_number;
            RequiredDetails["descrição"] = r.comment;
            RequiredDetails["user"] = r.useful_cashier;
            RequiredDetails["vat"] = r.vat_rate
            RequiredDetails["accumulated"] = r.accumulated_previous;
            if (r.trans_type == "CR") {
                RequiredDetails[r.trans_method] = RequiredDetails[r.trans_method] ? RequiredDetails[r.trans_method] + parseFloat(r.total_cr) : parseFloat(r.total_cr);
                RequiredDetails["Valor total"] += parseFloat(r.total_cr);
            } else {
                RequiredDetails["Valor total"] += parseFloat(r.total_dr)

            }
        });
        return [RequiredDetails];
    }

    SpecificTableGenerate = () => {

        let tabWiseApiData = { ...this.state.tabWiseApiData };
        let actionbuttons = tabWiseApiData.actionbuttons;
        let columnkeyMap = tabWiseApiData.columnkeyMap;
        let columnlist = Object.keys(columnkeyMap).map(function (key) {
            return { field: columnkeyMap[key], columnMenuType: 'checkbox' }
        });



        tabWiseApiData.data.map((_row) => {
            Object.keys(columnkeyMap).map(function (key) {
                if (_row[key]) {
                    _row[columnkeyMap[key]] = _row[key]
                }
            })
        })

        let telkikTable = <TlkTable
            date={new Date()}
            totalWidth={1020}
            groupfield={tabWiseApiData.groupfield}
            notAction={tabWiseApiData.notAction || false}
            modulename={this.props.tab}
            deleteFunc={(id) => this.handleDelete(id)}
            novo={true}
            list={tabWiseApiData.data}
            actionbuttons={tabWiseApiData.actionbuttons}
            columnlist={columnlist}
            ActionPerform={(action, id) => this.ActionPerform(action, id)} />

        this.setState({
            telkikTable: telkikTable
        })
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
        return returnArray;
    }

    getSpecificTransection = (tabName) => {

        let allTransaction = this.props.completeData.allTransaction;
        let returnArray = [];
        allTransaction.map((_r, i) => {
            if (tabName === _r.trans_msg) {
                if (!returnArray[i])
                    returnArray[i] = {}
                returnArray[i]["TP"] = _r.trans_type;
                returnArray[i]["Ano"] = moment(_r['trans_date']).format('Y');
                returnArray[i]["Num"] = _r.trans_no;
                returnArray[i]["descrição"] = _r.comment
                returnArray[i]["data"] = moment(_r['trans_date']).format(dateFormat);
                returnArray[i]["valor"] = _r.trans_type === "CR" ? _r.total_cr : _r.total_dr;
                returnArray[i]["iva"] = _r.vat_rate;
                returnArray[i]["Valor cat."] = _r.trans_type;
                returnArray[i]["Contab"] = _r.trans_msg;

                if (_r.transactionDetail) {
                    _r.transactionDetail.map((_row, _k) => {
                        returnArray[i]["Qt"] = returnArray[i]["Qt"] ? returnArray[i]["Qt"] + parseInt(_row.quantity) : parseInt(_r.quantity);
                        returnArray[i]["Un"] = returnArray[i]["Un"] ? returnArray[i]["Un"] + parseInt(_row.unit_amount) : parseInt(_r.unit_amount);
                    })
                }
            }
        });
        return returnArray;
    }

    getDataApi = async () => {
        if (this.state.popUpDetail.dataApi) {
            let Request = { ...this.state.popUpDetail.dataRequest };
            if (Request.Filters) {
                Request.Filters = { ...Request.Filters, ...this.state.forFilter }
            } else {
                Request = { ...Request, ...this.state.forFilter }
            }
            let link = this.state.popUpDetail.dataApi;
            let res = await services.apiCall.requestApi(link, Request, 'post')
            if (res) {
                this.setState({
                    dataApidata: res,
                }, () => {
                    this.getRequiredDetails(res);
                })
            } else {
                this.setState({
                    dataApidata: {},
                    form: Request
                })
            }
        }
    }

    onChange = (e) => {
        let form = { ...this.state.form }
        let name = e.target.name;
        let value = e.target.value;
        if (e.target.type === 'number') {
            value = parseFloat(value);
        }
        form[name] = value;
        this.setState({
            form
        })
    }

    getRequiredDetails = (data) => {
        let RequiredDetails = {
            displayName: "",
            date: this.state.popUpDetail.dataRequest.date,
            Previou_balance: 0,
            Total_receipt: 0,
            Deposits: 0,
            Commision: 0,
            Other_movements: 0,
            Balance_next_day: 0,
            cashier_place: ""
        };

        let dr_Recipts = {
            Multibanco: 0,
            Cheque: 0,
            Numerário: 0,
            Outro_meio: 0,
        };
        let cr_Depósitos = {
            Multibanco: 0,
            Bancário: 0,
        };
        let Balance_next_day_details = {
            Cheque: 0,
            Numerário: 0,
            Numerário_sub_caixas: 0,
        }
        if (!Array.isArray(data)) {
            this.setState({
                form: data
            })
        }
        else {
            data.map((r, i) => {
                if (i === 0) {
                    RequiredDetails.displayName = r.displayName;
                    RequiredDetails.cashier_place = r.cashier_place

                    RequiredDetails.date = r.trans_date
                    if (r.trans_type == "CR")
                        RequiredDetails.Previou_balance = parseFloat(r.current_balance) - parseFloat(r.total_cr);
                    else
                        RequiredDetails.Previou_balance = parseFloat(r.current_balance) + parseFloat(r.total_dr);
                }
                RequiredDetails.Balance_next_day = r.current_balance
                RequiredDetails.Total_receipt = i + 1;
                if (r.trans_type == "CR") {
                    RequiredDetails.Deposits += parseFloat(r.total_cr);
                    cr_Depósitos[r.trans_method] = cr_Depósitos[r.trans_method] ? cr_Depósitos[r.trans_method] + parseFloat(r.total_cr) : parseFloat(r.total_cr);
                } else {
                    if (r.trans_method === "Commision")
                        RequiredDetails.Commision += parseFloat(r.total_dr);
                    else {
                        RequiredDetails.Other_movements += parseFloat(r.total_dr);
                    }
                    dr_Recipts[r.trans_method] = dr_Recipts[r.trans_method] ? dr_Recipts[r.trans_method] + parseFloat(r.total_dr) : parseFloat(r.total_dr)
                }
            });
            RequiredDetails.dr_Recipts = dr_Recipts;
            RequiredDetails.cr_Depósitos = cr_Depósitos;
            RequiredDetails.Balance_next_day_details = Balance_next_day_details;
            console.log("RequiredDetails", RequiredDetails);
            this.setState({
                RequiredDetails
            })
        }

    }

    handleFilter = (data) => {
        this.setState({
            filterData: data
        }, () => this.createTabel())
    }

    createTabel = () => {
        console.log("tax_list", this.state.tax_list);
        let actionbuttons = this.state.popUpDetail.actionbuttons;
        let columnkeyMap = this.state.popUpDetail.columnkeyMap;
        let columnlist = Object.keys(columnkeyMap).map(function (key) {
            return { field: columnkeyMap[key], columnMenuType: 'checkbox' }
        });
        let data;
        if (this.state.popUpDetail.api === "/Revenue/Artigo/GetAll") {
            data = this.state.filterData;
        }
        else {
            data = null;
        }


        let telkikTable = (<TlkTable
            date={new Date()}
            totalWidth={1020}
            groupfield={this.state.popUpDetail.groupfield}
            notAction={this.state.popUpDetail.notAction}
            list={data}
            tax_list={this.state.tax_list}
            modulename={this.props.tab}
            deleteFunc={(id) => this.handleDelete(id)}
            actionbuttons={actionbuttons}
            columnlist={columnlist}
            ActionPerform={(action, id) => this.ActionPerform(action, id)} />)

        this.setState({
            telkikTable: telkikTable
        })
    }

    handleDate = (e) => {
        let date = e && e._d && moment(e._d).format(dateFormat) || ""
        let forFilter = { ...this.state.forFilter }
        forFilter.date = date;
        this.setState({
            forFilter
        }, () => this.getDataApi());
    }

    disabledDate = (current) => {
        if (this.state.forFilter && this.state.forFilter.date) {
            return current > moment(this.state.forFilter.date).endOf('day');
        }
        if (this.props.previousDate) {
            return current > moment(this.props.previousDate).endOf('day');
        }
        if (this.props.forfutureInvoice === 1) {
            return current && current < moment().endOf('day');
        }
        return current && current > moment().endOf('day');
    }


    tarnsectiondatePiceker = (date = "") => {

        let datePicker = "";
        if (date == "") {
            if (this.props.previousDate)
                date = moment(this.props.previousDate).format(dateFormat);
            else
                date = moment(new Date()).format(dateFormat);
        }
        datePicker = (<DatePicker
            className="form-control"
            size="middle"
            disabledDate={this.disabledDate}
            placeholder="Data de transecção"
            value={moment(date, dateFormat)}
            format={dateFormat}
            onChange={this.handleDate}
        />)
        return datePicker;
    }

    ActionPerform = (action, row) => {
        if (action === 'Redirect') {
            let popUpForm = (
                <RevenueSecondModalForm tab={this.props.tab} closePopup={() => this.closePopup()} row={row} />
            )
            this.setState({
                popUpForm
            })
            $(".secmodelpopup").trigger("click");

        }
        else if (action === "Documento associado") {
            let popUpForm = (
                <RevenueSecondModalForm
                    date={new Date()}
                    tab={this.props.tab}
                    closePopup={() => this.closePopup()}
                    row={row}
                    completeData={this.props.completeData}
                />
            )
            this.setState({
                popUpForm
            })
            $(".secmodelpopup").trigger("click");
        }
        else if (action === "AddServices") {
            let AddServices = { ...this.state.AddServices }
            AddServices = row;
            console.log("services", row);
            this.setState({ AddServices }, () => this.setServicescharge())
        }
    }

    setServicescharge = () => {
        let AddServices = { ...this.state.AddServices }
        let Totalvalor = 0;
        Object.keys(AddServices).map((_r) => {
            Totalvalor += parseFloat(AddServices[_r].Valor);
        })
        let services_charge = Totalvalor + (Totalvalor * parseFloat(this.state.servicesTax) / 100)
        services_charge = parseFloat(services_charge, 2)

        this.setState({ services_charge })
    }

    closePopup = () => {
        if (this.props.closePopup) {
            this.props.closePopup();
        } else {
            $("#popup-sec-modal").trigger('click');
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

    handleRadioTypeFilter = (name, value) => {
        let forFilter = { ...this.state.forFilter }
        forFilter[name] = value;
        if (!value) return
        console.log("this.props.lastdata", this.props.lastdata);
        forFilter.date = moment(new Date()).format(dateFormat);
        if (this.props.lastdata) {
            if (value.toLowerCase() === "porto" && this.props.lastdata.portodata) {
                forFilter.date = moment(this.props.lastdata.portodata.date).format(dateFormat);

            } else if (value.toLowerCase() === "régua" && this.props.lastdata.reguadata) {
                forFilter.date = moment(this.props.lastdata.reguadata.date).format(dateFormat);

            }
        }
        console.log(forFilter)
        this.setState({
            forFilter
        }, () => this.getDataApi());

    }

    handleSubmitData = (data) => {
        console.log("DATAPROPS", data)
    }

    changeAddress = (id) => {
        let entity_details = this.state.entity_details;
        entity_details.billingAddress.map((row) => {
            if (parseInt(row.id) === parseInt(id)) {
                row.suggested = 1;
            }
            else {
                row.suggested = 0;
            }
        });
        this.setState({
            entity_details,
            billingAddress_id: id
        })
    }

    getEntityDetails = (id) => {
        if (this.props.getEntityDetails) {
            this.props.getEntityDetails(id)
        }

    }

    SetAllServices = async () => {
        let AddServices = { ...this.state.AddServices };
        let date = moment(new Date()).format(dateFormat);
        let forFilter = { ...this.state.forFilter }
        // if (!window.localStorage.getItem('Local')) {
        //     toast.error('por favor selecione um local');
        //     return;
        // }
        // if (this.props.forfutureInvoice == 0) {
        //     if (this.state.services_charge > this.props.entity_details.currentEntityBalance) {
        //         toast.error('Você não tem saldo suficiente');
        //         return;
        //     }
        // }
        let request = {
            "entity_id": parseInt(this.props.entity_details.busEntidade.nifap),
            "total_amount": parseFloat(this.state.services_charge, 2),
            "total_services_amount": 0,
            "total_service_tax": 0,
            "total_valor_cativo_tax": 0,
            "local": window.localStorage.getItem('Local'),
            "deadline_date": this.props.forfutureInvoice === 0 ? null : forFilter.date ? forFilter.date : null,
            "future_payment": this.props.forfutureInvoice,
            services: AddServices
        }


        // let complete_services_amount = 0;

        // Object.keys(AddServices).map((_key) => {
        //     complete_services_amount =
        //     request.total_services_amount += parseFloat(AddServices[_key].complete_services_amount);
        //     request.total_service_tax += parseFloat(AddServices[_key].service_tax, 2);
        //     request.total_valor_cativo_tax += parseFloat(AddServices[_key].valor_cativo);
        //     request.services.push({
        //         "service_id": AddServices[_key].id,
        //         "unit": AddServices[_key].QT,
        //         "per_services_amount": AddServices[_key]['Valor UN'],
        //         "complete_services_amount": 0,
        //         "valor": AddServices[_key].Valor,
        //         "service_tax": AddServices[_key].service_tax,
        //         "valor_cativo": AddServices[_key].valor_cativo,
        //         "tax_id": AddServices[_key].tax_id,
        //         "tax_type": AddServices[_key].tax_type,
        //         "tax_percent": AddServices[_key].tax_percent,
        //         "date": date
        //     });
        // });
        this.props.updateServiceslist(request);
        this.closePopup();
        // let api = "Revenue/Create";
        // let res = await services.apiCall.requestApi(api, request, 'post');
        // if (res) {
        //     this.closePopup();
        //     this.setState({
        //         AddServices: {}
        //     })
        // }
    }

    setPaymentMethodid = (id) => {
        console.log(id);
        this.setState({
            PaymentMethod_id: id
        })
    }

    changePaymentMethod = async () => {
        let PaymentMethod_id = this.state.PaymentMethod_id
        console.log("OKOKO");
        if (PaymentMethod_id) {
            let api = "/Revenue/UpdatePaymentMethod";
            let data = {
                "transId": parseInt(this.props.parsed.id),
                "paymentMethodId": PaymentMethod_id
            }
            let res = await services.apiCall.requestApi(api, data, 'post');
            if (res) {
                this.closePopup();
            }
        }
    }

    SetAddress = async () => {
        let billing_id = this.state.billingAddress_id;
        if (billing_id) {
            let api = "/Revenue/UpdateBillingAddess";
            let data = {
                "entityId": parseInt(this.props.entity_details.busEntidade.nifap),
                "billingId": billing_id
            }
            let res = await services.apiCall.requestApi(api, data, 'post');
            if (res) {
                this.closePopup();
            }
        } else {
            toast.success("Este endereço já foi selecionado")
            this.closePopup();
        }
    }

    getselectedEntity = (value) => {

    }

    handelChange = (e) => {
        let form = { ...this.state.form }
        form[e.target.name] = e.target.value;
        this.setState({
            form
        })
    }

    AddAmountDetails = () => {
        let amountDetails = [...this.state.amountDetails];
        amountDetails.push({});
        this.setState({
            amountDetails
        }, () => this.createAmountDetailsInputs())
    }

    updateOpenClose = async (is_open) => {

        let api = "Revenue/InsertOpenCloseAmount";
        let data = { ...this.state.form, ...this.state.forFilter }
        if (!data.caixa)
            data.caixa = "Porto";
        data.closed = is_open;
        let res = await services.apiCall.requestApi(api, data, 'post');
        if (res) {
            if (parseInt(is_open) === 0) {
                window.localStorage.setItem('cashier_open', true);
            } else {
                window.localStorage.setItem('cashier_open', false);
            }
            this.closePopup();
            window.location.reload();
        }
    }

    AddGeneralAmount = async () => {
        // if(!this.state.form.total_cr){
        //     toast.error('montante tota é um campo obrigatório');
        //     return;
        // } 
        let form = { ...this.state.form };
        let date = moment(new Date()).format(dateFormat);
        let request = {
            trans_amount: parseInt(form.pay),
            trans_date: date,
            comment: form.Comment
        }
        let api = "Revenue/GeneralAccount/Create";
        let res = await services.apiCall.requestApi(api, request, 'post');
        if (res) {
            this.setState({
                form: {}
            })
            this.closePopup();
        }
    }

    AddAdvance = async () => {
        let form = { ...this.state.form };
        if (!form.total_cr) {
            toast.error('montante tota é um campo obrigatório');
            return;
        }
        if(this.props.general_balance && parseFloat(form.total_cr) > parseFloat( this.props.general_balance.balance) ){
            toast.error("Você tem apenas "+ services.money.format(this.props.general_balance.balance) +" em sua conta geral");
            return;
        }
        let amountDetails = [...this.state.amountDetails];
       
        let date = moment(new Date()).format(dateFormat);
        let request = {
            entity_id: parseInt(this.props.entity_details.busEntidade.nifap),
            trans_no: parseInt(form.trans_no),
            trans_type: "CR",
            trans_msg: form.trans_msg,
            total_cr: parseFloat(form.total_cr),
            trans_date: date,
            currency_id: form.currency_id ? parseInt(form.currency_id) : 4,
            Comment: form.Comment,
            trans_method_id: this.state.PaymentMethod_id ? parseInt(this.state.PaymentMethod_id) : 2,
            bank: form.bank,
            move_from_general:(this.props.pageName && this.props.pageName==="general_account") ?1:0,
            bead_no: parseInt(form.bead_no),
            transactionDetail: amountDetails,
            invoice_id: this.props.Invoice ? this.props.Invoice.id : null,
            local: null // window.localStorage.getItem('Local')
        }
        let api = "Revenue/AddBalance";
        let res = await services.apiCall.requestApi(api, request, 'post');
        if (res) {
            this.setState({
                form: {}
            })
            this.closePopup();
        }
    }

    deleteAmountDetails = (index) => {
        console.log("indextodelete", index);
        let amountDetails = [...this.state.amountDetails];
        amountDetails.splice(index, 1);
        this.setState({
            amountDetails
        }, () => this.createAmountDetailsInputs())
    }

    addamountDetailsChange = (e, index) => {
        let amountDetails = [...this.state.amountDetails];
        console.log("amountDetails", index, e);
        if (e && e.target && e.target.name) {
            amountDetails[index][e.target.name] = parseInt(e.target.value);
            this.setState({
                amountDetails
            })
        }
    }

    createAmountDetailsInputs = () => {

        let inputs = this.state.amountDetails.map((row, i) => {
            console.log("index", i);
            return (
                <div className="row" key={i}>
                    <div className="col-md-5">
                        <div className="input-box  active-grey">
                            <label className="input-label">quantidade unitária</label>
                            <input type="number" className="input-1"
                                name="unit_amount"
                                onChange={(e, index) => this.addamountDetailsChange(e, i)}
                                value={row.unit_amount} />
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="input-box  active-grey">
                            <label className="input-label">quantidade</label>
                            <input type="number" className="input-1"
                                name="quantity"
                                onChange={(e, index) => this.addamountDetailsChange(e, i)}
                                value={row.quantity} />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <a href="#" onClick={(index) => this.deleteAmountDetails(i)}>Remover</a>
                    </div>
                </div>
            )
        });
        this.setState({
            AmountDetailsInputs: inputs
        })
    }

    closePopup = () => {
        if (this.props.getEntityDetails) {
            this.props.getEntityDetails(this.props.entity_details.busEntidade.nifap)
        }
        if(this.props.getCurrentGeneralAccount){
            this.props.getCurrentGeneralAccount()
        }
        this.setState({
            form: {}
        })
        $(".left-popup").trigger('click');
    }

    render() {
        if (this.props.tab === 'Add_General_Amount') {
            // console.log("Invoice",this.props.Invoice)
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">Adicionar conta geral</h4>
                        <a href="#" className="remoove mr-2" onClick={() => this.AddGeneralAmount()}>Adicionar</a>
                        <a href="#" onClick={() => this.closePopup()} className="remoove mr-2">Cancelar</a>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            {/* <div className="col-md-4">
                                <div className="input-box  active-grey">
                                    <label className="input-label">banco</label>
                                    <input type="text" className="input-1"
                                        name="bank"
                                        onChange={this.handelChange}
                                        value={this.state.form.bank || ""} />
                                </div>
                            </div> */}
                            <div className="col-md-4">
                                <div className="input-box  active-grey">
                                    <label className="input-label">Pagamento</label>
                                    <input type="text" className="input-1"
                                        name="pay"
                                        onChange={this.handelChange}
                                        value={this.state.form.pay || ""} />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="input-box active-grey">
                                    <label className="input-label">Comment</label>
                                    <textarea name="Comment" onChange={this.handelChange}
                                        defaultValue={this.state.form.Comment || ""}
                                        className="form-control heigh-auto" rows="3"
                                    ></textarea>
                                </div>
                            </div>
                            {
                                this.state.amountDetails &&
                                this.state.AmountDetailsInputs
                            }
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.props.tab === 'Add_Amount') {

            console.log("Invoice", this.props.Invoice)
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">Adicionar valor</h4>
                        <a href="#" className="remoove mr-2" onClick={() => this.AddAdvance()}>Adicionar</a>
                        <a href="#" onClick={() => this.closePopup()} className="remoove mr-2">Cancelar</a>
                    </div>
                    <div className="modal-body">
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-md-6">
                                <p><strong>Nº Entidade</strong></p>
                                <p>{this.props.entity_details.busEntidade.nifap}</p>
                            </div>
                            <div className="col-md-6">
                                <p><strong>entidade</strong></p>
                                <p>{this.props.entity_details.busEntidade.nome}</p>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-md-4">
                                <p><strong>Saldo atual</strong></p>
                                <p>{services.money.format(this.props.entity_details.currentEntityBalance)} </p>
                            </div>
                            <div className="col-md-4">
                                <p><strong>Saldo cativo</strong></p>
                                <p>{services.money.format(this.props.entity_details.captive_balance)}</p>
                            </div>
                            <div className="col-md-4">
                                <p><strong>Acumulado anterior</strong></p>
                                <p>{services.money.format(this.props.entity_details.accumulated_previous)}</p>
                            </div>
                        </div>
                        <div className="row">
                            {/* <div className="col-md-4">
                                <div className="input-box  active-grey">
                                    <label className="input-label">trans não / Verificar</label>
                                    <input type="number" className="input-1"
                                        name="trans_no"
                                        min={0}
                                        onChange={this.handelChange}
                                        value={this.state.form.trans_no || ""} />
                                </div>
                            </div> */}
                            {/* <div className="col-md-4">
                                <div className="input-box  active-grey">
                                    <label className="input-label">tipo de transecção</label>
                                    <input type="text" className="input-1"
                                        name="trans_type"
                                        onChange={this.handelChange}
                                        value={this.state.form.trans_type} />
                                </div>
                            </div> */}
                            <div className="col-md-4">
                                <div className="input-box  active-grey">
                                    <label className="input-label">montante tota</label>
                                    <input type="number" className="input-1"
                                        name="total_cr"
                                        min={0}
                                        onChange={this.handelChange}
                                        value={this.state.form.total_cr || ""} />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="input-box active-grey">
                                    {
                                        this.state.currency_list &&
                                        <select name="currency_id"
                                            className="custome-drop-down"
                                            defaultValue={this.state.form.currency_id || 4}
                                            onChange={(e) => this.handelChange(e)} >
                                            {

                                                this.state.currency_list.map((row, i) => (
                                                    <option value={row.id} key={i}>{row.currency}</option>
                                                ))
                                            }
                                        </select>
                                    }

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="input-box  active-grey">
                                    <label className="input-label">banco</label>
                                    <input type="text" className="input-1"
                                        name="bank"
                                        onChange={this.handelChange}
                                        value={this.state.form.bank || ""} />
                                </div>
                            </div>
                            {/* <div className="col-md-4">
                                <div className="input-box  active-grey">
                                    <label className="input-label">conta não</label>
                                    <input type="number" className="input-1"
                                        name="bead_no"
                                        min={0}
                                        onChange={this.handelChange}
                                        value={this.state.form.bead_no || ""} />
                                </div>
                            </div> */}
                            <div className="col-md-4">
                                <div className="input-box  active-grey">
                                    <label className="input-label">transection msg</label>
                                    <input type="text" className="input-1"
                                        name="trans_msg"
                                        onChange={this.handelChange}
                                        value={this.state.form.trans_msg || ""} />
                                </div>
                            </div>
                            <div className="col-md-12">

                                <div className="input-box active-grey">
                                    <label className="input-label">Comment</label>
                                    <textarea name="Comment" onChange={this.handelChange}
                                        defaultValue={this.state.form.Comment || ""}
                                        className="form-control heigh-auto" rows="3"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <p><strong>Selecione o método de pagamento</strong></p>
                                    <div className="row">
                                        {
                                            this.state.TransMethods_list &&
                                            this.state.TransMethods_list.map((_r, i) => (
                                                this.props.userPage === "caxica" ?
                                                    (parseInt(_r.id) === 2 || parseInt(_r.id) === 3 || parseInt(_r.id) === 4) &&
                                                    <div className="col-md-2">
                                                        <input type="radio"
                                                            defaultChecked={parseInt(_r.id) === 2}
                                                            name="selectPaymentMethod" value={_r.id} onClick={() => this.setPaymentMethodid(_r.id)} />{_r.type}
                                                    </div>
                                                    :
                                                    <div className="col-md-2">
                                                        <input type="radio"
                                                            defaultChecked={parseInt(_r.id) === 2}
                                                            name="selectPaymentMethod" value={_r.id} onClick={() => this.setPaymentMethodid(_r.id)} />{_r.type}
                                                    </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-md-12">
                                <a href="#" className="remoove mr-2" onClick={() => this.AddAmountDetails()}>Adicionar novo</a>
                            </div> */}
                            {
                                this.state.amountDetails &&
                                this.state.AmountDetailsInputs
                            }
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.props.tab === 'Abertura') {
            console.log("data", this.state.form);
            console.log("dataapidata is", this.state.dataApidata.closed);
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">{this.state.popUpDetail.popUpHeadingFirst}</h4>
                        {
                            this.state.forFilter.caixa &&
                            <>
                                {
                                    parseInt(this.state.dataApidata.closed) === 0 ?
                                        <>
                                            <a href="#" className="remoove mr-2" onClick={(is_open) => this.updateOpenClose(0)}>Atualizar</a>
                                            <a href="#" className="remoove mr-2" onClick={(is_open) => this.updateOpenClose(1)}>Fechar</a>
                                        </>
                                        :
                                        <>
                                            {
                                                (Object.keys(this.state.dataApidata).length === 0 || moment(this.state.dataApidata.date).format(dateFormat) != moment(new Date()).format(dateFormat)) &&
                                                (moment(this.state.forFilter.date).format(dateFormat) === moment(new Date()).format(dateFormat)) &&
                                                (!this.state.dataApidata.closed || parseInt(this.state.dataApidata.closed) === 1) &&
                                                <a href="#" className="remoove mr-2" onClick={(is_open) => this.updateOpenClose(0)}>Abrir</a>
                                            }
                                        </>
                                }
                            </>
                        }
                        <a href="#" onClick={() => this.closePopup()} className="remoove mr-2">Cancelar</a>
                    </div>
                    <div className="modal-body">
                        <div className="details">
                            <h6> Local </h6>
                            {
                                (Object.keys(this.props.lastdata).length === 0 || this.props.lastdata.portodata) &&

                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" onClick={(name, e) => this.handleRadioTypeFilter('caixa', 'Porto')} className="custom-control-input" id="customRadio" name="example" value="Porto" />
                                    <label className="custom-control-label" for="customRadio">Porto</label>
                                </div>
                            }
                            {
                                (Object.keys(this.props.lastdata).length === 0 || this.props.lastdata.reguadata) &&
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" onClick={(name, e) => this.handleRadioTypeFilter('caixa', 'Régua')} className="custom-control-input" id="customRadio2" name="example" value="Régua" />
                                    <label className="custom-control-label" for="customRadio2">Régua</label>
                                </div>
                            }


                            {/* <div className="custom-control custom-checkbox">
                                <input type="checkbox" checked={false} className="custom-control-input" id="customCheck3" name="example1" />
                                <label className="custom-control-label" for="customCheck3">Abrir caixa individual</label>
                            </div> */}
                            <div style={{ marginTop: "20px" }}>
                                <p>{this.tarnsectiondatePiceker(this.state.forFilter.date)}</p>
                            </div>
                            <div className="row" style={{ marginTop: "20px" }}>
                                <div className="col-md-4">
                                    <p><strong>Saldo anterior</strong></p>
                                    <input
                                        type="number"
                                        value={this.state.form.opening_amount}
                                        name={"opening_amount"}
                                        placeholder=""
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <p><strong>Cheque</strong></p>
                                    <input
                                        type="number"
                                        value={this.state.form.cheques}
                                        name={"cheques"}
                                        placeholder=""
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <p><strong>Numerário</strong></p>
                                    <input
                                        type="number"
                                        value={this.state.form.numerario}
                                        name={"numerario"}
                                        placeholder=""
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
        } else if (this.props.tab === 'Fecho') {
            return (

                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">Fechar caixa</h4>
                        <a href="#" onClick={() => this.closePopup()} className="remoove mr-2">FECHAR CAIXA</a>
                    </div>
                    {

                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>Caixa</strong></p>
                                    <p>{this.state.RequiredDetails.displayName}</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Data</strong></p>
                                    <p>{this.tarnsectiondatePiceker(this.state.forFilter.date)}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <p><strong>Saldo anterior</strong></p>
                                    <p>{this.state.RequiredDetails.Previou_balance || 0}</p>
                                </div>
                                <div className="col-md-4">
                                    <p><strong>Recebimento total</strong></p>
                                    <p>{this.state.RequiredDetails.Total_receipt || 0}</p>
                                </div>
                                <div className="col-md-4">
                                    <p><strong>Depósitos</strong></p>
                                    <p>{this.state.RequiredDetails.Deposits || 0}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <p><strong>Comissão MB</strong></p>
                                    <p>{this.state.RequiredDetails.Commision || 0}</p>
                                </div>
                                <div className="col-md-4">
                                    <p><strong>Outros movimentos</strong></p>
                                    <p>{this.state.RequiredDetails.Other_movements || 0}</p>
                                </div>
                                <div className="col-md-4">
                                    <p><strong>Saldo dia seguinte</strong></p>
                                    <p>{this.state.RequiredDetails.Balance_next_day || 0}</p>
                                </div>
                            </div>
                            <div className="details" style={{ position: "absolute" }}>
                                <div className="login-details-form">
                                    <ul className="nav nav-tabs">
                                        <li className="nav-item">
                                            <a className="nav-link active" data-toggle="tab" href="#first">Detalhes caixa</a>
                                        </li>
                                        {
                                            this.props.trans_methods.map((_r, i) => (
                                                <li className="nav-item">
                                                    <a className="nav-link" onClick={() => this.createSpecificTable(_r.id)} data-toggle="tab" href={"#id-" + _r.id}>{_r.type}</a>
                                                </li>
                                            ))
                                        }

                                    </ul>

                                    <div className="tab-content">
                                        <div className="tab-pane container active" id="first">
                                            <h5 style={{ marginTop: "20px" }} >Informações extra de valores de caixa</h5>
                                            <div style={{ marginTop: "20px" }}>
                                                <h6>Recebimentos</h6>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <p><strong>P/ Multibanco</strong></p>
                                                        <p>{this.state.RequiredDetails.dr_Recipts.Multibanco || 0}</p>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <p><strong>P/ Cheque</strong></p>
                                                        <p>{this.state.RequiredDetails.dr_Recipts.Cheque || 0}</p>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <p><strong>P/ Numerário</strong></p>
                                                        <p>{this.state.RequiredDetails.dr_Recipts.Numerário || 0}</p>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <p><strong>P/ Outro meio</strong></p>
                                                        <p>{this.state.RequiredDetails.dr_Recipts['Outro meio'] || 0}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ marginTop: "20px" }}>
                                                <h6>Depósitos</h6>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <p><strong>Multibanco</strong></p>
                                                        <p>{this.state.RequiredDetails.cr_Depósitos['Multibanco'] || 0}</p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p><strong>Bancário</strong></p>
                                                        <p>{this.state.RequiredDetails.cr_Depósitos['Bancário'] || 0}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                                                <h6>Saldo dia seguinte</h6>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <p><strong>Cheque</strong></p>
                                                        <p>{this.state.RequiredDetails.Balance_next_day_details['Cheque'] || 0}</p>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <p><strong>Numerário</strong></p>
                                                        <p>{this.state.RequiredDetails.Balance_next_day_details['Numerário'] || 0}</p>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <p><strong>Numerário sub-caixas</strong></p>
                                                        <p>{this.state.RequiredDetails.Balance_next_day_details['Numerário sub-caixas'] || 0}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane container fade" id="id-1">
                                            <h5 style={{ marginTop: "20px" }} >Valores em Banco</h5>
                                            <div style={{ marginTop: "20px" }}>
                                                {
                                                    this.state.telkikTable
                                                }
                                            </div>
                                        </div>
                                        <div className="tab-pane container" id="id-2">
                                            <h5 style={{ marginTop: "20px" }} >Numerário em caixa</h5>
                                            <div style={{ marginTop: "20px" }} >
                                                {
                                                    this.state.telkikTable
                                                }
                                            </div>
                                        </div>
                                        <div className="tab-pane container fade" id="id-3">
                                            <h5 style={{ marginTop: "20px" }} >Cheque em caixa</h5>
                                            <div style={{ marginTop: "20px" }}>
                                                {
                                                    this.state.telkikTable
                                                }
                                            </div>
                                        </div>
                                        <div className="tab-pane container fade" id="id-4">
                                            <h5 style={{ marginTop: "20px" }} >Multibanco</h5>
                                            <div style={{ marginTop: "20px" }}>
                                                {
                                                    this.state.telkikTable
                                                }
                                            </div>
                                        </div>
                                        <div className="tab-pane container" id="id-5">
                                            <h5 style={{ marginTop: "20px" }} >Outros movimentos de caixa</h5>
                                            <div style={{ marginTop: "20px" }}>
                                                {
                                                    this.state.telkikTable
                                                }
                                            </div>
                                        </div>
                                        <div className="tab-pane container" id="id-6">
                                            <h5 style={{ marginTop: "20px" }} >Deposits de caixa</h5>
                                            <div style={{ marginTop: "20px" }}>
                                                {
                                                    this.state.telkikTable
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    }
                </div>
            )


        } else if (this.props.tab === 'Alterar') {
            console.log("completeData", this.props.completeData);
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">Morada de faturação</h4>
                        <a href="#" className="remoove mr-2" onClick={() => this.SetAddress()} >confirmar</a>
                        <a href="#" onClick={() => this.closePopup()} className="remoove mr-2">fechar</a>
                    </div>
                    <div className="modal-body">
                        <div className="details">
                            <h6>Indique a morada que pretende utilizar</h6>
                            <EntityAddress
                                entity_details={this.state.entity_details}
                                getEntityDetails={(id) => this.getEntityDetails(id)}
                                closePopup={() => this.closePopup()}
                            />

                            {
                                this.state.entity_details.billingAddress &&
                                this.state.entity_details.billingAddress.map((billobj, i) => (
                                    <div style={{ marginTop: "20px" }} key={i} className="row">
                                        <div className="col-md-1">
                                            <input type="radio" name="selectAddess"
                                                checked={billobj.suggested === 1}
                                                className="mr-5"
                                                onClick={(id) => this.changeAddress(billobj.id)} />
                                        </div>
                                        <div className="col-md-11">

                                            <p><strong>Morada: </strong>{billobj.address_line1 || ""} </p>
                                            <p><strong>Localidade: </strong>{billobj.address_line2 || ""}</p>
                                            <p><strong>Código Postal: </strong> {billobj.pin || ""}</p>
                                            <p><strong>Distrito: </strong> {billobj.desdis || ""}, <strong>Concelho: </strong> {billobj.descon || ""}, <strong>Freguesia: </strong> {billobj.desfrg || ""} </p>

                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
            )
        } else if (this.props.tab === 'Conta corrente') {

            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0">Consultar conta-corrente</h4>
                        <a href="#" onClick={() => this.closePopup()} className="remoove mr-2">fechar</a>
                    </div>
                    <div className="modal-body">
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-md-6">
                                <p><strong>Nº Entidade</strong></p>
                                <p>{this.props.completeData.busEntidade.nifap}</p>
                            </div>
                            <div className="col-md-6">
                                <p><strong>entidade</strong></p>
                                <p>{this.props.completeData.busEntidade.nome}</p>
                            </div>
                        </div>
                        <p style={{ marginTop: "20px" }}><strong>Periodo</strong></p>
                        <div className="row" >
                            <div className="col-md-6">
                                {
                                    this.tarnsectiondatePiceker()
                                }

                            </div>
                            <div className="col-md-6">
                                {
                                    this.tarnsectiondatePiceker()
                                }
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-md-4">
                                <p><strong>Saldo atual</strong></p>
                                <p>{this.props.completeData.currentEntityBalance} </p>
                            </div>
                            <div className="col-md-4">
                                <p><strong>Saldo cativo</strong></p>
                                <p>{this.state.entity_details.captive_balance}</p>
                            </div>
                            <div className="col-md-4">
                                <p><strong>Acumulado anterior</strong></p>
                                <p>{this.state.entity_details.accumulated_previous}</p>
                            </div>
                        </div>
                        {
                            this.state.telkikTable
                        }
                    </div>
                    <button type="hidden" data-toggle="modal" data-target="#popup-sec-modal" className="secmodelpopup"></button>
                    <div className="modal left-popup" id="popup-sec-modal">
                        <div className="modal-dialog modal-lg">
                            {
                                this.state.popUpForm
                            }
                        </div>
                    </div>
                </div>
            )
        } else if (this.props.tab === 'Emitir fatura') {
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title pl-0" >Processar pagamento</h4>
                        <a href="#" className="remoove mr-2" onClick={() => this.changePaymentMethod()}>processar</a>
                        <a href="#" onClick={() => this.closePopup()} className="remoove mr-2">Cancelar</a>
                    </div>
                    <div className="modal-body">
                        {
                            this.props.completeData.busEntidade &&
                            <div className="details">
                                {/* <EntityFilter modulename="revenue" getselectedEntity={(value) => this.getselectedEntity(value)} /> */}
                                <div className="row" style={{ marginTop: "20px" }}>
                                    <div className="col-md-6">
                                        <p><strong>Nº Entidade devedora</strong></p>
                                        <p>{this.props.entity_details.busEntidade.nifap}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><strong>nome entidade devedora </strong></p>
                                        <p>{this.props.entity_details.busEntidade.nome}</p>
                                    </div>
                                    <div className="col-md-12" style={{ marginTop: "20px" }}>
                                        <p><strong>Nº contribuinte</strong></p>
                                        <p>{this.props.completeData.allTransaction[0] ? this.props.completeData.allTransaction[0].vat_no : 0} </p>
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: "20px" }}>
                                    <div className="col-md-3">
                                        <p><strong>Saldo atual</strong></p>
                                        <p>{this.props.entity_details.currentEntityBalance}</p>
                                    </div>
                                    <div className="col-md-5">
                                        <p><strong>Saldo cativo para este pagamento </strong></p>
                                        <p>{this.props.entity_details.captive_balance}</p>
                                    </div>
                                    {/* <div className="col-md-4" >
                                        <p><strong>Valor total (c/ iva)</strong></p>
                                        <p>{this.props.completeData.allTransaction[0] ? this.props.completeData.allTransaction[0].total_dr:0 }</p>
                                    </div> */}
                                </div>
                                <div className="row" style={{ marginTop: "20px" }}>
                                    <div className="col-md-12">
                                        <p><strong>Meio de pagamento </strong></p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">

                                        <div className="form-group">
                                            <div className="row">
                                                {
                                                    this.state.TransMethods_list &&
                                                    this.state.TransMethods_list.map((_r, i) => (
                                                        <div className="col-md-4">
                                                            <input type="radio"
                                                                //defaultChecked={parseInt(_r.id) === parseInt(this.props.completeData.allTransaction[0].trans_method_id)} 
                                                                name="selectPaymentMethod" value={_r.id} onClick={() => this.setPaymentMethodid(_r.id)} />{_r.type}
                                                        </div>
                                                    ))
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            )
        } else if (this.props.tab === 'Adicionar Movimento') {
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        {
                            this.props.forfutureInvoice === 1 ?
                                <h4 className="modal-title pl-0">Processo de pagamento da fatura</h4>
                                :
                                <h4 className="modal-title pl-0"> Adicionar Movimento ao documento</h4>

                        }

                        {
                            Object.keys(this.state.AddServices).length > 0 &&
                            <a href="#" onClick={() => this.SetAllServices()} className="remoove mr-2">confirmar</a>

                        }
                        <a href="#" onClick={() => this.closePopup()} className="remoove mr-2">Cancelar</a>
                    </div>
                    <div className="modal-body">
                        <div className="details" style={{ position: "absolute" }}>
                            <div className="login-details-form">
                                <ul className="nav nav-tabs">
                                    {
                                        this.props.optionMenuArray.map((_option, i) => (
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
                                        this.props.optionMenuArray.map((_option, i) => (
                                            i < 8 ?
                                                <div className="tab-pane container fade" key={i} id={`index-${i}`}>
                                                    <h5 style={{ marginTop: "20px" }} >{_option.name}</h5>
                                                    {
                                                        i === 6 &&
                                                        <>
                                                            <div className='row'>
                                                                {/* <div className="col-md-5">
                                                                    <div className="input-box  active-grey">
                                                                        <label className="input-label">Saldo atual</label>
                                                                        <input type="text" className="input-1" readOnly={true}
                                                                            value={services.money.format(this.props.entity_details.currentEntityBalance)} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-5">
                                                                    <div className="input-box  active-grey">
                                                                        <label className="input-label">Valor total dos serviços com imposto</label>
                                                                        <input type="text" className="input-1" readOnly={true}
                                                                            value={services.money.format(this.state.services_charge)} />
                                                                    </div>
                                                                </div> */}
                                                                <div className="col-md-5">
                                                                    <InstructionMessage message={"A descrição dos artigos pode ser alterada"} />
                                                                </div>
                                                                {/* {
                                                                    this.props.forfutureInvoice === 1 &&
                                                                    <div className="col-md-5">
                                                                        <label className="input-label">Data limite</label>
                                                                        <div className="input-box  active-grey">

                                                                            {
                                                                                this.tarnsectiondatePiceker(this.state.forFilter.date)
                                                                            }
                                                                        </div>
                                                                    </div>

                                                                } */}

                                                            </div>


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
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default RevenueModalForm;