import React from 'react';
import Lang from '../../lang'

class RowDeatils extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: {}
        }
    }
    componentDidMount(){
        this.setState({
            record: this.props.record
        })
    }

    componentDidUpdate(preProp){
        if(preProp.date!==this.props.date){
            this.setState({
                record: this.props.record
            })
        }

    }
    makesubul = (str, key) => {
        if (str===null || !str){
            return (<></>);
        }
            
        let row = JSON.parse(str);
        if(!row || (row && !row.parcel)){
            return (<></>);
        }
        row = row.parcel;
        let ul = (
            <>
            <div className="col-md-4 detailsheading">
                {Lang.langCheck.langRequest(key)}
            </div>
            <div className="col-md-8">
               
                    {
                        Object.keys(row).map((_k, i) => (
                          
                                <div className="row detailsrow">
                                    <div className="col-md-6 detailsheading">{Lang.langCheck.langRequest(_k)}</div>
                                    <div className="col-md-6 detailsinfo">{row[_k]}</div>
                                </div>
                           
                        ))
                    }
               
            </div>
            </>
        );
        return ul;
    }

    render() {
        console.log(this.state.record);
        return (
            <div className="modal-dialog">
                <div className="modal-content" >
                    <div className="modal-header">
                        <span className="modal-title">
                            Detalhe
                        </span>
                    </div>
                    <div className="modal-body">
                            <div className="row detailsrow">
                                <div className="col-md-6">{Lang.langCheck.langRequest("Field")}</div>
                                <div className="col-md-6"> {Lang.langCheck.langRequest("Observation")}</div>
                            </div>
                            
                            {   
                          
                            this.state.record &&
                                Object.keys(this.state.record).map((key, i) => (
                                    
                                        <>
                                        {
                                            key === "oldRecord" || key === "newRecord" || key === "último registro"?
                                                <div className="row">
                                                    {this.makesubul(this.state.record[key], key)}
                                                </div>
                                                :
                                                <div className="row detailsrow">
                                                    <div className="col-md-6 detailsheading">{Lang.langCheck.langRequest(key)}</div>
                                                    <div className="col-md-6 detailsinfo"> {this.state.record[key]}</div>
                                                </div>
                                        }
                                        </>
                                  
                                ))
                            }
                       
                    </div>
                </div>
            </div>
        )
    }
}

export default RowDeatils;