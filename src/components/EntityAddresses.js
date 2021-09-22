import React from 'react';
import services from '../services';
import EntityAddressByID from './common/EntityAddressByID';
// import RevenueEntityAction from './common/RevenueEntityAction';
// import RevenueReceitas from './Revenue/RevenueReceitas';


class EntityAddresses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            res:null,
            ans:null
        }
    }

    componentDidMount() {
        this.setState({
            ans: null
            });
        this.getEntityDetails(this.props.entity_details.entity_id);
    }


    getEntityDetails = async (entity_id) => {
        let Request = {};
        Request.entityId = parseInt(entity_id);
        let link = "/Revenue/GetEntityDetail";
        let res = await services.apiCall.requestApi(link, Request);
        console.log("hello hi some thing");
        console.log(res);
        if (res) {
            this.setState({
                res: res
                }
            );
        }
    }

    getBillingAddress = () => {
        console.log("BBHBYBHBY",this.props.entity_details)
        let entity = { ...this.state.res }
        if(entity && entity.billingAddress){
            return (
                <EntityAddressByID 
                    date={new Date()}
                    address_list={entity.billingAddress}
                    address_id={this.props.entity_details.allTransaction && this.props.entity_details.allTransaction[0] ? this.props.entity_details.allTransaction[0].billing_id:null}

                />
            )
        }
        return (
        <> 
        </>)
    }


    render() {
        return (
            <div style={{borderBottom:"solid"}}>
                <div className="text-left">  
                    {this.getBillingAddress()}
                </div>
                        
                <div className="text-left" style={{paddingLeft: "500px"}}>
                    <div className="col-md-9">
                        <div className="row-md-11">
                            <p><strong>{this.props.entity_details.Entidade}</strong></p>
                        </div>
                        <div className="row-md-11">
                            <p><strong>{this.props.entity_details.busEntidade.moradaFiscal}</strong></p>
                        </div>
                        <div className="row-md-11">
                            <p><strong>{this.props.entity_details.busEntidade.localFiscal}</strong></p>
                        </div>
                        <div className="row-md-11">
                            <p></p>
                        </div>
                        <div className="row-md-11">
                            <p><strong>Nif:{this.props.entity_details.busEntidade.nifap}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EntityAddresses;