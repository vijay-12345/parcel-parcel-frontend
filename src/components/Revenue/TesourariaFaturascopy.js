import React from 'react';

import NavBar from '../common/navbar';
import SideBar from '../modules/left_sidebar';
import RevenueReceitas from './RevenueReceitas';
const queryString = require('query-string');

const Administration = false;
const listdefaultRequest = {"Filters": {
    "entity_id": null,
    "start_date": null,
    "end_date": null,
    "is_paid":"0",
    "type":"Invoice",
    "is_doc_generated":null,
    for_invoice:null
    }, "SortBy": "", "IsSortTypeDESC": true, "IsPagination": false, "Page": 1, "PageSize": 100 }

const optionMenuArray = [
    {
       // main: "Receitas em cobrança",
        sub_menu: [
            {
              //  display: "-Receitas em cobrança",
                linkData: {
                    filters: {
                        Tabs: {
                            Faturas: [
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
                        "Invoice_date": "Data fatura",
                        "Sinal": "Sinalizado",
                        "pag_limit": "limite pag",
                        "Valor IVA": "valor iva",
                        "Valor c/ IVA": "Valor total (c/ IVA)",
                        "Interest_to_date": "Juros à data",
                        "Amount_paid": "Valor pago",
                        "valor_cativo":"Valor Cativo"
                    },
                    actionbuttons: {  DropdownRevenue:true, detailPopUp : true},
                    popUpTabName: "Faturas pendentes",
                    listApilink: "Revenue/GetInvoiceList",
                    listdefaultRequest: listdefaultRequest,
                    pending_invoice:true,
                    requestMethod: "post",
                    navbarOptionsYear: false,
                   // OpenAndCloseCashier:true,
                    currentPath:"revenue_faturas",
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
                        }
                    ],
                    TitleBarpath: "",
                    TitleBartitle: "Tesouraria",
                    prevPageName:"Faturas pendentes",
                    prevPageLink:"revenue_faturas",
                  //  TitleBartitle: "Faturas pendentes",
                    TitleBarlogo: "auditing",
                    
                    groupfield: []
                }
            },
        ]
    }
]


class TesourariaFaturas extends React.Component {

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
        return {
            selectedtitelotion: selectOption.display,
            selectedMainOption: selectedMainOption.main,
            linkData: selectOption.linkData
        }
    }

    render() {
        return (
            <div className="dashboard">
                <NavBar date={new Date()} linkData={this.state.linkData} year={this.state.year} updateYear={(year) => this.updateYear(year)} />
                <SideBar Administration={Administration} />
                <div className="container-fluid">
                    <RevenueReceitas 
                     singleentity={true}
                    selectedMainOption={this.state.selectedMainOption} date={new Date()} year={this.state.year} changeOption={(mainIndex, subIndex) => this.changeOption(mainIndex, subIndex)} optionMenuArray={optionMenuArray} linkData={this.state.linkData} selectedtitelotion={this.state.selectedtitelotion} />
                </div>
            </div>
        )
    }
}


export default TesourariaFaturas;