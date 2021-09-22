import React from 'react';
import { DatePicker, Progress } from 'antd';
import SearchFilter from '../filters/SearchFilter';
import Main from '../../Pages/Demo/main';
import { Input } from '@progress/kendo-react-inputs';
import Lang from '../../lang'
import services from '../../services';
import LeventoCards from './LeventoCards';
import { toast } from 'react-toastify';
var moment = require('moment')

const filters = {
    Tabs: {
        Enquadremento: [
            {
                key: 'tipodireito',
                displayKey: "Tipo",
                inputType: "text"
            },
            {
                key: 'geocod',
                displayKey: "Codigo direito",
                inputType: "text"
            }
        ]
    },
    checkbox: [

    ]
}

let combolistrequest = {
    "Filters": null,
    "SortBy": "nif",
    "IsSortTypeDESC": true,
    "IsPagination": true,
    "Page": 1,
    "PageSize": 20
};

class MatrixModalForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filterData: [],
            leventamentoArray: [],
            typeFilter: 'nif'
        }
    }

    componentDidMount() {
        this.setState({
            data: [],
            filterData: []
        }, () => this.getLevantamento(null));
    }

    getLevantamento = async (filters) => {
        if (filters && filters.filters) {
            filters.filters.nif = filters.filters.nif ? parseInt(filters.filters.nif) : null
            filters.filters.nrvitic = filters.filters.nrvitic ? parseInt(filters.filters.nrvitic) : null
            combolistrequest.Filters = filters.filters
        }
        let res = await services.apiCall.requestApi("Levantamento/GetAll", combolistrequest, 'post');
        if (res) {
            this.setState({
                data: res,
                filterData: res
            })
        }
    }

    handleSubmit = () => {
        //  this.props.getpopUpdata(this.state.data,this.props.tab)
    }

    getFilters(filter) {
        this.getLevantamento(filter);
    }

    handleRadioTypeFilter = (e) => {
        this.setState({
            typeFilter: e.target.value
        })
    }

    getLevantamentoRow = (state) => {
        let data = this.props.data;
        if(!data || !Array.isArray(data))
            data=[];
        let error=null;
        if(state.areaapporto==null)
        toast.error("areaapporto é necessário");
        else if(state.areaapdouro==null)
        toast.error("areaapdouro é necessário");
        else{

            let newLegal = {
                "legalFrameworks": {
                    "iddtplantacao": state.row.geocod,
                    "iddtorigem": state.row.codigo,
                    "tipo": null, //pending
                    "areaapdouro": state.areaapdouro,
                    "areaapporto": state.areaapporto,
                    "obs": state.obs,
                    "disponivel": false,
                    "tipoha": null ,//pending
                    "predioarranque": null, //pending
                },
                "levantamento": [state.row]
            }

            data.push(newLegal)
            this.props.getpopUpdata(data, this.props.tab);
            this.props.closePopup();
        }
    
         //console.log('data.........',state);
        //console.log('state......', this.props.tab)

    }

    handleFilter = (data) => {
        //     console.log("data",data)
        //    if(data && data.length > 0){
        //         this.setState({
        //             filterData : data
        //         })
        //    }
    }

    handleChange = (e, row) => {
        let filterData = [...this.state.data];
        filterData.map(_row => {
            if (_row.idenqlegal && _row.idenqlegal === row.idenqlegal) {
                _row[e.target.name] = e.target.value
            }
        })
        this.setState({
            data: filterData
        }, () => this.handleFilter(this.state.data))

        console.log("LEGALFRAMEWORK", filterData)
    }

    render() {
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title pl-0">Aplicar direitos</h4>
                    <a href="#" className="remoove mr-2" onClick={() => this.props.closePopup()}>FECHAR</a>
                </div>
                <div className="modal-body">
                    <div className="details">
                        <div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" defaultChecked={true} onClick={(e) => this.handleRadioTypeFilter(e)} className="custom-control-input" id="customRadio" name="example" value="nif" />
                                <label className="custom-control-label" for="customRadio">NIF</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" onClick={(e) => this.handleRadioTypeFilter(e)} className="custom-control-input" id="customRadio2" name="example" value="nrvitic" />
                                <label className="custom-control-label" for="customRadio2">N<sup>0</sup> Viticultor</label>
                            </div>
                        </div>
                        <div className="model-search">
                            <SearchFilter date={new Date()} typeFilter={this.state.typeFilter} filters={filters} leftside={true} handleFilter={(data) => this.handleFilter(data)} data={this.state.data} getFilter={(data) => this.getFilters(data)} />
                            {
                                this.state.filterData &&
                                this.state.filterData.map((_r, i) => (

                                    <LeventoCards index={i} row={_r} getLevantamentoRow={(state) => this.getLevantamentoRow(state)} />

                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
        //  }
    }
}

export default MatrixModalForm;