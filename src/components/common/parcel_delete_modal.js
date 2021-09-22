import React from 'react';
import $ from 'jquery'



class ParcelDeleteModal extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isDelete : false
        }
    }

    closeDeletePopup=()=>{
        console.log("jfvghvhghjb");
        $(".fade").trigger('click');
    }

    handleCheck = () => {
        this.setState({
            isDelete : this.state.isDelete ? false : true
        })
    }

    render(){
        return (
            <div className="modal-content">
                <div className="modal-body">
                    <div className="details">
                    <div className="row">
                        <div className="col-12 text-center">
                            <img src="imgs/delete-img.png" className="img-fluid"/>
                        </div>
                        <div className="col-12 mt-2">
                            <h5 className="font-500">Atencao</h5>
                            <p className="font-14">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</p>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" checked={this.state.isDelete} onChange={()=>this.handleCheck()} className="custom-control-input" id="customCheck" name="example1"/>
                                <label className="custom-control-label" for="customCheck">Libertar direitos ao eliminar?</label>
                            </div>
                        </div>
                        <div className="col-12 mt-4 text-right">
                            <div>
                                <a href="#" onClick={()=>this.closeDeletePopup()} className="remoove mr-2">Anular</a>
                                {
                                    this.state.isDelete ?
                                    <button onClick={()=>this.props.handleDelete(true)} className="btn btn-theme mr-2 btn-sm">Eliminar</button>
                                    :
                                    <button disabled className="btn btn-theme mr-2 btn-sm">Eliminar</button>
                                }
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default ParcelDeleteModal;