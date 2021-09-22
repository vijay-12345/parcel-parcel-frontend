import React from 'react';
import queryString from 'query-string'
import NavBar from '../common/navbar';
import SideBar from '../../components/modules/left_sidebar';
import TitleBar from '../common/title_bar'
import SearchFilter from '../filters/SearchFilter';
import Main from '../../Pages/Demo/main';
import services from '../../services';
import CountUp from 'react-countup';
import $ from 'jquery'
import RightPopModalForm from '../common/RightPopModalForm';

import { Button } from '@progress/kendo-react-buttons'
import EntityDetails from '../common/EntityDetails';
import TlkTable from '../tlelrik/table/tlkTable';
import RevenueEntityAction from '../common/RevenueEntityAction';
var moment = require('moment')
const dateFormat = "YYYY-MM-DD";

const listdefaultRequest = {
    "Filters": {
        "entity_id": null,
        "start_date": null,
        "end_date": null,
        "is_invoiced": null
    },
    "SortBy": "",
    "IsSortTypeDESC": true,
    "IsPagination": false,
    "Page": 1,
    "PageSize": 1
}
const Administration = false

const optionMenuArray = [
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



const ScreenDataObject = {
    'faturasRecibos': {
        filters: {
            Tabs: {
                'Faturas Recibos': [
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
            "trans_no": "Referência",
            "desart": "Descrição",
            "codart": "Codart",
            "trans_date": "Data",
            "quantidade": "Quantidade",
            "unidade": "Unidade",
            "valor": "Valor",
            "iva": "Iva",
            "taxa_rate": "Taxa iva",
            "contab": "Contab",
            "valor_cativo": "Valor Cativo"
        },
        actionbuttons: { Delete: true },
        listApilink: "Revenue/GetAlottedServices",
        listdefaultRequest: listdefaultRequest,
        requestMethod: "post",
        navbarOptionsYear: false,
        prevPageName: 'Detalhes',
        // TitleBarButtonName: "Emitir fatura",
        //  OpenAndCloseCashier: true,
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
                url: 'revenue_faturas'
            },
            {
                name: 'Faturas Em Cobrança',
                url: 'revenue_faturas'
            }
        ],
        //  TitleBarSecondButtonName: "Adicionar Movimento",
        prevPageLink: '/revenue_receitas',
        TitleBartitle: "Emissão de faturas recibos",
        TitleBarlogo: "auditing",
        groupfield: [],

    }
    //,
    // 'faturas': {
    //     filters: {
    //         Tabs: {
    //             'Faturas': [
    //                 {
    //                     key: 'RangePicker',
    //                     displayKey: "intervalo de datas",
    //                     inputType: "RangePicker"
    //                 }
    //             ]
    //         },
    //         checkbox: []
    //     },
    //     columnkeyMap: {
    //         "trans_no": "Referência",
    //         "desart": "Descrição",
    //         "codart": "Codart",
    //         "trans_date": "Data",
    //         "quantidade": "Quantidade",
    //         "unidade": "Unidade",
    //         "valor": "Valor",
    //         "iva": "Iva",
    //         "taxa_rate": "Taxa iva",
    //         "contab": "Contab",
    //         "valor_cativo": "Valor Cativo"

    //     },
    //     actionbuttons: { Delete: true },

    //     listApilink: "Revenue/GetAlottedServices",
    //     listdefaultRequest: listdefaultRequest,
    //     requestMethod: "post",
    //     navbarOptionsYear: false,
    //     prevPageName: 'Detalhes',
    //     TitleBarButtonName: "Emitir fatura",
    //    // OpenAndCloseCashier: true,
    //     nevOptionLinks: [
    //         {
    //             name: 'Tesouraria',
    //             url: 'revenue_receitas'
    //         },
    //         {
    //             name: 'Conta corrente',
    //             url: 'revenue_conta'
    //         },
    //         {
    //             name: 'Faturas pendentes',
    //             url: 'revenue_faturas'
    //         }
    //     ],
    //     TitleBarSecondButtonName: "Adicionar Movimento",
    //     prevPageLink: '/revenue_receitas',
    //     TitleBartitle: "Emissão de faturas",
    //     TitleBarlogo: "auditing",
    //     groupfield: []
    // }
}


class ReceitasSecondScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            linkData: {},
            totalcount: null,
            data: [],
            filterData: [],
            telkikTable: '',
            Tab: '',
            applyedfilter: {},
            completeData: {},
            TransMethods_list: [],
            entity_details: {
                busEntidade: {},
                currentEntityBalance: 0,
                billingAddress: []
            },
            completeData: {},
            currency_list: [],
            tax_list: [],
            billing_address: null
        }
    }

    componentDidMount() {
        let parsed = queryString.parse(window.location.search);
        this.setState({
            name: parsed.name,
            linkData: ScreenDataObject[parsed.name]
        }, () => this.getEntityDetails(parsed.entity_id))
    }


    getEntityDetails = async (entity_id=null) => {
        if (!entity_id) {
            let parsed = queryString.parse(window.location.search);
            entity_id = parsed.entity_id;
        }
        let Request = {};
        let linkData = { ...this.state.linkData }
        Request.entityId = parseInt(entity_id);
        let link = "/Revenue/getEntityDetail"
        let res = await services.apiCall.requestApi(link, Request);
        if (res) {
            console.log("OK",res);
            linkData.TitleBartitle = res.busEntidade.nome;
            this.setState({
                entity_details: res,
                linkData
            }, () => this.getListData());
        }
        
    }


    getListData = async () => {
        let Request = listdefaultRequest;
        let applyedfilter = { ...this.state.applyedfilter }
        let completeData = {
            transactionDetail: [],
            allTransaction: [],
            busEntidade: {},
            currentEntityBalance: 0
        }
        const parsed = queryString.parse(this.props.location.search);
        applyedfilter.entity_id = parsed.entity_id
        Request.Filters = { ...Request.Filters, ...applyedfilter }
        Request.Filters.local = window.localStorage.getItem('Local');
        let method = this.state.linkData.requestMethod;
        let link = this.state.linkData.listApilink;
        let res = await services.apiCall.requestApi(link, Request, method);

        if (res) {

            this.setState({
                completeData: completeData,
                data: res,
                filterData: res,
                totalcount: res ? res.length : 0
            }, () => {
                this.createTabel();
            })
        } else {
            this.setState({
                completeData: completeData
            })
        }
    }


    handleFilter = (data) => {
        this.setState({
            filterData: data
        }, () => this.createTabel())
    }

    createTabel = () => {

        let actionbuttons = this.state.linkData.actionbuttons;
        let columnkeyMap = this.state.linkData.columnkeyMap;
        let columnlist = Object.keys(columnkeyMap).map(function (key) {
            return { field: columnkeyMap[key], columnMenuType: 'checkbox' }
        });
        let data = [...this.state.filterData];
        let date = null;
        data.map((_r, index) => {
            date = moment(_r.date).format(dateFormat)
            Object.keys(columnkeyMap).map(function (key) {
                if (key === "trans_no") {
                    _r[columnkeyMap[key]] = "AE20E" + _r.trans_id
                }
                else if (key === "desart") {
                    _r[columnkeyMap[key]] = _r.service.desart
                } else if (key === "codart") {
                    _r[columnkeyMap[key]] = _r.service.codart
                } else if (key === "trans_date") {
                    _r[columnkeyMap[key]] = date
                } else if (key === "quantidade") {
                    _r[columnkeyMap[key]] = _r.unit
                } else if (key === "unidade") {
                    _r[columnkeyMap[key]] = _r.service.uniart
                } else if (key === "valor") {
                    _r[columnkeyMap[key]] = _r.valor || 0
                } else if (key === "iva") {
                    _r[columnkeyMap[key]] = _r.service_tax || 0
                } else if (key === "contab") {
                    _r[columnkeyMap[key]] = _r.service.ctbart
                } else if (key === "valor_cativo") {
                    _r[columnkeyMap[key]] = _r.valor_cativo || 0
                }
            })
        });
        let telkikTable = (<TlkTable
            date={new Date()}
            notAction={this.state.linkData.notAction}
            groupfield={this.state.linkData.groupfield}
            deleteFunc={(id) => this.handleDelete(id)}
            list={data}
            actionbuttons={actionbuttons}
            columnlist={columnlist}
            ActionPerform={(action, id) => this.ActionPerform(action, id)}
        />)

        this.setState({
            telkikTable: telkikTable
        })
    }


    getFilters = (customfilters) => {
        let applyedfilter = { ...customfilters.filterCheckbox, ...customfilters.filters }
        delete applyedfilter.entity;
        this.setState({
            applyedfilter
        }, () => this.getListData());
    }

    handleDelete = async (row) => {
        let request = {
            "transId": row.id
        }
        let res = await services.apiCall.requestApi(`Revenue/DeleteTransaction`, request, 'post')
        if (res) {
            window.location = '/revenue_receitas';
        }
    }

    ActionPerform = (action, row) => {
        if (action == 'Edit') {

        }
    }


    closePopup = () => {
        this.getEntityDetails(this.state.entity_details.busEntidade.nifap);
        $(".left-popup").trigger('click');
    }

    createTab = () => {
        let Tab = '';
        Tab = (
            <div className="row">
                {
                    this.state.entity_details.billingAddress && this.state.entity_details.billingAddress > 1 &&
                    <div className="col-md-12">
                        <div id="changeaddressNote">
                            <span className="k-icon k-i-information"></span>  Selecione a morada de faturação
                        </div>
                    </div>
                }

                <div className="tab-section col-md-2">
                    <div className="innerBox">
                        <div className="display-content">
                            <p><strong>Entidade</strong></p>
                            <p>{this.state.entity_details.busEntidade.nome}</p>
                        </div>
                    </div>
                </div>
                <div className="tab-section col-md-2">
                    <div className="innerBox">
                        <div className="display-content">
                            <p><strong>Saldo atual</strong></p>
                            {services.money.format(this.state.entity_details.currentEntityBalance)}

                        </div>
                    </div>
                </div>
                <div className="tab-section col-md-5">
                    <div className="innerBox active cursor-pointer">
                        <div className="display-content">
                            <div className="row">
                                <div className="col-md-9">
                                    {this.getBillingAddress()}
                                </div>
                                <div className="col-md-3">
                                    <Button primary={true} onClick={() => this.updateNavDropdown('Alterar', this.state.name)} className="k-button btn-theme mr-2  k-primary">Alterar</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tab-section col-md-3">
                    <EntityDetails entity={this.state.entity_details.busEntidade} onlyDetails={true} />
                </div>
                <Button primary={true} onClick={() => this.updateNavDropdown('Add_Amount', this.state.name)} className="k-button btn-theme mr-2  k-primary">Adicionar valor</Button>
                <Button onClick={() => this.updateNavDropdown("Adicionar Movimento", this.state.name, 1)} primary={true} className="k-button btn-theme mr-2  k-primary">Criar recibo</Button>
            </div >
        )

        this.setState({ Tab })
    }

    render() {
        return (
            <React.Fragment>
                <div className="dashboard">
                    <NavBar date={new Date()} linkData={this.state.linkData} />
                    <SideBar Administration={Administration} />
                    <div className="inner-container">
                        <div className="outer-space">
                            <TitleBar
                                title={this.state.linkData.TitleBartitle}
                                logo={this.state.linkData.TitleBarlogo}
                                linkData={this.state.linkData}
                                prevPageName={this.state.linkData.prevPageName}
                                prevPageLink={this.state.linkData.prevPageLink}
                                pageName={this.state.name}
                                noOption={true}
                                TitleBarSecondButtonName={this.state.linkData.TitleBarSecondButtonName}
                                TitleBarButtonName={this.state.linkData.TitleBarButtonName}
                            />
                            {
                                this.state.linkData.filters && Object.keys(this.state.linkData.filters).length > 0 &&
                                <SearchFilter filters={this.state.linkData.filters} handleFilter={(data) => this.handleFilter(data)} data={this.state.data} getFilter={(data) => this.getFilters(data)} />
                            }
                            {
                                this.state.entity_details &&
                                    <RevenueEntityAction
                                        entity_details={this.state.entity_details}
                                        getEntityDetails={(id) => this.getEntityDetails(id)}
                                        date={new Date()}
                                    />

                            }
                            {
                                this.state.linkData.actionbuttons &&
                                <div className="table-responsive table-section">
                                    <h3> A pesquisa retornou {this.state.totalcount} resultados </h3>
                                    {
                                        this.state.telkikTable
                                    }
                                </div>
                            }
                        </div>
                        <button data-toggle="modal" data-target="#popup-modal" className="modelpopup hidden"></button>
                        <div className="modal left-popup" id="popup-modal">
                            <div className="modal-dialog modal-lg">
                                {
                                    this.state.popUpForm
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default ReceitasSecondScreen;