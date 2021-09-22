import React from 'react';
import services from '../../services';
import { Link, withRouter } from 'react-router-dom';
import TitleBar from '../common/title_bar'
import SearchFilter from '../filters/SearchFilter';
import Main from '../../Pages/Demo/main';
import VindimaModalForm from '../VidimaModule/Modal/CommonSideModalForm';
import $ from 'jquery'



class VidimaRegistoComponent extends React.Component {

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
        let telkikTable = <Main date={new Date()} notAction={this.props.linkData.notAction} groupfield={this.props.linkData.groupfield} deleteFunc={(id) => this.handleDelete(id)} list={data} actionbuttons={actionbuttons} columnlist={this.state.columnlist} ActionPerform={(action, id) => this.ActionPerform(action, id)} />
        this.setState({
            telkikTable: telkikTable
        })
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
        } else if (action === 'detailPopUpTwo') {
            console.log(".....ACTION", action)
            this.openDetailPopUpForm(row,this.props.linkData.popUpTwoTabName);
        }else if(action === 'detailPopUp'){
            this.openDetailPopUpForm(row,this.props.linkData.popUpTabName);
        }
        // else if(action === 'Imprimir'){
        //     this.openDetailPopUpForm(row,"Definir intervalo de registos");
        // }else if(action === 'Preencher/Validar nº IVV'){
        //     this.openDetailPopUpForm(row,"Preencher/Validar nº IVV");
        // }

        
    }

    openDetailPopUpForm = (row, tabName) => {
        let popUpForm = ''
        popUpForm = (
            <VindimaModalForm tab={tabName} data={row} date={new Date()} closePopup={() => this.closePopup()} />
        )
            
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
                        TitleBarButtonName={this.props.linkData.TitleBarButtonName}
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


export default withRouter(VidimaRegistoComponent);