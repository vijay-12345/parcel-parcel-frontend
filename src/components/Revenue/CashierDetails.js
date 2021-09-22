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
import { toast } from 'react-toastify';
import RevenueServicesAllot from '../common/RevenueServicesAllot';
import RevenueTables from './RevenueTables';
var moment = require('moment')
const dateFormat = "YYYY-MM-DD";
let defaultRequest = {
    "Filters": null,
    "SortBy": "",
    "IsSortTypeDESC": true,
    "IsPagination": false,
    "Page": 2,
    "PageSize": 2
};


class CashierDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showServices: 0,
            currency_list:[]
        }
    }
    componentDidMount() {
        this.getcurrencyList();
      
    }


    getcurrencyList = async () => {
        let link = "Revenue/Currency/GetAll"
        let res = await services.apiCall.requestApi(link, defaultRequest);
        if (res) {
            this.setState({
                currency_list: res
            });
        }
    }

   
    showServices = (num) => {
        let cashier_open_value = window.localStorage.getItem('cashier_open');
        let cashier_open_value_date = window.localStorage.getItem('cashier_open_date');
        console.log("cashier_open_value_date Value",cashier_open_value_date);
        if(moment(cashier_open_value_date).format(dateFormat) !== moment(new Date()).format(dateFormat)){
            toast.error('Por favor, abra seu caixa hoje');
            return;
        }
        if(!cashier_open_value){
            toast.error('problemas de caixa aberta');
            return;
        }
        //toast.error(cashier_open_value);
        this.setState({
            showServices: num
        })
    }
    
    closePopup = () => {
        this.showServices(this.state.showServices);
        $(".left-popup").trigger('click');
    }
    ActionPerform=(action, row)=>{
        if(action === "Add_Amount"){
            this.addamountFrom(action, row)
        }
    }   
    addamountFrom =async (action,row)=>{
        let Request={}
        Request.entityId = parseInt(row.busEntidade.nifap);
        let link = "/Revenue/getEntityDetail"
        let res = await services.apiCall.requestApi(link, Request);
        if (res) {
            this.setState({
                entity_detail: res
            },()=>this.updateNavDropdown(action,row));
        }
    }

    updateNavDropdown =(action,row, pageName = "faturasRecibos", forfutureInvoice = 0) => {
        let popUpForm = (
            <RightPopModalForm
                closePopup={() => this.closePopup()}
                date={new Date()}
                tab={action}
                Invoice={row}
                pageName={pageName}
                userPage="caxica"
                forfutureInvoice={forfutureInvoice}
                entity_details={this.state.entity_detail}
                TransMethods_list={this.state.TransMethods_list}
                currency_list={this.state.currency_list}
                tax_list={this.state.tax_list}
            />
        )
        this.setState({
            popUpForm
        })
       // $("#vindima-modal").trigger("click");
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
                    <Button onClick={(con) => this.showServices(1)} className="k-button btn-theme mr-2  k-primary">Efetuar Venda</Button>
                    <Button onClick={(con) => this.showServices(2)} className="k-button btn-theme mr-2  k-primary">Depósitos</Button>
                    <Button onClick={(con) => this.showServices(3)} className="k-button btn-theme mr-2  k-primary">Folha de Caixa</Button>
                    {
                        this.state.showServices == 1 &&
                        <RevenueServicesAllot
                            date={new Date()}
                            tab={"Adicionar Movimento"}
                            // updateServiceslist={(res)=>this.updateServiceslist(res)}
                            columnkeyMap={this.props.linkData.columnkeyMap}
                        />
                    }
                    {
                        this.state.showServices == 2 &&
                        <RevenueTables
                            date={new Date()}
                            tableName={"AllCreditDetails"}
                            applyedfilter={ this.state.applyedfilter}
                            ActionPerform ={(action, row)=>this.ActionPerform(action, row)}
                    />
                    }
                    {
                        this.state.showServices == 3 &&
                        <RevenueTables
                            date={new Date()}
                            tableName={"AllServicesDetails"}
                            applyedfilter={ this.state.applyedfilter}
                            ActionPerform ={(action, row)=>this.ActionPerform(action, row)}
                    />
                    }
                </div>
                <div className="modal left-popup" id="vindima-modal">
                    <div className="modal-dialog modal-lg">
                        {
                            this.state.popUpForm
                        }
                    </div>
                </div>
            </div >
        )
    }
}


export default withRouter(CashierDetails);