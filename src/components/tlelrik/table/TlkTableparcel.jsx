import React from 'react';
import $ from 'jquery';
import '@progress/kendo-theme-default/dist/all.css';
import { Button } from '@progress/kendo-react-buttons'
import { process } from '@progress/kendo-data-query';
import { Mainfilter } from './Mainfilter.jsx';
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
const Defaultstate = {
    take: 100,
    skip: 0,
    group: [],
    exporting: false,
    modulename: "xxx"
}

class TlkTableparcel extends React.Component {
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
        console.log("createAppState" , this.props.modulename)
        let groupfield = [];
        let sumfields = {}

        if (!this.state ||  this.state.modulename !== this.props.modulename) {
            dataState = Defaultstate
            dataState.group = this.props.groupfield ||[];
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
            sumfields,
            per_col_width: this.getColWidth(dataState),
            modulename:this.props.modulename
        };
    }


    getColWidth=(dataState)=>{
        let totalCol      = this.props.columnlist.length+1;
        let totalwidth    = $(".table-responsive").width();
        let totalGrouping = dataState.group && dataState.group.length > 0 ? dataState.group.length:0;
        let groupingWidth=totalGrouping*32;
        let per_Col_width = (totalwidth -140-( groupingWidth))/(totalCol-1);
        return per_Col_width;
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
    cellRender = (tdElement, cellProps) => {
        if (cellProps.rowType === 'groupFooter') {
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
                } else if (cellProps.field == "Legislável") {
                    return (<td > {cellProps.dataItem["Legislável"] == true ? "Sim" : "Não"} </td>);
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

    dataRecieved = (listdata) => {
        if (Array.isArray(listdata)) {
            this.setState({
                result: [],
            });
            list = listdata;
            let dataState = { ...this.state.dataState };
            let per_col_width = this.getColWidth(dataState)
            listdata = this.makedata(listdata, dataState);
            dataState.total = window.localStorage.getItem('table_total');
            this.setState({
                dataState,
                result: process(listdata.slice(0), dataState),
                completelist: listdata,
                per_col_width
            });
        }
    }

    render() {
        const grid = (
            <Grid
                style={{ minHeight: '520px' }}
                sortable={true}
                pageable={{ pageSizes: true }}
                groupable={{ footer: 'visible' }}
                resizable={true}
                reorderable={true}
                data={this.state.result}
                {...this.state.dataState}
                onDataStateChange={this.dataStateChange}
                onExpandChange={this.expandChange}
                expandField="expanded"
                cellRender={this.cellRender}
            >
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

                {
                    this.props.columnlist.map((_row, index) => (

                        _row.field && this.props.columnwidth ?
                            <Column
                                width={_row.field==="Classe"?140:this.state.per_col_width}
                                field={_row.field}
                                columnMenu={_row.columnMenuType ? ColumnMenuCheckboxFilter : ColumnMenu} />
                            :
                            <Column
                                field={_row.field} columnMenu={_row.columnMenuType ? ColumnMenuCheckboxFilter : ColumnMenu} />
                    ))
                }
                {
                    !this.props.notAction &&
                    <Column field={Lang.langCheck.langRequest("Action")} cell={this.TabelAction} 
                    width={this.state.per_col_width}
                    />

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
export default TlkTableparcel;