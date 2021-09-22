import React from 'react';
import services from '../../services';
import {DatePicker, Space , Select } from 'antd';
import FilterInputs from './FilterInputs';
import Lang from '../../lang'
import CountUp from 'react-countup'
import WizardDetailModalForm from '../common/wizard_detail_popup';
import { Input } from '@progress/kendo-react-inputs';
import $ from 'jquery'
var moment = require('moment')
const { Option } = Select;
var searchclick = 0;

// const entity = [{
//     entityNo: "12345",
//     id: 1,
//     nif: "Ent1"
// },
// {
//     entityNo: "564154",
//     id: 12,
//     nif: "Entgadjhzbc1"
// },
// {
//     entityNo: "98456468",
//     id: 3,
//     nif: "Enjkhczjkhuidt1"
// }]

const TabName = [
    {
        name: "Total de área apta",
        key: "areaapta"
    },
    {
        name: "Total de área não apta",
        key: "areanapta"
    },
    {
        name: "Total A a F com MG",
        key: "areaaf"
    },
    {
        name: "Total área s/ enquadramento legal",
        key: "areailegal"
    }
]

const clicksarch = () => {
    $("#searchButton").trigger('click');
}
const clearsearchfilterInputdiv = () => {
    $(".searchfilterInputdiv").val("");
}


class SearchFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: {},
            filterChips: [],
            showFilter: false,
            entityList: [],
            entity_list_object: {},
            entity_options: "",
            deafault_selected_checkbox: 'Explorer',
            filterCheckbox: {},
            selectedEntity: "",
            popUpEntity: "",
            tabsComponentsView: '',
            detailPopUp: '',
            searchValid: 0,
            levantamento: ''
        }
    }

    componentDidMount() {
        // this.props.showEntity &&
        //     this.getEntityList('parcel')
    }

    componentDidUpdate(prevProps) {
        if (this.props.date && prevProps.date !== this.props.date) {
            this.setState({
                levantamento: ''
            })
        }
    }

    updateCheckButton = (modulename) => {
        let filter = { ...this.state.filter }
        let filterCheckbox = { ...this.state.filterCheckbox }
        this.props.filters &&
            this.props.filters.checkbox.map(_ck => {
                if (_ck.key !== modulename) {
                    delete filter[_ck.key]
                    delete filterCheckbox[_ck.key]
                }
            })
        this.setState({
            deafault_selected_checkbox: modulename,
            selectedEntity: "",
            filter: filter,
            filterCheckbox: filterCheckbox
        }, () => this.showFilter())
    }

    entityOptions() {
        let entity_options = this.state.entityList.map((_r, i) => (
            <Option value={_r.nif}>{_r.nome}<br />{_r.nif}</Option>
        ))
        this.setState({
            entity_options: entity_options
        })
    }



    clearFilter = () => {
        this.setState({
            filter: {},
            selectedEntity: "",
            filterCheckbox: {}
        }, () => {
            this.showFilter()
            this.handleSearch()
            clicksarch()
            clearsearchfilterInputdiv()
        })
    }


    handleEntitySelect = (value) => {
        console.log(".....Value", value)
        let filter = { ...this.state.filter };
        let filterCheckbox = { ...this.state.filterCheckbox }
        let row = this.state.entity_list_object[value] ? this.state.entity_list_object[value] : {};
           
        if (this.props.filters.checkbox.length > 0) {

             if (row.nome) {
                filter[this.state.deafault_selected_checkbox] = row.nome;
                filterCheckbox[this.state.deafault_selected_checkbox] = row.nif
            } else {
                filter[this.state.deafault_selected_checkbox] = "";
                filterCheckbox[this.state.deafault_selected_checkbox] = ""
            }
        } else {
            console.log("entityrow",row);
            filter['entity'] = row.nome;
            filterCheckbox["entity_id"] = row.nifap
        }
        this.setState({
            filter,
            filterCheckbox,
            selectedEntity: value,
            popUpEntity: value
        }, () => this.showFilter())
    }

    handelDateRangeFilter(key,e){
        console.log(key,e);
        let filter = { ...this.state.filter };
        if (e) {
            // filter.start_date =  moment(e[0]._d).format("YYYY-MM-DD")
            // filter.end_date = moment(e[1]._d).format("YYYY-MM-DD")
            filter.start_date =  moment(e.value.start).format("YYYY-MM-DD")
            filter.end_date = moment(e.value.end).format("YYYY-MM-DD")
            this.setState({
                filter,
            }, () => this.showFilter())
        }
    }

    handleInputChange = (key, e) => {
      
        let filter = { ...this.state.filter };
        if(key === "RangePicker"){
            this.handelDateRangeFilter(key,e);
            return
        }
        let value = ""
        if (e) {
            value = e._d ? moment(e._d).format("YYYY-MM-DD") : e.target.value ? e.target.value : ''
            filter[key] = value
        } else {
            // filter[key] = ''
            delete filter[key]
        }
        this.setState({
            filter,
            levantamento: value
        }, () => this.showFilter())
    }

    removefilter = (key) => {
        let filter = { ...this.state.filter };
        let filterCheckbox = { ...this.state.filterCheckbox };
        // filter[key] = ''
        if(key==="entity"){
            delete filterCheckbox["entity_id"]
        }
        delete filter[key]
        delete filterCheckbox[key]
        this.setState({
            filter,
            selectedEntity: "",
            filterCheckbox
        }, () =>
            this.showFilter(),
            clearsearchfilterInputdiv()
        )
    }

    showFilter = () => {

        let filterChips = Object.keys(this.state.filter).map((_k, i) => {
            if (this.state.filter[_k]) {
                return (
                    <span key={i} className="chips position-relative">
                        <span>{Lang.langCheck.langRequest(`${_k}`)} : {this.state.filter[_k]}</span>
                        <a onClick={() => this.removefilter(_k)} className="close-key"><i className="fas fa-times-circle"></i></a>
                    </span>);
            } else {
                return []
            }
        });
       
        searchclick = 0;
        this.setState({
            filterChips,
            selectedEntity: ""
        })
    }

    handleShowFilter = () => {
        this.setState({
            showFilter: this.state.showFilter ? false : true
        })
    }

    handleCheckboxParcelFilter = (row, key) => {
        let filterCheckbox = { ...this.state.filterCheckbox }
        let cond = false
        if ((key === 'Explorer' || key === 'Explorer/Owner') && filterCheckbox[key]) {
            let parcelExplorer = row['parcelExplorer']
            if (parcelExplorer) {
                parcelExplorer.map((_row) => {
                    if (_row.entityId === filterCheckbox[key]) {
                        cond = true;
                    }
                })
            }

        }
        if ((key === 'Owner' || key === 'Explorer/Owner') && filterCheckbox[key]) {
            let parcelProperty = row['parcelProperty']
            if (parcelProperty) {
                parcelProperty.map((_row) => {
                    if (_row.entityId === filterCheckbox[key]) {
                        cond = true;
                    }
                })
            }

        }
        return cond;
    }

    applyFilter = (row) => {
        let cond = true
        Object.keys(this.state.filter).map((_k) => {
            if (this.state.filter[_k]) {

                if (_k === 'Explorer' || _k === 'Owner' || _k === 'Explorer/Owner') {
                    cond = this.handleCheckboxParcelFilter(row, _k)
                }

                else if (!(("" + row[_k]).toLowerCase()).includes((this.state.filter[_k]).toLowerCase())) {
                    cond = false
                }
            }
        })
        return cond
    }

    handleSearch = () => {
        let data = [];
        let filterData = this.props.data
        if (Object.keys(this.state.filter).length === 0) {
            this.props.handleFilter(filterData)
            this.tabSectionView('')
        }
        else if (this.props && filterData) {
            filterData.map((_r) => {
                this.applyFilter(_r) &&
                    data.push(_r)
            })
            if (this.props.handleFilter) {
                this.props.handleFilter(data)
            }
            Object.keys(this.state.filter).map((_k) => {
                if (_k === 'Explorer' && (!this.state.filter["Owner"] || this.state.filter["Owner"] === '')) {
                    this.tabSectionView(data)
                } else if (_k === 'Owner' && (!this.state.filter["Explorer"] || this.state.filter["Explorer"] === '')) {
                    this.tabSectionView(data)
                } else {
                    this.tabSectionView('')
                }
            })
        }

        if (this.props.getFilter) {
            this.returnFilter()
        }
    }

    returnFilter = () => {
        let filters = {
            "filters": { ...this.state.filter },
            "filterCheckbox": { ...this.state.filterCheckbox }
        }
        this.props.getFilter(filters);
    }

    closePopup = () => {
        console.log("jfvghvhghjb");
        $(".left-popup").trigger('click');
    }

    showEntityDetailPopUp = () => {
        let row = this.state.entity_list_object[this.state.popUpEntity]
        let detailPopUp = (
            <WizardDetailModalForm closePopup={() => this.closePopup()} listData={row} tab={'detail'} />
        )
        this.setState({
            detailPopUp
        })
    }

    tabSectionView = (data) => {
        let tabsComponentsView = ''
        if (data === '') {
            tabsComponentsView = ''
        } else {
            let tabSectionView = {
                areaapta: 0,
                areanapta: 0,
                areailegal: 0,
                areaaf: 0
            }
            data.map(_r => {
                tabSectionView['areaapta'] += _r.areaapta
                tabSectionView['areanapta'] += _r.areanapta
                tabSectionView['areailegal'] += _r.areailegal
                tabSectionView['areaaf'] += _r.areaaf
            })
            console.log("tabSection", tabSectionView)
            tabsComponentsView = (
                <div className="tab-section">
                    <div className="d-md-flex justify-content-between">
                        {
                            TabName.map((_n, i) => (
                                <div key={i} className="innerBox">
                                    <p>{_n.name}</p>
                                    <h1>
                                        <CountUp start={0} end={tabSectionView[_n.key]} duration={6} />
                                    </h1>
                                </div>
                            ))
                        }
                        <a href="#" className="innerBox active d-flex align-items-center cursor-pointer" data-toggle="modal" data-target='#left-detail-popup' onClick={() => this.showEntityDetailPopUp()}>
                            <div className="display-content" data-toggle="modal" data-target="#left-popup">
                                <p>Detalhes da entidade selecionada</p>
                                <div className="circle">
                                    <i className="fas fa-eye"></i>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            )
        }
        this.setState({
            tabsComponentsView
        })
    }

    onSearch = async (e) => {
        if (e.length >= 3) {

            let res = await services.EntityList.getEntityList('parcel', e);
            if (res) {
                this.setState({
                    entityList: res.entityList,
                    entity_list_object: res.entity_row,
                    searchValid: e.length
                }, () => this.entityOptions())
            }
        } else {
            this.setState({
                searchValid: 0
            })
        }
    }

    render() {

        return (
            <div>
                <div className="search-section d-md-flex mt-2">
                    <div className="text-area d-sm-flex align-items-center searh-text-area pt-0 pb-0">
                        {/* <div className="input-img"> <i className="fas fa-search mr-1" aria-hidden="true"></i></div> */}
                        <div className="input-img"><span className="k-icon k-i-zoom"></span></div>
                        <div className="w-100 align-items-center search-left position-relative">
                            {
                                this.state.filterChips.length > 0 ? this.state.filterChips
                                    : <span></span>
                                //   this.state.entity_options ?
                                //   <h6 className="ml-2 mr-2 mt-2">Todos dados </h6>:
                            }
                            {
                                this.props.showEntity && !this.state.filter.entity &&
                                <Select
                                    id="parcelEntityFilter"
                                    className="parcelEntityFilter"
                                    style={{ marginTop: "4px" }}
                                    dropdownStyle={{ zIndex: "0" }}
                                    onChange={this.handleEntitySelect}
                                    value={this.state.selectedEntity}
                                    showSearch
                                    onSearch={this.onSearch}
                                    maxTagTextLength={3}
                                    placeholder="Pesquisa por Nome ou Nº de Entidade"
                                    optionFilterProp="children"
                                    notFoundContent="Entidade não encontrada, refina os critérios de pesquisa"
                                >
                                    <Option value="" disabled>{Lang.langCheck.langRequest("Pesquise por Nome ou Nº da Entidade")}</Option>
                                    {
                                        this.state.searchValid >= 3 &&
                                        this.state.entity_options
                                    }
                                </Select>
                            }
                            {
                                this.props.typeFilter &&
                                <div className="input-box">
                                    <Input
                                        type='number'
                                        value={this.state.levantamento || ''}
                                        style={{ width: "100%", height: "100%" }}
                                        className="input-1 searchfilterInputdiv levantamentoInput"
                                        label={Lang.langCheck.langRequest(this.props.typeFilter)}
                                        onChange={(e) => this.handleInputChange(this.props.typeFilter, e)}
                                    />
                                </div>
                            }
                            {/* {
                        this.state.filterChips.length === 0 && 
                        <h6 className="ml-2 mt-2">Todos dados</h6>
                    } */}
                        </div>
                    </div>
                    {

                        <div className="categories-section  d-flex  align-items-center justify-content-between">
                            {
                                !this.props.hidefiltros && Object.keys(this.props.filters.Tabs).length > 0 &&  
                                    <a onClick={this.handleShowFilter} className="normal-filter">Filtros {this.state.showFilter ? <i className="fas fa-caret-down ml-2"></i> : <i className="fas fa-caret-up ml-2"></i>}</a>
                            }
                            {
                                this.props.leftside ? "" :
                                    <div>
                                        {
                                            this.state.filterChips.length > 0 &&
                                            <a className="lompar-filter text-danger" onClick={this.clearFilter}>Limpar filtros</a>
                                        }
                                    </div>
                            }
                            <button className="k-button btn-theme k-primary mr-2 search-btn1" id="searchButton" onClick={this.handleSearch}><i className="fas fa-search mr-1 ml-1"></i> {this.props.leftside ? "" : "PESQUISAR"} </button>
                        </div>
                    }

                </div>
                {
                    this.state.showFilter &&
                    <FilterInputs date={new Date()} 
                    deafault_selected_checkbox={this.state.deafault_selected_checkbox} 
                    filters={this.props.filters} 
                    updateCheckButton={(modulename) => this.updateCheckButton(modulename)} 
                    handleInputChange={(key, value) => this.handleInputChange(key, value)}
                    
                    
                    />
                }
                {
                    this.state.tabsComponentsView
                }
                <div className="modal left-popup" id="left-detail-popup">
                    <div className="modal-dialog modal-sm">
                        {
                            this.state.detailPopUp
                        }
                    </div>
                </div>
            </div>

        )
    }
}

export default SearchFilter;