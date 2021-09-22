import React from 'react';
import { GridCell } from '@progress/kendo-react-grid';
import DeleteModal from '../../components/common/delete_modal';
import { Tooltip } from 'antd';

export function CommandCell({ rowbuttonAction, actionbuttons, deleteFunc }) {
    return class extends GridCell {
        constructor(props) {
            super(props);
            this.state = {}
        }

        render() {
            const { dataItem } = this.props;
            if (!dataItem.field) {
                return (
                    <td className="k-command-cell">
                        <div className="action">
                            {
                                actionbuttons.Add &&
                                <Tooltip title="Adicionar" color={"#808080"}>
                                    <a href="#" onClick={() => rowbuttonAction("Add", dataItem)} ><i className="fas fa-plus-circle text-active"></i></a>
                                </Tooltip>
                            }
                            {
                                actionbuttons.Edit &&
                                <Tooltip title="Consultar registo" color={"#808080"}>
                                    <a href="#" onClick={() => rowbuttonAction("Edit", dataItem)}  ><span className="k-icon k-i-hyperlink-open-sm"></span></a>
                                </Tooltip>
                            }
                           
                            {
                                actionbuttons.GroupEdit &&
                                <Tooltip title="Consultar registo" color={"#808080"}>
                                    <a href="#" data-toggle="modal" data-target="#new-group" onClick={() => rowbuttonAction("GroupEdit", dataItem)}  ><span className="k-icon k-i-hyperlink-open-sm mr-2"></span></a>
                                </Tooltip>
                            }
                            {
                                actionbuttons.Redirect &&
                                <Tooltip title={actionbuttons.Redirect} color={"#808080"}>
                                    <a href="#" onClick={() => rowbuttonAction("Redirect", dataItem)} ><i className="fas fa-caret-square-left  ml-2 mr-3 text-yellow"></i></a>
                                </Tooltip>
                            }
                            {
                                actionbuttons.RedirectTwo &&
                                <Tooltip title={actionbuttons.RedirectTwo} color={"#808080"}>
                                    <a href="#" onClick={() => rowbuttonAction("RedirectTwo", dataItem)}  ><span className="k-icon k-i-redo"></span></a>
                                </Tooltip>
                            }
                            {
                                actionbuttons.detailPopUp &&
                                <Tooltip title="Detalhe" color={"#808080"}>
                                    <a href="#" data-toggle="modal" data-target="#vindima-modal" onClick={() => rowbuttonAction("detailPopUp", dataItem)} ><span className="k-icon k-i-information"></span></a>
                                </Tooltip>
                            }
                            {
                                actionbuttons.detailPopUpTwo &&
                                <Tooltip title="Detalhe" color={"#808080"}>
                                    <a href="#" data-toggle="modal" data-target="#vindima-modal" onClick={() => rowbuttonAction("detailPopUpTwo", dataItem)} ><span className="k-icon k-i-hyperlink-open-sm"></span></a>
                                </Tooltip>
                            }
                            {
                                actionbuttons.Popup &&
                                <Tooltip title="Detalhe" color={"#808080"}>
                                    <a href="#" data-toggle="modal" data-target="#left-popup-center" onClick={() => rowbuttonAction("detailsPopup", dataItem)} ><span className="k-icon k-i-information"></span></a>
                                </Tooltip>

                            }
                            {
                                actionbuttons.Dropdown &&
                                <Tooltip title="Mais opções" color={"#808080"}>
                                    <i className="fa fa-ellipsis-v" aria-hidden="true" data-toggle="dropdown"></i>
                                    <div className="dropdown-menu" >
                                        <a className="dropdown-item mt-2 mr-5 " href="#" onClick={() => rowbuttonAction("Map", dataItem)} >Ver no mapa  <i className="fas fa-map-marker float-right" aria-hidden="true"></i></a>
                                        <a className="dropdown-item mt-2" href="#" onClick={() => rowbuttonAction("History", dataItem)} >Histórico  <i className="fa fa-history float-right" aria-hidden="true"></i></a>
                                        <a className="dropdown-item mt-2" href="#" onClick={() => rowbuttonAction("Print", dataItem)} >Imprimir <i className="fas fa-print float-right"></i></a>
                                        <a className="dropdown-item mt-2" href="#" onClick={() => rowbuttonAction("remind", dataItem)} >Rendimento <i className="fas fa-water float-right"></i></a>

                                    </div>
                                </Tooltip>
                            }
                            {
                                actionbuttons.DropdownRevenue &&
                                <Tooltip title="Mais opções" color={"#808080"}>
                                    <i className="fa fa-ellipsis-v" aria-hidden="true" data-toggle="dropdown"></i>
                                    <div className="dropdown-menu" >
                                        <a className="dropdown-item mt-2 mr-5 " href="#" data-toggle="modal" data-target="#vindima-modal" onClick={() => rowbuttonAction("Alterar prazo de pagamento", dataItem)} >Alterar prazo de pagamento<i className="fas fa-map-marker float-right" aria-hidden="true"></i></a>
                                        <a className="dropdown-item mt-2" href="#" data-toggle="modal" data-target="#vindima-modal" onClick={() => rowbuttonAction("Sinalizar", dataItem)} >Sinalizar  <i className="fa fa-history float-right" aria-hidden="true"></i></a>
                                        <a className="dropdown-item mt-2" href="#" data-toggle="modal" data-target="#vindima-modal" onClick={() => rowbuttonAction("Processar fatura", dataItem)} >Processar fatura <i className="fas fa-print float-right"></i></a>
                                        <a className="dropdown-item mt-2" href="#" data-toggle="modal" data-target="#vindima-modal" onClick={() => rowbuttonAction("Anular fatura", dataItem)} >Anular fatura <i className="fas fa-water float-right"></i></a>

                                    </div>
                                </Tooltip>
                            }
                            {
                                 actionbuttons.DropdownVinRegisto &&
                                 <Tooltip title="Mais opções" color={"#808080"}>
                                     <i className="fa fa-ellipsis-v" aria-hidden="true" data-toggle="dropdown"></i>
                                     <div className="dropdown-menu" >
                                         <a className="dropdown-item mt-2 mr-5 " href="#" data-toggle="modal" data-target="#vindima-modal" onClick={() => rowbuttonAction("Preencher/Validar nº IVV", dataItem)} >Preencher/Validar nº IVV<i className="fas fa-map-marker float-right" aria-hidden="true"></i></a>
                                         <div className="multilevel-menu">
                                             <div className="dropdown">
                                                 <a className="dropdown-item mt-2" data-toggle="dropdown" href="#" onClick={() => rowbuttonAction("History", dataItem)} >Fim de Vindima  <i className="fa fa-history float-right" aria-hidden="true"></i></a>
                                                 <ul className="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                                                     <li className="dropdown-submenu">
                                                         <a className="dropdown-item mt-2" href="#" onClick={() => rowbuttonAction("Definir", dataItem)} >Definir <i className="fas fa-print float-right"></i></a>
                                                     </li>
                                                     <li className="dropdown-submenu">
                                                         <a className="dropdown-item mt-2" href="#" onClick={() => rowbuttonAction("Remover", dataItem)} >Remover<i className="fas fa-print float-right"></i></a>
                                                     </li>
                                                 </ul>
                                             </div>
                                         </div>
                                         <a className="dropdown-item mt-2" href="#" onClick={() => rowbuttonAction("Remover Entidade/NIV", dataItem)} >Remover Entidade/NIV <i className="fas fa-print float-right"></i></a>
                                         <a className="dropdown-item mt-2" href="#" onClick={() => rowbuttonAction("Exportar p/ XML (Ultimo REU)", dataItem)} >Exportar p/ XML (Ultimo REU) <i className="fas fa-water float-right"></i></a>
                                         <a className="dropdown-item mt-2" href="#" data-toggle="modal" data-target="#vindima-modal" onClick={() => rowbuttonAction("Imprimir", dataItem)} >Imprimir <i className="fas fa-water float-right"></i></a>
                                     </div>
                                 </Tooltip>
                            }
                            {
                                actionbuttons.Delete &&
                                <DeleteModal handleDelete={(id) => deleteFunc(id)} row={dataItem} className=" ml-3" />
                            }
                        </div>
                    </td>
                );
            } else {
                return (
                    <td></td>
                );

            }

        }
    }
};