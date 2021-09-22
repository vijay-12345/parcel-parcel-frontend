import React from 'react';
import WizardModalForm from '../common/wizard_titular_modal.js';
import services from '../../services.js';
import WizardDetailModalForm from '../common/wizard_detail_popup'
import ParcelRightTabData from "./parcel_right_tab_data"
import ParcelRightPanelCard from '../modules/parcel_right_card.js';

class ParcelRightPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: "parcel",
            popUpForm: '',
            tabFormData: {},
            detailPopUp: '',
            entity_list: [],
            entity_list_object: {},
            tabShowData: {},
            paidata: [],
            ParcelRightTabDatadiv: null,
            optionsEntityList: ''
        }
    }

    componentDidMount() {
        // this.getEntityList();
        this.setState({
            tabFormData: this.props.Parcel
        }, () => this.setTabDetail(this.state.tab))
    }
    componentDidUpdate(prevProp) {
        if (prevProp.date !== this.props.date) {
            this.setState({
                tabFormData: this.props.Parcel
            }, () => this.setTabDetail(this.state.tab))
        }
    }

    updateTabOnly = (tab) => {
        this.setState({
            tab
        }, () => this.setTabDetail(tab))
    }

    setTabDetail = (tab) => {
        let tabFormData = { ...this.state.tabFormData }
        let tabShowData = { ...this.state.tabShowData }
        tabShowData[tab] = tabFormData[tab]
        this.setpaidata(tabShowData[tab]);
        this.setState({
            tabShowData
        })
    }

    insertClickPopUp = () => {
        this.setState({
            popUpForm: ""
        })
       
        let popUpForm = (
            <WizardModalForm
                tab={this.state.tab}
                all_list={this.props.all_list}
                closePopup={() => this.props.closePopup()}
                // entity_list_object={this.state.entity_list_object}
                parcelData={this.state.tabFormData[this.state.tab]}
                // entityList={this.state.entity_list}
                getPopUpFormState={(data, tab) => this.getPopUpFormState(data, tab)}
            // getEntityList={(filter) => this.getEntityList(filter)}
            />
        )
        this.setState({
            popUpForm
        })
    }

    detailClick = (row) => {
        let detailPopUp = (
            <WizardDetailModalForm closePopup={() => this.props.closePopup()} listData={row} tab={'detail'} />
        )
        this.setState({
            detailPopUp
        })
    }


    setpaidata = (data) => {
        let paidata = [];

        if (data && data[0]) {
            try {
                data.map((_r, i) => (
                    _r.quota &&
                    paidata.push({ value: eval(_r.quota) })
                ))
            } catch (e) { }

        }
        this.setState({
            paidata
        }, () => this.ParcelRightTabData())
    }


    ParcelRightTabData = () => {

        let ParcelRightTabDatadiv = (
            <ParcelRightTabData
                date={new Date()}
                tab={this.state.tab}
                tabShowData={this.state.tabShowData}
                // entity_list_object={this.state.entity_list_object}
                paidata={this.state.paidata}
                detailClick={(id) => this.detailClick(id)}
                insertClickPopUp={() => this.insertClickPopUp()}
            />
        )
        this.setState({
            ParcelRightTabDatadiv
        })
    }



    getPopUpFormState = (data, tab) => {

        let tabFormData = { ...this.state.tabFormData }
        if (tab == 'parcel')
            tabFormData[tab]['titdireito'] = data.entnum * 10
        else
            tabFormData[tab] = data;
        console.log("..returnData", tab, tabFormData)
        this.setState({
            tabFormData
        }, () => {
            this.props.handleSubmit(this.state.tabFormData)
            this.setTabDetail(tab)
        })
    }

    render() {
        return (
            <div className="last-box">
                <ParcelRightPanelCard cardData={this.props.Parcel} />
                <div className="bg-white">
                    <div className="right-tab">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a onClick={() => this.updateTabOnly('parcel')} className="nav-link active" data-toggle="tab" href="#Titular">TITULAR</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => this.updateTabOnly('parcelProperty')} data-toggle="tab" href="#PROPRIETARIOS">PROPRIETARIOS</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => this.updateTabOnly('parcelExplorer')} data-toggle="tab" href="#Exploradores">EXPLORADORES</a>
                            </li>
                        </ul>
                        {
                            this.state.ParcelRightTabDatadiv
                        }
                    </div>
                    <div className="modal left-popup" id="left-popup">
                        <div className="modal-dialog modal-sm">
                            {
                                this.state.popUpForm
                            }
                        </div>
                    </div>
                    <div className="modal left-popup" id="left-detail-popup">
                        <div className="modal-dialog modal-sm">
                            {
                                this.state.detailPopUp
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default ParcelRightPanel;