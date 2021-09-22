import React from 'react';

import NavBar from '../../components/common/navbar';
import VidimaContaDeProdutorComponent from '../../components/VidimaModule/vidima_Conta_de_Produtor_component'
import SideBar from '../../components/modules/left_sidebar';
const queryString = require('query-string');
var moment = require('moment')

const Administration = false;
const listdefaultRequest = { "Filters": null, "SortBy": "", "IsSortTypeDESC": false, "IsPagination": false, "Page": 1, "PageSize": 100 }

const optionMenuArray = [
    {
        main: "Conta de Produto",
        sub_menu: [
            {
                display: "-Conta de Produto",
                linkData: {
                    filters: {},
                    columnkeyMap: {
                        "n_cartas_CartasA": "Cartas A",
                        "valor_CartasA": "valor Cartas A",
                        "n_cartas_CartasB": "Cartas B",
                        "valor_CartasB": "valor Cartas B",
                        "n_cartas_Contratos": "Contratos",
                        "valor_Contratos": "valor Contratos",
                    },
                    actionbuttons: { Edit: false, Redirect: false, Delete: false },
                    listApilink: "/Vindima/ProducerAccount/GetAll",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: true,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBartitle: "Conta de Produtor",
                    TitleBarlogo: "auditing",
                    TabName: [
                        { name: "Total de transferências relizadas", key: "de_transferencias_relizadas" },
                        { name: "Total Pagamentos realizados", key: "pagamentos_realizados" },
                        { name: "Total Pagamentos devolvidos", key: "pagamentos_devolvidos" },
                        { name: "Total Saldo Apurado", key: "saldo_Apurado" },
                        { name: "Total sem ficheiros RV", key: "sem_ficheiros_RV" },
                        { name: "Total Pagamentos retidos", key: "pagamentos_retidos" },
                        { name: "Total Pagamentos pendentes", key: "pagamentos_pendentes" },
                        { name: "Total Não assinados", key: "nao_assinados" },
                        { name: "Total Conciliações Realizadas", key: "conciliacoes_Realizadas" }
                    ],
                    groupfield: []
                }
            },
            {
                display: "Conciliar conta produtor",
                linkData: {
                    filters: {
                        Tabs: {
                            Conciliar: [
                                {
                                    key: 'codEntidadeName',
                                    displayKey: "Cod Nome da Entidade",
                                    inputType: "text"
                                },
                                {
                                    key: 'codEstatutoName',
                                    displayKey: "Cod Nome da Estatuto",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "ano": "Ano",
                        "transferido_CP": "Transferido CP",
                        "c_Ficheiro_RV": "c/ Ficheiro RV",
                        "s_Ficheiro_RV": "s/ Ficheiro RV",
                        "realizados": "Realizados",
                        "devolvidos": "Devolvidos",
                        "retidos": "Retidos",
                        "pendentes": "Pendentes",
                        "naoassinados": "Naoassinados",
                        "saldos": "Saldos"
                    },
                    actionbuttons: { Edit: true, Redirect: false, Delete: true },
                    listApilink: "/Vindima/RecocileProducer/GetAll",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: true,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBartitle: "Conciliar conta produtor",
                    TitleBarlogo: "auditing",
                    TabsCalculation: {
                        FirstKey: "apurado",
                        FirstDispaly: "Saldo apurado",
                        SecondKey: "extrato",
                        SecondDispaly: "Saldo extrato",
                        opration: " - ",
                        resultDisplay: "Validação"
                    },
                    groupfield: []
                }
            },
            {
                display: "Transferências para conta produtor",
                linkData: {
                    filters: {
                        Tabs: {
                            TransferProducer: [
                                {
                                    key: 'entidade',
                                    displayKey: "Entidade",
                                    inputType: "text"
                                },
                                {
                                    key: 'observacoes',
                                    displayKey: "Observação",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "n": "nº",
                        "mov_Orig": "Mov Orig",
                        "n_ent": "nº ent",
                        "entidade": "Entidade",
                        "data": "Data",
                        "valor": "Valor",
                        "tipo": "Tipo",
                        "observacoes": "Observação"
                    },
                    actionbuttons: { Edit: false, Redirect: false, Delete: true, detailPopUp: true, detailPopUpTwo: true },
                    popUpTabName: "Dados do registo pré-selecionados",
                    popUpTwoTabName: "Desdobrar transferência",
                    listApilink: "/Vindima/TransferProducer/GetAll",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: false,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBartitle: "Transferências para conta produtor",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    groupfield: []
                }
            },
            {
                display: "Ficheiros RV registados",
                linkData: {
                    filters: {
                        Tabs: {
                            Ficheiros: [
                                {
                                    key: 'entidade',
                                    displayKey: "Entidade",
                                    inputType: "text"
                                },
                                {
                                    key: 'n_entidade',
                                    displayKey: "nº Entidade",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "n_entidade": "nº Entidade",
                        "entidade": "Entidade",
                        "valor_total": "Valor Total"
                    },
                    actionbuttons: { Edit: true, Redirect: false, Delete: true },
                    listApilink: "/Vindima/LogFiles/GetAll",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: false,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBartitle: "Ficheiros RV registados",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    groupfield: []
                }
            },
            {
                display: "Pagamentos realizados",
                linkData: {
                    filters: {
                        Tabs: {
                            Tipo: [],
                            Data: [
                                {
                                    key: 'Menor_que',
                                    displayKey: "Menor_que",
                                    inputType: "dropdown",
                                    option: [
                                        {
                                            key: "Menor_que",
                                            value: "Menor que"
                                        },
                                        {
                                            key: "Menor_ou_igual_a",
                                            value: "Menor ou igual a"
                                        },
                                        {
                                            key: "Igual",
                                            value: "Igual"
                                        },
                                        {
                                            key: "Entre",
                                            value: "Entre"
                                        },
                                        {
                                            key: "Maior_que",
                                            value: "Maior que"
                                        },
                                        {
                                            key: "Maior_ou_igual_a",
                                            value: "Maior ou igual a"
                                        }
                                    ]
                                },
                                {
                                    key: 'Date1',
                                    displayKey: "Date 1",
                                    inputType: "date"
                                },
                                {
                                    key: 'Date2',
                                    displayKey: "Date 2",
                                    inputType: "date"
                                },
                                {
                                    key: 'Tipo_de_data',
                                    displayKey: "Tipo de data",
                                    inputType: "dropdown",
                                    option: [
                                        {
                                            key: "Transferência",
                                            value: "Transferência"
                                        },
                                        {
                                            key: "Entrada",
                                            value: "Entrada"
                                        }
                                    ]
                                }
                            ]
                        },
                        checkbox: [
                            {
                                key: 'Paga',
                                displayKey: "Paga",
                                inputType: "radio"
                            },
                            {
                                key: 'Recebe',
                                displayKey: "Recebe",
                                inputType: "radio"
                            },
                        ]
                    },
                    columnkeyMap: {
                        "n_Ficheiro": "Nº Ficheiro",
                        "ent_que_paga": "Ent Que Paga",
                        "topi_pagamento": "Tipo pagamento",
                        "ent_recebe": "Ent Recebe",
                        "nif_destino": "Nif Destino",
                        "valor_a_pagar": "Valor a pagar",
                        "data_Entrada": "Data Entrada",
                        "data_transfer": "Data Transfer",
                        "n_Carta": "Nº Carta",
                        "tipo_Prd": "Tipo/Prd",
                        "base": "Base",
                        "qnt": "Qnt",
                        "preco_pipa": "Preço Pipa",
                        "valor_ja_Prago": "Valor ja Prago",
                        "outros_pagamentos": "Outros pagamentos",
                        "observacoes": "Observação",
                    },
                    actionbuttons: { Edit: true, Redirect: false, Delete: true },
                    listApilink: "/Vindima/PaymentMade/GetAll",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: false,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBartitle: "Pagamentos realizados",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    groupfield: []
                }
            },
            {
                display: "Pagamentos devolvidos às entidades compradoras",
                linkData: {
                    filters: {
                        Tabs: {
                            PagamentosDevolvidos: [
                                {
                                    key: 'data_pagamento',
                                    displayKey: "Data Pagamento",
                                    inputType: "text"
                                },
                                {
                                    key: 'nome',
                                    displayKey: "Nome",
                                    inputType: "text"
                                },
                                {
                                    key: 'base',
                                    displayKey: "Base",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "n_transferencia": "Nº Transferencia",
                        "data_pagamento": "Data Pagamento",
                        "n_viticultor": "Nº Viticultor",
                        "nome": "Nome",
                        "nif": "Nif",
                        "tipo_production": "Tipo Production",
                        "base": "Base",
                        "valor": "Valor",
                    },
                    actionbuttons: { Edit: true, Redirect: false, Delete: true },
                    listApilink: "/Vindima/PaymentReturned/GetAll",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: false,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBartitle: "Pagamentos devolvidos às entidades compradoras",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    groupfield: []
                }
            },
            {
                display: "Pagamentos retidos",
                linkData: {
                    filters: {
                        Tabs: {
                            PagamentosRetidos: [
                                {
                                    key: "ent_que_paga",
                                    displayKey: "Ent Que Paga",
                                    inputType: "text"
                                },
                                {
                                    key: "motivo",
                                    displayKey: "Motivo",
                                    inputType: "text"
                                },
                                {
                                    key: 'estado',
                                    displayKey: "Estado",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "n_ficheiro": "Nº Ficheiro",
                        "ent_que_paga": "Ent Que Paga",
                        "n_entidade": "Nº Entidade",
                        "ent_recebe": "Ent recebe",
                        "estado": "Estado",
                        "motivo": "Motivo",
                        "valor_a_pagar": "Valor a pagar",
                        "base": "Base",
                        "tipo_Prd": "Tipo Prd",
                        "qnt": "Qnt",
                        "preco_pipa": "Preco pipa",
                        "valor_ja_Prago": "Valor ja Prago",
                        "outros_pagamentos": "Outros pagamentos",
                        "valor_retido": "Valor retido",
                    },
                    actionbuttons: { Edit: true, Redirect: false, Delete: true },
                    listApilink: "/Vindima/PaymentHeld/GetAll",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: false,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBartitle: "Pagamentos retidos",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    groupfield: [
                        { field: "Ent recebe" },
                        { field: "Estado" }
                    ]
                }
            },
            {
                display: "Pagamentos pendentes",
                linkData: {
                    filters: {
                        Tabs: {
                            PagamentosPendentes: [
                                {
                                    key: "ent_que_paga",
                                    displayKey: "Ent Que Paga",
                                    inputType: "text"
                                },
                                {
                                    key: "nif",
                                    displayKey: "Nif",
                                    inputType: "text"
                                },
                                {
                                    key: 'nib',
                                    displayKey: "Nib",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "n_ficheiro": "Nº Ficheiro",
                        "n_entidade": "Nº Entidade",
                        "ent_que_paga": "Ent Que Paga",
                        "ent_que_recebe": "Ent Que Recebe",
                        "n_entidade2": "Nº Entidade",
                        "nif": "Nif",
                        "nib": "Nib",
                        "base": "Base",
                        "tipo_Prd": "Tipo Prd",
                        "qnt": "Qnt",
                        "preco_pipa": "Preco pipa",
                        "valor_ja_Prago": "Valor ja Prago",
                        "outros_pagamentos": "Outros pagamentos"
                    },
                    actionbuttons: { Edit: true, Redirect: false, Delete: true },
                    listApilink: "/Vindima/OutstandingPayment/GetAll",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: false,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBartitle: "Pagamentos pendentes",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    groupfield: []
                }
            },
            {
                display: "Entidades c/ diferenças entre valor transf. p/ CP e entrado por RV",
                linkData: {
                    filters: {
                        Tabs: {
                            Entidades: [
                                {
                                    key: 'entidade',
                                    displayKey: "Entidade",
                                    inputType: "text"
                                },
                                {
                                    key: 'transferenciaCP',
                                    displayKey: "Transferencia CP(1)",
                                    inputType: "text"
                                },
                                {
                                    key: 'ficheirosRV',
                                    displayKey: "Ficheiros RV(2)",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "n_entidade": "Nº Entidade",
                        "entidade": "Entidade",
                        "transferenciaCP": "Transferencia CP(1)",
                        "ficheirosRV": "Ficheiros RV(2)",
                        "diferenca": "Diferenca(1-2)"
                    },
                    actionbuttons: { Edit: true, Redirect: false, Delete: true },
                    listApilink: "/Vindima/EntitiesDifference/GetAll",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: false,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBartitle: "Entidades c/ diferenças entre valor transf. p/ CP e entrado por RV",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    groupfield: []
                }
            },
            {
                display: "Pagamentos não enviados p/ DGT (não assinados)",
                linkData: {
                    filters: {
                        Tabs: {
                            "Pagamentos não enviados p/ DGT": [
                                {
                                    key: 'estado',
                                    displayKey: "Estado",
                                    inputType: "text"
                                },
                                {
                                    key: 'montante',
                                    displayKey: "Montante",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "data_ficheiro": "Data Ficheiro",
                        "estado": "Estado",
                        "n_movimento": "n movimento",
                        "montante": "Montante"
                    },
                    actionbuttons: { Edit: true, Redirect: false, Delete: true },
                    listApilink: "/Vindima/PaymentNotSent/GetAll",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: false,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBartitle: "Pagamentos não enviados p/ DGT",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    groupfield: [
                        { field: 'Montante' },
                        { field: 'Estado' },
                    ]
                }
            },
            {
                display: "Conciliações realizadas",
                linkData: {
                    filters: {
                        Tabs: {
                            Conciliações: [
                                {
                                    key: 'c_Ficheiros',
                                    displayKey: "c/ Ficheiros",
                                    inputType: "text"
                                },
                                {
                                    key: 's_Ficheiro',
                                    displayKey: "s/ Ficheiro",
                                    inputType: "text"
                                },
                                {
                                    key: 'utilizador',
                                    displayKey: "Utilizador",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "data": "Data",
                        "transf_p_CP": "Transf p/ CP",
                        "c_Ficheiros": "c/ Ficheiros",
                        "s_Ficheiro": "s/ Ficheiro",
                        "pagRealizados": "Pag Realizados",
                        "pagDevolvidos": "Pag Devolvidos",
                        "retidos": "Retidos",
                        "pendentes": "Pendentes",
                        "não_assinados": "Não assinados",
                        "saldoApurado": "Saldo Apurado",
                        "saldoExtrato": "Saldo Extrato",
                        "observações": "Observações",
                        "utilizador": "Utilizador",
                    },
                    actionbuttons: { Edit: true, Redirect: false, Delete: true },
                    listApilink: "/Vindima/ReconcileCarried/GetAll",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: false,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBartitle: "Conciliações realizadas",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    groupfield: []
                }
            }
        ]
    },
    {
        main: "Consultas",
        sub_menu: [
            {
                display: "Ficheiros pendentes",
                linkData: {
                    filters: {
                        Tabs: {
                            FicheirosPendentes: [
                                {
                                    key: 'entidade',
                                    displayKey: "Entidade",
                                    inputType: "text"
                                },
                                {
                                    key: 'n_movimento',
                                    displayKey: "nº Movimento",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "n_ficheiro": "Nº Ficheiro",
                        "estado": "Estado",
                        "entidade": "Entidade",
                        "origem": "Origem",
                        "ficheiro": "Ficheiro",
                        "n_movimento": "Nº Movimento",
                        "valor_total": "Valor total",
                        "valor_retido": "Valor retido"
                    },
                    actionbuttons: { Edit: false, Redirect: false, Delete: false, detailPopUp: true },
                    listApilink: "/Vindima/PendingFiles/GetAll",
                    popUpTabName: "Register Movement",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: false,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBartitle: "Ficheiros Pendentes, não finalizados",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    groupfield: []
                }
            },
            {
                display: "Movimentos prontos a serem transferidos/enviados para o banco",
                linkData: {}
            },
            {
                display: "Pagamentos realizados para entidade",
                linkData: {
                    filters: {
                        Tabs: {
                            PagamentosRealizadosParaEntidade: [
                                {
                                    key: 'entidade',
                                    displayKey: "Entidade",
                                    inputType: "text"
                                },
                                {
                                    key: 'n_entidade',
                                    displayKey: "nº Entidade",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "n_entidade": "Nº Entidade",
                        "entidade": "Entidade",
                        "nif": "Nif",
                        "produto": "Produto",
                        "base": "Base",
                        "quantidade_total": "Quantidade total",
                        "valor_total": "Valor total"
                    },
                    actionbuttons: { Edit: false, Redirect: false, Delete: false, detailPopUp: true },
                    popUpTabName: "Payment details",
                    listApilink: "/Vindima/PaymentEntities/GetAll",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: false,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBartitle: "Pagamentos realizados p/ entidade",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    groupfield: []
                }
            },
            {
                display: "Pagamentos realizados por Distrito/Concelho/Freguesia",
                linkData: {
                    filters: {
                        Tabs: {
                            PagamentosRealizados: [
                                {
                                    key: 'entidade',
                                    displayKey: "Entidade",
                                    inputType: "text"
                                },
                                {
                                    key: 'n_entidade',
                                    displayKey: "Nº Entidade",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "n_entidade": "Nº entidade",
                        "c_Postal": "C Postal",
                        "entidade": "Entidade",
                        "entidade_Recetora": "Entidade Recetora",
                        "nif_entidade": "Nif Entidade",
                        "nif_pagadora": "Nif Pagadora",
                        "valor_recebido": "Valor recebido"
                    },
                    actionbuttons: { Edit: true, Redirect: false, Delete: true },
                    listApilink: "/Vindima/PaymentDicoFre/GetAll",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: false,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBartitle: "Pagamentos realizados por DiCoFre",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    groupfield: []
                }
            },
            {
                display: "Recebimentos registados",
                linkData: {
                    filters: {
                        Tabs: {
                            Recebimentos: [
                                {
                                    key: 'base',
                                    displayKey: "Base",
                                    inputType: "text"
                                },
                                {
                                    key: 'tipo_Prd',
                                    displayKey: "Tipo pag",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "ano": "Ano",
                        "n_ficha": "Nº ficha",
                        "entidade_pag": "Entidade pag",
                        "nif_pag": "Nif pag",
                        "tipo_pag": "Tipo pag",
                        "data_transf": "Data transf",
                        "destinatario": "Destinatario",
                        "nif_dest": "Nif dest",
                        "ent_rec": "Ent rec",
                        "nif_rec": "Nif rec",
                        "tipo_Prd": "Tipo_Prd",
                        "base": "Base",
                        "n_carta": "Nº carta",
                        "v_retido": "V retido",
                        "valor_a_pagar": "Valor a pagar",
                        "qtd": "Qtd",
                        "preco_Pipa": "Preco Pipa",
                        "valor_ja_pago": "Valor ja pago",
                        "outros_pag": "Outros pag",
                    },
                    actionbuttons: { Edit: true, Redirect: false, Delete: true },
                    listApilink: "/Vindima/Receipts/GetAll",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: false,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBartitle: "Recebimentos",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    groupfield: [
                        { field: "Base" },
                        { field: "Entidade pag" }
                    ]
                }
            },
            {
                display: "Emissão de declaração de Rendimentos",
                linkData: {
                    filters: {
                        Tabs: {
                            DeclaraçãoDeRendimentos: [
                                {
                                    key: 'nif_destino',
                                    displayKey: "Nif destino",
                                    inputType: "text"
                                },
                                {
                                    key: 'entidade_pag',
                                    displayKey: "Entidade pag",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "ano": "Ano",
                        "n_ficha": "Nº Ficha",
                        "entidade_pag": "Entidade pag",
                        "tipo_pag": "Tipo pag",
                        "data_transf": "Data transf",
                        "entidade_rec": "Entidade rec",
                        "nif_destino": "Nif destino",
                        "tipo_Prd": "Tipo Prd",
                        "base": "Base",
                        "n_carta": "Nº carta",
                        "v_retido": "V retido",
                        "valor_a_pagar": "Valor a pagar",
                        "qtd": "Qtd",
                    },
                    actionbuttons: { Edit: true, Redirect: false, Delete: true },
                    listApilink: "/Vindima/IncomeStatements/GetAll",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: false,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBartitle: "Declaração de Rendimentos",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    groupfield: [
                        { field: "Base" },
                        { field: "Entidade pag" }
                    ]
                }
            },
            {
                display: "Ficheiros de Pagamentos Importados",
                linkData: {
                    filters: {
                        Tabs: {
                            "Ficheiros de Pagamentos Importados": [
                                {
                                    key: 'ficheiro',
                                    displayKey: "Ficheiro",
                                    inputType: "text"
                                },
                                {
                                    key: 'entidade',
                                    displayKey: "Entidade",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "n_ficheiro": "Nº Ficheiro",
                        "entidade": "Entidade",
                        "ficheiro": "Ficheiro",
                        "n_rec": "Nº Rec",
                        "valor_total": "Valor total",
                        "estado": "Estado"
                    },
                    actionbuttons: { Edit: false, Redirect: false, Delete: false, detailPopUp: true },
                    popUpTabName: "Payment File details",
                    listApilink: "/Vindima/ImportedPaymentFiles/GetAll",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: false,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBartitle: "Ficheiros de Pagamentos Importados",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    groupfield: [
                        { field: "Entidade" },
                        { field: "Estado" },
                    ]
                }
            },
            {
                display: "Ficheiros criados para o banco",
                linkData: {
                    filters: {
                        Tabs: {
                            "Ficheiros criados para o banco": [
                                {
                                    key: 'Estado',
                                    displayKey: "Estado",
                                    inputType: "text"
                                },
                                {
                                    key: 'entidade',
                                    displayKey: "Entidade",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "n_ficheiro": "Nº Ficheiro",
                        "entidade": "Entidade",
                        "n_rec": "Nº Rec",
                        "valor_total": "Valor total",
                        "estado": "Estado",
                        "dgt": "DGT",
                        "n_tei": "Nº tei",
                        "data_hora": "data/hora",
                        "utilizador": "Utilizador"
                    },
                    actionbuttons: { Edit: false, Redirect: false, Delete: false, detailPopUp: true },
                    listApilink: "/Vindima/FilesCreateBank/GetAll",
                    popUpTabName: "File Detail",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: false,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBartitle: "Ficheiros criados para o banco",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    groupfield: [
                        { field: "Entidade" },
                        { field: "Estado" },
                    ]
                }
            },
            {
                display: "Saldos de MG (Tabela de Vendas em Base V)",
                linkData: {
                    filters: {
                        Tabs: {
                            "Saldos de MG": [
                                {
                                    key: 'nome',
                                    displayKey: "Nome",
                                    inputType: "text"
                                },
                                {
                                    key: 'total_AD_disp',
                                    displayKey: "Total AD disp",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "n_vit": "Nº vit",
                        "nome": "Nome",
                        "own_production_mg_branco": "own mg branco",
                        "own_production_mg_tinto": "own mg tinto",
                        "own_production_mg_rosado": "own mg rosado",
                        "purchased_production_mg_branco": "purchased mg branco",
                        "purchased_production_mg_tinto": "purchased mg tinto",
                        "purchased_production_mg_rosado": "purchased mg rosado",
                        "declared_ad_mg_branco": "declared ad mg branco",
                        "declared_ad_mg_tinto": "declared ad mg tinto",
                        "declared_ad_mg_rosado": "declared ad mg rosado",
                        "total_AD_disp": "Total AD disp",
                        "total_vinho": "Total vinho",
                        "vendas_em_base_V": "Vendas em base V",
                        "saldo": "Saldo",
                    },
                    actionbuttons: { Edit: true, Redirect: false, Delete: true },
                    listApilink: "/Vindima/MGBalance/getall",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: false,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBartitle: "Saldos de MG (Tabela de Vendas em Base V)",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    groupfield: [
                        { field: "nome" },
                        { field: "own mg branco" },
                        { field: 'purchased mg branco' },
                        { field: 'declared ad mg branco' },
                    ]
                }
            },
            {
                display: "LQ Base IV-Diferenças entre DCP e RV",
                linkData: {
                    filters: {
                        Tabs: {
                            "LQ Base IV-Diferenças entre DCP e RV": [
                                {
                                    key: 'nome_comprador',
                                    displayKey: "Nome Comprador",
                                    inputType: "text"
                                },
                                {
                                    key: 'nome_vendedor',
                                    displayKey: "Nome Vendedor",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "n_vit": "nº vit",
                        "nome_comprador": "Nome Comprador",
                        "n_vit": "nº vit",
                        "nome_vendedor": "Nome Vendedor",
                        "mg_dcp": "MG DCP",
                        "mg_rv": "MG RV",
                        "diferenca": "Diferenca"
                    },
                    actionbuttons: { Edit: true, Redirect: false, Delete: true },
                    listApilink: "/Vindima/LQBase/getall",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: false,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBartitle: "LQ Base IV-Diferenças entre DCP e RV",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    groupfield: []
                }
            },
            {
                display: "Registo de Impressões de Cartas B",
                linkData: {
                    filters: {
                        Tabs: {
                            "Registo de Impressões de Cartas B": [
                                {
                                    key: 'nome',
                                    displayKey: "Nome",
                                    inputType: "text"
                                },
                                {
                                    key: 'carta',
                                    displayKey: "Carta",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "n_imp": "2021",
                        "n_vit": "nº vit",
                        "nome": "Nome",
                        "carta": "Carta",
                        "data_impressao": "data impressao",
                        "status": "Estado",
                        "data_anulacao": "data anulacao",
                        "utilizador_que_anulou": "utilizador que anulou",
                        "motivo": "motivo"

                    },
                    actionbuttons: { Edit: true, Redirect: false, Delete: true },
                    listApilink: "/Vindima/RegistrationImpression/getall",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: false,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBarPopUpButton: "Registar impressão manualmente",
                    TitleBartitle: "Registo de Impressões de Cartas B",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    groupfield: [
                        { field: 'Carta' },
                        { field: 'Estado' },
                    ]
                }
            },
            {
                display: "Pagamentos pendentes ou retidos (todos os anos)",
                linkData: {
                    filters: {
                        Tabs: {
                            Retidos: [
                                {
                                    key: 'nif',
                                    displayKey: "Nif",
                                    inputType: "text"
                                },
                                {
                                    key: 'entidade_que_paga',
                                    displayKey: "Entidade Que Paga",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "ano": "Ano",
                        "n_entidade": "Nº entidade",
                        "entidade_que_paga": "Entidade Que Paga",
                        "nib": "Nib",
                        "entidade_que_recebe": "Entidade Que recebe",
                        "estado": "Estado",
                        "nif": "Nif",
                        "tipo_Prd": "Tipo Prd",
                        "base": "Base",
                        "valor_a_pagar": "Valor a pagar",
                    },
                    actionbuttons: { Edit: true, Redirect: false, Delete: true },
                    popUpTabName: "year_wise_detail",
                    listApilink: "/Vindima/PendingPayment/GetAll",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: true,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBartitle: "Pagamentos pendentes ou retidos",
                    TitleBarlogo: "auditing",
                    YearWiseTabName: {
                        key: "valor_a_pagar",
                        startYear: parseInt(moment(new Date()).year()) - 1,
                        endYear: parseInt(moment(new Date()).year())
                    },
                    groupfield: [
                        { field: "Nif" },
                        { field: "Ano" },
                        { field: "Estado" },
                    ]
                }
            },
            {
                display: "Penhoras (*1)",
                linkData: {
                    filters: {
                        Tabs: {
                            Penhoras: [
                                {
                                    key: 'nif',
                                    displayKey: "Nif",
                                    inputType: "text"
                                },
                                {
                                    key: 'entidade_que_paga',
                                    displayKey: "Entidade Que Paga",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "ano": "Ano",
                        "n_entidade": "Nº entidade",
                        "entidade_que_paga": "Entidade Que Paga",
                        "nib": "Nib",
                        "entidade_que_recebe": "Entidade Que recebe",
                        "estado": "Estado",
                        "nif": "Nif",
                        "tipo_Prd": "Tipo Prd",
                        "valor_a_pagar": "Valor a pagar",
                        "base": "Base",
                    },
                    actionbuttons: { Edit: true, Redirect: false, Delete: true },
                    listApilink: "/Vindima/ConsultationPledges/GetAll",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: false,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBartitle: "Consulta de penhoras ativas",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    groupfield: []
                }
            },
        ]
    },
    ,
    {
        main: "Pagamentos vindima",
        sub_menu: [
            {
                display: "1 - Ler ficheiros c/ instruções",
                linkData: {
                    filters: {
                        Tabs: {
                            "Confirmação de pagamento das cartas emitidas": [
                                {
                                    key: 'carta A',
                                    displayKey: "Carta A",
                                    inputType: "dropdown",
                                    option: [
                                        {
                                            key: "confirmado",
                                            value: "Confirmado"
                                        },
                                        {
                                            key: "não_Confirmado",
                                            value: "Não Confirmado"
                                        }
                                    ]
                                },
                                {
                                    key: 'carta B',
                                    displayKey: "Carta B",
                                    inputType: "dropdown",
                                    option: [
                                        {
                                            key: "confirmado",
                                            value: "Confirmado"
                                        },
                                        {
                                            key: "não_Confirmado",
                                            value: "Não Confirmado"
                                        }
                                    ]
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "n_ficheiro": "Nº Ficheiro",
                        "n_entidade": "Nº entidade",
                        "entidade_pagadora": "Entidade Pagadora",
                        "entidade_beneficiaria": "Entidade Beneficiaria",
                        "carta": "Carta",
                        "valor": "Valor",
                        "data_pagamento": "Data Pagamento"
                    },
                    actionbuttons: { Edit: false, Redirect: false, Delete: false },
                    listApilink: "/Vindima/PaymentConfirmation/getall",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: false,
                    TitleBarpath: "/vindima_Conta_de_Produtor",
                    TitleBartitle: "Confirmação de pagamento das cartas emitidas",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    groupfield: []
                }
            },
            {
                display: "1.1 - Consultar NIB/NIF dos Viticultores",
                linkData: {}
            },
            {
                display: "1.2 - Reter valor para pagamento a Viticultores2 - Validar informação importada",
                linkData: {}
            },
            {
                display: "2.1 - Corrigir erros detetados3 - Processar informação validada4 - Imprimir cartas A e B",
                linkData: {}
            },
            {
                display: "4.1 - Imprimir cartas em série5 - Gerar ficheiros para o banco",
                linkData: {}
            },
            {
                display: "Ler ficheiro c/ instruções p/ libertar liq. pendentes",
                linkData: {}
            },
        ]
    }

]


class VidimaContaDeProdutorPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.setLinkDataMethod()
    }

    componentDidMount() {
        console.log("...........")
    }

    setLinkDataMethod = () => {
        let mainIndex = 0;
        let subIndex = 0;
        const parsed = queryString.parse(this.props.location.search);
        if (parsed.m) {
            mainIndex = parsed.m;
        }
        if (parsed.s) {
            subIndex = parsed.s;
        }
        let selectOption = optionMenuArray[mainIndex].sub_menu[subIndex];
        let selectedMainOption = optionMenuArray[mainIndex]
        let year = new Date();
        year = year.getFullYear();
        return {
            year: year,
            selectedtitelotion: selectOption.display,
            selectedMainOption: selectedMainOption.main,
            linkData: selectOption.linkData
        }
    }

    changeOption = (mainIndex, subIndex) => {
        console.log("selectOption,mainIndex,subIndex", mainIndex, subIndex)
        window.location = "/vindima_Conta_de_Produtor?m=" + mainIndex + "&s=" + subIndex;
        return;
        // if(Object.keys(selectOption.linkData).length > 0){
        //     this.setState({
        //         selectedtitelotion:selectOption.display,
        //         linkData:selectOption.linkData
        //     },()=>{
        //         window.localStorage.setItem('mainIndex',mainIndex)
        //         window.localStorage.setItem('subIndex',subIndex)
        //     })
        // }
    }

    updateYear = (year) => {
        this.setState({
            year: year
        })
    }

    render() {
        console.log("VindimaLinkData", this.state.linkData)
        return (
            <div className="dashboard">
                <NavBar date={new Date()} linkData={this.state.linkData} year={this.state.year} updateYear={(year) => this.updateYear(year)} />
                <SideBar Administration={Administration} />
                <div className="container-fluid">
                    <VidimaContaDeProdutorComponent selectedMainOption={this.state.selectedMainOption} date={new Date()} year={this.state.year} changeOption={(mainIndex, subIndex) => this.changeOption(mainIndex, subIndex)} optionMenuArray={optionMenuArray} linkData={this.state.linkData} selectedtitelotion={this.state.selectedtitelotion} />
                </div>
            </div>
        )
    }
}


export default VidimaContaDeProdutorPage;