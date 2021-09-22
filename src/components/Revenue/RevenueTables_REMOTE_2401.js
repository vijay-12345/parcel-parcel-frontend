
import React, { Component } from 'react';
import services from '../../services';
import $ from 'jquery'
import TlkTable from '../tlelrik/table/tlkTable';
const queryString = require('query-string');
var moment = require('moment')
const dateFormat = "YYYY-MM-DD";
let listdefaultRequest = { Filters: null, "SortBy": "id", "IsSortTypeDESC": true, "IsPagination": false, "Page": 1, "PageSize": 100 }
let today = new Date();
let current_date = moment(today).format(dateFormat);
today.setMonth(today.getDate() - 7);
let LastWeek = moment(today).format(dateFormat);
today = new Date();
today.setMonth(today.getMonth() - 1);
let Pastmonthdate = moment(today).format(dateFormat);

let tablesjson = {
    "Tesouraria": {
        columnkeyMap: {
            "nifap": "Nº Entidade",
            "nome": "Entidade",
            "comment": "Descrição do movimento",
            "trans_msg": "Tipo de receita",
            "valor": "Valor",
            "current_balance": 'Saldo Conta Corr',
            "trans_date": "Data"
        },
        actionbuttons: { RedirectTwo: "Detalhes" },// Redirect: "Emitir Fatura",
        listApilink: "Revenue/CollectionRevenue/GetAll",
        requestMethod: "post",
        notAction: false,
        deleteAPILink: "/BusEntidadeEstatuto/Delete/",
        Filters: {
            "start_date": null,
            "end_date": null,
            "entity_id": null,
        }
        // groupfield: [{ field: 'Tipo receita' } ]
    },
    "TesourariaEmissãodeRecibos": {
        columnkeyMap: {
            "Check": "Check",
            "n doc": "Nº Doc",
            "Entidade": "Entidade",
            "add_Amonut_text": "Comment",
            "for_invoice_id": "Tipo de pagamento",
            "Invoice_date": "Data",
            "incomingAmount": "Entrada",
        },
        actionbuttons: { CommonRedirection: "ir para a fatura" },// Redirect: "Emitir Fatura",
        listApilink: "Revenue/GetInvoiceList",
        requestMethod: "post",
        notAction: false,
        generateDocument: true,
        noDownloadButton: true,
        modulename: "TesourariaEmissãodeRecibos",
        // singleEntity: true,
        //deleteAPILink: "/BusEntidadeEstatuto/Delete/",
        Filters: {
            "entity_id": null,
            start_date: null,
            end_date: null,
            "is_paid": null,
            "type": "Credit",
            "local": null,
            "is_doc_generated": null,
            for_invoice: null
        }
        // groupfield: [{ field: 'Tipo receita' } ]
    },
    "TesourariaContacorrente": {
        columnkeyMap: {
            "n doc": "Nº Doc",
            // "Entidade": "Entidade",
            "document_type": "Tipo Doc",
            "Invoice_date": "Data",
            "incomingAmount": "Entrada",
            "outgoingAmount": "Saida"
        },
        actionbuttons: { Edit: false, Redirect: false, Delete: false, detailPopUp: true },// Redirect: "Emitir Fatura",
        listApilink: "Revenue/GetInvoiceList",
        requestMethod: "post",
        notAction: false,
        //deleteAPILink:"/BusEntidadeEstatuto/Delete/",
        Filters: {
            "entity_id": null,
            start_date: null, end_date: null,
            "is_paid": "1",
            "type": null,
            "local": null,
            "is_doc_generated": null,
            for_invoice: null

        },
        singleEntity: true,
        modulename: "TesourariaContacorrente"
    },
    "TesourariaFaturas": {
        columnkeyMap: {
            "n doc": "Nº Doc",
            "Entidade": "Entidade",
            "is_paid": "Status da fatura",
            "Invoice_date": "Data fatura",
            "Sinal": "Sinalizado",
            "pag_limit": "limite pag",
            "Valor IVA": "valor iva",
            "Interest_to_date": "Juros à data",
            "valor_cativo": "Valor Cativo",
            "Valor c/ IVA": "Valor total (c/ IVA)",
            "Amount_paid": "Valor pago"

        },
        actionbuttons: { CommonRedirection: "mover para a fatura" }, //{  DropdownRevenue:true, detailPopUp : true},
        listApilink: "Revenue/GetInvoiceList",
        requestMethod: "post",
        notAction: false,
        Filters: {
            "entity_id": null,
            "start_date": null,
            "end_date": null,
            "is_paid": "0",
            "type": "Invoice",
            "is_doc_generated": null,
            for_invoice: null
        },
        // singleEntity: true,
        modulename: ""
    },
    "TesourariaRecabo": {
        columnkeyMap: {
            "no": "Numero do documento",
            "nome": "Entidade",
            "document_type": "Tipo de Fatura",
            "add_Amonut_text": "Comment",
            "for_invoice_id": "Tipo de pagamento",
            "total_amount": "Valor",
            "issue_date_time": "Data do documento"
        },
        actionbuttons: { File: "Montante" },// Redirect: "Emitir Fatura",
        actionColumnName: "Ver fatura",
        listApilink: "/Revenue/GetInvoiceList",
        requestMethod: "post",
        Filters: {
            "entity_id": null,
            "start_date": Pastmonthdate,
            "end_date": current_date,
            "is_paid": null,
            "type": "Credit",
            "is_doc_generated": null,
            for_invoice: null
        },
        //singleEntity: true,
        modulename: ""
    },
    "Faturas": {
        columnkeyMap: {
            "n doc": "Nº Doc",
            "Entidade": "Entidade",
            "Invoice_date": "Data fatura",
            "Sinal": "Sinalizado",
            "pag_limit": "limite pag",
            "Valor IVA": "valor iva",
            "valor_cativo": "Valor Cativo",
            "Interest_to_date": "Juros à data",
            "Valor c/ IVA": "Valor total (c/ IVA)",
            "Amount_paid": "Valor pago",
        },
        actionbuttons: { DropdownRevenue: true, detailPopUp: true },
        popUpTabName: "Faturas pendentes",
        listApilink: "Revenue/GetInvoiceList",
        requestMethod: "post",
        notAction: false,
        Filters: {
            "entity_id": null,
            "start_date": LastWeek,
            "end_date": current_date,
            "is_paid": "0",
            "type": "Invoice",
            "is_doc_generated": null,
            for_invoice: null
        },


    },
    "FaturasEmitir": {
        columnkeyMap: {
            "Check": "Check",
            "n doc": "Nº Doc",
            "Entidade": "Entidade",
            "Invoice_date": "Data fatura",
            "Sinal": "Sinalizado",
            "is_doc_generated": "Doc gerado",
            "pag_limit": "limite pag",
            "Valor IVA": "valor iva",
            "Valor c/ IVA": "Valor total (c/ IVA)",
            "Interest_to_date": "Juros à data",
            "Amount_paid": "Valor pago",
            "valor_cativo": "Valor Cativo"
        },
        actionbuttons: { detailPopUp: true, Invoice_File: "Fatura" },
        popUpTabName: "Faturas pendentes",
        listApilink: "Revenue/GetInvoiceList",
        requestMethod: "post",
        notAction: false,
        generateDocument: true,
        noDownloadButton: true,
        Filters: {
            "entity_id": null,
            "start_date": null,
            "end_date": null,
            "is_paid": "0",
            "type": "Invoice",
            "is_doc_generated": null,
            for_invoice: null
        },
        modulename: "FaturasEmitir"
    },
    "FaturasLiquidar": {
        columnkeyMap: {
            "n doc": "Nº Doc",
            "Entidade": "Entidade",
            "Invoice_date": "Data fatura",
            "Sinal": "Sinalizado",
            "pag_limit": "limite pag",
            "Valor IVA": "valor iva",
            "Valor c/ IVA": "Valor total (c/ IVA)",
            "Interest_to_date": "Juros à data",
            "Amount_paid": "Valor pago",
            "valor_cativo": "Valor Cativo"
        },
        actionbuttons: { File: "Montante", Invoice_File: "Fatura", Arrow: true },
        popUpTabName: "Faturas pendentes",
        listApilink: "Revenue/GetInvoiceList",
        requestMethod: "post",
        notAction: false,
        Filters: {
            "entity_id": null,
            "start_date": null,
            "end_date": null,
            "is_paid": "0",
            "type": "Invoice",
            "local": null,
            "is_doc_generated": null,
            for_invoice: null
        }

    }, "AllCreditDetails": {
        columnkeyMap: {
            "Invoice_date": "Data",
            "Entidade": "Entidade",
            "local": "Caixa",
            "total_amount": "Valor",
        },
        actionbuttons: { detailPopUp: true },
        popUpTabName: "Faturas pendentes",
        listApilink: "Revenue/GetInvoiceList",
        requestMethod: "post",
        notAction: true,
        Filters: {
            "entity_id": null,
            "start_date": null,
            "end_date": null,
            "is_paid": "0",
            "type": "Credit",
            "is_doc_generated": null,
            for_invoice: null
        },
        modulename: ""
    },
    "AllServicesDetails": {
        columnkeyMap: {
            "no": "Referência",
            "Invoice_date": "Data",
            "Entidade": "Entidade",
            "extra_text": "Operação",
            "local": "Caixa",
            "total_amount": "Valor",
        },
        actionbuttons: { Invoice_File: "Fatura" },
        popUpTabName: "Faturas pendentes",
        listApilink: "Revenue/GetInvoiceList",
        requestMethod: "post",
        notAction: false,
        Filters: {
            "entity_id": null,
            "start_date": null,
            "end_date": null,
            "is_paid": "0",
            "type": "Invoice",
            "is_doc_generated": null,
            for_invoice: null
        },
        modulename: ""
    },
    "gerfip": {
        columnkeyMap: {
            "Check": "Check",
            "n doc": "Nº Doc",
            "Entidade": "Entidade",
            "Invoice_date": "Data fatura",
            "Sinal": "Sinalizado",
            "is_doc_generated": "Doc gerado",
            "extra_text": "Operação",
            "pag_limit": "limite pag",
            "Valor IVA": "valor iva",
            "Valor c/ IVA": "Valor total (c/ IVA)",
            "Interest_to_date": "Juros à data",
            "Amount_paid": "Valor pago",
            "valor_cativo": "Valor Cativo"
        },
        actionbuttons: { detailPopUp: true, Invoice_File: "Fatura", File: "Montante" },
        popUpTabName: "Faturas pendentes",
        listApilink: "Revenue/GetInvoiceList",
        requestMethod: "post",
        notAction: false,
        DocumentGERFIP: "GERFIP",
        noDownloadButton: true,
        Filters: {
            "entity_id": null,
            "start_date": null,
            "end_date": null,
            "is_paid": null,
            "type": null,
            "is_doc_generated": null,
            for_invoice: null
        },
        modulename: "GERFIP"
    }
}




class RevenueTables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkData: tablesjson[this.props.tableName],
            telkikTable: null,
            popUpForm: null
        }
    }

    componentDidMount = () => {
        this.defaultState();
    }

    componentDidUpdate = (preProp) => {
        if (preProp.date !== this.props.date) {
            this.defaultState();
        }
    }

    getAllFilter = () => {
        let Request = { ...listdefaultRequest };
        Request.Filters = this.state.linkData.Filters;
        Request.Filters = { ...Request.Filters, ...this.props.applyedfilter }
        console.log("Fileter", Request.Filters);
        if (Request.Filters.entity_id === undefined) {
            Request.Filters.entity_id = null
        }
        Request.Filters.local = null // window.localStorage.getItem('Local');
        if (this.props.tableName === "Faturas" && Request.Filters.entity_id > 0) {
            Request.Filters.is_paid = null;
        }
        return Request;
    }


    handleDelete = async (id) => {
        let link = this.state.linkData.deleteAPILink;
        let res = await services.apiCall.requestApi(link + "/" + id, {}, 'post')
        if (res) {
            this.defaultState();
        }
    }

    defaultState = () => {
        let linkData = { ...tablesjson }
        linkData = tablesjson[this.props.tableName];

        console.log("linkdata", this.props.tableName, linkData)
        this.setState({
            linkData: linkData,
            telkikTable: null
        }, () => this.getListData())
    }

    getListData = async () => {
        if (!this.state.linkData)
            return
        let Request = this.getAllFilter();
        if (this.state.linkData.singleEntity && !Request.Filters.entity_id)
            return
        this.setState({
            totalcount: 0
        })
        let method = this.state.linkData.requestMethod;
        let link = this.state.linkData.listApilink;
        let columnkeyMap = this.state.linkData.columnkeyMap;
        let res = await services.apiCall.requestApi(link, Request, method)
        if (res) {
            res.map((_row, index) => {
                if (_row.invoiceHistory) {
                    _row.invoiceHistory.map((_r, i) => {
                        if(_r.file_Link){
                            if (_r.invoiceType === 'Payment') {
                                _row.document_url = "/api/" + _r.file_Link.replace("file:///C:/DevelopmentIVPD", "");
                            } else {
                                _row.invoice_url = "/api/" + _r.file_Link.replace("file:///C:/DevelopmentIVPD", "");
    
                            }
                        }
                       
                    })
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
                    } else if (key === "local") {
                        _row[columnkeyMap[key]] = _row["key"] || '';
                    }
                    // else if(key==="document_type" && _row.document_type==="Invoice") {
                    //     _row.document_type = "Movements"
                    // }else if(key==="document_type" && _row.document_type==="Credit") {
                    //     _row.document_type = "Crédito"
                    // }
                    else
                        _row[columnkeyMap[key]] = _row[key]
                })
                if (_row.document_type === "Invoice") {
                    _row.document_type = "Movements"
                } else if (_row.document_type === "Credit") {
                    _row.document_type = "Crédito"
                }
            });
            this.setState({
                data: res,
                filterData: res,
                totalcount: window.localStorage.getItem('table_total')
            }, () => this.createTabel())
        }
    }


    createTabel = () => {
        if (this.state.linkData && this.state.linkData.columnkeyMap) {
            let columnkeyMap = this.state.linkData.columnkeyMap;
            let columnlist = Object.keys(columnkeyMap).map(function (key) {
                return { field: columnkeyMap[key], columnMenuType: 'checkbox' }
            });
            let actionbuttons = this.state.linkData.actionbuttons;
            let telkikTable = <TlkTable
                date={new Date()}
                generateDocument={this.state.linkData.generateDocument}
                noDownloadButton={this.state.linkData.noDownloadButton}
                DocumentGERFIP={this.state.linkData.DocumentGERFIP}
                actionColumnName={this.state.linkData.actionColumnName}
                groupfield={this.state.linkData.groupfield}
                modulename={this.state.linkData.modulename || "fordefault"}
                notAction={this.state.linkData.notAction}
                deleteFunc={(id) => this.props.handleDelete(id)}
                list={this.state.filterData}
                actionbuttons={actionbuttons}
                columnlist={columnlist}
                ActionPerform={(action, id) => this.props.ActionPerform(action, id)} />
            this.setState({
                telkikTable: telkikTable
            })
        }
    }

    render() {
        return (
            <div className="table-responsive table-section">
                {
                    this.state.telkikTable &&
                    <>
                        <h3> A pesquisa retornou {this.state.totalcount} resultados </h3>
                        {
                            this.state.telkikTable
                        }
                    </>
                }

            </div>
        );
    }
}

export default RevenueTables;