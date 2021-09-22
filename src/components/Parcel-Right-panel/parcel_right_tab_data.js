import React from 'react';
import PieChart from '../tlelrik/pieChart';
import SmallPie from '../tlelrik/SmallPie';
import services from '../../services';
import RightTabLI from './rightTabLI';

class ParcelRightTabData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: '',
            paidata: [],
            tabShowData: {},
            entity_list_object: {},
            entityListUL: null
        }
    }

    componentDidUpdate(preProp) {
        if (this.props.date !== preProp.date) {
            this.setstate()
        }

    }

    setstate = () => {
        let tabShowData = this.props.tabShowData;
        if (!tabShowData['parcel']) {
            tabShowData['parcel'] = {}
        }
        if (tabShowData['parcel'] && !tabShowData['parcel'].titdireito)
            tabShowData['parcel'].titdireito = "";
        this.setState({
            tab: this.props.tab,
            paidata: this.props.paidata,
            tabShowData: tabShowData,
        })
        // {
        //     if(this.props && this.props.tabShowData && this.props.tabShowData['parcel'] && Object.keys(this.props.tabShowData['parcel']).length > 0){
        //         console.log("setstate",this.props.tabShowData['parcel'])
        //         let num = ((this.props.tabShowData['parcel'].titdireito).trim())/10
        //         console.log("ENTITYLISTOBJECT",this.state.entity_list_object[num])
        //     }
        // }
    }

    componentDidMount() {
        this.setstate()
    }

    getEntityNumDetail = (tab, data, entnum = null) => {
        let nif = null

        if (entnum) {
            nif = entnum
            nif = parseInt(('' + nif).trim()) / 10
        }
        return (
            <ul className="list-unstyled mt-4">
                {
                    data && data.length > 0 ? data.map(_r => (
                        <RightTabLI
                            tab={tab}
                            row={_r}
                            nif={((''+_r.entnum).trim())/10}
                            detailClick={(id) => this.props.detailClick(id)}
                            date={new Date()}
                        />
                    ))
                        :
                        <RightTabLI
                            tab={tab}
                            nif={nif}
                            detailClick={(id) => this.props.detailClick(id)}
                            date={new Date()}
                        />
                }
            </ul>
        )
    }

    render() {
        return (
            <div className="tab-content">
                {
                    (this.props.tab === "parcel") &&
                    <div className="tab-pane container active">
                        {
                            Object.keys(this.state.tabShowData).length > 0 &&
                                this.state.tabShowData['parcel'] && (this.state.tabShowData['parcel'].titdireito) ?
                                <div className="searct-found mb-0">
                                    <img className="img-fluid" src="imgs/logo2.png" />
                                    {
                                        this.getEntityNumDetail('parcel', [], this.state.tabShowData['parcel'].titdireito)
                                    }
                                </div>
                                :
                                <div className="searct-found">
                                    <img className="img-fluid" src="imgs/search-large-icon.png" />
                                    <p className="font-14">Sem  titular</p>
                                    <h5>Associe a entidade titular do direito ao registo</h5>
                                    <p className="mt-3">
                                        <a href="#" data-toggle="modal" data-target='#left-popup' onClick={() => this.props.insertClickPopUp()} className="theme-color custom-btn">+ Inserir</a>
                                    </p>
                                </div>
                        }

                    </div>
                }
                {
                    this.props.tab === "parcelProperty" &&
                    <div className="tab-pane container active">
                         <div className="chart text-center">
                            <PieChart date={new Date()} data={this.state.paidata} />
                        </div>
                        {
                            this.state.tabShowData['parcelProperty'] && this.state.tabShowData['parcelProperty'].length>0 &&
                            this.getEntityNumDetail('parcelProperty', this.state.tabShowData['parcelProperty'])
                        }
                        <p className="mt-3">
                        <a href="#" data-toggle="modal" data-target='#left-popup' onClick={() => this.props.insertClickPopUp()} className="theme-color">+ Inserir</a>
                        </p>
                        
                    </div>
                }
                {
                    (this.props.tab === "parcelExplorer") &&
                    <div className="tab-pane container active">
                        {
                            this.state.tabShowData['parcelExplorer'] && this.state.tabShowData['parcelExplorer'].length>0 ?
                                <>
                                    <PieChart date={new Date()} data={this.state.paidata} />
                                    {
                                        this.getEntityNumDetail('parcelExplorer', this.state.tabShowData['parcelExplorer'])
                                    }
                                </>
                                :
                                <div className="searct-found">
                                    <img className="img-fluid" src="imgs/search-large-icon.png" />
                                    <p className="font-14">Sem exploradores</p>
                                    <h5>Associe pelo menos um explorador ao registo</h5>
                                </div>
                        }
                        <p style={{ marginLeft: "85px" }}>
                            <a href="#" data-toggle="modal" data-target='#left-popup' onClick={() => this.props.insertClickPopUp()} className="theme-color custom-btn">+ Inserir</a>
                        </p>
                    </div>
                }
            </div>
        )
    }
}

export default ParcelRightTabData;