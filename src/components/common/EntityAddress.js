
import React, { Component } from 'react';
import services from '../../services';
import { Input } from '@progress/kendo-react-inputs';
import $ from 'jquery'
import { toast } from 'react-toastify';
const queryString = require('query-string');
var moment = require('moment')
const dateFormat = "YYYY-MM-DD";

let combolistrequest = {
    "Filters": null,
    "SortBy": "",
    "IsSortTypeDESC": true,
    "IsPagination": false,
    "Page": 2,
    "PageSize": 2
};

class EntityAddress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            AddAddress: false,
            busentdistrito: [],
            busentconcelho: [],
            BusEntFreguesia: [],
            form: {}
        }
    }

    componentDidMount() {
        this.getDistricList();
    }

    getDistricList = async () => {
        let busentdistrito = [...this.state.busentdistrito]
        let res = await services.apiCall.requestApi("/busentdistrito/GetAll/", combolistrequest, 'post');
        if (res) {
            busentdistrito = res
            this.setState({
                busentdistrito,
            })
        }

    }

    handleChange = (e) => {
        let form = { ...this.state.form }
        let key = e.target.name;
        let value = e.target.value;
        form[key] = value;
        if (key == "distrito_id") {
            this.getcodconList(value);
        } else if (key == "country_id") {
            this.getcodfrglist(value);
        }
        this.setState({
            form
        })
    }

    getcodconList = async (id) => {
        let busentconcelho = [];
        let res = await services.apiCall.requestApi("/busentconcelho/getbyid/" + id, {}, 'post');
        if (res) {
            busentconcelho = res
        }
        this.setState({
            busentconcelho
        })
    }

    getcodfrglist = async (id) => {
        id = id.split('-');
        console.log(id);
        let BusEntFreguesia = [];
        let res = await services.apiCall.requestApi("/BusEntFreguesia/GetByID/" + id[1], {}, 'get');
        if (res) {
            BusEntFreguesia = res
        }
        this.setState({
            BusEntFreguesia
        })
    }

    closePopup = () => {
        $(".left-popup").trigger('click');
    }

    SaveNewAddress = async () => {
        let request = { ...this.state.form };
        if (!request.address_line1) {
            toast.error('Morada um campo obrigatório');
            return;
        }
        let entity_id = parseInt(this.props.entity_details.busEntidade.nifap)
        request.pin = parseInt(request.pin);
        if (!request || request.pin === null) {
            let country = request.country_id.split("-");
            request.distrito_id = parseInt(request.distrito_id);
            request.country_id = parseInt(country[1]);
            request.fregusia_id = parseInt(request.fregusia_id);
        }
        request.entity_id = entity_id;
        let res = await services.apiCall.requestApi("/Revenue/CreateBillingAddress", request);
        if (res) {
            this.setState({
                form: {},
                AddAddress: this.state.AddAddress ? false : true
            }, () => {
                this.props.getEntityDetails(entity_id);
                this.props.closePopup();
            }
            )
            this.closePopup();
        }
    }

    AddNewAddress = () => {
        this.setState({
            AddAddress: this.state.AddAddress ? false : true
        })
    }

    Cancelar = () => {
        this.setState({
            form: {},
            AddAddress: this.state.AddAddress ? false : true
        })
    }
    render() {
        return (
            <div class="row">
                {
                    !this.state.AddAddress &&
                    <a href="#" className="remoove mr-2" onClick={() => this.AddNewAddress()} >Adicionar Novo Endereço</a>
                }
                {
                    this.state.AddAddress &&
                    <div className="row">
                        <div className="col-md-4">
                            <div className="input-box active-grey">
                                <Input
                                    type="text"
                                    style={{ width: "100%" }}
                                    className="input-1"
                                    name="address_line1"
                                    value={this.state.form.address_line1 || ""}
                                    label="Morada"
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-box active-grey">
                                <Input
                                    type="text"
                                    style={{ width: "100%" }}
                                    className="input-1"
                                    name="address_line2"
                                    value={this.state.form.address_line2 || ""}
                                    label="Localidade"
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-box active-grey">
                                <Input
                                    type="text"
                                    style={{ width: "100%" }}
                                    className="input-1"
                                    name="pin"
                                    value={this.state.form.pin || ""}
                                    label="Código Postal"
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-box active-grey drop-down-box">
                                <label className="input-label">Distrito </label>
                                <select className="custome-drop-down" onChange={(e) => this.handleChange(e)} name='distrito_id' value={this.state.form.distrito_id} >
                                    <option>Selecione Distrito </option>
                                    {
                                        this.state.busentdistrito &&
                                        this.state.busentdistrito.map((_row, index) => (
                                            <option value={_row.coddis}>{_row.desdis}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-box active-grey drop-down-box">
                                <label className="input-label">Concelho</label>
                                <select className="custome-drop-down" onChange={(e) => this.handleChange(e)} name='country_id' value={this.state.form.country_id}>
                                    <option>Selecione Concelho</option>
                                    {
                                        this.state.busentconcelho &&
                                        this.state.busentconcelho.map((_row, index) => (
                                            <option value={_row.coddis + "-" + _row.codcon}>{_row.descon}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-box active-grey drop-down-box">
                                <label className="input-label">Freguesia </label>
                                <select className="custome-drop-down" onChange={(e) => this.handleChange(e)} name='fregusia_id' value={this.state.form.fregusia_id} >
                                    <option>Selecione Freguesia </option>
                                    {
                                        this.state.BusEntFreguesia &&
                                        this.state.BusEntFreguesia.map((_row, index) => (
                                            <option value={_row.dicofre}>{_row.desfrg}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                        </div>
                        <div className="col-md-2">
                            <a href="#" className="remoove mr-2" onClick={() => this.SaveNewAddress()} >Guardar</a>

                        </div>
                        <div className="col-md-2">
                            <a href="#" className="remoove mr-2" onClick={() => this.Cancelar()} >Cancelar</a>
                        </div>
                        <div className="col-md-4">
                        </div>
                    </div>
                }
            </div>
        )

    }
}

export default EntityAddress;