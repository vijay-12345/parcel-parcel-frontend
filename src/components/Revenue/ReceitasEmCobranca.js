import React from 'react';
import services from '../../services';
import TitleBar from '../common/title_bar'
import SearchFilter from '../filters/SearchFilter';
import Lang from '../../lang'
import RevenueModalForm from '../VidimaModule/Modal/CommonSideModalForm';
import $ from 'jquery'
import TlkTable from '../tlelrik/table/tlkTable';
import RightPopModalForm from '../common/RightPopModalForm';
import RevenueEntityAction from '../common/RevenueEntityAction';
import RevenueTables from './RevenueTables';
import { Button } from '@progress/kendo-react-buttons'
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

let defaultRequest = {
    "Filters": null,
    "SortBy": "",
    "IsSortTypeDESC": true,
    "IsPagination": false,
    "Page": 2,
    "PageSize": 2
};
class ReceitasEmCobranca extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filter: this.props.linkData.filters,
            popUpForm: '',
            popUpForm2: null,
            entity_details: {
                busEntidade: {},
                currentEntityBalance: 0,
                billingAddress: []
            },
            billing_address: null,
            applyedfilter: {
                entity_id: this.props.parsed.entity_id
            },
            checkedInvoice:[],
            general_balance_row: ""
        }
    }

    componentDidMount() {
        this.getcurrencyList();
        this.getTaxList();
        this.getTransMethods();
        this.createState();
        if(this.state.applyedfilter.entity_id){
            this.getEntityDetails(this.state.applyedfilter.entity_id);
        }
        if(this.props.tab === "general_account"){
            this.getCurrentGeneralAccount();
        }
    }

  
    getCurrentGeneralAccount = async () => {
        let link = "Revenue/GeneralAccount/GetAll"
        let Request = {
                "Filters": {
                    "entity_id": null,
                    "start_date": null,
                    "end_date": null
                },
                "SortBy": "id",
                "IsSortTypeDESC": true,
                "IsPagination": true,
                "Page": 1,
                "PageSize": 1
        }
        let res = await services.apiCall.requestApi(link, Request);
        if (res) {
            this.setState({
                general_balance_row: res[0]
            });
        }
        console.log("response",this.state.general_balance_row);
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
    getTaxList = async () => {
        let link = "Revenue/Tax/GetAll"
        let res = await services.apiCall.requestApi(link, defaultRequest);
        if (res) {
            this.setState({
                tax_list: res
            });
        }
    }
    getTransMethods = async () => {
        let link = "Revenue/TransactionMethod/GetAll"
        let res = await services.apiCall.requestApi(link, defaultRequest);
        if (res) {
            this.setState({
                TransMethods_list: res
            });
        }
    }

    componentDidUpdate(preProp) {
        if (preProp.date != this.props.date) {
            this.createState();
        }
    }

    createState = () => {
        this.setState({
            entity_details: {
                busEntidade: {},
                currentEntityBalance: 0,
                billingAddress: []
            },
            filters: this.props.linkData.filters
        })
    }

    getEntityDetails = async (entity_id) => {
        let Request = {};
        console.log("Entityfunction ",Request)
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
            });
        }
    }


    handleFilter = (data) => {
        // this.setState({
        //     filterData: data
        // }, () => this.createTabel())
    }

 

    getFilters = (customfilters) => {
        let applyedfilter = { ...customfilters.filterCheckbox, ...customfilters.filters }
        delete applyedfilter.entity;
        applyedfilter.local = window.localStorage.getItem('Local');
        console.log("filter",applyedfilter);
        this.setState({
            applyedfilter
        },()=>this.getEntityDetails(applyedfilter.entity_id) 
        );
    }

    ActionPerform = (action, row) => {
        console.log(action, row);
        let popUpForm = null;
           
        if (action === "ir para a fatura") {
            window.location.href = '/revenue_receitas?u=revenue_receitas&p=Recibos%20de%20Adiantamento&t=TesourariaRecabo'+"&entity_id="+row.entity_id;
        }else if (action === 'RedirectTwo') {
            window.location.href = '/revenue_receitas??u=revenue_receitas&p=Consulta%20de%20Conta%20corrente&t=TesourariaContacorrente'+"&entity_id="+row.entity_id;
            //window.location.href = '/revenue_page?name=faturasRecibos&type=' + row.trans_msg + "&id=" + row.id + "&entity_id=" + row.busEntidadeDetail.nifap;
        }else if (action === 'mover para a fatura') {
            window.location.href = '/revenue_faturas?u=revenue_faturas&p=Emitir%20Faturas&t=FaturasEmitir'+"&entity_id="+row.entity_id;
            //window.location.href = '/revenue_page?name=faturasRecibos&type=' + row.trans_msg + "&id=" + row.id + "&entity_id=" + row.busEntidadeDetail.nifap;
        }
        else if (action === 'Redirect') {
            window.location.href = '/revenue_page?name=faturas&type=' + row.trans_msg + "&id=" + row.id + "&entity_id=" + row.busEntidadeDetail.nifap;
        }else if (action == 'Edit') {
            this.props.history.push({
                pathname: "/entity_rule_form",
                state: { entidade_id: row.codEntidade }
            })
        } else if (action === 'detailPopUp' || action === 'detailPopUpTwo') {
            popUpForm = this.openDetailPopUpForm(row, action);
        }
        else if(action === "checkedInvoice"){
            let checkedInvoice= Object.values(row);
            if(checkedInvoice.length){
                this.GetInvoiceLink(checkedInvoice);
            }
        }else if(action === "Add_Amount"){
            this.addamountFrom(action, row)
        }else
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




    GetInvoiceLink= async (checkedInvoice) => {
        let link="/Revenue/GetInvoiceLink";
        let request= { invoice_id:checkedInvoice}
        let res = await services.apiCall.requestApi(link, request);
        if (res){
            this.setState({ checkedInvoice});
        }
    }
    

    openDetailPopUpForm = (row, action) => {

        let popUpForm = '';
       
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
                  // tab={action}
                    data={row}
                    date={new Date()}
                    popUpForm2={this.state.popUpForm2}
                    updatepopUpForm2={(action, row) => this.updatepopUpForm2(action, row)}
                    closePopup={() => this.closePopup()}
                />
            )
        }
        this.setState({
            popUpForm
        })
    }
    updatepopUpForm2=(popUpForm2)=>{
        this.setState({
            popUpForm2
        })
        $("#firstPopup").trigger("click");
        $("#secondPopup").trigger("click");
    }

    closePopup = () => {
        this.getTaxList();
        $(".left-popup").trigger('click');
    }

    updateServiceslist=(list)=>{
        this.props.updateServiceslist(list)
    }

    updateNavDropdown = (action, pageName = "faturasRecibos", forfutureInvoice = 0) => {
        console.log("entityDetails", this.props.entity_details);
        const parsed = this.props.parsed;
        let popUpForm = (
            <RightPopModalForm
                closePopup={this.closePopup}
                date={new Date()}
                tab={action}
                userPage={this.props.userPage}
                pageName={pageName}
                forfutureInvoice={forfutureInvoice}
                optionMenuArray={servicesMenuArray}
                parsed={parsed}
                entity_details={null}
                TransMethods_list={null}
                currency_list={null}
                updateServiceslist={(list)=>this.updateServiceslist(list)}
                tax_list={null}
                completeData={null}
                billing_address={null}
                getCurrentGeneralAccount={()=>this.getCurrentGeneralAccount()}
            />
        )
        this.setState({
            popUpForm
        })
    }

    render() {

        return (
            <div className="inner-container">
                <div className="outer-space">
                    <TitleBar
                        path={this.props.linkData.TitleBarpath}
                        title={this.props.linkData.TitleBartitle}
                        logo={this.props.linkData.TitleBarlogo}
                        prevPageName={this.props.linkData.prevPageName}
                        prevPageLink={this.props.linkData.prevPageLink}
                        linkData={this.props.linkData}
                        noOption={true}
                        changeOption={(mainIndex, subIndex) => this.props.changeOption(mainIndex, subIndex)} optionMenuArray={this.props.optionMenuArray} />
                    {
                        this.props.linkData.filters && Object.keys(this.props.linkData.filters).length > 0 &&
                        <SearchFilter showEntity={true} 
                        filters={this.props.linkData.filters} 
                        handleFilter={(data) => this.handleFilter(data)} 
                        getFilter={(data) => this.getFilters(data)} 
                        //data={this.state.data} 
                        />
                    }
                    {
                        this.props.linkData && this.props.linkData.tableName === "general_account" && this.props.tab === "general_account" &&
                        <div className="tab-section col-md-12">
                                <div className="innerBox active cursor-pointer">
                                    <div className="display-content">
                                        <div className="row">
                                            <div className="col-md-9">
                                            <p><strong>Balanço Geral Atual:</strong></p>{services.money.format(this.state.general_balance_row.balance)}
                                            </div>
                                            <div className="col-md-3">
                                            <Button data-toggle="modal" data-target="#vindima-modal" primary={true} onClick={() => this.updateNavDropdown('Add_General_Amount', "general_account")} className="k-button btn-theme mr-2  k-primary">Adicionar conta geral</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>                    
                    }
                    {
                        <RevenueEntityAction
                            entity_details={this.state.entity_details}
                            closePopup={() => this.closePopup()}
                            Actionlist={{valor:true,Movimento:false,recibo:false}}
                            date={new Date()}
                            parsed={this.props.parsed}
                            getEntityDetails={(id) => this.getEntityDetails(id)}
                            linkData={this.props.linkData}
                            pageName={this.props.tab}
                            general_balance={this.state.general_balance_row}
                        />
                    }
                    {
                      //  this.props.linkData.prevPageName === "" &&
                        <RevenueTables
                            date={new Date()}
                            tableName={this.props.linkData.tableName}
                            applyedfilter={ this.state.applyedfilter}
                            ActionPerform={(action, row)=>this.ActionPerform(action, row)}
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


export default ReceitasEmCobranca;