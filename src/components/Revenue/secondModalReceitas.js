import React from 'react';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons'
import { Calendar } from 'react-calendar';
import { DatePicker } from 'antd'
import SearchFilter from '../filters/SearchFilter';
import Main from '../../Pages/Demo/main';
import services from '../../services';
var moment = require('moment')
const dateFormat = "YYYY-MM-DD";
const { RangePicker } = DatePicker

const listdefaultRequest = { "Filters": null, "SortBy": "", "IsSortTypeDESC": false, "IsPagination": false, "Page": 1, "PageSize": 100 }


const tabDetailArray = {
    'Conta corrente': {
        api: '/Vindima/PaymentNotSent/GetAll',
        columnkeyMap: {
            "nº doc": "#",
            "data": "data",
            "document_url": "referência",
            "disription": "descrição",
            "qnt": "qnt",
            "unit": "un",
            "valor": "valor",
            "iva": "iva"
        },
        actionbuttons: { Edit: false, Redirect: false, Delete: false }
    }
}


class RevenueSecondModalForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            listData: [],
            popUpDetail: {},
            filterData: {},
            telkikTable: "",
            propRow: {},
            tipoList: [],
            commonTotalDetails: []
        }
    }

    componentDidMount() {
        this.popupTabTable('');
        this.getTotalDetails();

    }
    componentDidUpdate(preProp) {
        if (this.props.date !== preProp.date) {
            this.popupTabTable('');
            this.getTotalDetails();

        }
    }

    popupTabTable = (tabName) => {
        let tabData = tabDetailArray[this.props.tab]
        this.setState({
            telkikTable: "",
            popUpDetail: tabData
        })
    }


    getTotalDetails = () => {
      
        let issueDocumentDetails = this.props.completeData.issueDocumentDetails;
        let allTransaction = this.props.completeData.allTransaction;
        let RequiredDetails = {
            "nº doc": "",
            "data": null,
            "document_url": "",
            "disription": "",
            "Valor total":0,
            "qnt": 0,
            "unit": 0,
            "valor": 0,
            "iva": 0,
            "Quantity_total": 0
        };

        allTransaction.map((r, i) => {
            RequiredDetails["nº doc"] = this.props.row.id;
            RequiredDetails["data"] = moment(this.props.row.deadline_date).format(dateFormat);
            RequiredDetails["document_url"] =this.props.row.document_url;
            RequiredDetails["disription"] =this.props.row.document_type;
            RequiredDetails["iva"] = this.render.vat_rate;
           
            if (r.trans_type == "CR") {
                RequiredDetails[r.trans_method] = RequiredDetails[r.trans_method] ? RequiredDetails[r.trans_method] + parseFloat(r.total_cr) : parseFloat(r.total_cr);
                RequiredDetails["Valor total"] += parseFloat(r.total_cr);
            } else {
                RequiredDetails["Valor total"] += parseFloat(r.total_dr)
            }
            if (r.transactionDetail) {
                r.transactionDetail.map((row, k) => {
                    RequiredDetails["qnt"] += row.quantity;
                    RequiredDetails["unit"] += row.unit_amount;
                })
            }
        });
        let columnkeyMap = tabDetailArray[this.props.tab].columnkeyMap;
        console.log("columnkeyMap",columnkeyMap);
        let res = [];
        res.push(RequiredDetails);
        console.log("res",res);
       
        res.map((_row, index) => {
            Object.keys(columnkeyMap).map(function (key) {
                _row[columnkeyMap[key]] = _row[key]
            })
        });
        this.setState({
            commonTotalDetails:res,
            data: res,
            filterData: res,
            totalcount: res.length
        }, () => this.createTabel());
    }


    getPopUpListData = async () => {
        console.log("PORPS and POPUPDETAIL", this.props, this.state.popUpDetail)
        if (this.state.popUpDetail && listdefaultRequest) {
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
        }
    }

    handleFilter = (data) => {
        this.setState({
            filterData: data
        }, () => this.createTabel())
    }

    createTabel = () => {
        let actionbuttons = this.state.popUpDetail.actionbuttons;
        let columnkeyMap = this.state.popUpDetail.columnkeyMap;
        let columnlist = Object.keys(columnkeyMap).map(function (key) {
            return { field: columnkeyMap[key], columnMenuType: 'checkbox' }
        });
        let data = this.state.filterData;
        let telkikTable = <Main
            date={new Date()}
            groupfield={this.state.popUpDetail.groupfield}
            notAction={true}
            list={data}
            actionbuttons={actionbuttons}
            columnlist={columnlist}
            ActionPerform={(action, id) => this.ActionPerform(action, id)}
        />
        this.setState({
            telkikTable: telkikTable
        })
    }


    ActionPerform = (action, row) => {
        if (action === 'Redirect') {
            if (this.props.tab === 'Conta corrente faturasRecibos' || this.props.tab === 'Conta corrente faturas') {

            }
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

    handleSubmitData = (data) => {
        console.log("DATAPROPS", data)
    }

    render() {
        console.log("row", this.props.row)
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title pl-0">Informação detalhada do documento</h4>
                    <ul className="navbar-nav custom-menu float-right mr-2 user-alert-head">
                     <li className="nav-item dropdown">
                        {/* <a className="nav-link d-flex justify-content-between" href="#" id="navbardrop" data-toggle="dropdown">
                            <a href="#" className="remoove mr-2">imprimir</a>
                        </a> */}
                        <div className="dropdown-menu user-alert">
                           <a className="dropdown-item" href="#">
                              <span className="content">
                               <p> nº cópias guia <input type="number" id="numberofcopies"/></p>
                               <p> <input type="checkbox" checked={true}/> Pré-visualizar</p>
                              </span>
                           </a>
                           {/* <a className="dropdown-item" href="#">
                              <span className="content">
                                 <p>imprimir</p>
                              </span>
                           </a> */}
                        </div>

                     </li>

                  </ul>



                    <a href="#" onClick={() => this.props.closePopup()} className="remoove mr-2">fechar</a>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-6">
                            <p><strong>Nº Entidade</strong></p>
                            <p>{this.props.completeData.busEntidade.nifap}</p>
                        </div>
                        <div className="col-md-6">
                            <p><strong>entidade</strong></p>
                            <p>{this.props.completeData.busEntidade.nome}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p><strong>Data doc.</strong></p>
                            <p>{moment(this.props.row.deadline_date).format(dateFormat)}</p>
                        </div>
                        <div className="col-md-6">
                            <p><strong>Nº doc.</strong></p>
                            <p>{this.props.row['nº doc']}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <p><strong>Valor total</strong></p>
                            <p>{this.props.row['Valor (c/ iva)']}</p>
                        </div>
                        <div className="col-md-4">
                            <p><strong>IVA</strong></p>
                            <p>{this.props.row['iva']}</p>
                        </div>
                        <div className="col-md-4">
                            <p><strong>Qtd. total</strong></p>
                            {
                                this.state.commonTotalDetails[0] &&
                                <p>{this.state.commonTotalDetails[0]['Quantity_total']}</p>
                            }

                        </div>
                    </div>
                    <div style={{ marginTop: "20px" }} >
                        {
                            this.state.telkikTable
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default RevenueSecondModalForm;