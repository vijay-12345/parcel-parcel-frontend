
import React from 'react';

import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';

import { sampleProducts } from './sample-products.jsx';
import { MyCommandCell } from './myCommandCell.jsx';


let list=[];


class TkTablewithAction extends React.Component {
    editField = "inEdit";
    CommandCell;

    state = {
        data: [ ...sampleProducts ]
    };

    constructor(props) {
        super(props);

        this.CommandCell = MyCommandCell({
            edit: this.enterEdit,
            remove: this.remove,

            add: this.add,
            discard: this.discard,

            update: this.update,
            cancel: this.cancel,

            editField: this.editField
        });
    }
    

    enterEdit = (dataItem) => {
        this.setState({
            data: this.state.data.map(item =>
                item.id === dataItem.id ?
                { ...item, inEdit: true } : item
            )
        });
    }

    remove = (dataItem) => {
        const data = [ ...this.state.data ];
        this.removeItem(data, dataItem);
        this.removeItem(sampleProducts, dataItem);

        this.setState({ data });
    }

    add = (dataItem) => {
        dataItem.inEdit = undefined;
        dataItem.id = this.generateId(sampleProducts);

        sampleProducts.unshift(dataItem);
        this.setState({
            data: [ ...this.state.data ]
        });
    }

    discard = (dataItem) => {
        const data = [ ...this.state.data ];
        this.removeItem(data, dataItem);

        this.setState({ data });
    }

    update = (dataItem) => {
        const data = [ ...this.state.data ];
        const updatedItem = { ...dataItem, inEdit: undefined };

        this.updateItem(data, updatedItem);
        this.updateItem(sampleProducts, updatedItem);

        this.setState({ data });
    }

    cancel = (dataItem) => {
        const originalItem = sampleProducts.find(p => p.id === dataItem.id);
        const data = this.state.data.map(item => item.id === originalItem.id ? originalItem : item);

        this.setState({ data });
    }

    updateItem = (data, item) => {
        let index = data.findIndex(p => p === item || (item.id && p.id === item.id));
        if (index >= 0) {
            data[index] = { ...item };
        }
    }

    itemChange = (event) => {
        const data = this.state.data.map(item =>
            item.id === event.dataItem.id ?
            { ...item, [event.field]: event.value } : item
        );

        this.setState({ data });
    }

    addNew = () => {
        const newDataItem = { inEdit: true, Discontinued: false };

        this.setState({
            data: [ newDataItem, ...this.state.data ]
        });
    }

    cancelCurrentChanges = () => {
        this.setState({ data: [ ...sampleProducts ] });
    }

    render() {
        const { data } = this.state;
        const hasEditedItem = data.some(p => p.inEdit);
        return (
            <Grid
                style={{ height: '420px' }}
                data={data}
                onItemChange={this.itemChange}
                editField={this.editField}
            >
                <GridToolbar>
                    <button
                        title="Add new"
                        className="btn btn-theme mr-2 btn-sm float-right"
                        onClick={this.addNew}
                    >
                        Add new
                    </button>
                    {hasEditedItem && (
                        <button
                            title="Cancel current changes"
                            className="k-button"
                            onClick={this.cancelCurrentChanges}
                        >
                            Cancel current changes
                        </button>
                    )}
                </GridToolbar>
                <Column field="id" title="Id" width="50px" editable={false} />
                <Column field="ProductName" title="Product Name" />
                <Column field="FirstOrderedOn" title="First Ordered" editor="date" format="{0:d}" />
                <Column field="UnitsInStock" title="Units" width="150px" editor="numeric" />
                <Column field="Discontinued" title="Discontinued" editor="boolean" />
                <Column cell={this.CommandCell} width="240px" />
            </Grid>
        );
    }

    generateId = data => data.reduce((acc, current) => Math.max(acc, current.id), 0) + 1;

    removeItem(data, item) {
        let index = data.findIndex(p => p === item || item.id && p.id === item.id);
        if (index >= 0) {
            data.splice(index, 1);
        }
    }

}

export default TkTablewithAction;
