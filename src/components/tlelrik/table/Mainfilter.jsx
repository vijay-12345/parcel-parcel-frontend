import React from 'react';
import ReactDOM from 'react-dom';
import { toODataString } from '@progress/kendo-data-query';

export class Mainfilter extends React.Component {
   
    lastSuccess = '';
    pending = '';
    requestDataIfNeeded =() => {
        if (this.pending || toODataString(this.props.dataState) === this.lastSuccess) {
            return;
        }
        this.pending = toODataString(this.props.dataState);
        let json = this.props.sendDatatoTlkTable(this.props.dataState);
        if(json){
            this.lastSuccess = this.pending;
            this.pending = '';
            if (toODataString(this.props.dataState) === this.lastSuccess) {
                Promise.all([json]).then((values) => {
                    this.props.onDataRecieved(values[0]);
                });
            } else {
                this.requestDataIfNeeded();
            }
        }
    }

    render() {
        this.requestDataIfNeeded();
        return this.pending && <LoadingPanel />;
    }
}




class LoadingPanel extends React.Component {
    render() {
        const loadingPanel = (
            <div className="k-loading-mask">
                <span className="k-loading-text">Loading</span>
                <div className="k-loading-image"></div>
                <div className="k-loading-color"></div>
            </div>
        );

        const gridContent = document && document.querySelector('.k-grid-content');
        return gridContent ? ReactDOM.createPortal(loadingPanel, gridContent) : loadingPanel;
    }
}
