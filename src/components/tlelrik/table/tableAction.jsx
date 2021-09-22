import React from 'react';
import { GridCell } from '@progress/kendo-react-grid';
import { Tooltip } from 'antd';
import DeleteModal from '../../common/delete_modal';

export function TabelAction({ rowbuttonAction, actionbuttons, deleteFunc }) {
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
                                actionbuttons.File && dataItem.document_url &&
                                <Tooltip title={actionbuttons.File} color={"#808080"}>
                                    <a target="_blank" href={dataItem.document_url} ><span className="k-icon k-i-file-txt mr-2"></span></a>
                                </Tooltip>
                            }
                            {
                                actionbuttons.Invoice_File && dataItem.invoice_url &&
                                <Tooltip title={actionbuttons.Invoice_File} color={"#808080"}>
                                    <a target="_blank" href={dataItem.invoice_url} ><span className="k-icon k-i-file-txt mr-2"></span></a>
                                </Tooltip>
                            }
                            {
                                actionbuttons.Arrow &&
                                
                                <Tooltip title="Consultar registo" color={"#808080"}>
                                  <i aria-hidden="true" data-toggle="dropdown"><span className="k-icon k-i-arrow-right"> </span></i>
                                    <div className="dropdown-menu" >
                                        <a className="dropdown-item mt-2" href="#" onClick={() => rowbuttonAction("Verificar pagamento", dataItem)} >Verificar pagamento <i className="fas fa-water float-right"></i></a>
                                        <a className="dropdown-item mt-2"  data-toggle="modal" data-target="#vindima-modal" href="#" onClick={() => rowbuttonAction("Add_Amount", dataItem)} >Efetuar pagamento local <i className="fas fa-print float-right"></i></a>
                                    </div>
                                </Tooltip>
                            }
                            {
                                actionbuttons.GroupEdit &&
                                <Tooltip title="Consultar registo" color={"#808080"}>
                                    <a href="#" data-toggle="modal" data-target="#new-group" onClick={() => rowbuttonAction("GroupEdit", dataItem)}  ><span className="k-icon k-i-hyperlink-open-sm mr-2"></span></a>
                                </Tooltip>
                            }
                            {
                                actionbuttons.detailPopUp &&
                                <Tooltip title="Detalhe" color={"#808080"}>
                                    <a href="#" data-toggle="modal" data-target="#vindima-modal" onClick={() => rowbuttonAction("detailPopUp", dataItem)} ><span className="k-icon k-i-information"></span></a>
                                </Tooltip>
                            }
                            {
                                actionbuttons.commonPopup &&
                                <Tooltip title="Detalhe" color={"#808080"}>
                                    <a href="#" onClick={() => rowbuttonAction(actionbuttons.commonPopup, dataItem)} ><span className="k-icon k-i-information"></span></a>
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
                                actionbuttons.CommonRedirection &&
                                <Tooltip title={actionbuttons.CommonRedirection} color={"#808080"}>
                                    <a href="#" onClick={() => rowbuttonAction(actionbuttons.CommonRedirection, dataItem)}  ><span className="k-icon k-i-redo"></span></a>
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
                                        <a className="dropdown-item mt-2" href="#" data-toggle="modal" data-target="#vindima-modal" onClick={() => rowbuttonAction("Processar fatura", dataItem)} >Processar fatura <i className="fas fa-print float-right"></i></a>
                                        <a className="dropdown-item mt-2 mr-5 " href="#" data-toggle="modal" data-target="#vindima-modal" onClick={() => rowbuttonAction("Alterar prazo de pagamento", dataItem)} >Alterar prazo de pagamento<i className="fas fa-map-marker float-right" aria-hidden="true"></i></a>
                                        <a className="dropdown-item mt-2" href="#" data-toggle="modal" data-target="#vindima-modal" onClick={() => rowbuttonAction("Sinalizar", dataItem)} >Sinalizar  <i className="fa fa-history float-right" aria-hidden="true"></i></a>
                                        {/* <a className="dropdown-item mt-2" href="#" data-toggle="modal" data-target="#vindima-modal" onClick={() => rowbuttonAction("Anular fatura", dataItem)} >Anular fatura <i className="fas fa-water float-right"></i></a> */}

                                    </div>
                                </Tooltip>
                            }
                            {
                                actionbuttons.AllFile &&
                                <Tooltip title="Mais opções" color={"#808080"}>
                                    <i className="fa fa-ellipsis-v" aria-hidden="true" data-toggle="dropdown"></i>
                                    {
                                        this.props.dataItem.invoiceHistory.reverse().map((data,index) =>{
                                            return(   
                                            data.file_Link && data.invoiceType &&
                                            <div className="dropdown-menu" >
                                                <a target="_blank" className="dropdown-item mt-2" href= {data.file_Link ? "/api/" + data.file_Link.replace("file:///C:/DevelopmentIVPD", "") : ""} >{data.invoiceType + "_" + data.transection_Date} <i className="k-icon k-i-file-txt mr-2"></i></a>                                              
                                                {/* <a className="dropdown-item mt-2" href="#" data-toggle="modal" data-target="#vindima-modal" onClick={() => rowbuttonAction("Anular fatura", dataItem)} >Anular fatura <i className="fas fa-water float-right"></i></a> */}
                                            </div>
                                            )
                                        })
                                    }
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