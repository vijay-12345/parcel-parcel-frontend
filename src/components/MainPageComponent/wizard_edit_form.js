import React from 'react';
import WizardModalForm from '../common/wizard_titular_modal';



class WizardEditForm extends React.Component{
    render(){
        return (
            <div className="full-container edit-ward">
              
                <div className="left-section">
                <ul className="list-unstyled">
                    <li className="active"><a href="#">Parcela</a></li>
                    <li><a href="#link2">Factores de pontuação</a></li>
                    <li><a href="#link3">Características do povoamento</a>
                    <ul className="list-unstyled">
                        <li><a href="#">Detalhes do povoamento</a></li>
                        <li><a href="#link4">Castas</a></li>
                    </ul></li>
                    <li><a href="#">Artigo Matricial</a></li>
                    <li><a href="#">Enquadramento legal</a></li>
                    <li><a href="#">Registo de alterações</a></li>
                </ul>
              
                </div>
                <div className="right-section">
                <div className="bg-white middle p20">
                    <div className="head">
                    <h2>Dados gerais</h2>
                    <p className="font-14">{/*"Lorem ipsum dolor sit amet, consetetur sadipscing elitrdiam"*/}</p>
                    </div>
                    <div className="row">
                    <div className="col-md-3">
                        <div className="input-box active-grey">
                        <label className="input-label">Nº parcela IVDP</label>
                        <input type="text" className="input-1" placeholder="12345"/>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="input-box active-grey">
                        <label className="input-label">Geocódigo</label>
                        <input type="text" className="input-1" placeholder="2369825"/>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="input-box active-grey">
                        <label className="input-label">Nº Parcela CD</label>
                        <input type="text" className="input-1" placeholder="1Nº Parcela CD"/>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-12">
                    <div className="form-group">
                        <div className="input-box active-grey">
                        <label className="input-label">Nº Parcela CD</label>
                        <textarea className="form-control heigh-auto" rows="3" placeholder="Nº Designação" ></textarea>
                        </div>
                    </div>
                    </div>
                    
                </div>
                <div className="row">
                    <div className="col-md-12">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck" name="example1"/>
                        <label className="custom-control-label" for="customCheck">PAPV</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" name="example1"/>
                        <label className="custom-control-label" for="customCheck1">Portal</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck2" name="example1"/>
                        <label className="custom-control-label" for="customCheck2">Declaração</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck3" name="example1"/>
                        <label className="custom-control-label" for="customCheck3">Legalizável</label>
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                    <div className="input-box active-grey drop-down-box">
                        <label className="input-label">Distrito </label>
                        <select className="custome-drop-down">
                        <option>Opção</option>
                        </select>
                    </div>
                    </div>
                    <div className="col-md-3">
                    <div className="input-box active-grey drop-down-box">
                        <label className="input-label">Concelho</label>
                        <select className="custome-drop-down">
                        <option>Opção</option>
                        </select>
                    </div>
                    </div>
                    <div className="col-md-3">
                    <div className="input-box active-grey drop-down-box">
                        <label className="input-label">Freguesia </label>
                        <select className="custome-drop-down">
                        <option>Opção</option>
                        </select>
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Classe" />
                    </div>
                    </div>
                    <div className="col-md-3">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Pontuação" />
                    </div>
                    </div>
                    <div className="col-md-3">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Data última vistoria" />
                    </div>
                    </div>
            
                </div>
                <div className="row mt-2">
                    <div className="col-md-6">
                    <div className="input-box active-grey drop-down-box">
                        <label className="input-label">Situação da Parcela</label>
                        <select className="custome-drop-down">
                            <option>Opção</option>
                        </select>
                    </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input-box active-grey drop-down-box">
                        <label className="input-label">Situação Legal</label>
                        <select className="custome-drop-down">
                            <option>Opção</option>
                        </select>
                    </div>
                    </div>
                </div>
            
                <div className="row mb-2">
                    <div className="col-md-12">
                    <img className="img-fluid w-100" src="imgs/plugin1.png" />
                    </div>
                </div>
            
                <div className="row mt-4">
                    <div className="col-md-3">
                    <div className="input-box active-grey">
                        <label className="input-label">Produção estimada</label>
                        <input type="text" className="input-1" placeholder="Produção estimada"/>
                    </div>
                    </div>
                    <div className="col-md-3">
                    <div className="input-box active-grey drop-down-box">
                        <label className="input-label">Situação de litígio</label>
                        <select className="custome-drop-down">
                        <option>Opção</option>
                        </select>
                    </div>
                    </div>
                    <div className="col-md-3">
                    <div className="input-box active-grey">
                        <label className="input-label">Ano de plantação</label>
                        <input type="text" className="input-1" placeholder="Ano de plantação"/>
                    </div>
                    </div>
                    <div className="col-md-3">
                    <div className="input-box active-grey drop-down-box">
                        <label className="input-label">Classe plantação</label>
                        <select className="custome-drop-down">
                        <option>Opção</option>
                        </select>
                    </div>
                    </div>
                </div>
            
                
                </div>
                <div className="bg-white middle p20 mt-140 position-relative">
                <a href="#" data-toggle="modal" data-target='#left-popup-center'  className="add-pic"><img src="imgs/pic-icon.png" /></a>
                    <div className="head">
                    <h2 id="link2">Fatores de pontuação</h2>
                    <p className="font-14">{/*"Lorem ipsum dolor sit amet, consetetur sadipscing elitrdiam"*/}</p>
                    </div>
                    <div className="row">
                    <div className="col-md-3">
                        <div className="input-box active-grey">
                        <label className="input-label">Geocódigo</label>
                        <input type="text" className="input-1" placeholder="238" />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="input-box active-grey">
                        <label className="input-label">Nº Parcela CD</label>
                        <input type="text" className="input-1" placeholder="238" />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="input-box active-grey">
                        <label className="input-label">Nº Parcela CD</label>
                        <input type="text" className="input-1" placeholder="238" />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="input-box active-grey">
                        <label className="input-label">Nº Parcela CD</label>
                        <input type="text" className="input-1" placeholder="238" />
                        </div>
                    </div>
                    </div>
                    <div className="row mt-2">
                    <div className="col-md-3">
                    <div className="input-box active-grey">
                        <label className="input-label">Geocódigo</label>
                        <input type="text" className="input-1" placeholder="238" />
                    </div>
                    </div>
                    <div className="col-md-3">
                    <div className="input-box active-grey">
                        <label className="input-label">Nº Parcela CD</label>
                        <input type="text" className="input-1" placeholder="238" />
                    </div>
                    </div>
                    <div className="col-md-3">
                    <div className="input-box active-grey">
                        <label className="input-label">Nº Parcela CD</label>
                        <input type="text" className="input-1" placeholder="238" />
                    </div>
                    </div>
                    <div className="col-md-3">
                    <div className="input-box active-grey">
                        <label className="input-label">Nº Parcela CD</label>
                        <input type="text" className="input-1" placeholder="238" />
                    </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-3">
                    <div className="input-box active-grey">
                    <label className="input-label">Geocódigo</label>
                    <input type="text" className="input-1" placeholder="238" />
                    </div>
                    </div>
                    <div className="col-md-3">
                    <div className="input-box active-grey">
                    <label className="input-label">Nº Parcela CD</label>
                    <input type="text" className="input-1" placeholder="238" />
                    </div>
                    </div>
                    <div className="col-md-3">
                    <div className="input-box active-grey">
                    <label className="input-label">Nº Parcela CD</label>
                    <input type="text" className="input-1" placeholder="238" />
                    </div>
                    </div>
                    <div className="col-md-3">
                    <div className="input-box active-grey">
                    <label className="input-label">Nº Parcela CD</label>
                    <input type="text" className="input-1" placeholder="238" />
                    </div>
                    </div>
                </div>
                </div>

                <div className="bg-white middle p20 mt-140" id="link3">
                    <div className="head">
                    <h2>Caraterísticas do Povoamento</h2>
                    <p className="font-14">{/*"Lorem ipsum dolor sit amet, consetetur sadipscing elitrdiam"*/}</p>
                    </div>
                    <div className="row">
                    <div className="col-md-3">
                        <div className="input-box active-grey">
                        <label className="input-label">Geocódigo</label>
                        <input type="text" className="input-1" placeholder="238" />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="input-box active-grey">
                        <label className="input-label">Nº Parcela CD</label>
                        <input type="text" className="input-1" placeholder="238" />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="input-box active-grey">
                        <label className="input-label">Nº Parcela CD</label>
                        <input type="text" className="input-1" placeholder="238" />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="input-box active-grey">
                        <label className="input-label">Nº Parcela CD</label>
                        <input type="text" className="input-1" placeholder="238" />
                        </div>
                    </div>
                    </div>
                    <div className="row mt-2">
                    <div className="col-md-3">
                    <div className="input-box active-grey">
                        <label className="input-label">Geocódigo</label>
                        <input type="text" className="input-1" placeholder="238" />
                    </div>
                    </div>
                    <div className="col-md-3">
                    <div className="input-box active-grey">
                        <label className="input-label">Nº Parcela CD</label>
                        <input type="text" className="input-1" placeholder="238" />
                    </div>
                    </div>
                    <div className="col-md-3">
                    <div className="input-box active-grey">
                        <label className="input-label">Nº Parcela CD</label>
                        <input type="text" className="input-1" placeholder="238" />
                    </div>
                    </div>
                    <div className="col-md-3">
                    <div className="input-box active-grey">
                        <label className="input-label">Nº Parcela CD</label>
                        <input type="text" className="input-1" placeholder="238" />
                    </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-3">
                    <div className="input-box active-grey">
                    <label className="input-label">Geocódigo</label>
                    <input type="text" className="input-1" placeholder="238" />
                    </div>
                    </div>
                    <div className="col-md-3">
                    <div className="input-box active-grey">
                    <label className="input-label">Nº Parcela CD</label>
                    <input type="text" className="input-1" placeholder="238" />
                    </div>
                    </div>
                    <div className="col-md-3">
                    <div className="input-box active-grey">
                    <label className="input-label">Nº Parcela CD</label>
                    <input type="text" className="input-1" placeholder="238" />
                    </div>
                    </div>
                    <div className="col-md-3">
                    <div className="input-box active-grey">
                    <label className="input-label">Nº Parcela CD</label>
                    <input type="text" className="input-1" placeholder="238" />
                    </div>
                    </div>
                </div>
                </div>
                <div className="bg-white middle p20 mt-140" id="link4">
                    <div className="head">
                    <h2>Castas</h2>
                    <p className="font-14">{/*"Lorem ipsum dolor sit amet, consetetur sadipscing elitrdiam"*/}</p>
                    </div>
                    <div className="row">
                    <div className="col-md-3">
                        <div className="input-box active-grey">
                        <label className="input-label">Geocódigo</label>
                        <input type="text" className="input-1" placeholder="238" />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="input-box active-grey">
                        <label className="input-label">Nº Parcela CD</label>
                        <input type="text" className="input-1" placeholder="238" />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="input-box active-grey">
                        <label className="input-label">Nº Parcela CD</label>
                        <input type="text" className="input-1" placeholder="238" />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="input-box active-grey">
                        <label className="input-label">Nº Parcela CD</label>
                        <input type="text" className="input-1" placeholder="238" />
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive table-section inner-table">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th><a href="#" className="float-left">Código <i className="fas fa-caret-down ml-1" aria-hidden="true"></i></a></th>
                                <th><a href="#" className="float-left">Designação <i className="fas fa-caret-down ml-1" aria-hidden="true"></i></a></th>
                                <th><a href="#" className="float-left">Côr <i className="fas fa-caret-down ml-1" aria-hidden="true"></i></a></th>
                                <th><a href="#" className="float-left">% Casta <i className="fas fa-caret-down ml-1" aria-hidden="true"></i></a></th>
                                <th><a href="#" className="float-left">DO Douro<i className="fas fa-caret-down ml-1" aria-hidden="true"></i></a></th>
                            
                                <th></th>
                            </tr>
                            <tr>
                                <td>199</td>
                                <td>Moscatel Galego Branco (75) - 75,00 pontos </td>
                                <td>Branco</td>
                                <td>S</td>
                                <td>S</td>
                                <td><div className="action">
                                {/* <!-- <a href="#"><i className="fas fa-list" aria-hidden="true"></i></a>
                                <a href="#"><i className="fas fa-edit" aria-hidden="true"></i></a> --> */}
                                <a href="#"><i className="fas fa-trash-alt" aria-hidden="true"></i></a>
                                </div></td>
                            </tr>
                            </thead>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
                
                
                </div>
                <div className="last-box">
                <div className="bg-white">
                    <div className="right-tab">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#Proprietários">Proprietários (3)</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#Exploradores">Exploradores (14)</a>
                        </li>
                    
                    </ul>

                    <div className="tab-content">
                        <div className="tab-pane container active" id="Proprietários">
                        <div className="chart text-center">
                            <img className="mt-4 mb-4" src="imgs/chart.png"/>
                        </div>
                        <ul className="list-unstyled">
                            <li data-toggle="modal" data-target="#left-popup-detail">
                            <span>
                                <img className="mr-1" src="imgs/circle.png" />
                            </span>
                            <span>
                                <p className="m-0">José Luís Pinto Guimarães Barros</p>
                                <p className="small">1215482</p>
                            </span>
                            <span>
                                <i className="fas fa-exclamation-circle ml-1"></i> 
                            </span>
                                <WizardModalForm type='details' />
                            </li>
                            <li data-toggle="modal" data-target="#left-popup-detail">
                            <span>
                                <img className="mr-1" src="imgs/circle.png" />
                            </span>
                            <span>
                                <p className="m-0">José Luís Pinto Guimarães Barros</p>
                                <p className="small">1215482</p>
                            </span>
                            <span>
                                <i className="fas fa-exclamation-circle ml-1"></i> 
                            </span>
                                <WizardModalForm type='details' />
                            </li>
                        </ul>

                        <p className="mt-3" data-toggle="modal" data-target="#left-popup">
                            <a href="#" className="theme-color">+ Inserir</a>
                            <WizardModalForm type=''/>
                        </p>
                        </div>
                        <div className="tab-pane container fade" id="Exploradores">Empty</div>

                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default WizardEditForm;