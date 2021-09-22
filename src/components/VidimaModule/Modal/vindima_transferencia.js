import React from 'react';
import { Input } from '@progress/kendo-react-inputs';
import { DatePicker } from 'antd';
var moment = require('moment')


const dateFormat = "YYYY-MM-DD"


class VindimaTransferencia extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            propRow: {},
            tipoList: []
        }
    }

    componentDidMount() {
        this.setMainState()
    }
    componentDidUpdate(preProp) {
        if (preProp.date != this.props.date) {
            this.setMainState()
        }
    }

    setMainState = () => {
        this.setState({
            propRow: this.props.data,
            tipoList: this.props.tipoList
        })
    }

    handleDatePicker = () => {
        let datePicker = (<DatePicker
            placeholder="Data de Início"
            size="large"
            onChange={this.handleDate}
        />)
        let date = this.props.data.data ? this.props.data.data : '';
        if (date) {
            date = moment(date).format(dateFormat);
            datePicker = (<DatePicker
                className="form-control"
                size="middle"
                placeholder="Date of Birth"
                defaultValue={moment(date, dateFormat)}
                format={dateFormat}
                onChange={this.handleDate}
            />)
        }
        return datePicker
    }

    handleDate = (e) => {
        let data = { ...this.state.propRow }
        data['data'] = e && e._d ? moment(e._d).format(dateFormat) : ''
        this.setState({
            propRow: data
        })
    }

    handleChange = (e) => {
        let data = { ...this.state.propRow };

        data[e.target.name] = e.target.value;
        this.setState({
            propRow: data
        })
    }

    handleSubmit = () => {
        let data = { ...this.state.propRow }
        this.props.handleSubmitData(data)
    }

    render() {
        console.log("PROPROW", this.state)
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title pl-0">{this.props.popUpHeadingFirst}</h4>
                    <a href="#" onClick={() => this.handleSubmit()} className="remoove mr-4">Inserir</a>
                    <a href="#" onClick={() => this.props.closePopup()} className="remoove text-success">Cancelar</a>
                </div>
                <div className="modal-body">
                    <div className="details">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="input-box active-grey mb-2">
                                    <Input
                                        style={{ width: "100%" }}
                                        className="input-1"
                                        name="entidade"
                                        value={this.state.propRow.entidade || ''}
                                        label="Nº Entidade"
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="input-box active-grey mb-2">
                                    <Input
                                        style={{ width: "100%" }}
                                        className="input-1"
                                        name="nome"
                                        value={''}
                                        label="Nome"
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 kendo-Input">
                                <div className="input-box active-grey mb-2">
                                    {
                                        this.handleDatePicker()
                                    }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="input-box active-grey mb-2">
                                    <Input
                                        style={{ width: "100%" }}
                                        className="input-1"
                                        name="valor"
                                        value={this.state.propRow.valor || ''}
                                        label="Valor"
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 kendo-Input">
                                <div className="input-box active-grey drop-down-box">
                                    <label className="input-label">Tipo </label>
                                    <select className="custome-drop-down" value={this.state.propRow.tipo || ''} onChange={this.handleChange} name="tipo">
                                        <option value="">Opção</option>
                                        {
                                            this.state.tipoList &&
                                            this.state.tipoList.map((_r, i) => (
                                                <option key={i} value={_r}>{_r}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            {/* <div className="row"> */}
                            <div className="col-md-12">
                                <div className="input-box active-grey mb-2">
                                    <textarea onChange={this.handleChange} rows="3" value={this.state.propRow.observacoes} name="observacoes" className="input-1" placeholder="observações" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default VindimaTransferencia;