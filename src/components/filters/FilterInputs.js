import React from 'react';
import { DatePicker, Space, Select } from 'antd';
import Lang from '../../lang'
import services from '../../services';
import { Input } from '@progress/kendo-react-inputs';
import { DateRangePicker } from '@progress/kendo-react-dateinputs';
import { ConfigProvider } from 'antd';
import pt_BR from 'antd/es/locale/pt_PT';
import locale from 'antd/es/date-picker/locale/zh_CN';

import DateRange from './DateRange.jsx';
const { RangePicker } = DatePicker;
var moment = require('moment')
const dateFormat = "YYYY-MM-DD";

class FilterInputs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterTabs: {},
            dropDownFilter: '',
            selectedDropDown: '',
            inputBox: '',
            radioBox: '',
            selectFilterOption: '',
            filtervalue: ''
        }
    }

    componentDidMount() {
        this.handleSelectFilterTab();
        this.setState({
            selectFilterOption: ""
        })
    }


    componentDidUpdate(preProp) {
        services.lablecheck.setlable();
        if (preProp.date !== this.props.date) {
            this.setState({
                selectFilterOption: ""
            })
        }
    }



    handleInputBox = (e) => {
        let optionVar = this.props.filters.Tabs[this.state.selectedDropDown];
        let inputOption = optionVar[e.target.value]
        let inputBox = '';
        if (inputOption) {
            this.setState({
                inputBox: null
            })
            switch (inputOption.inputType) {
                case "text":
                    inputBox =
                        <div className="input-box  active-grey minw-4">
                            {/* <label className="input-label">{Lang.langCheck.langRequest(`${inputOption.displayKey}`)}</label>
                                <input type={inputOption.inputType} onChange={(e)=>this.props.handleInputChange(inputOption.key,e)} className="input-1 searchfilterInputdiv" placeholder={Lang.langCheck.langRequest(`${inputOption.displayKey}`)}/> */}
                            <Input
                                type={inputOption.inputType}
                                deafultValue={""}
                                style={{ width: "100%" }}
                                className="input-1 searchfilterInputdiv"
                                label={Lang.langCheck.langRequest(`${inputOption.displayKey}`)}
                                onChange={(e) => this.props.handleInputChange(inputOption.key, e)}
                            />
                        </div>
                    break;
                case "date":
                    inputBox = <div className="input-box  active-grey minw-4">
                        <DatePicker disabledDate={this.disabledDate} onChange={(e) => this.props.handleInputChange(inputOption.key, e)} />
                    </div>
                    break;
                case "dropdown":
                    inputBox = <div className="input-box  active-grey minw-4">
                        <select className="custome-drop-down" onChange={(e) => this.props.handleInputChange(inputOption.key, e)}>
                            <option value="">Selecioner Estado Pagamento</option>
                            {
                                inputOption.option.map((_opt, index) => (
                                    <option key={index} value={_opt.key}>{_opt.value}</option>
                                ))
                            }
                        </select>
                    </div>
                    break;
                case "RangePicker":
                    inputBox = (
                        <div className="input-box  active-grey minw-4">
                            <DateRange 
                            inputOption={inputOption} 
                            handleInputChange={(key, value) => this.props.handleInputChange(key, value)} />
                           
                            {/* <ConfigProvider locale={pt_BR}>
                                <Space direction="vertical" size={12}>
                                    <RangePicker disabledDate={this.disabledDate} onChange={(e) => this.props.handleInputChange(inputOption.key, e)} />
                                </Space>
                            </ConfigProvider> */}
                        </div>)
                    break;
            }

            this.setState({
                inputBox,
                selectFilterOption: e.target.value
            })
        }

    }

    disabledDate = (current) => {
        return current && current > moment().endOf('day');
    }

    handleTab = (key) => {
        let filterTabs = {}
        Object.keys(this.props.filters.Tabs).map((_k, i) => {
            filterTabs[_k] = key === _k ? true : false
        })
        this.setState({
            filterTabs,
            selectedDropDown: key,
            inputBox: '',
            dropDownFilter: null,
            selectFilterOption: ''
        }, () => this.DropDown())
    }

    handleOptions = () => {
        let optionVar = this.props.filters.Tabs[this.state.selectedDropDown];
        console.log("option", optionVar, this.state.selectedDropDown)
        let Options = (
            optionVar.map((_o, i) => (
                <option key={i} value={i}>{Lang.langCheck.langRequest(`${_o.displayKey}`)}</option>
            ))
        )
        return Options;
    }

    handleRadioBox = () => {
        let radioBox = '';
        let radioBtn
        // if(this.state.selectedDropDown === 'Entidade'){
        radioBtn = this.props.filters.checkbox.map((_r, i) => {
            let checkedalready = this.props.deafault_selected_checkbox == _r.key ? true : false
            switch (_r.inputType) {
                case "radio":
                    radioBox = <div className="custom-control custom-radio custom-control-inline mt-4">
                        <input type="radio"
                            checked={checkedalready}
                            onClick={() => this.props.updateCheckButton(_r.key)}
                            className="custom-control-input" id={`customRadio${i}`} name="example" value="" />
                        <label className="custom-control-label" for={`customRadio${i}`}>{Lang.langCheck.langRequest(`${_r.displayKey}`)}</label>
                    </div>
                    break;
            }
            return radioBox;
        });
        // }
        return radioBtn
    }

    DropDown = () => {
        console.log("selectFilterOption", this.state.selectFilterOption);
        if (this.props.filters.Tabs && this.props.filters.Tabs[this.state.selectedDropDown] && this.props.filters.Tabs[this.state.selectedDropDown].length > 0 ) {
            let dropDownFilter = (
                <select defaultValue={this.state.selectFilterOption} onChange={this.handleInputBox} className="custome-drop-down">
                    <option value="">{Lang.langCheck.langRequest("Select Filters")}</option>
                    {
                        this.handleOptions()
                    }
                </select>
            )
            this.setState({
                dropDownFilter
            });
        }
    }

    handleSelectFilterTab = () => {
        let filterTabs = {}
        let selectedDropDown;
        Object.keys(this.props.filters.Tabs).map((_k, i) => {
            if (i === 0) {
                selectedDropDown = _k
            }
            filterTabs[_k] = i === 0 ? true : false
        })
        this.setState({
            filterTabs,
            selectedDropDown
        }, () => this.DropDown())
    }

    render() {
        return (
            <div className="tab-table">
                <div className="mbl-responsive">
                    <ul className="nav nav-tabs">
                        {
                            Object.keys(this.props.filters.Tabs).map((key, i) => (
                                <li key={i} className={"nav-item"}>
                                    <a className={i === 0 ? "nav-link active" : "nav-link"} onClick={() => this.handleTab(key)} data-toggle="tab" href="#tab0">{Lang.langCheck.langRequest(`${key}`)}</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                {/* <FilterTabs tabs={this.props.filters.Tabs} selectedTab={this.state.filterTabs} handleSelectFilterTab={this}/> */}
                <div className="tab-content">
                    <div className="tab-pane active" id="tab0">
                        <div className="top-section ">
                            <div className="d-md-flex align-items-center">
                                {
                                    this.state.dropDownFilter &&
                                    <>
                                        <div className="input-box active-grey drop-down-box filter-dropdown">
                                            <label className="input-label">Filtrar por </label>



                                            {this.state.dropDownFilter}
                                        </div>
                                        <div>
                                            {this.state.inputBox}
                                        </div>
                                    </>
                                }
                                {this.handleRadioBox()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FilterInputs;