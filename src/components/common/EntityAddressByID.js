
import React, { Component } from 'react';
var moment = require('moment')
const dateFormat = "YYYY-MM-DD";


class EntityAddressByID extends Component {

    constructor(props) {
        super(props);
        this.state = {
            billobj: null
        }
    }

    componentDidMount() {
        this.setAddressObject();
    }
    componentDidUpdate(preProp) {
        if (preProp.date !== this.props.date) {
            this.setAddressObject();
        }
    }

    setAddressObject = () => {
        let billingAddress = [...this.props.address_list]
        let billobj = null;
        let Addressid = this.props.address_id;
        billingAddress.map((_r, i) => {
            if (Addressid) {
                if (parseInt(_r.id) === parseInt(Addressid)) {
                    billobj = _r;
                }
            } else if (parseInt(_r.suggested) === 1)
                billobj = _r;
        });
        if(!billobj){
            billobj = billingAddress[0] ?billingAddress[0]:{};
        }
        this.setState({
            billobj
        })
    }

    render() {
        return (
            <>
                {
                    this.state.billobj &&
                    <>
                        <p><strong>Morada: </strong>{this.state.billobj.address_line1 || ""} </p>
                        <p><strong>Localidade: </strong>{this.state.billobj.address_line2 || ""}</p>
                        <p><strong>Código Postal: </strong> {this.state.billobj.pin || ""}</p>
                        <p>
                            <strong>Distrito: </strong> {this.state.billobj.desdis || ""},
                            <strong>Concelho: </strong> {this.state.billobj.descon || ""},
                            <strong>Freguesia: </strong> {this.state.billobj.desfrg || ""}
                        </p>

                    </>

                }
            </>
        )
    }
}
export default EntityAddressByID;