import React from 'react';
import NavBar from '../common/navbar';
import SideBar from '../modules/left_sidebar';
import ReceitasEmCobranca from './ReceitasEmCobranca';
import { Button } from '@progress/kendo-react-buttons'
import EntityDetails from '../common/EntityDetails';
import $ from 'jquery'
import RightPopModalForm from '../common/RightPopModalForm';
import services from '../../services';
const queryString = require('query-string');
var moment = require('moment')
const Administration = false;
const listdefaultRequest = {
    "Filters": {
        "entity_id": null,
        "start_date": "2020-08-11",
        "end_date": "2020-09-21",
        "is_paid": null,
        "type": null,
        "local": null,
        "is_doc_generated": null
    },
    "SortBy": "",
    "IsSortTypeDESC": true,
    "IsPagination": false,
    "Page": 1,
    "PageSize": 1
}

const optionMenuArray = [
    {
        // main: "Receitas em cobrança",
        sub_menu: [
            {
                //display: "-Receitas em cobrança",
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
                        "no": "Numero do documento",
                        "nome": "Entidade",
                        "document_type": "Tipo de fatura",
                        "valor_cativo": "Valor",
                        "issue_date_time": "Data do documento"
                    },
                    actionbuttons: { File: true },// Redirect: "Emitir Fatura",
                    listApilink: "/Revenue/GetInvoiceList",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: false,
                    nevdropdown: ["Abertura", "Fecho"],
                    nevdroplabel: "",
                    nevdropplaceholder: "Aberta",
                    prevPageName: "Recibos de Adiantamento",
                    prevPageLink: "revenue_receitas",
                    // OpenAndCloseCashier: true,
                    TitleBartitle: "Tesouraria",
                    currentPath: "revenue_receitas",
                    nevOptionLinks: [
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
                    TitleBarlogo: "auditing",
                    // groupfield: [{ field: 'Tipo receita' } ]
                }
            }
        ]
    }
]


class RecaboDeAdiantamento extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.setLinkDataMethod();
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
        console.log("selectOption", selectOption);
        return {
            year: year,
            nevoption: null,
            popUpForm: null,
            selectedtitelotion: selectOption.display,
            selectedMainOption: selectedMainOption.main,
            linkData: selectOption.linkData,
            trans_methods: null,
            lastworkingdate: null,
            Tab: null,
            entity_details: {
                busEntidade: {},
                currentEntityBalance: 0,
                billingAddress: []
            },
            currency_list: [],
            tax_list: [],
            TransMethods_list: [],
            parsed: parsed
        }
    }

    changeOption = (mainIndex, subIndex) => {
        console.log("selectOption,mainIndex,subIndex", mainIndex, subIndex)
        window.location = "/revenue_receitas?m=" + mainIndex + "&s=" + subIndex;
        return;
    }

    closePopup = () => {
        $(".left-popup").trigger('click');
    }





    render() {
        return (
            <div className="dashboard">
                <NavBar date={new Date()} linkData={this.state.linkData} nevoption={this.state.nevoption} updateNavDropdown={(_row) => this.updateNavDropdown(_row)} />
                <SideBar Administration={Administration} />

                <div className="container-fluid">
                    <ReceitasEmCobranca
                        selectedMainOption={this.state.selectedMainOption}
                        date={new Date()}
                        parsed={this.state.parsed}
                        changeOption={(mainIndex, subIndex) => this.changeOption(mainIndex, subIndex)}
                        optionMenuArray={optionMenuArray}
                        linkData={this.state.linkData}
                        trans_methods={this.state.trans_methods}
                        selectedtitelotion={this.state.selectedtitelotion}
                        tab={"Revenue_receitas"}
                    />
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


export default RecaboDeAdiantamento;