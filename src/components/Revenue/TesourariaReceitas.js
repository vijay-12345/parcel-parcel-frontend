import React from 'react';
import NavBar from '../../components/common/navbar';
import SideBar from '../../components/modules/left_sidebar';
import ReceitasEmCobranca from './ReceitasEmCobranca';
import { Button } from '@progress/kendo-react-buttons'
import EntityDetails from '../common/EntityDetails';
import $ from 'jquery'
import RightPopModalForm from '../common/RightPopModalForm';
import services from '../../services';
const queryString = require('query-string');
var moment = require('moment')
const Administration = false;

let optionMenuArray = [
    {
        sub_menu: [
            {
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
                    navbarOptionsYear: false,
                    tableName:"Tesouraria",
                    nevdropdown: ["Abertura", "Fecho"],
                    nevdroplabel: "",
                    nevdropplaceholder: "Aberta",
                    // OpenAndCloseCashier: true,
                    TitleBartitle: "Tesouraria",
                    prevPageName: "",
                    prevPageLink: "",
                    currentPath: "revenue_receitas",
                    popUpTabName: "Consultar Conta",
                    nevOptionChange: [
                        {
                            name: 'Emissão de Recibos de Adiantamento',
                            url: 'revenue_receitas',
                            tableName:"TesourariaEmissãodeRecibos",
                        },
                        {
                            name: 'Consulta de Conta corrente',
                            url: 'revenue_receitas',
                            tableName:"TesourariaContacorrente",
                        },
                        {
                            name: 'Faturas',
                            url: 'revenue_receitas',
                            tableName:"TesourariaFaturas",
                        },
                        {
                            name: 'Recibos de Adiantamento',
                            url: 'revenue_receitas',
                            tableName:"TesourariaRecabo",
                        }
                        // {
                        //     name: 'Faturas Em Cobrança',
                        //     url: 'revenue_faturas'
                        // }
                    ],
                    TitleBarlogo: "auditing",
                }
            }
        ]
    }
]


class TesourariaReceitas extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.setLinkDataMethod();
    }

    componentDidMount=()=>{
       
    }

    componentDidUpdate=()=>{
        const parsed = queryString.parse(this.props.location.search);
        console.log(parsed.p ,this.state.prevPageName)
        parsed.p =parsed.p?parsed.p:""
        parsed.u=parsed.u?parsed.u:""
        parsed.t=parsed.t?parsed.t:""
        
        if(parsed.p !== this.state.linkData.prevPageName){
            let linkData = {...this.state.linkData};
            linkData.prevPageName= parsed.p;
            linkData.prevPageLink=parsed.u;
            linkData.tableName=parsed.t;
            let year = new Date();
            year = year.getFullYear();
            this.setState({
                linkData: linkData,
                parsed: parsed
            })
        }
    }


    setLinkDataMethod = () => {
        const parsed = queryString.parse(this.props.location.search);
        let mainIndex = 0;
        let subIndex = 0;
        let selectOption = optionMenuArray[mainIndex].sub_menu[subIndex];
        let linkData =selectOption.linkData;
        parsed.p =parsed.p?parsed.p:""
        parsed.u=parsed.u?parsed.u:""
        parsed.t=parsed.t?parsed.t:""
        if(parsed.p ){
            linkData.prevPageName= parsed.p;
            linkData.prevPageLink=parsed.u;
            linkData.tableName=parsed.t;
        }

        let year = new Date();
        year = year.getFullYear();
        return {
            year: year,
            nevoption: null,
            popUpForm: null,
            linkData: linkData,
            pageOption: "",
            Tab: null,
            parsed: parsed
        }
    }

    changeOption = (prevPageName,prevPageLink) => {
        let linkData = { ...this.state.linkData }
        linkData.prevPageName = prevPageName;
        linkData.prevPageLink = prevPageLink;
        console.log("OKOK");
        this.setState({
            linkData
        })
    }

    render() {
        console.log("Render again")
        return (
            <div className="dashboard">
                <NavBar date={new Date()} linkData={this.state.linkData} nevoption={this.state.nevoption} updateNavDropdown={(_row) => this.updateNavDropdown(_row)} />
                <SideBar Administration={Administration} />
                <div className="container-fluid">
                    <ReceitasEmCobranca
                        date={new Date()}
                        parsed={this.state.parsed}
                        changeOption={(mainIndex, subIndex) => this.changeOption(mainIndex, subIndex)}
                        optionMenuArray={optionMenuArray}
                        linkData={this.state.linkData}
                        trans_methods={this.state.trans_methods}
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


export default TesourariaReceitas;