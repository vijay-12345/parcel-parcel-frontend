import React from 'react';


class WizardDetailModalForm extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         data: {},


      }
   }

   componentDidMount() {
      this.setState({
         data: this.props.listData
      })
   }

   componentDidUpdate(prevProps) {
      if (prevProps.tab !== this.props.tab || prevProps.listData !== this.props.listData) {
         this.setState({
            data: this.props.listData
         })
      }
   }


   render() {
      if (this.props.tab === 'detail') {
         return (
            <div className="modal-content">
               <div className="modal-header info-wirad d-flex justify-content-between flex-wrap">
                  <h4 className="modal-title pl-0">Dados de entidade</h4>
                  <div>
                     {
                        !this.props.onlyDetails &&
                        <a href="#" className="secondty-btn text-capitalize mr-2">Ficha da entidade</a>
                     }
                     <a href="#" onClick={() => this.props.closePopup()} className="remoove mr-2">Cancelar</a>
                  </div>
               </div>
               <div className="modal-body">
                  <div className="details">
                     <div className="row">
                        <div className="col-md-12">
                           {
                              !this.props.onlyDetails &&
                              <ul className="list-unstyled list-inline info-small">
                                 <li className="list-inline-item">Entidade com login</li>
                                 <li className="list-inline-item">Aprovado</li>
                              </ul>
                           }

                           {/* <img src="imgs/logo2.png" className="img-fluid mt-3 mb-3"/> */}
                        </div>
                     </div>
                     <div className="row mt-3">
                        <div className="col-md-6">
                           <p>Numero</p>
                           <h3>{this.props.listData.nifap}</h3>
                        </div>
                        <div className="col-md-6">
                           <p>NIF</p>
                           <h3>{this.props.listData.nif}</h3>
                        </div>
                        <div className="col-md-12">
                           <p>Nome</p>
                           <h3>{this.props.listData.nome}</h3>
                        </div>
                        {
                           this.props.billobj ?
                           <div className="col-md-12">
                              <p><strong>Morada: </strong>{this.props.billobj.address_line1 || ""} </p>
                              <p><strong>Localidade: </strong>{this.props.billobj.address_line2 || ""}</p>
                              <p><strong>Código Postal: </strong> {this.props.billobj.pin || ""}</p>
                              <p><strong>Distrito: </strong> {this.props.billobj.desdis || ""}, <strong>Concelho: </strong> {this.props.billobj.descon || ""}, <strong>Freguesia: </strong> {this.props.billobj.desfrg || ""} </p>
                           </div>
                               
                              :
                              <>
                                 <div className="col-md-12">
                                    <p>Morada</p>
                                    <h3>{this.props.listData.morada}</h3>
                                 </div>
                                 <div className="col-md-6">
                                    <p>Telemovel</p>
                                    <h3>{this.props.listData.telemovel}</h3>
                                 </div>
                                 <div className="col-md-6">
                                    <p>Telefone</p>
                                    <h3>{this.props.listData.telephone}</h3>
                                 </div>
                                 <div className="col-md-12">
                                    <p>Email institucional</p>
                                    <h3>{this.props.listData.email}</h3>
                                 </div>
                              </>
                        }

                     </div>
                  </div>
               </div>
            </div>
         )
      }
   }
}

export default WizardDetailModalForm;