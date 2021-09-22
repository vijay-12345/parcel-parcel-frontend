
import React, { Component } from 'react';
import { Button } from '@progress/kendo-react-buttons'
import $ from 'jquery'
import services from '../../services';
import lang from '../../lang';


const queryString = require('query-string');
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


class SecondPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            row: this.props.row
        }
    }

    componentDidMount() {
        this.createState()
    }

    componentDidUpdate(preProp) {
        if (preProp.date !== this.props.date) {
            this.createState()
        }
    }

    createState = () => {
        this.setState({
            row: this.props.row
        })

    }

    closePopuptwo = () => {
        $("#firstPopup").trigger("click");
        $("#secondPopup").trigger("click");
    }

    render() {
        console.log("row",this.props.row);
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title pl-0">{lang.langCheck.langRequest(this.props.popUpHeading)}</h4>
                    <a href="#" onClick={() => this.closePopuptwo()} className="remoove mr-2">Close</a>
                </div>
                <div className="modal-body">
                    {
                        this.props.row &&
                        <div className="details">
                              <div className="text-center">
                                    <div className="row mb-5">
                                        <div className="col-md-6">
                                            <h5>Nº Entidade</h5>
                                            <p>{this.props.row.busEntidadeDetail.nifap}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <h5>entidade</h5>
                                            <p>{this.props.row.busEntidadeDetail.nome}</p>
                                        </div>
                                    </div>
                                    <div className="row mb-5">
                                        <div className="col-md-6">
                                            <h5>Data doc.</h5>
                                            <p>{this.props.row.Data}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Tipo</h5>
                                            <p>{this.props.row.Tipo}</p>
                                        </div>
                                    </div>
                                    <div className="row mb-5">
                                        <div className="col-md-4">
                                            <h5>Valor Total</h5>
                                            {services.money.format(this.props.row.Valor)}
                                        </div>
                                        <div className="col-md-4">
                                            <h5>Un</h5>
                                            {this.props.row['Valor Unit']}
                                        </div>
                                        <div className="col-md-4">
                                            <h5>Desart</h5>
                                            {this.props.row.service.desart}
                                        </div>
                                    </div>
                                </div>
                        </div >
                    }

                </div>
            </div>
        );
    }
}
export default SecondPopup;