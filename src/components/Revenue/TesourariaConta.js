import React from 'react';

import NavBar from '../common/navbar';
import SideBar from '../modules/left_sidebar';
import RevenueReceitas from './RevenueReceitas';
import { Button } from '@progress/kendo-react-buttons'
import EntityDetails from '../common/EntityDetails';
import $ from 'jquery'
import RightPopModalForm from '../common/RightPopModalForm';
import services from '../../services';
const queryString = require('query-string');
var moment = require('moment')

const Administration = false;
const listdefaultRequest = {"Filters": {
    "entity_id": null,
     start_date: null, end_date: null, 
    "is_paid":"1",
    "type":null,
    "is_doc_generated":null,
    for_invoice:null
    }, "SortBy": "", "IsSortTypeDESC": true, "IsPagination": false, "Page": 1, "PageSize": 100 }

const optionMenuArray = [
    {
      //  main: "Receitas em cobrança",
        sub_menu: [
            {
             //   display: "-Receitas em cobrança",
                linkData: {
                    filters: {
                        Tabs: {
                            Período: [
                                {
                                    key: 'RangePicker',
                                    displayKey: "intervalo de datas",
                                    inputType: "RangePicker"
                                }
                                
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "n doc": "Nº Doc",
                        "Entidade": "Entidade",
                        "document_type":"Tipo Doc",
                        "Invoice_date":"Data",
                        "incomingAmount":"Entrada",
                        "outgoingAmount":"Saida"  
                    },
                    actionbuttons: { Edit: false, Redirect: false, Delete: false, detailPopUp : true},
                    popUpTabName: "Consultar Conta",
                    listApilink: "Revenue/GetInvoiceList",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    notAction:false,
                    // OpenAndCloseCashier:true,
                    currentPath:"revenue_conta",
                    nevOptionLinks:[
                        {
                            name: 'Emissão de Recibos de Adiantamento',
                            url: 'revenue_receitas'
                        },
                        {
                            name: 'Consulta de Conta corrente',
                            url: 'revenue_conta'
                        },
                        {
                            name: 'Faturas',
                            url: 'revenue_faturas'
                        },
                        {
                            name: 'Recibos de Adiantamento',
                            url: 'recabo_de_adiantamento'
                        },
                        {
                            name: 'Faturas Em Cobrança',
                            url: 'revenue_faturas'
                        },
                        {
                            name: 'Caixa',
                            url: 'cashier'
                        }
                    ],
                    navbarOptionsYear: false,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBartitle: "Tesouraria",
                    prevPageName:"Consultar conta-corrente",
                    prevPageLink:"revenue_conta",

                   // TitleBartitle: "Consultar conta-corrente",
                    TitleBarlogo: "auditing",
                    // TabName: [
                    //     { name: "Slado atual", key: "current_balance" },
                    //     { name: "Saldo cativo", key: "captive_balance" },
                    // ],
                    groupfield: []
                }
            },
        ]
    }
]


class TesourariaConta extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.setLinkDataMethod()

    }

    componentDidMount() {
       
    }

    setLinkDataMethod = () => {
        let mainIndex = 0;
        let subIndex = 0;
        const parsed = queryString.parse(this.props.location.search);
        if (parsed.m) {
            mainIndex = parsed.m;
        }
        if (parsed.s) {
            subIndex = parsed.s;
        }
        let selectOption = optionMenuArray[mainIndex].sub_menu[subIndex];
        let selectedMainOption = optionMenuArray[mainIndex]
        let year = new Date();
        year = year.getFullYear();
        return {
            year: year,
            Tab: null,
            popUpForm: null,
            entity_details: {
                busEntidade: {},
                currentEntityBalance: 0,
                billingAddress: []
            },
            currency_list: [],
            tax_list: [],
            TransMethods_list: [],
            selectedtitelotion: selectOption.display,
            selectedMainOption: selectedMainOption.main,
            linkData: selectOption.linkData,
            parsed: queryString.parse(this.props.location.search)
        }
    }

    changeOption = (mainIndex, subIndex) => {
        console.log("selectOption,mainIndex,subIndex", mainIndex, subIndex)
        window.location = "/revenue_receitas?m=" + mainIndex + "&s=" + subIndex;
        return;
    }

    updateYear = (year) => {
        this.setState({
            year: year
        })
    }

    render() {
        return (
            <div className="dashboard">
                <NavBar date={new Date()} linkData={this.state.linkData} year={this.state.year} updateYear={(year) => this.updateYear(year)} />
                <SideBar Administration={Administration} />
                <div className="container-fluid">
                    <RevenueReceitas 
                    singleentity={true}
                    parsed={this.state.parsed}
                    selectedMainOption={this.state.selectedMainOption} 
                    date={new Date()} year={this.state.year} 
                    changeOption={(mainIndex, subIndex) => this.changeOption(mainIndex, subIndex)} 
                    optionMenuArray={optionMenuArray} 
                    linkData={this.state.linkData}
                    selectedtitelotion={this.state.selectedtitelotion} />
                </div>
                <button type="hidden" data-toggle="modal" data-target="#popup-modal" className="modelpopup"></button>
                <div className="modal left-popup" id="popup-modal">
                    <div className="modal-dialog modal-lg">
                        {
                            this.state.popUpForm
                        }
                    </div>
                </div>
            </div>
        )
    }
}


export default TesourariaConta;