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
import AnaliseEntregasTabModule from './Modal/AnaliseEntregasTabModule';
import InstructionMessage from './Modal/InstructionMessage';
import CommonDropdown from './Modal/commonDropdown';
import ResumoCampanha from './ResumoCampanhaComponent';
import queryString from 'query-string'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { __getComponentData } from '../../store/actions/vindima_secondScreen_action'
import NavBar from '../common/navbar';
import SideBar from '../../components/modules/left_sidebar';

const listdefaultRequest = { "Filters": null, "SortBy": "", "IsSortTypeDESC": false, "IsPagination": false, "Page": 1, "PageSize": 100 }
const Administration = false;

class VidimaSecondScreenComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            linkData : {},
            year : '',
            data : [],
            filterData : [],
            totalcount : null,
            telkikTable : ''
        }
    }

    componentDidMount() {
        // this.createState();
        let parsed = queryString.parse(window.location.search)
        this.props.__getComponentData(parsed.name)
        // console.log("parsed",this.props.linkData)

    }
    componentDidUpdate(preProp) {
        if (preProp.linkData != this.props.linkData){
            this.setState({linkData : this.props.linkData},()=>this.getListData())
        }
    }

    getListData = async () => {
        let Request = listdefaultRequest;
        let method = this.state.linkData.requestMethod;
        let link = this.state.linkData.link;
        Request.year = this.state.year
        let res = await services.apiCall.requestApi(link, Request, method)
        let year = new Date();
        year = year.getFullYear();
        if (res) {
            console.log("RESSS",res)
            this.setState({
                data: res,
                filterData: res,
                year : year,
                totalcount: window.localStorage.getItem('table_total')
            }, () => this.createTabel())
        }
    }

    handleFilter = (data) => {
        this.setState({
            filterData: data
        }, () => this.createTabel())
    }

    updateYear = (year) => {
        this.setState({
            year: year
        })
    }

    createTabel = () => {
        let actionbuttons = this.state.linkData.actionbuttons;
        let columnkeyMap = this.state.linkData.columnkeyMap;
        let columnlist = Object.keys(columnkeyMap).map(function (key) {
            return { field: columnkeyMap[key], columnMenuType: 'checkbox' }
        });
        let data = this.state.filterData;
        data.map((_row, index) => (
            Object.keys(columnkeyMap).map(function (key) {
                _row[columnkeyMap[key]] = _row[key]
            })
        ));
        let telkikTable = <Main date={new Date()} notAction={this.state.linkData.notAction} groupfield={this.state.linkData.groupfield} deleteFunc={(id) => this.handleDelete(id)} list={data} actionbuttons={actionbuttons} columnlist={columnlist} ActionPerform={(action, id) => this.ActionPerform(action, id)} />
        this.setState({
            telkikTable: telkikTable
        })
    }

    getFilters = (data) => {

    }

    handleDelete = async (id) => {
        // let res = await services.apiCall.requestApi(`/BusEntidadeEstatuto/Delete/${id}`, {}, 'post')
        // if (res) {
        //     console.log("res", res)
        //     this.createpayload();
        // }
    }


    ActionPerform = (action, row) => {
        if (action == 'Edit') {
            console.log("row.codEntidade", row)
            this.props.history.push({
                pathname: "/entity_rule_form",
                state: { entidade_id: row.codEntidade }
            })
        } else if (action === 'detailPopUp') {
            console.log(".....ACTION", action)
            this.openDetailPopUpForm(row, action);
        }
    }

    openDetailPopUpForm = (row, action) => {
        let popUpForm = ''
        
        popUpForm = (
                <VindimaModalForm tab={this.state.linkData.popUpTabName} data={row} date={new Date()} closePopup={() => this.closePopup()} />
            )

        this.setState({
            popUpForm
        })
    }

    closePopup = () => {
        $(".left-popup").trigger('click');
    }

    render() {
        console.log('data',this.state.linkData)
        // console.log("linkData", this.props.linkData);
        return (
            <div className="dashboard">
                <NavBar date={new Date()} linkData={this.state.linkData} year={this.state.year} updateYear={(year) => this.updateYear(year)} />
                <SideBar Administration={Administration} />
                <div className="inner-container">
                <div className="outer-space">
                    <TitleBar
                        title={this.state.linkData.TitleBartitle}
                        logo={this.state.linkData.TitleBarlogo}
                        prevPageName={this.state.linkData.prevPageName}
                        prevPageLink={this.state.linkData.prevPageLink}
                    />
                    {
                        this.state.linkData.filters && Object.keys(this.state.linkData.filters).length > 0 &&
                        <SearchFilter filters={this.state.linkData.filters} handleFilter={(data) => this.handleFilter(data)} data={this.state.data} getFilter={(data) => this.getFilters(data)} />
                    }
                    {
                        this.state.linkData.instructMessage &&
                        <InstructionMessage message={this.state.linkData.instructMessage} />
                    }
                    {
                        this.state.linkData.dropDownKey && this.state.linkData.dropDownKey.length > 0 && 
                        <CommonDropdown dropDownKey={this.state.linkData.dropDownKey} />
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
                {
                    <div className="modal left-popup" id="vindima-modal">
                        <div className="modal-dialog modal-lg">
                            {
                                this.state.popUpForm
                            }
                        </div>
                    </div>
                }
            </div>
            </div>
        )
    }
}

const mapStateToProps = ({ common }) => ({
    ...common
  })
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        __getComponentData
      },
      dispatch
    )
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(VidimaSecondScreenComponent);