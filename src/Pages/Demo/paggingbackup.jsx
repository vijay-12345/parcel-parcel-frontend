
import React from 'react';

import ReactDOM from 'react-dom';
import { DropDownList } from '@progress/kendo-react-dropdowns';

import '@progress/kendo-theme-default/dist/all.css';

import { CommandCell } from './CommandCell.jsx';

import { process } from '@progress/kendo-data-query';

import {
    Grid, GridColumn as Column,
    GridColumnMenuFilter,GridToolbar,
    GridColumnMenuCheckboxFilter
} from '@progress/kendo-react-grid';

import { GridPDFExport } from '@progress/kendo-react-pdf';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import Lang from '../../lang'
import services from '../../services.js';
import { IntlProvider, load, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';

import esMessages from '../../lang/tlklang.json';

// import likelySubtags from 'cldr-core/supplemental/likelySubtags.json';
// import currencyData from 'cldr-core/supplemental/currencyData.json';
// import weekData from 'cldr-core/supplemental/weekData.json';

// import numbers from 'cldr-numbers-full/main/es/numbers.json';
// import currencies from 'cldr-numbers-full/main/es/currencies.json';
// import caGregorian from 'cldr-dates-full/main/es/ca-gregorian.json';
// import dateFields from 'cldr-dates-full/main/es/dateFields.json';
// import timeZoneNames from 'cldr-dates-full/main/es/timeZoneNames.json';

// load(
//     likelySubtags,
//     currencyData,
//     weekData,
//     numbers,
//     currencies,
//     caGregorian,
//     dateFields,
//     timeZoneNames
// );

loadMessages(esMessages, 'es-ES');


let list=[];

export class ColumnMenu extends React.Component {
    render() {
        return (
            <div>
                <GridColumnMenuFilter {...this.props} expanded={true}/>
            </div>
        );
    }
}

export class ColumnMenuCheckboxFilter extends React.Component {
    render() {
        console.log("list",list)
        return (
            <div>
                <GridColumnMenuCheckboxFilter {...this.props} data={list} expanded={true}/>
            </div>
        );
    }
}

const Defaultstate={
    take: 2,
    skip: 0,
    group:[ ],
    exporting: false
}


const customData = [
    { color: 'green' },
    { color: 'red' }
];


class Main extends React.Component {
    gridPDFExport;
    _export;
    export = () => {
        this._export.save();
    }

    constructor(props){
        super(props);
        this.state = this.createDataState(Defaultstate);
        // this.pageChange = this.pageChange(this);
        // this.updatePagerState = this.updatePagerState(this);
        this.CommandCell = CommandCell({
            rowbuttonAction: this.rowbuttonAction,
            actionbuttons:this.props.actionbuttons,
            deleteFunc: this.props && this.props.deleteFunc && this.props.deleteFunc
        });
    }

    pageChange = (event) =>{
        let dataState = {...this.state.dataState}
        dataState.skip=event.page.skip;
        dataState.take=event.page.take;
        console.log("pageChange",dataState )
        this.setState(this.createDataState(dataState));
    }

    updatePagerState= (key, value) =>{
        console.log("updatePagerState",key, value )
        const newPageableState = Object.assign({}, this.state.pageable, { [key]: value });
        this.setState(Object.assign({}, this.state, { pageable: newPageableState }));
    }

    createDataState = (dataState) => {
        let groupfield=[];
        let sumfields={}
        let aggregates=[]
        if(this.props.groupfield ){
            groupfield=this.props.groupfield;
        }

        let aggregateKey=this.props.columnlist
        let listFields = this.props.list[0]
        Object.keys(this.props.columnlist).map(function(key) {
            if(typeof listFields[`${aggregateKey[key].field}`] === 'number'){
                aggregates.push({field:aggregateKey[key].field,aggregate: 'sum'})
            }
        });
        const groups = dataState.group;
        if (groups) { groups.map(group => group.aggregates = aggregates); }
    
        aggregates.map((row,index)=>(
            sumfields[row.field]=row
        ))
       let completeData = this.createState(dataState) ;
       completeData.dataState= dataState;
     //  completeData.result.data=this.props.list.slice(dataState.skip, dataState.skip + dataState.take) ;
       completeData.groupfield= groupfield;
       completeData.sumfields= sumfields;
       console.log("dfvrrggrb",completeData);
       return completeData;
        // return {
        //     result: process(this.props.list.slice(0), dataState),
        //     dataState: dataState,
        //     groupfield,
        //     sumfields,
        // };
    }
    createState =(dataState) =>{
        let complete= {
            result: process(this.props.list.slice(dataState.skip, dataState.skip + dataState.take),dataState),
            total: this.props.list.length,
            skip: dataState.skip,
            pageSize: dataState.take,
            pageable: this.state ? this.state.pageable : {
                buttonCount: 5,
                info: true,
                type: 'numeric',
                pageSizes: true,
                previousNext: true
            }
        };
        return complete
    }

    componentDidUpdate(preProp){
        if(this.props.list !== preProp.list){
            console.log("componentDidUpdate",this.state.dataState); 
            let dataState = {...this.state.dataState}
            this.setState(this.createDataState(dataState));
        }
        services.startguoup.onedelete()
    }
     
    rowbuttonAction=(action,dataItem)=>{
        this.props.ActionPerform(action,dataItem);
    }

    componentDidMount(){
        let dataState ={...this.state.dataState}
        dataState.group = this.state.groupfield;
        this.setState(this.createDataState(dataState));
    }

    dataStateChange = (event) => {
        console.log("dataStateChange");
        this.setState(this.createDataState(event.data));
    }

    expandChange = (event) => {
        console.log("expandChange");
        event.dataItem[event.target.props.expandField] = event.value;
        this.setState({
            result: Object.assign({}, this.state.result),
            dataState: this.state.dataState
        });
    }

    cellRender=(tdElement, cellProps)=> {
     
        let row = this.state.sumfields[cellProps.field]
        if (cellProps.rowType === 'groupFooter' ) {
            if (row) {
                return (
                    <td>
                        Sum: {cellProps.dataItem.aggregates[cellProps.field].sum}
                    </td>
                );
            }
        }else if( cellProps.field=="Status"){
            if(cellProps.dataItem.status == 1 || cellProps.dataItem.status == "1"|| cellProps.dataItem.status == "Active" || cellProps.dataItem.status == "active" ){
                return (
                    <td className="text-active">
                       Active
                    </td>
                );
            }else{
                return (
                    <td className="text-inactive">
                        Inactive
                    </td>
                );
            }
        }
        return tdElement;
    }
   
    render() {
        const grid = (
            <LocalizationProvider language="es-ES">
                <IntlProvider locale="es" >
            <Grid
                id="datagrid"
                data={this.state.result}
                {...this.state.dataState}
                onDataStateChange={this.dataStateChange}
                style={{ height: '520px' }}
                resizable={true}
                reorderable={true}
                //filterable={true}
                sortable={true}
                groupable={true}
                groupable={{ footer: 'visible' }}
                onExpandChange={this.expandChange}
                expandField="expanded"
                cellRender={this.cellRender}
                onPageChange={this.pageChange}
                total={this.state.total}
                skip={this.state.skip}
                pageable={this.state.pageable}
                pageSize={this.state.pageSize}
            >
                <GridToolbar>
                     <button
                        title="Export PDF"
                        className="btn btn-theme mr-2 btn-sm float-right"
                        onClick={this.exportPDF}
                        disabled={this.state.exporting}
                    >
                        Exportar PDF
                    </button>
                     <button
                            title="Export Excel"
                            className="btn btn-theme mr-2 btn-sm float-right"
                            onClick={this.export}
                        >
                        Exportar para Excel
                    </button>
                   
                </GridToolbar>

                {
                    this.props.columnlist.map((_row,index)=>(
                        _row.filter?
                            <Column field={_row.field} filter={_row.filter} columnMenu={_row.columnMenuType?ColumnMenuCheckboxFilter:ColumnMenu} />
                        :
                        <Column field={_row.field} columnMenu={_row.columnMenuType?ColumnMenuCheckboxFilter:ColumnMenu} />
                    ))
                }
               {
                   !this.props.notAction &&
                   <Column field={Lang.langCheck.langRequest("Action")} cell={this.CommandCell} width="240px"/>
                  
               }
            </Grid>
            </IntlProvider>
            </LocalizationProvider>
        )
        return (
            <div>
                    
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
            </div>
        );
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
