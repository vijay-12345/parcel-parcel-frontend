import React from 'react';
import NavBar from '../common/navbar';
import SideBar from '../modules/left_sidebar';
import ReceitasEmCobranca from './ReceitasEmCobranca';
import { Button } from '@progress/kendo-react-buttons'
import EntityDetails from '../common/EntityDetails';
import $ from 'jquery'
import RightPopModalForm from '../common/RightPopModalForm';
import services from '../../services';
import TlkTable from '../tlelrik/table/tlkTable';
const queryString = require('query-string');
var moment = require('moment')
const Administration = false;
const listdefaultRequest = {
    "Filters": {
        "entity_id": null,
        "start_date": null,
        "end_date": null,
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
                        "nifap": "Nº Entidade",
                        "nome": "Entidade",
                        "comment": "Descrição do movimento",
                        "trans_msg": "Tipo de receita",
                        "valor": "Valor",
                        "current_balance": 'Saldo Conta Corr',
                        "trans_date": "Data"
                    },
                    actionbuttons: { Edit: false, RedirectTwo: "Detalhes", Delete: false },// Redirect: "Emitir Fatura",
                    listApilink: "Revenue/CollectionRevenue/GetAll",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: false,
                    nevdropdown: ["Abertura", "Fecho"],
                    nevdroplabel: "",
                    nevdropplaceholder: "Aberta",
                    OpenAndCloseCashier: true,
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


class TesourariaPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            res: [],
            tableData: null,
            columnkeyMap: {
                "no": "Numero do documento",
                "nome": "Entidade",
                "document_type": "Tipo de fatura",
                "valor_cativo": "Valor",
                "issue_date_time": "Data do documento"
            },
            columnlist: [{
                field: 'no',
                columnMenuType: 'checkbox'
            }, {
                field: 'Entidade.nome',
                columnMenuType: 'checkbox'
            }, {
                field: 'document_type',
                columnMenuType: 'checkbox'
            }, {
                field: 'valor_cativo',
                columnMenuType: 'checkbox'
            }, {
                field: 'issue_date_time',
                columnMenuType: 'checkbox'
            }, {
                field: 'Ver fatura',
                columnMenuType: 'checkbox'
            }],
            TlkTableview: null,
            actionbuttons: { File: true }
        };
    }

    componentDidMount() {
        this.getData();
    }
    // componentDidUpdate(preProp) {
    //     if (preProp.date != this.props.date)
    //         this.get();
    // }

    // setLinkDataMethod = () => {
    //     return {

    //     }
    // }

    // changeOption = (mainIndex, subIndex) => {
    //     console.log("selectOption,mainIndex,subIndex", mainIndex, subIndex)
    //     window.location = "/revenue_receitas?m=" + mainIndex + "&s=" + subIndex;
    //     return;
    // }

    // closePopup = () => {
    //     $(".left-popup").trigger('click');
    // }

    getData = async () => {
        let columnkeyMap = { ...this.state.columnkeyMap }
        let Request = listdefaultRequest
        let res = await services.apiCall.requestApi(`/Revenue/GetInvoiceList`, Request)
        console.log("vijayanand");
        if (res) {
            res.map((_row) => {
                Object.keys(columnkeyMap).map(function (key) {
                    if (key === "nome") {
                        _row[columnkeyMap[key]] = _row["busEntidade"][key]
                    }
                    else
                        _row[columnkeyMap[key]] = _row[key]

                })
            });
            console.log("res", res);
            this.setState({
                res: res
            }, () => this.createTable());
        }
    }

    // renderTableData() { 
    //     if(this.state.res){
    //         let tableData = this.state.res.map((res, index) => {
    //         const { id, no, busEntidade, document_type, issue_date_time, valor_cativo} = res //destructuring
    //         return (
    //             <tr key={id}>
    //                 <td>{no}</td>
    //                 <td>{busEntidade.nome}</td>
    //                 <td>{document_type}</td>
    //                 <td>{valor_cativo}</td>
    //                 <td>{issue_date_time}</td>
    //             </tr>
    //         )
    //         });
    //         console.log("hello");
    //         console.log(tableData);
    //         this.setState({
    //             tableData
    //         })
    //     }
    //  }
    createTable = () => {
        console.log("hello");
        let columnkeyMap = this.state.columnkeyMap;
        let columnlist = Object.keys(columnkeyMap).map(function (key) {
            return { field: columnkeyMap[key], columnMenuType: 'checkbox' }
        });

        let TlkTableview = <TlkTable
            date={new Date()}
            notAction={false}
            list={this.state.res}
            modulename={this.props.tab}
            actionbuttons={this.state.actionbuttons}
            columnlist={columnlist}
            ActionPerform={(action, id) => this.ActionPerform(action, id)} />

        this.setState({
            TlkTableview
        })

    }

    ActionPerform = (action, row) => {


    }

    render() {
        return (
            <div className="dashboard">
                {this.state.TlkTableview}
                {/* <TlkTable
                    date={new Date()}
                    list={this.state.res}
                    modulename={this.props.tab}
                    columnlist={this.state.columnlist} /> */}


            </div>

        )
    }
}


export default TesourariaPage;