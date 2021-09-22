import React from 'react';

import ReactDOM from 'react-dom';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import $ from 'jquery';
import '@progress/kendo-theme-default/dist/all.css';

import { Button } from '@progress/kendo-react-buttons'

import { CommandCell } from './CommandCell.jsx';

import { process } from '@progress/kendo-data-query';

//import { Mainfilter } from './Mainfilter.jsx';
import {
    Grid, GridColumn as Column,
    GridColumnMenuFilter, GridToolbar,
    GridColumnMenuCheckboxFilter, GridDetailRow
} from '@progress/kendo-react-grid';

import { GridPDFExport } from '@progress/kendo-react-pdf';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import Lang from '../../lang'
import services from '../../services.js';
import { IntlProvider, load, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';

import esMessages from '../../lang/tlklang.json';

import likelySubtags from 'cldr-core/supplemental/likelySubtags.json';
// import currencyData from 'cldr-core/supplemental/currencyData.json';
import weekData from 'cldr-core/supplemental/weekData.json';

import numbers from 'cldr-numbers-full/main/es/numbers.json';
import currencies from 'cldr-numbers-full/main/es/currencies.json';
import caGregorian from 'cldr-dates-full/main/es/ca-gregorian.json';
import dateFields from 'cldr-dates-full/main/es/dateFields.json';
import timeZoneNames from 'cldr-dates-full/main/es/timeZoneNames.json';
import CountUp from 'react-countup';
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

var deleted = 0;

const startguoupsum = () => {
    if (deleted == 0) {
        var cross = $(".k-i-group-delete").first()
        $(cross).trigger('click');
        deleted = 1;
    }
}

const startguoup = {
    onedelete: () => {
        startguoupsum();
    }
}

let list = [];

let columnlist = []

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
        console.log("list", list)
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
    exporting: false
}

const customData = [
    { color: 'green' },
    { color: 'red' }
];

class DetailComponent extends GridDetailRow {
    render() {
        const dataItem = this.props.dataItem;
        console.log("jkdnxkjzn", columnlist)
        return (
            <div className="row">
                {
                    columnlist.map((_row,i) => (
                        <div className="tab-section col-md-3" key={i}>
                            <div className="innerBox">
                                <div className="display-content">
                                    <p><strong>{_row.field}({i+1})</strong></p>
                                    <CountUp start={0} end={dataItem[_row.field]} duration={6} />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }
}

class Main extends React.Component {
    gridPDFExport;
    _export;
    export = () => {
        this._export.save(list);
    }

    constructor(props) {
        super(props);
        this.state = this.createDataState(Defaultstate);
        this.CommandCell = CommandCell({
            rowbuttonAction: this.rowbuttonAction,
            actionbuttons: this.props.actionbuttons,
            deleteFunc: this.props && this.props.deleteFunc && this.props.deleteFunc
        });
    }

    componentDidUpdate(preProp) {

        let groupfield = [];
        let sumfields = {};
        if (this.props.date !== preProp.date) {
            deleted = 0;
            list = this.props.list;
            columnlist = this.props.columnlist
            let dataState = { ...this.state.dataState }
            dataState.group = this.props.groupfield;
            let aggregates = this.props.aggregates;
            if (aggregates) {
                const groups = dataState.group;
                if (groups) { groups.map(group => group.aggregates = aggregates); }
                aggregates.map((row, index) => (
                    sumfields[row.field] = row
                ))
            }
            this.setState({
                data: process(this.props.list.slice(0), dataState),
                dataState: dataState,
                groupfield,
                sumfields,
            });

        }
        startguoup.onedelete()

    }

    rowbuttonAction = (action, dataItem) => {
        this.props.ActionPerform(action, dataItem);
    }

    componentDidMount() {
        let dataState = { ...this.state.dataState }
        dataState.group = this.props.groupfield;
        list = this.props.list;
        columnlist = this.props.columnlist
        this.setState({
            dataState
        });

    }

    createDataState = (dataState) => {
        let groupfield = [];
        let sumfields = {}

        if (this.props.groupfield) {
            groupfield = this.props.groupfield;
        }

        let aggregates = this.props.aggregates;
        if (aggregates) {
            const groups = dataState.group;
            if (groups) { groups.map(group => group.aggregates = aggregates); }
            aggregates.map((row, index) => (
                sumfields[row.field] = row
            ))
        } else {
            // let aggregateKey=this.props.columnlist
            // let listFields = this.props.list[0]
            // Object.keys(this.props.columnlist).map(function(key) {
            //     if(typeof listFields[`${aggregateKey[key].field}`] === 'number'){
            //         aggregates.push({field:aggregateKey[key].field,aggregate: 'sum'})
            //     }
            // });
            // console.log("aggregate",aggregates)
        }
        list = this.props.list;

        return {
            data: process(this.props.list.slice(0), dataState),
            dataState: dataState,
            groupfield,
            sumfields,
        };
    }

    dataStateChange = (event) => {
        this.setState(this.createDataState(event.data));
    }

    expandChange = (event) => {

        if (this.props.collepsview) {
            event.dataItem.expanded = !event.dataItem.expanded;
            this.forceUpdate();
        } else {
            event.dataItem[event.target.props.expandField] = event.value;
            this.setState({
                data: Object.assign({}, this.state.data),
                dataState: this.state.dataState
            });
        }
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
                if (cellProps.field == "Número")
                    return (
                        <td className="GridsumField">
                            Total {cellProps.dataItem.field} :
                        </td>
                    );
            }
        }
        // else if(cellProps.rowType === 'groupHeader' && tdElement && cellProps.dataItem && tdElement.props.children){
        //     return (
        //         <td colSpan={tdElement.props.colSpan}>
        //           {cellProps.dataItem.field}
        //         </td>
        //     );
        // }
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
                else if (cellProps.field == "Atividade") {
                    return (<td > {cellProps.dataItem["Atividade"] == 'Create' ? "Novo" : cellProps.dataItem["Atividade"] == 'Update' ? 'Atualização' : cellProps.dataItem["Atividade"]} </td>);
                }
        }
        return tdElement;
    }


    // dataRecieved = (list) => {

    //     this.setState({
    //         ...this.state,
    //       data: list
    //     });
    // }

    render() {
        const grid = (
            <div>
                <Grid
                    id="datagrid"
                    data={this.state.data}
                    {...this.state.dataState}
                    onDataStateChange={this.dataStateChange}
                    style={{ height: '520px' }}
                    resizable={true}
                    reorderable={true}
                    //filterable={true}
                    sortable={true}
                    pageable={true}
                    pageSize={100}
                    groupable={true}
                    groupable={{ footer: 'visible' }}
                    detail={this.props.collepsview ? DetailComponent : null}
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
                            _row.filter ?
                                <Column field={_row.field} filter={_row.filter} columnMenu={_row.columnMenuType ? ColumnMenuCheckboxFilter : ColumnMenu} />
                                :
                                <Column field={_row.field} columnMenu={_row.columnMenuType ? ColumnMenuCheckboxFilter : ColumnMenu} />
                        ))
                    }
                    {
                        !this.props.notAction &&
                        <Column width={100} field={Lang.langCheck.langRequest("Action")} cell={this.CommandCell} />

                    }
                </Grid>
                {/* <Mainfilter
                    dataState={this.state.dataState}
                    onDataRecieved={this.dataRecieved}
                /> */}
            </div>

        )
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
            </LocalizationProvider>

        );
    }

    pageChange = (event) => {
        this.setState(this.createState(event.page.skip, event.page.take));
    }

    createState(skip, take) {
        return {
            data: list.slice(skip, skip + take),
            skip: skip
        };
    }

    exportPDF = () => {
        // Simulate a response from a web request.
        setTimeout(
            () => { this.gridPDFExport.save(list, this.pdfExportDone); },
            250
        );

        this.setState({ exporting: true });
    }

    pdfExportDone = () => {
        this.setState({ exporting: false });
    }

}

export default Main;
