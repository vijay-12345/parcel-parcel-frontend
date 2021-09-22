import React from 'react';
import { Link } from 'react-router-dom';
import ParcelDeleteModal from './parcel_delete_modal';
import Lang from '../../lang'


class FormNavbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            deletePopUp : ""
        }
    }

    openDeletePopUP = () => {
        let deletePopUp = <ParcelDeleteModal handleDelete={(status)=>this.props.handleDelete(status)} />

        this.setState({deletePopUp})
    }

    render(){
        return(
            <div>
            <nav className="navbar navbar-expand-md nav-bar-2 navbar-dark justify-content-end navbar-fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand desktop-view min-w-300" to={this.props.to}>
                    <span className="k-icon k-i-arrow-left"></span>  Cancelar e voltar
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="font-23 top-head">
                        <span className={`sivdp-icon sivdp-${this.props.type} mr-3 text-grey`}></span>
                        {Lang.langCheck.langRequest(this.props.headName)}
                    </div>
                    <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button type="button" onClick={(e)=>this.props.handleSubmit(e,this.props.to)} className="btn mr-2 btn-success btn-sm">Guardar e Sair</button>
                            <button type="button" onClick={(e)=>this.props.handleSubmit(e)} className="btn btn-success btn-sm">Guardar</button>
                            {
                                this.props && this.props.showDelete &&
                                <button type="button" data-toggle="modal" data-target="#popup-delete" onClick={()=>this.openDeletePopUP()} className="btn remoove ml-2 text-danger">Eliminar</button>
                            }
                        </li>
                    </ul>
                    </div>
                </div>
                
            </nav>
            <div className="modal fade" id="popup-delete">
                <div className="modal-dialog modal-dialog-centered">
                    {this.state.deletePopUp}
                </div>
                </div>
                </div>
            
        )
    }
}

export default FormNavbar;