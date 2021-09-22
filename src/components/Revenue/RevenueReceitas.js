import React from 'react';
import services from '../../services';
import { Link, withRouter } from 'react-router-dom';
import TitleBar from '../common/title_bar'
import SearchFilter from '../filters/SearchFilter';
import Lang from '../../lang'
import CountUp from 'react-countup'
import RevenueModalForm from '../VidimaModule/Modal/CommonSideModalForm';
import $ from 'jquery'
import TlkTable from '../tlelrik/table/tlkTable';
import RevenueSecondModalForm from './secondModalReceitas';
import { DatePicker } from 'antd'
import EntityDetails from '../common/EntityDetails';
import RevenueEntityAction from '../common/RevenueEntityAction';
import SecondPopup from '../modules/SecondPopup';
import { Button } from '@progress/kendo-react-buttons'
import RightPopModalForm from '../common/RightPopModalForm';
var moment = require('moment')
const dateFormat = "YYYY-MM-DD";

const servicesMenuArray = [
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


class RevenueReceitas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            telkikTable: '',
            totalcount: '0',
            filterData: [],
            yearWiseTabComponent: "",
            columnlist: {},
            filter: this.props.linkData.filters,
            tabsComponentsView: null,
            CalculationTabs: null,
            popUpForm: '',
            popUpForm2: null,
            Tab: null,
            entity_details: {
                busEntidade: {},
                currentEntityBalance: 0,
                billingAddress: []
            },
            currency_list: [],
            tax_list: [],
            TransMethods_list: [],
            billing_address: null,
            applyedfilter: {},
            temp_services:[],
            temp_popup_array:[]
        }
    }

    componentDidMount() {
        this.createState();
    }
    componentDidUpdate(preProp) {
        if (preProp.date != this.props.date)
            this.createState();
    }

    updateServiceslist=(temp_services)=>{
        // this.setState({
        //     temp_services
        // });
        console.log("stateis",this.state);
        console.log("temp_services",temp_services);
        var temp_popup_array = [];
        temp_services.services.map((value, index) => {
            temp_popup_array.push({
                'Nº Doc':this.state.data[1].no,
                'Entidade':this.state.entity_details.busEntidade.nome,
                'Tipo Doc':'Invoice',
                'Data':value['date'],
                'Entrada':'',
                'Saida':value['valor']

            });
        })
        console.log("array_service",temp_popup_array);
        this.setState({
            temp_popup_array,
            temp_services
        },() =>{
            this.createTabel();
        });

    }

    createState = () => {
        if (this.props.linkData && this.props.linkData.columnkeyMap) {
            let columnkeyMap = this.props.linkData.columnkeyMap;
            let columnlist = Object.keys(columnkeyMap).map(function (key) {
                return { field: columnkeyMap[key], columnMenuType: 'checkbox' }
            });
            this.setState({
                columnlist,
                tabsComponentsView: null,
                Tab: this.props.Tab,
                entity_details: this.props.entity_details,
                currency_list: this.props.entity_details,
                tax_list: this.props.entity_details,
                TransMethods_list: this.props.entity_details,
                CalculationTabs: null,
                filters: this.props.linkData.filters
            }, () => {
                if (!this.props.singleentity) {
                    this.getListData();
                }
                this.tabsCalculation()
                this.tabSectionView()
            })
        }
    }

    tabsCalculation = () => {
        let firstKeyTotal = 0
        let SecondKeyTotal = 0
        let Total = 0;
        if (this.props.linkData.TabsCalculation) {
            let TabsCalculation = this.props.linkData.TabsCalculation;
            this.state.filterData.map(_r => {
                console.log("mlmkkmlmk", _r)
                firstKeyTotal += _r[TabsCalculation.FirstKey] || 0
                SecondKeyTotal += _r[TabsCalculation.SecondKey] || 0
            })
            Total = eval(firstKeyTotal + TabsCalculation.opration + SecondKeyTotal);

            console.log(firstKeyTotal, SecondKeyTotal, Total)
            let CalculationTabs = (
                <div className="tab-section">
                    {
                        <div className="d-md-flex justify-content-between">

                            <div className="innerBox">
                                <p>{TabsCalculation.FirstDispaly}</p>
                                <h1>
                                    <CountUp start={0} end={firstKeyTotal} />
                                </h1>
                            </div>
                            <div className="claculation_symbols">
                                {
                                    TabsCalculation.opration
                                }
                            </div>
                            <div className="innerBox">
                                <p>{TabsCalculation.SecondDispaly}</p>
                                <h1>
                                    <CountUp start={0} end={SecondKeyTotal} />
                                </h1>
                            </div>
                            <div className="claculation_symbols"> = </div>
                            <div className="innerBox">
                                <p>{TabsCalculation.resultDisplay}</p>
                                <h1>
                                    <CountUp start={0} end={Total} />
                                </h1>
                            </div>

                        </div>
                    }
                </div>
            )
            this.setState({
                CalculationTabs
            })


        }
    }

    tabSectionView = () => {
        if (this.props.linkData.TabName && this.state.entity_details.busEntidade) {
            let TabName = this.props.linkData.TabName;
            let tabSectionView = {}
            let tabsComponentsView = '';
            TabName.map(_r => {
                tabSectionView[_r.key] = 0
            })
            this.state.filterData.map(_r => {
                TabName.map(r => {
                    tabSectionView[r.key] += Number(_r[r.key]) || 0
                })
            })
            console.log("tabSection", tabSectionView)
            tabsComponentsView = (

                <div className="tab-section">

                    <div className="row">
                        {
                            TabName.map((_n, i) => (
                                <div key={i} className="col-md-4">
                                    <div className="innerBox">
                                        <p>{_n.name}</p>
                                        <h1>{this.state.entity_details.currentEntityBalance}</h1>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            this.props.linkData.popUpTabName === "Consultar Conta" &&
                            <div className="col-md-4">
                                <div className="tab-section col-md-2">
                                    <EntityDetails entity={this.state.entity_details.busEntidade} onlyDetails={true} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            )
            this.setState({
                tabsComponentsView
            })
        } else {
            this.setState({
                tabsComponentsView: null
            })
        }
    }

    yearWiseTabNameFunction = () => {
        if (this.props.linkData.YearWiseTabName) {
            let YearWiseTabName = this.props.linkData.YearWiseTabName;
            let yearWiseTabComponent = '';
            let data = [...this.state.filterData]
            let yearWiseArray = [];
            let totalSum = 0;
            data.map((_row, index) => {
                _row[YearWiseTabName.key] = parseInt(_row[YearWiseTabName.key])
                yearWiseArray[_row.ano] = yearWiseArray[_row.ano]
                    ? yearWiseArray[_row.ano] + _row[YearWiseTabName.key]
                    : _row[YearWiseTabName.key];

                totalSum += _row[YearWiseTabName.key]
            })
            yearWiseTabComponent = (
                <div className="tab-section">
                    <div className="d-md-flex justify-content-between">
                        <div className="innerBox">
                            <p>Valor total global a pagar</p>
                            <h1>
                                <CountUp start={0} end={totalSum} />
                            </h1>
                        </div>
                        <div className="innerBox">
                            <p>Valor total a pagar {YearWiseTabName.endYear}</p>
                            <h1>
                                <CountUp start={0} end={yearWiseArray[YearWiseTabName.endYear]} />
                            </h1>
                        </div>
                        <div className="innerBox">
                            <p>Valor total a pagar {YearWiseTabName.startYear}</p>
                            <h1>
                                <CountUp start={0} end={yearWiseArray[YearWiseTabName.startYear]} />
                            </h1>
                        </div>
                        <a href="#" className="innerBox active d-flex align-items-center cursor-pointer" onClick={() => this.openDetailPopUpForm()} data-toggle="modal" data-target="#vindima-modal">
                            <div className="display-content">
                                <p>Ver lista do valor total por anos</p>
                                <div className="circle">
                                    <i className="fas fa-eye"></i>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            )
            this.setState({
                yearWiseTabComponent
            })
        }
    }

    getEntityDetails = async (entity_id) => {
        let Request = {};
        this.setState({
            entity_details: {
                busEntidade: {},
                currentEntityBalance: 0,
                billingAddress: []
            }
        });
        Request.entityId = parseInt(entity_id);
        let link = "/Revenue/getEntityDetail"
        let res = await services.apiCall.requestApi(link, Request);
        if (res) {
            this.setState({
                entity_details: res
            }, () => {
                this.getListData()
            });
        } else if (!this.props.singleentity) {
            this.getListData();
        }
    }

    getListData = async () => {
        let Request = { ...this.props.linkData.listdefaultRequest };
        Request.Filters.entity_id = null;
        this.setState({
            totalcount: 0
        })
        Request.Filters = { ...Request.Filters, ...this.state.applyedfilter }
        Request.Filters.local = window.localStorage.getItem('Local');
        let method = this.props.linkData.requestMethod;
        let link = this.props.linkData.listApilink;
        let columnkeyMap = this.props.linkData.columnkeyMap;
        let res = await services.apiCall.requestApi(link, Request, method)
        if (res) {
            res.map((_row) => {
                Object.keys(columnkeyMap).map(function (key) {
                    if (key === "n doc") {
                        _row[columnkeyMap[key]] = _row.no
                    } else if (key === "Entidade") {
                        _row[columnkeyMap[key]] = _row.busEntidade.nome

                    } else if (key === "Sinal") {
                        _row[columnkeyMap[key]] = _row['flag'];
                    } else if (key === "Invoice_date") {
                        _row[columnkeyMap[key]] = moment(_row['issue_date_time']).format(dateFormat);
                    } else if (key === "pag_limit") {
                        _row[columnkeyMap[key]] = moment(_row['deadline_date']).format(dateFormat);
                    } else if (key === "Interest_to_date") {
                        _row[columnkeyMap[key]] = services.money.format(_row.service_tax);
                    } else if (key === "Valor c/ IVA") {
                        _row[columnkeyMap[key]] = services.money.format(_row.total_amount);
                    } else if (key === "valor_cativo") {
                        _row[columnkeyMap[key]] = services.money.format(_row.valor_cativo);
                    } else if (key === "Valor IVA") {
                        _row[columnkeyMap[key]] = services.money.format(_row.iva);
                    } else if (key === "Amount_paid") {
                        _row[columnkeyMap[key]] = services.money.format(_row['amount_paid']);
                    } else if (key === "outgoingAmount" && _row['document_type'] === 'Invoice') {
                        _row[columnkeyMap[key]] = services.money.format(_row.total_amount);
                    } else if (key === "incomingAmount" && _row['document_type'] === 'Credit') {
                        _row[columnkeyMap[key]] = services.money.format(_row.total_amount);
                    } else
                        _row[columnkeyMap[key]] = _row[key]
                });
            });
            this.setState({
                data: res,
                filterData: res,
                totalcount: res.length,
            }, () => this.createTabel())
        }
    }

    handleFilter = (data) => {
        // this.setState({
        //     filterData: data
        // }, () => this.createTabel())
    }

    createTabel = () => {
        let actionbuttons = this.props.linkData.actionbuttons;
        let data = this.state.filterData;
        if(this.state.temp_popup_array.length >=1){
            this.state.temp_popup_array.map((value,index)=>{
                data.push(value);
            })            
        }
        console.log("vijaydata",this.state.data);
        console.log("vijaytemp_services",this.state.temp_popup_array);
        // let data = this.props.AddServices;
        let telkikTable = <TlkTable
            date={new Date()}
            groupfield={this.props.linkData.groupfield}
            notAction={this.props.linkData.notAction}
            list={data}
            modulename={this.props.tab}
            deleteFunc={(id) => this.handleDelete(id)}
            actionbuttons={actionbuttons}
            columnlist={this.state.columnlist}
            ActionPerform={(action, id) => this.ActionPerform(action, id)} />

        this.setState({
            telkikTable: telkikTable
        }, () =>
            this.tabsCalculation(),
            this.tabSectionView(),
            this.yearWiseTabNameFunction()
        )
    }

    getFilters = (customfilters) => {
        let applyedfilter = { ...customfilters.filterCheckbox, ...customfilters.filters }
        delete applyedfilter.entity;
        console.log("data", applyedfilter);
        this.setState({
            applyedfilter,
            Tab: null
        }, () =>
            this.getEntityDetails(applyedfilter.entity_id)
        );
    }


    handleDelete = async (id) => {
        let res = await services.apiCall.requestApi(`/BusEntidadeEstatuto/Delete/${id}`, {}, 'post')
        if (res) {
            console.log("res", res)
            this.createpayload();
        }
    }


    ActionPerform = (action, row) => {
        console.log("action", action, row)
        let popUpForm = null;
        if (action == 'Edit') {
            this.props.history.push({
                pathname: "/entity_rule_form",
                state: { entidade_id: row.codEntidade }
            })
        } else if (action === 'detailPopUp' || action === 'detailPopUpTwo') {
            popUpForm = this.openDetailPopUpForm(row, action);
        }
        else
            popUpForm = (
                <RevenueModalForm
                    tab={action}
                    data={row} date={new Date()}
                    ActionPerform={(action, row) => this.ActionPerform(action, row)}
                    closePopup={() => this.closePopup()} />
            )
        if (popUpForm) {
            this.setState({ popUpForm })
        }
    }

    openDetailPopUpForm = (row, action) => {
        let popUpForm = ''
        if (this.props.linkData.popUpTwoTabName && action === 'detailPopUpTwo') {
            popUpForm = (
                <RevenueModalForm tab={this.props.linkData.popUpTwoTabName} data={row} date={new Date()} closePopup={() => this.closePopup()} />
            )
        } else if(row.document_type == 'Credit'){
            popUpForm = (
                <RevenueModalForm
                    tab={"Credit Details"}
                    data={row}
                    date={new Date()}
                    closePopup={() => this.closePopup()}
                />
            )
        }
        else{
            popUpForm = (
                <RevenueModalForm
                    tab={this.props.linkData.popUpTabName}
                    data={row}
                    date={new Date()}
                    popUpForm2={this.state.popUpForm2}
                    updatepopUpForm2={(action, row) => this.updatepopUpForm2(action, row)}
                    closePopup={() => this.closePopup()}
                />
            )
        }
        return popUpForm;
    }

    updatepopUpForm2=(popUpForm2)=>{
        this.setState({
            popUpForm2
        })
        $("#firstPopup").trigger("click");
        $("#secondPopup").trigger("click");
    }

    closePopup = () => {
        $(".left-popup").trigger('click');
    }

    updateNavDropdown = (action, pageName = "faturasRecibos", forfutureInvoice = 0) => {
        console.log("entityDetails",this.props.entity_details);
        const parsed = this.props.parsed;
        let popUpForm = (
            <RightPopModalForm
                closePopup={this.closePopup}
                date={new Date()}
                tab={action}
                pageName={pageName}
                forfutureInvoice={forfutureInvoice}
                optionMenuArray={servicesMenuArray}
                parsed={parsed}
                entity_details={this.state.entity_details}
                TransMethods_list={this.state.TransMethods_list}
                currency_list={this.state.currency_list}
                tax_list={this.state.tax_list}
                completeData={this.state.completeData}
                billing_address={this.state.billing_address || {}}
                getEntityDetails={(id)=>this.getEntityDetails(id)}
            />
        )
        this.setState({
            popUpForm
        })
        $("#revenuEntityactionpopupbutton").trigger("click");
    }

    render() {

        return (
            <div className="inner-container">
                <div className="outer-space">
                    <TitleBar
                        title={this.props.linkData.TitleBartitle}
                        logo={this.props.linkData.TitleBarlogo}
                        linkData={this.props.linkData}
                        prevPageName={this.props.linkData.prevPageName}
                        prevPageLink={this.props.linkData.prevPageLink}
                        noOption={true}
                        selectedtitelotion={this.props.selectedtitelotion}
                        selectedMainOption={this.props.selectedMainOption}
                        changeOption={(mainIndex, subIndex) => this.props.changeOption(mainIndex, subIndex)} optionMenuArray={this.props.optionMenuArray} />
                   {
                       this.props.linkData.onlyEntityAction && this.state.entity_details &&
                       <RevenueEntityAction
                       entity_details={this.state.entity_details}
                       closePopup={() => this.closePopup()}
                       date={new Date()}
                       updateServiceslist={(list)=>this.updateServiceslist(list)}
                       parsed={this.props.parsed}
                       onlyEntityAction={this.props.linkData.onlyEntityAction}
                   />
                       
                   }
                                     
                    
                    {
                        this.props.linkData.filters && Object.keys(this.props.linkData.filters).length > 0 &&
                        <SearchFilter showEntity={true} filters={this.props.linkData.filters} handleFilter={(data) => this.handleFilter(data)} data={this.state.data} getFilter={(data) => this.getFilters(data)} />
                    }
                    {
                        !this.props.linkData.onlyEntityAction &&
                        <RevenueEntityAction
                            entity_details={this.state.entity_details}
                            closePopup={() => this.closePopup()}
                            date={new Date()}
                            updateServiceslist={(list)=>this.updateServiceslist(list)}
                            parsed={this.props.parsed}
                        />
                    }
                    {
                        this.state.tabsComponentsView
                    }
                    {
                        this.state.CalculationTabs
                    }
                    {
                        this.state.yearWiseTabComponent
                    }
                    <div className="table-responsive table-section">
                        <h3> A pesquisa retornou {this.state.totalcount} resultados </h3>
                        {
                            this.state.telkikTable
                        }
                    </div>
                </div>
                <div className="modal left-popup" id="vindima-modal">
                    <div className="modal-dialog modal-lg">
                        {
                            this.state.popUpForm
                        }
                    </div>
                </div>
                <input type='hidden' data-toggle="modal" data-target="#vindima-modal" id="firstPopup" />
                <input type='hidden' data-toggle="modal" data-target="#leftdetailpopup" id="secondPopup" />
                <div className="modal left-popup left-popup2" id="leftdetailpopup">
                        <div className="modal-dialog modal-sm">
                            {
                                this.state.popUpForm2
                            }
                        </div>
                </div>
                {
                    <div>
                        <button className="hidden" data-toggle="modal" data-target="#revenuEntityactionpopup" id="revenuEntityactionpopupbutton"></button>
                        <div className="modal left-popup" id="revenuEntityactionpopup">
                            <div className="modal-dialog modal-lg">
                                {
                                    this.state.popUpForm
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}


export default withRouter(RevenueReceitas);