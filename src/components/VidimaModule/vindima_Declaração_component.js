import React from 'react';
import services from '../../services';
import { Link, withRouter } from 'react-router-dom';
import TitleBar from '../common/title_bar'
import SearchFilter from '../filters/SearchFilter';
import Main from '../../Pages/Demo/main';
import Lang from '../../lang'
import CountUp from 'react-countup'
import VindimaModalForm from '../VidimaModule/Modal/CommonSideModalForm';
import $ from 'jquery'



class VidimaDeclaracaoComponent extends React.Component {

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
            popUpForm: ''
        }
    }

    componentDidMount() {
        this.createState();
    }
    componentDidUpdate(preProp) {
        if (preProp.date != this.props.date)
            this.createState();
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
                CalculationTabs: null,
                filters: this.props.linkData.filters
            }, () => {
                this.getListData()
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
                                    <CountUp start={0} end={firstKeyTotal} duration={6} />
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
                                    <CountUp start={0} end={SecondKeyTotal} duration={6} />
                                </h1>
                            </div>
                            <div className="claculation_symbols"> = </div>
                            <div className="innerBox">
                                <p>{TabsCalculation.resultDisplay}</p>
                                <h1>
                                    <CountUp start={0} end={Total} duration={6} />
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

        if (this.props.linkData.TabName) {
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
                    <div className="display-content">
                        <div className="row">
                            {
                                TabName.map((_n, i) => (
                                    <div key={i} className="innerBox col-md-3">
                                        <p>{_n.name}</p>
                                        <h1>
                                            <CountUp start={0} end={tabSectionView[_n.key]} duration={6} />
                                        </h1>
                                    </div>
                                ))
                            }
                            {
                                this.props.linkData && this.props.linkData.TitleBartitle === "Pagamentos pendentes ou retidos" &&
                                <a href="#" onClick={() => this.openDetailPopUpForm()} data-toggle="modal" data-target="#vindima-modal" className="innerBox col-md-3 active cursor-pointer">
                                    <p>Ver lista do valor total por anos</p>
                                    <div className="circle">
                                        <i className="fas fa-eye"></i>
                                    </div>
                                </a>
                            }
                        </div>
                    </div>
                </div>
            )
            this.setState({
                tabsComponentsView
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
                                <CountUp start={0} end={totalSum} duration={6} />
                            </h1>
                        </div>
                        <div className="innerBox">
                            <p>Valor total a pagar {YearWiseTabName.endYear}</p>
                            <h1>
                                <CountUp start={0} end={yearWiseArray[YearWiseTabName.endYear]} duration={6} />
                            </h1>
                        </div>
                        <div className="innerBox">
                            <p>Valor total a pagar {YearWiseTabName.startYear}</p>
                            <h1>
                                <CountUp start={0} end={yearWiseArray[YearWiseTabName.startYear]} duration={6} />
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

    getListData = async () => {
        let Request = this.props.linkData.listdefaultRequest;
        let method = this.props.linkData.requestMethod;
        let link = this.props.linkData.listApilink;
        let columnkeyMap = this.props.linkData.columnkeyMap;
        Request.year = this.props.year
        let res = await services.apiCall.requestApi(link, Request, method)

        if (res) {
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

    handleFilter = (data) => {
        this.setState({
            filterData: data
        }, () => this.createTabel())
    }

    createTabel = () => {
        let actionbuttons = this.props.linkData.actionbuttons;
        let data = this.state.filterData;
        let telkikTable = <Main 
                            date={new Date()} 
                            collepsview={this.props.linkData.collepsview} 
                            notAction={this.props.linkData.notAction} 
                            groupfield={this.props.linkData.groupfield} 
                            deleteFunc={(id) => this.handleDelete(id)} 
                            list={data} actionbuttons={actionbuttons} 
                            columnlist={this.state.columnlist} 
                            ActionPerform={(action, id) => this.ActionPerform(action, id)} 
                        />
        this.setState({
            telkikTable: telkikTable
        }, () => this.tabsCalculation(),
            this.tabSectionView(),
            this.yearWiseTabNameFunction())
    }

    getFilters = (data) => {

    }

    handleDelete = async (id) => {
        let res = await services.apiCall.requestApi(`/BusEntidadeEstatuto/Delete/${id}`, {}, 'post')
        if (res) {
            console.log("res", res)
            this.createpayload();
        }
    }


    ActionPerform = (action, row) => {
        if (action == 'Edit') {
            console.log("row.codEntidade", row)
            this.props.history.push({
                pathname: "/entity_rule_form",
                state: { entidade_id: row.codEntidade }
            })
        } else if (action === 'detailPopUp' || action === 'detailPopUpTwo') {
            console.log(".....ACTION", action)
            this.openDetailPopUpForm(row, action);
        }
    }

    openDetailPopUpForm = (row, action) => {
        let popUpForm = ''
        if (this.props.linkData.popUpTwoTabName && action === 'detailPopUpTwo') {
            popUpForm = (
                <VindimaModalForm tab={this.props.linkData.popUpTwoTabName} data={row} date={new Date()} closePopup={() => this.closePopup()} />
            )
        } else {
            popUpForm = (
                <VindimaModalForm tab={this.props.linkData.popUpTabName} data={row} date={new Date()} closePopup={() => this.closePopup()} />
            )
        }
        this.setState({
            popUpForm
        })
    }

    closePopup = () => {
        $(".left-popup").trigger('click');
    }

    render() {
        console.log("linkData", this.props.linkData);
        return (
            <div className="inner-container">
                <div className="outer-space">
                    <TitleBar
                        path={this.props.linkData.TitleBarpath}
                        title={this.props.linkData.TitleBartitle}
                        logo={this.props.linkData.TitleBarlogo}
                        linkData={this.props.linkData}
                        selectedtitelotion={this.props.selectedtitelotion}
                        selectedMainOption={this.props.selectedMainOption}
                        changeOption={(mainIndex, subIndex) => this.props.changeOption(mainIndex, subIndex)} optionMenuArray={this.props.optionMenuArray} />
                    {
                        this.props.linkData.filters && Object.keys(this.props.linkData.filters).length > 0 &&
                        <SearchFilter filters={this.props.linkData.filters} handleFilter={(data) => this.handleFilter(data)} data={this.state.data} getFilter={(data) => this.getFilters(data)} />
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
                {
                    <div className="modal left-popup" id="vindima-modal">
                        <div className="modal-dialog modal-lg">
                            {
                                this.state.popUpForm
                            }
                        </div>
                    </div>
                }
                {
                    <div className="modal left-popup" id="vindima-Registar">
                        <div className="modal-dialog modal-lg">
                            {
                                <VindimaModalForm tab={this.props.linkData.TitleBarPopUpButton} date={new Date()} closePopup={() => this.closePopup()} />
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }
}


export default withRouter(VidimaDeclaracaoComponent);