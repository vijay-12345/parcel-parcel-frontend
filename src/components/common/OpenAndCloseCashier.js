
import React, { Component } from 'react';
import services from '../../services';
import RightPopModalForm from './RightPopModalForm';
import $ from 'jquery'
const queryString = require('query-string');
var moment = require('moment')
const dateFormat = "YYYY-MM-DD";

class OpenAndCloseCashier extends Component {
    constructor() {
        super();
        this.state = {
            popUpForm: null,
            portoOpen: false,
            ReguaOpen: false,
            trans_methods: [],
            selectedLocation: window.localStorage.getItem('Local')
        }
    }

    defaultState = () => {
        this.setState({
            popUpForm: null,
            portoOpen: false,
            ReguaOpen: false,
            selectedLocation: window.localStorage.getItem('Local'),
            trans_methods: []
        }, () => this.getLastworkingDate())
    }

    componentDidMount = () => {
        this.getLastworkingDate();
        // this.getTransectionType();
    }

    componentDidUpdate = (preProp) => {
        if (preProp.date !== this.props.date) {
            this.defaultState();
        }
    }

    getLastworkingDate = async (forse = 0) => {
      console.log("hcgfctyuyvyuvyuyuvuyvyu")
        let link = "/Revenue/LastWorkingDate";
        let res = await services.apiCall.requestApi(link, {});
        res = res || []
        this.openCashierFrom(res, forse)
    }

    openCashierFrom = (res, forse) => {
        let portoOpen = false;
        let ReguaOpen = false;
        let popUpForm = null;
        let lastdata= {};
        window.localStorage.setItem('cashier_open', "");
        res.map((row) => {
            if ( row.caixa.toLowerCase() === 'porto' && parseInt(row.closed) === 0) {
                portoOpen = true
                window.localStorage.setItem('cashier_open', true);
                window.localStorage.setItem('cashier_open_date', row.date);
                lastdata.portodata=row;
            } else if (row.caixa.toLowerCase() === 'régua' && parseInt(row.closed) === 0) {
                ReguaOpen = true
                lastdata.reguadata=row;
                window.localStorage.setItem('cashier_open', true);
                window.localStorage.setItem('cashier_open_date', row.date);
            }
        })
        console.log("RES",res);
        if (forse == 1 || !window.localStorage.getItem('cashier_open')) {
            popUpForm = (
                <RightPopModalForm
                    data = {res}
                    lastdata={lastdata}
                    //previousDate={previousDate}
                    closePopup={this.closePopup}
                    tab={"Abertura"}
                    date={new Date()} />
            );
        }
        this.setState({
            popUpForm,
            portoOpen,
            ReguaOpen
        })
    }


    openCashierbyDateFrom = (res, forse) => {
        let a = moment(new Date());
        let b = moment(res.date);
        let previousDate = false;
        let closed = false;
        let portoOpen = false;
        let ReguaOpen = false;
        let popUpForm = null;
        let lastdata= {};

        if (a.diff(b, 'days') > 0 && res.closed == 0) {
            previousDate = res.date;
        }

        res.map((row) => {
            if ( row.caixa.toLowerCase() === 'porto' && parseInt(row.closed) === 0) {
                portoOpen = true
                window.localStorage.setItem('cashier_open', true);
                window.localStorage.setItem('cashier_open_date', row.date);
                lastdata.portodata=row;
            } else if (row.caixa.toLowerCase() === 'régua' && parseInt(row.closed) === 0) {
                ReguaOpen = true
                lastdata.reguadata=row;
                window.localStorage.setItem('cashier_open', true);
                window.localStorage.setItem('cashier_open_date', row.date);

            }
        })

        if (parseInt(res.closed) === 1) {
            closed = true;
            window.localStorage.setItem('cashier_open', "");
        } else {
            window.localStorage.setItem('cashier_open', true);
        }

        if (forse == 1 || (previousDate) || (!previousDate && !res.date)) {
            let popUpForm = (
                <RightPopModalForm
                    data={res}
                    lastData={lastdata}
                    previousDate={previousDate}
                    closePopup={this.closePopup}
                    tab={"Abertura"}
                    date={new Date()} />
            );
            this.setState({
                popUpForm
            })
        }
    }


    getTransectionType = async () => {
        let link = "Revenue/TransactionMethod/GetAll"
        const Request = { "Filters": null, "SortBy": "", "IsSortTypeDESC": false, "IsPagination": false, "Page": 1, "PageSize": 100 }
        let res = await services.apiCall.requestApi(link, Request);
        if (res) {
            this.setState({
                trans_methods: res
            })
        }
    }

    OpenTransectionMethods = (_row) => {
        let popUpForm = (
            <RightPopModalForm trans_methods={this.state.trans_methods} closePopup={this.closePopup} tab={_row} date={new Date()} />
        )
        this.setState({
            popUpForm
        })
    }

    updateselectedLocation = (Local) => {
        window.localStorage.setItem('Local', Local);
        this.setState({
            selectedLocation: Local
        })
    }
    closePopup = () => {
        this.getLastworkingDate();
        $(".left-popup").trigger('click');
    }

    render() {
        return (
            <div class="row" style={{ width: "450px" }}>
                <div class="col-md-6">
                    <div class="white-box">
                        <div class="d-flex justify-content-between">
                            <div class="flex-grow-1 mr-2">
                                <div class="dropdown custom-dropdown">
                                    <span data-toggle="modal" data-target="#openClose-modal" onClick={(e) => this.getLastworkingDate(1)}>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <b>
                                                {
                                                    this.state.portoOpen || this.state.ReguaOpen ?
                                                        <div>Fechamento de Caixa</div> :
                                                        <div>Abertura de Caixa</div>
                                                }
                                            </b>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="white-box">

                        <div class="d-flex justify-content-between">
                            {/* <div class="flex-grow-1 mr-2">
                                <div class="dropdown custom-dropdown">
                                    <a href="#">Local</a>
                                </div>
                            </div> */}

                            <div class="flex-grow-1 mr-2">
                                <div class="dropdown custom-dropdown">
                                    <a href="#" class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.selectedLocation || "Local"} </a>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <ul class="list-unstyled">
                                            <li onClick={(val) => this.updateselectedLocation('Porto')}>
                                                {
                                                    this.state.portoOpen ?
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>Porto Aberto</div>
                                                            <div><a href="#"><i class="fas fa-check-circle text-success"></i></a></div>
                                                        </div>
                                                        :
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>Porto Fechado</div>
                                                            <div><a href="#"><i class="fas fa-times-circle text-danger"></i></a></div>
                                                        </div>

                                                }
                                                {/* <div class="d-flex justify-content-between align-items-center">
                                                    <div onClick={(val)=>this.updateselectedLocation('Porto')}>Porto</div>
                                                </div> */}
                                            </li>
                                            <li onClick={(val) => this.updateselectedLocation('Régua')}>
                                                {
                                                    this.state.ReguaOpen ?
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>Régua Aberto</div>
                                                            <div><a href="#"><i class="fas fa-check-circle text-success"></i></a></div>
                                                        </div>
                                                        :
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>Régua Fechado</div>
                                                            <div><a href="#"><i class="fas fa-times-circle text-danger"></i></a></div>
                                                        </div>

                                                }
                                                {/* <div class="d-flex justify-content-between align-items-center">
                                                    <div onClick={(val)=>this.updateselectedLocation('Régua')}>Régua</div>
                                                </div> */}
                                            </li>

                                        </ul>

                                    </div>
                                </div>
                            </div>

                            <div class="flex-grow-1">
                                <div class="dropdown custom-dropdown">
                                    <a href="#" aria-haspopup="true" aria-expanded="false">
                                        {
                                            (!this.state.portoOpen && !this.state.ReguaOpen) || !this.state.selectedLocation ?
                                                "Fechado"
                                                :
                                                <>
                                                    {
                                                        this.state.selectedLocation === "Porto" && this.state.portoOpen && "Aberto"
                                                    }
                                                    {
                                                        this.state.selectedLocation === "Porto" && !this.state.portoOpen && "Fechado"
                                                    }
                                                    {
                                                        this.state.selectedLocation === "Régua" && this.state.ReguaOpen && "Aberto"
                                                    }
                                                    {
                                                        this.state.selectedLocation === "Régua" && !this.state.ReguaOpen && "Fechado"
                                                    }
                                                </>
                                        }
                                    </a>
                                </div>
                            </div>

                            {/* <div class="flex-grow-1 mr-2">
                                <div class="dropdown custom-dropdown">
                                    <a href="#" class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Porto</a>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <ul class="list-unstyled">
                                            <li>
                                                {
                                                    this.state.portoOpen ?
                                                    <div class="d-flex justify-content-between align-items-center">
                                                    <div>Porto Aberto</div>
                                                    <div><a href="#"><i class="fas fa-check-circle text-success"></i></a></div>
                                                    </div>
                                                    :
                                                    <div class="d-flex justify-content-between align-items-center">
                                                    <div>Porto Fechado</div>
                                                    <div><a href="#"><i class="fas fa-times-circle text-danger"></i></a></div>
                                                    </div>

                                                }
                                                
                                               
                                            </li>
                                            <li>
                                                {
                                                    this.state.ReguaOpen ? 
                                                    <div class="d-flex justify-content-between align-items-center">
                                                    <div>Régua Aberto</div>
                                                    <div><a href="#"><i class="fas fa-check-circle text-success"></i></a></div>
                                                    </div>
                                                    :
                                                    <div class="d-flex justify-content-between align-items-center">
                                                    <div>Régua Fechado</div>
                                                    <div><a href="#"><i class="fas fa-times-circle text-danger"></i></a></div>
                                                </div>
                                                    
                                                }
                                               
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <div class="dropdown custom-dropdown">
                                    <a href="#" class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Aberto</a>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <ul class="list-unstyled">
                                            <li data-toggle="modal" data-target="#openClose-modal" onClick={(e) => this.getLastworkingDate(1)}>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <div>Abertura</div>
                                                </div>
                                            </li>
                                            <li data-toggle="modal" data-target="#openClose-modal" onClick={(e) => this.getLastworkingDate(1)}>
                                                {/* <li data-toggle="modal" data-target="#openClose-modal" onClick={(e) => this.OpenTransectionMethods('Fecho')}> */}
                            {/* <div class="d-flex justify-content-between align-items-center">
                                                    <div>Fecho</div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>  */}
                        </div>
                    </div>
                </div>

                <div className="modal left-popup" id="openClose-modal">
                    <div className="modal-dialog modal-lg">
                        {
                            this.state.popUpForm
                        }
                    </div>
                </div>

            </div>
        );
    }
}

export default OpenAndCloseCashier;