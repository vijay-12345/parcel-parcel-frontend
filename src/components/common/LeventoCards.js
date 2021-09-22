import React from 'react';
import { DatePicker, Progress } from 'antd';
import SearchFilter from '../filters/SearchFilter';
import Main from '../../Pages/Demo/main';
import { Input } from '@progress/kendo-react-inputs';
import Lang from '../../lang'
import services from '../../services';

class LeventoCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            row: this.props.row,
            index: this.props.index,
            areaapdouro: null,
            areaapporto: null,
            obs: null,
            percentage: 0
        }
    }


    handleSubmit = () => {
        //this.props.getpopUpdata(this.state.data,this.props.tab)
        let state = { ...this.state }
        this.props.getLevantamentoRow(state)
    }


    handleChange = (e, row) => {
        //console.log('eeeeee',e)
        let state = this.state;
        state[e.target.name] = e.target.value;
        let deuro=  this.state.areaapdouro? parseInt(this.state.areaapdouro):0
        let porto =this.state.areaapporto? parseInt(this.state.areaapporto):0
        let totalarea=  deuro + porto;
        let percentage=deuro/totalarea*100; 
        this.setState({percentage})

    }

    render() {
        return (
            <div key={this.state.index} id={`accordion-${this.state.index}`} className="custom-accordtion">
                <div className="card">
                    <div className="card-header">
                        <a className="collapsed card-link d-flex justify-content-between align-items-center" data-toggle="collapse" href={`#collapse-${this.state.index}`}>
                            <table className="w-100">
                                <tr>
                                    <td>
                                        <div className="font-12">codigo direito</div>
                                        <div className="table-head">{this.state.row.geocod}</div>
                                    </td>
                                    <td>
                                        <div className="font-12">Area Total</div>
                                        <div className="table-head">{this.state.row.area}</div>
                                    </td>
                                    <td>
                                        <div className="font-12">Disponivel douro</div>
                                        <div className="table-head">
                                            <div className="green">{this.state.row.areaapdouro}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-12">Disponivel Porto</div>
                                        <div className="table-head">
                                            <div className="red">{this.state.row.areaapporto}</div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <span className="toggle-arrow"><i className="fas fa-chevron-down"></i></span>
                        </a>
                    </div>
                    <div id={`collapse-${this.state.index}`} className="collapse">
                        <div className="card-body">
                            <p>Codigo de origem</p>
                            <h3>{this.state.row.codigo}</h3>
                            <p>Predio de plantacao</p>
                            <h3>{this.state.row.nmpredplant}</h3>
                            <div className="row">
                                <div className="col-md-4">
                                    <p>Início</p>
                                    <h3>{this.state.row.inidireito}</h3>
                                </div>
                                <div className="col-md-4">
                                    <p>Fim</p>
                                    <h3>{this.state.row.fimdireito}</h3>
                                </div>
                                <div className="col-md-4">
                                    <p>Ano plantacao</p>
                                    <h3>{this.state.row.anoplant}</h3>
                                </div>
                            </div>
                            <p>Tipo</p>
                            <h3>{this.state.row.tipodireito}</h3>
                            <p>Tipo legislacao</p>
                            <h3>{this.state.row.tipoha}</h3>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="d-sm-flex justify-content-between mt-2 mb-2">
                                        <div className="font-14"><b>Area Disponivel douro</b></div>
                                    </div>
                                    <div className="progress legalframework">
                                        <Progress 
                                        percent={this.state.percentage} 
                                        status="active"
                                        />
                                    </div>
                                    <div className="d-sm-flex justify-content-between mt-2 mb-2">
                                        <div className="font-14"><b>{this.state.row.areaapporto}</b></div>
                                        <div className="font-14"><b>{this.state.row.areaapdouro}</b></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-tab p-2 pl-0 pr-0">
                            <ul className="nav nav-tabs d-flex justify-content-around">
                                <li className="nav-item">
                                    <a className="nav-link active" data-toggle="tab" href={"#home" + this.state.index}>Area Disponivel douro
                        </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href={"#menu1" + this.state.index}>Area Disponivel Porto</a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane container active" id={"home" + this.state.index}>
                                    <div className="row">
                                        <div className="col-md-12 mt-2">
                                            <div className="input-box active-grey mb-0">
                                                {/* <label className="input-label">Area </label>
                                            <input type="date" className="input-1" placeholder="Enter Value" /> */}
                                                <Input
                                                    type="number"
                                                    style={{ width: "100%" }}
                                                    className="input-1"
                                                    name="areaapdouro"
                                                    label="Area Douro"
                                                    value={this.state.areaapdouro}
                                                    onChange={(e) => this.handleChange(e, this.state.row)}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="tab-pane container fade" id={"menu1" + this.state.index}>
                                    <div className="row">
                                        <div className="col-md-12 mt-2">
                                            <div className="input-box active-grey mb-0">
                                                {/* <label className="input-label">Area </label>
                                            <input type="date" className="input-1" placeholder="Enter Value" /> */}
                                                <Input
                                                    type="number"
                                                    style={{ width: "100%" }}
                                                    className="input-1"
                                                    name="areaapporto"
                                                    label="Area Porto"
                                                    value={this.state.areaapporto}
                                                    onChange={(e) => this.handleChange(e, this.state.row)}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-md-12 mt-2">
                                        <div className="input-box active-grey form-group">
                                            <label className="input-label">Observacoes</label>
                                            <textarea
                                                className="form-control heigh-auto input-1"
                                                value={this.state.obs}
                                                name="obs"
                                                onChange={(e) => this.handleChange(e, this.state.row)}
                                                rows="3"
                                                placeholder="Enter"
                                            />
                                        </div>
                                    </div>


                                    <div className="col-md-12">
                                        <a href="#" onClick={() => this.handleSubmit()} className="remoove mr-2">APLICAR</a>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LeventoCards;