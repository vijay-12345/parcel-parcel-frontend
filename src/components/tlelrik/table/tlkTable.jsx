import React from 'react';
import $ from 'jquery';
import '@progress/kendo-theme-default/dist/all.css';
import { Button } from '@progress/kendo-react-buttons'
import { process } from '@progress/kendo-data-query';
import { Mainfilter } from './Mainfilter.jsx';
import { Input } from '@progress/kendo-react-inputs';
import { DatePicker, Select, Tooltip, Checkbox } from 'antd'
import {
    Grid, GridColumn as Column,
    GridColumnMenuFilter, GridToolbar,
    GridColumnMenuCheckboxFilter
} from '@progress/kendo-react-grid';
import { GridPDFExport } from '@progress/kendo-react-pdf';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import Lang from "../../../lang"
import { IntlProvider, load, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import esMessages from '../../../lang/tlklang.json';
import likelySubtags from 'cldr-core/supplemental/likelySubtags.json';
// import currencyData from 'cldr-core/supplemental/currencyData.json';
import weekData from 'cldr-core/supplemental/weekData.json';
import numbers from 'cldr-numbers-full/main/es/numbers.json';
import currencies from 'cldr-numbers-full/main/es/currencies.json';
import caGregorian from 'cldr-dates-full/main/es/ca-gregorian.json';
import dateFields from 'cldr-dates-full/main/es/dateFields.json';
import timeZoneNames from 'cldr-dates-full/main/es/timeZoneNames.json';
import { TabelAction } from './tableAction.jsx';
import services from '../../../services.js';

var moment = require('moment')
const dateFormat = "YYYY-MM-DD";
load(
    likelySubtags,
    // currencyData,
    weekData,
    numbers,
    currencies,
    caGregorian,
    dateFields,
    timeZoneNames
);

loadMessages(esMessages, 'pt-PT');


let list = [];
export class ColumnMenu extends React.Component {
    render() {
        return (
            <div>
                <GridColumnMenuFilter {...this.props} expanded={true} />
            </div>
        );
    }
}

export class ColumnMenuCheckboxFilter extends React.Component {
    render() {
        return (
            <div>
                <GridColumnMenuCheckboxFilter {...this.props} data={list} expanded={true} />
            </div>
        );
    }
}

class HearderTooltip extends React.Component {
    render() {
        return (
            <a className="k-link" onClick={this.props.onClick}>
                <Tooltip title={this.props.title} color={"#808080"}>
                    {this.props.field}
                </Tooltip>
            </a>
        );
    }
}
class CellTooltip extends React.Component {
    render() {
        return (
            <td title={this.props.dataItem[this.props.field]}>
                {this.props.dataItem[this.props.field]}
            </td>
        );
    }
}

let Defaultstate = {
    take: 100,
    skip: 0,
    group: [],
    exporting: false,
    modulename: ""
}

class TlkTable extends React.Component {
    gridPDFExport;
    _export;
    export = () => {
        this._export.save(list);
    }
    constructor(props) {
        super(props);
        this.state = this.createAppState(Defaultstate);
        this.TabelAction = TabelAction({
            rowbuttonAction: this.rowbuttonAction,
            actionbuttons: this.props.actionbuttons,
            deleteFunc: this.props && this.props.deleteFunc && this.props.deleteFunc
        });
    }
    rowbuttonAction = (action, dataItem) => {
        this.props.ActionPerform(action, dataItem);
    }

    createAppState = (dataState) => {
        let groupfield = [];
        let sumfields = {}
        let propdata = {}
        if (this.state) {
            propdata = { ...this.state.propdata }
        }
        if (propdata.modulename !== this.props.modulename || propdata.date !== this.props.date) {
            dataState = Defaultstate
            dataState.group = this.props.groupfield;
        }

        let aggregates = this.props.aggregates;

        if (aggregates) {
            const groups = dataState.group;
            if (groups) { groups.map(group => group.aggregates = aggregates); }
            aggregates.map((row, index) => (
                sumfields[row.field] = row
            ))
        }
        let listdata = []
        if (this.state && this.props.sendDatatoTlkTable) {
            listdata = this.state.completelist;
            list = listdata;
        } else if (this.props.list) {
            listdata = this.props.list;
            list = listdata;
        }

        return {
            result: process(listdata.slice(0), dataState),
            completelist: listdata,
            dataState: dataState,
            groupfield,
            propdata: this.props,
            sumfields,
            per_col_width: this.getColWidth(dataState),
            customrow: this.props.customrow || {},
            checkedInvoice: {}
        };
    }

    componentDidUpdate(preProp) {

        let groupfield = [];
        let sumfields = {};
        if (this.props.date !== preProp.date) {

            let dataState = { ...this.state.dataState }
            if (dataState.modulename !== this.props.modulename) {
                dataState = Defaultstate
                dataState.group = this.props.groupfield || []

            }

            let aggregates = this.props.aggregates;
            if (aggregates) {
                const groups = dataState.group;
                if (groups) { groups.map(group => group.aggregates = aggregates); }
                aggregates.map((row, index) => (
                    sumfields[row.field] = row
                ))
            }
            let listdata = []
            if (this.state && this.props.sendDatatoTlkTable) {
                listdata = this.state.completelist;
                list = listdata;
            } else if (this.props.list) {
                listdata = this.props.list;
                list = listdata;
            }
            if (listdata.length == 0 && this.props.sendDatatoTlkTable) {
                let json = this.props.sendDatatoTlkTable(dataState)
                if (json) {
                    Promise.all([json]).then((values) => {
                        this.dataRecieved(values[0]);
                    });
                    return null
                }
            }
            this.setState({
                result: process(listdata.slice(0), dataState),
                dataState: dataState,
                completelist: listdata,
                modulename: this.props.modulename,
                groupfield,
                sumfields,
                per_col_width: this.getColWidth(dataState),
            });
        }
    }

    dataStateChange = (event) => {
        this.setState(this.createAppState(event.data));
    }

    expandChange = (event) => {

        event.dataItem[event.target.props.expandField] = event.value;
        this.setState({
            result: Object.assign({}, this.state.result),
            dataState: this.state.dataState
        });
    }



    gettotalrow = (row) => {
        let Total = 0;
        if (row["QT"]) {
            Total = (parseFloat(row['Valor UN']) * parseFloat(row["QT"]));
            row.complete_services_amount = Total;
            if (row.tax_id) {
                let tax = {};
                this.props.tax_list.map((_r) => {
                    if (parseInt(_r.id) === parseInt(row.tax_id)) {
                        tax = _r
                    }
                })
                row.tax_type = tax.tax_type;
                row.tax_percent = parseFloat(tax.tax_percent);
                row.service_tax = Total * parseFloat(tax.tax_percent) / 100;
                row.valor_cativo = 0;
                Total = Total + Total * parseFloat(tax.tax_percent) / 100;
            } else {
                row.tax_id = null;
                row.tax_type = "";
                row.service_tax = 0;
                row.valor_cativo = 0;
                row.tax_percent = 0;
            }
        }
        row.Valor = Total;
        return row;
    }


    AddServices = (e, row) => {
        let customrow = this.state.customrow;
        row["QT"] = parseFloat(e.target.value)
        customrow[row.id] = this.gettotalrow(row);
        if (!e.target.value || e.target.value == 0) {
            delete customrow[row.id];
        }
        this.props.ActionPerform("AddServices", customrow);
        this.setState({
            customrow
        })
    }

    setServicestax = (e, row) => {
        let customrow = { ...this.state.customrow };

        if (e.target.value) {
            row.tax_id = parseInt(e.target.value);
        } else {
            row.tax_id = null;
        }
        customrow[row.id] = this.gettotalrow(row);
        this.props.ActionPerform("AddServices", customrow);
        this.setState({
            customrow
        })
    }
    handleCheck = (e) => {
        let id = e.target.value;
        let checkedInvoice = { ...this.state.checkedInvoice };
        if (e.target.checked) {
            checkedInvoice["id-" + id] = id;
        } else {
            delete checkedInvoice["id-" + id]
        }
        this.setState({
            checkedInvoice
        })
    }

    generateDocument = () => {
        let checkedInvoice = { ...this.state.checkedInvoice };
        this.props.ActionPerform("checkedInvoice", checkedInvoice);
    }

    grepif = () => {
        let checkedInvoice = { ...this.state.checkedInvoice };
        this.props.ActionPerform("checkedInvoice", checkedInvoice);
    }
    
    cellRender = (tdElement, cellProps) => {
        if (this.props.modulename === "FaturasEmitir") {
            if (cellProps.field === "Check") {
                if (cellProps.dataItem.invoice_url) {
                    return (<td></td>)
                } else {
                    return (<td>
                        <Checkbox
                            onChange={(e) => this.handleCheck(e)}
                            value={cellProps.dataItem.id}
                            checked={this.state.checkedInvoice["id-" + cellProps.dataItem.id]}
                        ></Checkbox>
                    </td>)
                }
            }
        }
        if (this.props.modulename === "GERFIP") {
            if (cellProps.field === "Check") {
                if (cellProps.dataItem.fesial_url) {
                    return (<td></td>)
                } else {
                    return (<td>
                        <Checkbox
                            onChange={(e) => this.handleCheck(e)}
                            value={cellProps.dataItem.id}
                            checked={this.state.checkedInvoice["id-" + cellProps.dataItem.id]}
                        ></Checkbox>
                    </td>)
                }
            }
        }
        if (this.props.modulename === "TesourariaEmissãodeRecibos") {
            if (cellProps.field === "Check") {
                if (cellProps.dataItem.document_url) {
                    return (<td></td>)
                } else {
                    return (<td>
                        <Checkbox
                            onChange={(e) => this.handleCheck(e)}
                            value={cellProps.dataItem.id}
                            checked={this.state.checkedInvoice["id-" + cellProps.dataItem.id]}
                        ></Checkbox>
                    </td>)
                }
            }
        }
        if (this.props.modulename === "TesourariaContacorrente") {
            if (cellProps.field === "Nº Doc") {
                return (<td style={{ color: "red" }}>
                    <a href="#" data-toggle="modal" data-target="#vindima-modal" onClick={() => this.rowbuttonAction("detailPopUp", cellProps.dataItem)} >
                        {cellProps.dataItem[cellProps.field]}
                    </a>
                </td>)
            }
        } if (this.props.modulename === "Adicionar Movimento") {
            if (cellProps.field == "QT") {
                return (<td> <Input type={"number"}
                    value={this.state.customrow[cellProps.dataItem.id] ? this.state.customrow[cellProps.dataItem.id]['QT'] : ""}
                    onChange={(e, row) => this.AddServices(e, cellProps.dataItem)} /> </td>);
            } else if (cellProps.field == "Valor") {
                return (<td> <Input readOnly={true} value={this.state.customrow[cellProps.dataItem.id] ? services.money.format(this.state.customrow[cellProps.dataItem.id].Valor)  : ""} /> </td>);
            }else if (cellProps.field == "Valor UN") {
                return (<td> {services.money.format(cellProps.dataItem[cellProps.field])} </td>);
            } else if (cellProps.field == "IVA") {
                return (<td>
                    <select
                        style={{ width: "100%" }}
                        value={this.state.customrow[cellProps.dataItem.id] ? this.state.customrow[cellProps.dataItem.id].tax_id : ""}
                        onChange={(e, row) => this.setServicestax(e, cellProps.dataItem)} >
                        <option value="">No Tax</option>
                        {
                            this.props.tax_list.map((row) => (
                                <option value={row.id}>{row.tax_percent}% - {row.tax_type}</option>
                            ))
                        }
                    </select>
                </td>);
            }

        }
        else if (cellProps.field == "limite pag") {
            let a = moment(new Date());
            let b = moment(cellProps.dataItem[cellProps.field]);
            if (a.diff(b, 'days') > 0)
                return (<td style={{ color: "red" }}>{cellProps.dataItem[cellProps.field]}</td>);
            else
                return (<td style={{ color: "orange" }}>{cellProps.dataItem[cellProps.field]}</td>);

        } else if (cellProps.field == "Sinalizado") {
            return (<td className="text-inactive"> <i className="fa fa-flag ml-5" aria-hidden="true" style={{ color: cellProps.dataItem.Sinalizado }}></i> </td>);
        } else if (cellProps.rowType === 'groupFooter') {
            let row = this.state.sumfields[cellProps.field]
            if (row) {
                return (
                    <td className="GridsumField">
                        {cellProps.dataItem.aggregates[cellProps.field].sum}
                    </td>
                );
            }
            else {
                if (cellProps.field == "Classe")
                    return (
                        <td className="GridsumField">
                            Total {cellProps.dataItem.field} :
                        </td>
                    );
            }
        }
        else if (cellProps.rowType != 'groupHeader') {
            if (cellProps.field == "Estado" && (cellProps.dataItem.status == 1 || cellProps.dataItem.status == "1" || cellProps.dataItem.status == "Active" || cellProps.dataItem.status == "active" || cellProps.dataItem.status == "a" ||
                cellProps.dataItem.Estado == "A")) {
                return (
                    <td className="text-active">
                        Ativo
                    </td>
                );
            } else if (cellProps.field == "Estado") {

                return (<td className="text-inactive"> Inativo </td>);
            } else
                if (cellProps.field == "Estado" && (cellProps.dataItem.status == 1 || cellProps.dataItem.status == "1" || cellProps.dataItem.status == "Active" || cellProps.dataItem.status == "active" || cellProps.dataItem.status == "a" ||
                    cellProps.dataItem.status == "A")) {
                    return (
                        <td className="text-active">
                            Ativo
                        </td>
                    );
                } else if (cellProps.field == "Estado") {
                    return (<td className="text-inactive"> Inativo </td>);
                }
                else if (cellProps.field == "Declaração") {
                    return (<td > {cellProps.dataItem["Declaração"] == 1 ? "Sim" : "Não"} </td>);
                } else if (cellProps.field == "Legalizável") {
                    return (<td > {cellProps.dataItem["Legalizável"] == 1 ? "Sim" : "Não"} </td>);
                } else if (cellProps.field == "Classe") {
                    return (<td > {cellProps.dataItem["Classe"] == 1 ? "A" : cellProps.dataItem["Classe"]} </td>);
                }
        }
        return tdElement;
    }

    exportPDF = () => {
        setTimeout(
            () => { this.gridPDFExport.save(list, this.pdfExportDone); },
            250
        );
        this.setState({ exporting: true });
    }

    pdfExportDone = () => {
        this.setState({ exporting: false });
    }

    makedata = (data, dataState) => {
        let returnData = [];
        while (returnData.length < (dataState.skip)) {
            returnData.push({});
        }
        data.map((row, index) => {
            returnData.push(row);
        })
        return returnData;
    }

    getColWidth = (dataState) => {
        let totalCol = this.props.columnlist.length;
        if (!this.props.notAction) {
            totalCol += 1
        }
        let totalwidth = this.props.totalWidth ? this.props.totalWidth : $(".table-responsive").width();
        let totalGrouping = dataState.group && dataState.group.length > 0 ? dataState.group.length : 0;
        let groupingWidth = totalGrouping * 32;
        let per_Col_width = (totalwidth - (groupingWidth)) / (totalCol);
        return per_Col_width;
    }

    dataRecieved = (listdata) => {
        if (Array.isArray(listdata)) {
            list = listdata;
            let dataState = { ...this.state.dataState };
            listdata = this.makedata(listdata, dataState);
            dataState.total = window.localStorage.getItem('table_total');
            this.setState({
                dataState,
                result: process(listdata.slice(0), dataState),
                completelist: listdata
            });
        }
    }

    Tooltip = (row) => {
        let tooltip = null;
        if (this.props.tooltips && this.props.tooltips[row.field]) {
            tooltip = (
                <Column
                    width={this.props.columnwidth ? this.props.columnwidth : this.state.per_col_width}
                    field={row.field}
                    title={this.props.tooltips[row.field]}
                    headerCell={HearderTooltip}
                    columnMenu={row.columnMenuType ? ColumnMenuCheckboxFilter : ColumnMenu} />
            )
        } else {
            tooltip = (
                <Column
                    width={this.props.columnwidth ? this.props.columnwidth : this.state.per_col_width}
                    field={row.field}
                    columnMenu={row.columnMenuType ? ColumnMenuCheckboxFilter : ColumnMenu} />
            )
        }
        return tooltip;
    }





    render() {

        const grid = (

            <Grid
                style={{ maxHeight: '600px', minHeight: "550px" }}
                sortable={true}
                pageable={{ pageSizes: true }}
                groupable={this.props.notGroup ? false : { footer: 'visible' }}
                resizable={true}
                reorderable={true}
                data={this.state.result}
                {...this.state.dataState}
                onDataStateChange={this.dataStateChange}
                onExpandChange={this.expandChange}
                expandField="expanded"
                cellRender={this.cellRender}
            >
                {
                    !this.props.noDownloadButton &&
                    <GridToolbar>
                        <Button
                            title="Export PDF"
                            primary={true}
                            className="k-button mr-2 btn-sm float-right"
                            onClick={this.exportPDF}
                            disabled={this.state.exporting}
                        >
                            {"Exportar PDF".toUpperCase()}
                        </Button>
                        <Button
                            title="Export Excel"
                            primary={true}
                            className="k-button mr-2 btn-sm float-right"
                            onClick={this.export}
                        >
                            {"Exportar para Excel".toUpperCase()}
                        </Button>
                    </GridToolbar>
                }

                {
                    this.props.generateDocument &&
                    <GridToolbar>
                        <Button
                            title="Gerar Documento"
                            primary={true}
                            className="k-button mr-2 btn-sm float-right"
                            onClick={this.generateDocument}
                        >
                            {"Gerar Documento".toUpperCase()}
                        </Button>
                    </GridToolbar>
                }
                 {
                    this.props.DocumentGERFIP &&
                    <GridToolbar>
                        <Button
                            title="Gerar Documento"
                            primary={true}
                            className="k-button mr-2 btn-sm float-right"
                            onClick={this.grepif()}
                        >
                            {"GERFIP".toUpperCase()}
                        </Button>
                    </GridToolbar>
                }


                {
                    this.props.novo &&
                    <GridToolbar>
                        <Button
                            title="Novo"
                            primary={true}
                            className="k-button btn-sm novobutton"
                            onClick={this.export}
                        >
                            {"Novo".toUpperCase()}
                        </Button>
                    </GridToolbar>
                }


                {
                    this.props.columnlist.map((_row, index) => (
                        this.Tooltip(_row)
                    ))
                }
                {
                    !this.props.notAction &&
                    <Column
                        width={this.state.per_col_width}
                        field={Lang.langCheck.langRequest(this.props.actionColumnName || "Action")} cell={this.TabelAction} width="240px" />

                }
            </Grid>
        );
        return (

            <LocalizationProvider language="pt-PT">
                <IntlProvider locale="pt" >
                    <GridPDFExport
                        ref={pdfExport => this.gridPDFExport = pdfExport}
                        margin="1cm"
                    >
                        {grid}
                    </GridPDFExport>
                    <ExcelExport
                        data={list}
                        ref={exporter => this._export = exporter}
                    >
                        {grid}
                    </ExcelExport>
                </IntlProvider>
                {
                    this.props.sendDatatoTlkTable &&
                    <Mainfilter
                        dataState={this.state.dataState}
                        onDataRecieved={this.dataRecieved}
                        sendDatatoTlkTable={(filter) => this.props.sendDatatoTlkTable(filter)}
                    />
                }
            </LocalizationProvider>
        )
    }
}
export default TlkTable;