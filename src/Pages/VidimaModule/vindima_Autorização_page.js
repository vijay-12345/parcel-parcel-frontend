import React from 'react';
import VindimaAutorização from '../../components/VidimaModule/vindima_Autorização_component';

import NavBar from '../../components/common/navbar';
import SideBar from '../../components/modules/left_sidebar';
const queryString = require('query-string');
const Administration = false;
const listdefaultRequest = { "Filters": null, "SortBy": "", "IsSortTypeDESC": false, "IsPagination": false, "Page": 1, "PageSize": 100 }

const optionMenuArray = [
    {
        main: "Autorização de produção",
        sub_menu: [
            {
                display: "-Autorização de produção",
                linkData: {
                    filters: {
                        Tabs: {
                            Autorização: [
                                {
                                    key: 'n_cartas_CartasA',
                                    displayKey: "Cartas A",
                                    inputType: "text"
                                },
                                {
                                    key: 'n_cartas_CartasB',
                                    displayKey: "Cartas B",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "n_cartas_CartasA": "Cartas A",
                        "valor_CartasA": "valor Cartas A",
                        "n_cartas_CartasB": "Cartas B",
                        "valor_CartasB": "valor Cartas B",
                        "n_cartas_Contratos": "Contratos",
                        "valor_Contratos": "valor Contratos",
                    },
                    actionbuttons: { Edit: false, Redirect: false, Delete: false },
                    listApilink: "/Vindima/ProducerAccount/GetAll",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: true,
                    TitleBarButtonName : "+ nova autorização",
                    TitleBarpath: "/vindima_authorizacao",
                    TitleBartitle: "Autorização de produçãor",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    notAction : true,
                    groupfield: [
                        {field : "Contratos"},
                        {field :"Cartas A" },
                        {field :"Cartas B" }
                    ]
                }
            }
        ]
    }
]


class VindimaAutorizacaoPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.setLinkDataMethod()

    }

    componentDidMount() {
        console.log("...........")
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
            selectedtitelotion: selectOption.display,
            selectedMainOption: selectedMainOption.main,
            linkData: selectOption.linkData
        }
    }

    changeOption = (mainIndex, subIndex) => {
        console.log("selectOption,mainIndex,subIndex", mainIndex, subIndex)
        window.location = "/vindima_authorizacao?m=" + mainIndex + "&s=" + subIndex;
        return;
    }

    updateYear = (year) => {
        this.setState({
            year: year
        })
    }

    render() {
        console.log("VindimaLinkData", this.state.linkData)
        return (
            <div className="dashboard">
                <NavBar date={new Date()} linkData={this.state.linkData} year={this.state.year} updateYear={(year) => this.updateYear(year)} />
                <SideBar Administration={Administration} />
                <div className="container-fluid">
                    <VindimaAutorização selectedMainOption={this.state.selectedMainOption} date={new Date()} year={this.state.year} changeOption={(mainIndex, subIndex) => this.changeOption(mainIndex, subIndex)} optionMenuArray={optionMenuArray} linkData={this.state.linkData} selectedtitelotion={this.state.selectedtitelotion} />
                </div>
            </div>
        )
    }
}



export default VindimaAutorizacaoPage;