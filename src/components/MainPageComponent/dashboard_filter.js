import React from 'react';
import services from '../../services';
import { Link, withRouter } from 'react-router-dom';
import TableHeader from './../common/table_header';
import TablePagination from './../common/TablePagination.js';
import Lang from '../../lang'
import Main from '../../Pages/Demo/main';
import SearchFilter from '../filters/SearchFilter';
import TitleBar from '../common/title_bar'
import FilterInputs from '../filters/FilterInputs';
import TkTablewithAction from '../tlelrik/TkTablewithAction';
import $ from 'jquery';
// import TlkTable from '../tlelrik/table/tlkTable';
import TlkTableparcel from '../tlelrik/table/TlkTableparcel';

const columnkeyMap = {
    numparc: "Nº Parcela IVDP",
    geocod: "GeoCódigo",
    numparant: "Nº Parcela CD",
    sitedeclar: "Declaração",
    legalizavel: "Legislável",
    districtName: "Distrito",
    countryName: "Concelho",
    parishName: "Freguesia",
    classe: "Classe",
    // mcp: "Número",
    areaapta: "Área Apta",
    areailegal: "Área s/ enq legal",
    areanapta: "Área não Apta",
    areaaf: "A a F com MG",
    anoplantacao: "Ano de Plantação",
    // "designment":"designacao", 
    // "punctuation":"pontuacao", 
    // "lastSurveyDate":"dataultimavistoria", 
    // "plotSituation":"situacaodaparcela", 
    // "vineyardStatus":"estadodavinha", 
    // "groudFrame":"armacaotereno", 
    // "estimatedProduction":"producaoestimada", 
    // "litigationSituation":"situacaodedelitigio", 
    // "classPlantation":"classePlantacao", 
    // "potentialarea":"AreaPotential", 
    // "affectiveArea":"AreaAfetiva", 
    // "areaWithoutEnqNice":"AreasEnqLegal", 
    // "doPort":"FactorDOPorto", 
    // "fitnessFactor":"FactorAptidao", 
    // "factorPortGrapeVarieties":"factorpartocastas", 


}

const filters = {
    Tabs: {
        Entidade: [
            // {
            //     key: 'numparc',
            //     displayKey: "Nº Parcela IVDP",
            //     inputType: "text"
            // },
            // {
            //     key: 'numparant',
            //     displayKey: " Nº Parcela CD",
            //     inputType: "text"
            // },
            //   {
            //       key : 'declaration',
            //       displayKey : "Declaracao",
            //       inputType : "text"
            //   }
        ],
        Parcela: [
            {
                key: 'pontuacao',
                displayKey: "pontuação",
                inputType: "text"
            },
            {
                key: 'numparc',
                displayKey: "Nº Parcela IVDP",
                inputType: "text"
            },
            {
                key: 'numparant',
                displayKey: " Nº Parcela CD",
                inputType: "text"
            },
        ],
        Geocódigo: [
            {
                key: 'countryName',
                displayKey: "Concelho",
                inputType: "text"
            },
            {
                key: 'parishName',
                displayKey: "Freguesia",
                inputType: "text"
            },
            {
                key: 'geocod',
                displayKey: "Geocódigo",
                inputType: "text"
            }
        ],
        // Freguesia:[
        //     {
        //         key : 'lastSurveyDate',
        //         displayKey : "Dataultimavistoria",
        //         inputType : "text"
        //     }
        // ],
        "Ficha de exploração": [
            {
                key: 'anoplantacao',
                displayKey: "Ano",
                inputType: "text"
            }
            // ,
            // {
            //     key: 'mcp',
            //     displayKey: "Número",
            //     inputType: "text"
            // }
            // {
            //     key : 'plotSituation',
            //     displayKey : "Situacaodaparcela",
            //     inputType : "text"
            // },
            // {
            //     key : 'affectiveArea',
            //     displayKey : "AreaAfetiva",
            //     inputType : "text"
            // }
        ],
        //     AP:[
        //         {
        //             key : 'doPort',
        //             displayKey : "FactorDOPorto",
        //             inputType : "text"
        //         },
        //         {
        //             key : 'fitnessFactor',
        //             displayKey : "FactorAptidao",
        //             inputType : "text"
        //         }
        //     ]
    },
    checkbox: [
        {
            key: 'Explorer',
            displayKey: "Exploradora",
            inputType: "radio"
        },
        {
            key: 'Owner',
            displayKey: "Proprietária",
            inputType: "radio"
        },
        {
            key: 'Explorer/Owner',
            displayKey: "Ambos",
            inputType: "radio"
        },
    ]
};


const groupfield = [
    //{ field: "Nº Parcela IVDP" },
    { field: 'Distrito' },
    { field: 'Concelho' },
    { field: 'Freguesia' },
]

const aggregates = [
    { field: "Área Apta", aggregate: 'sum' },
    { field: "Área s/ enq legal", aggregate: 'sum' },
    { field: "Área não Apta", aggregate: 'sum' },
    { field: "A a F com MG", aggregate: 'sum' },

]

const optionMenuArray = [
    { "main": "Tabelas de Gestão" },
    { "main": "Enquadramento Legal" }
]
// const getkeyTableName = (res, key, customkey) => {

//     if (customkey != "") {
//         if (customkey === "Explorer") {
//             return "explorer";
//         } else if (customkey == "Owner") {
//             return "property";
//         } else if (customkey == "Explorer/Owner") {
//             return "explorer_property";
//         }
//     }
//     else {
//         if (key in res.parcel) {
//             return "parcelfilter";
//         } else if (key in res.parcelProperty && key in res.parcelExplorer) {
//             return "explorer_property";
//         } else if (key in res.parcelProperty) {
//             return "property";
//         } else if (key in res.parcelExplorer) {
//             return "explorer";
//         }
//     }
//     return false;
// }


class DashBoardFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            telkikTable: "",
            totalcount: 0,
            entity_list_object: {},
            customfilters: {},
            tlkfilter: {}
        }
    }

    componentDidMount() {
        
        this.createTabel();
    }

    getLangFile = () => {
        Lang.getJSON.getJSONFile();
    }

    handleFilter = (data) => {
        
    }

    createTabel = () => {
        let columnlist = Object.keys(columnkeyMap).map(function (key) {
            return { field: columnkeyMap[key], columnMenuType: 'checkbox' }
        });
        let actionbuttons = { Edit: true, Redirect: false, Delete: false, Dropdown: true }
        let telkikTable = <TlkTableparcel
            date={new Date()}
            sendDatatoTlkTable={(filter) => this.sendDatatoTlkTable(filter)}
            columnwidth={60}
            aggregates={aggregates}
            modulename={"dashboard"}
            groupfield={groupfield}
            deleteFunc={(id) => this.handleDelete(id)}
            actionbuttons={actionbuttons}
            columnlist={columnlist}
            ActionPerform={(action, id) => this.ActionPerform(action, id)}
        />
        this.setState({
            telkikTable
        })
    }

    getFilters(filters) {
        console.log("filters",filters);
        this.setState({
            customfilters: filters,
            telkikTable:null
        },()=> this.createTabel())
       
    }

    makeAllfilters = (tlfilter) => {
        let customfilters = { ...this.state.customfilters }
        let tlkfilter = tlfilter;
        if (Object.keys(tlkfilter).length == 0) {
            tlkfilter = { ...this.state.tlkfilter }
        }
        console.log("customfilters", customfilters);
        console.log("tlkfilter", tlkfilter);
        let booleankeys = {
            "sitedeclar": true,
            "legalizavel": true
        }

        let filters = {
            "explorerentnum": null,
            "ownerentnum": null,
            "entnum": null
        };

        let entityFilter = {
            "Explorer": "explorerentnum",
            "Owner": "ownerentnum",
            "Explorer/Owner": "entnum"
        }
        let data = {
            Filters: {},
            SortBy: "numparc",
            IsSortTypeDESC: false,
            IsPagination: true,
            Page: 1,
            PageSize: 100
        };
        data = services.getAllFilters.addBoth(customfilters, tlkfilter, columnkeyMap, data, booleankeys, filters, entityFilter);
        // data.Filters.numparc = 1;
        return data;
    }


    sendDatatoTlkTable = async (tlkfilter) => {
        this.setState({
            tlkfilter: tlkfilter
        });
        let data = this.makeAllfilters(tlkfilter);
        let portugasdata = [];
        let _Parcel = await services.apiCall.requestApi("/Parcel/GetAll", data, 'post')
        if (_Parcel) {
            _Parcel.map((_row, index) => (
                portugasdata[index] = _row.parcel,
                portugasdata[index]['parcelProperty'] = _row.parcelProperty,
                portugasdata[index]['parcelExplorer'] = _row.parcelExplorer,
                portugasdata[index]['areaapta'] = 0,
                portugasdata[index]['areailegal'] = 0,
                portugasdata[index]['areanapta'] = 0,
                portugasdata[index]['anoplantacao'] = 0,
                _row.parcelExplorer.map((row) => (
                    portugasdata[index]['areaapta'] += row.areaapta ? eval(row.areaapta) : 0,
                    portugasdata[index]['areailegal'] += row.areailegal || 0,
                    portugasdata[index]['areanapta'] += row.areanapta || 0,
                    portugasdata[index]['anoplantacao'] += row.anoplantacao || 0
                )),
                Object.keys(columnkeyMap).map(function (key) {
                    portugasdata[index][columnkeyMap[key]] = portugasdata[index][key]
                })
            ));
            this.setState({
                data: portugasdata,
                totalcount: window.localStorage.getItem('table_total')
            })
            return portugasdata;
        }
    }


    handleDelete = (id) => {

    }

    ActionPerform = (action, row) => {
        if (action == 'Edit') {
            window.location = "/wizard_form?id=" + row.numparc + "&versao=" + row.versao+ "&geocode=" + row.geocod+ "&status=" + row.status
        } else {
            console.log(action, row)
        }
    }

    render() {
        return (

            <div className="inner-container">
                <div className="outer-space">
                    <TitleBar path={'/wizard_form'} title="Parcela" logo="parcelas" optionMenuArray={optionMenuArray} />
                </div>
                <div className="container-fluid">

                    <SearchFilter showEntity={true} filters={filters} handleFilter={(data) => this.handleFilter(data)} data={this.state.data} getFilter={(data) => this.getFilters(data)} />

                    <div className="table-section">
                        {
                            <>
                                <div className={(this.state.data && this.state.data.length) ? "" : "tlkwodata"}>
                                    <h3> A pesquisa retornou {this.state.totalcount} resultados </h3>
                                    <div className="table-responsive">
                                        {
                                            this.state.telkikTable
                                        }
                                    </div>
                                </div>
                                {
                                    this.state.totalcount == 0 &&
                                    <div className="searct-found">
                                        <img className="img-fluid" src="imgs/search-large-icon.png" />
                                        <p className="font-14">Sem resultados</p>
                                        <h3>Pesquise a parcela que<br /> pretende consultar</h3>
                                    </div>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(DashBoardFilter);