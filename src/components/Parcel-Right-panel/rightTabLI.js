import React from 'react';
import services from '../../services';
import SmallPie from '../tlelrik/SmallPie';



class RightTabLI extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            entity_row: {}
        }
    }

    componentDidMount() {
        this.getEntityList()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.date !== this.props.date && prevProps.tab !== this.props.tab) {
            this.getEntityList()
        }
    }


    getEntityList = async () => {
        this.setState({
            entity_row: {}
        })
        let res = await services.EntityList.getEntityList('parcel', null, this.props.nif + '')
        this.setState({
            entity_row: res.entity_row
        })
    }

    render() {
        if (this.props.tab === 'parcel') {
            return (
                Object.keys(this.state.entity_row).length > 0 &&
                <li className="align-items-center border-0">
                    <span>
                        <p className="m-0 text-left parcelholdername">{this.state.entity_row && this.state.entity_row[this.props.nif] && this.state.entity_row[this.props.nif].nome}</p>
                        <p className="small m-0 text-left parcelholdernumber">{this.state.entity_row && this.state.entity_row[this.props.nif] && this.state.entity_row[this.props.nif].nifap}</p>
                    </span>
                    <a href="#" onClick={() => this.props.detailClick(this.state.entity_row && this.state.entity_row[this.props.nif])} data-toggle="modal" data-target='#left-detail-popup'>
                        <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
                    </a>
                </li>
            )
        }else if (this.props.tab === 'parcelProperty') {
            return (
                Object.keys(this.state.entity_row).length > 0 &&
                <li>
                    <SmallPie date={new Date()} data={eval(this.props.row.quota)} />
                    <span>
                        <p className="m-0">{this.state.entity_row && this.state.entity_row[this.props.nif] && this.state.entity_row[this.props.nif].nome}</p>
                        <p className="small">{this.state.entity_row && this.state.entity_row[this.props.nif] && this.state.entity_row[this.props.nif].nifap}</p>
                    </span>
                    <span>
                        <a><i className="fas fa-exclamation-circle ml-1" onClick={() => this.props.detailClick(this.state.entity_row && this.state.entity_row[this.props.row.entnum])} data-toggle="modal" data-target='#left-detail-popup'></i></a>
                    </span>
                </li>
            )
        } else if (this.props.tab === 'parcelExplorer') {
            return (
                Object.keys(this.state.entity_row).length > 0 &&
                <li>
                    <SmallPie date={new Date()} data={eval(this.props.row.quota)} />
                    <span>
                        <p className="m-0">{this.state.entity_row && this.state.entity_row[this.props.nif] && this.state.entity_row[this.props.nif].nome}</p>
                        <p className="small">{this.state.entity_row && this.state.entity_row[this.props.nif] && this.state.entity_row[this.props.nif].nifap}</p>
                    </span>
                    <span>
                        <a><i className="fas fa-exclamation-circle ml-1" onClick={() => this.props.detailClick(this.state.entity_row && this.state.entity_row[this.props.row.entnum])} data-toggle="modal" data-target='#left-detail-popup'></i></a>
                    </span>
                </li>
            )
        }
    }
}

export default RightTabLI;