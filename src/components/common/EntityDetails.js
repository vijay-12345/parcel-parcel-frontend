import React from 'react';
import WizardDetailModalForm from './wizard_detail_popup';
import $ from 'jquery'

class EntityDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            detailPopUp:null
        };
    }

    closePopup = () => {
        $(".left-popup").trigger('click');
    }

    showEntityDetailPopUp = () => {
        let row = this.props.entity
        let detailPopUp = (
            <WizardDetailModalForm 
            closePopup={() => this.closePopup()} 
            listData={row} 
            tab={'detail'} 
            onlyDetails={this.props.onlyDetails}
            billobj={this.props.billobj}
            />
        )
        this.setState({
            detailPopUp
        })
    }

    render() {
        return (
            <div>
                <a href="#" className="innerBox active d-flex align-items-center cursor-pointer" data-toggle="modal" data-target='#entity-detail-popup' onClick={() => this.showEntityDetailPopUp()}>
                    <div className="display-content" data-toggle="modal" data-target="#left-popup">
                        <p>Dados de entidade</p>
                        <div className="circle">
                            <i className="fas fa-eye"></i>
                        </div>
                    </div>
                </a>
                <div className="modal left-popup" id="entity-detail-popup">
                    <div className="modal-dialog modal-sm">
                        {
                            this.state.detailPopUp
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default EntityDetails;