import React from 'react';

import NavBar from '../../components/common/navbar';
import SideBar from '../../components/modules/left_sidebar';
import VindimaReport from '../../components/VidimaModule/vindima_report_component';
const queryString = require('query-string');
const Administration = false;
const listdefaultRequest = { "Filters": null, "SortBy": "", "IsSortTypeDESC": false, "IsPagination": false, "Page": 1, "PageSize": 100 }


const optionMenuArray = [
    {
        main: "Estatísticas",
        sub_menu: [
            {
                display: "-Resumo da campanha",
                linkData: {
                    filters: {},
                    listApilink: "/Vindima/Resumo",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: true,
                    columnkeyMap : {
                        "key" : "kgs"
                    },
                    dropDownKey:[
                        {key : "kgs"},
                        {key : "lts"},
                        {key : "mtr"}
                    ],
                    TitleBartitle: "Resumo da campanha",
                    TitleBarlogo: "auditing",
                }
            },
            {
                display: "-Análise entregas entre 2 campanhas",
                linkData: {
                    filters: {
                        Tabs: {
                            Autorização: [
                                {
                                    key: 'n_cartas_CartasA',
                                    displayKey: "Cartas A",
                                    inputType: "text"
                                },
                                {
                                    key: 'n_cartas_CartasB',
                                    displayKey: "Cartas B",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "n_entidade": "n entidade",
                        "entidade": "entidade",
                        "branco_1": "branco",
                        "tinto_1": "tinto",
                        "moscatel_1": "moscatel",
                        "total_1": "total",
                        "branco_2": "branco",
                        "tinto_2": "tinto",
                        "moscatel_2": "moscatel",
                        "total_2": "total",
                        "diff_branco": "diff branco",
                        "diff_tinto": "diff tinto",
                        "diff_moscatel": "diff moscatel",
                        "diff_total": "diff total"
                    },
                    actionbuttons: { Edit: false, Redirect: false, Delete: false },
                    listApilink: "/Vindima/AnaliseEntregas",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    isProcessData : true,
                    navbarOptionsYear: true,
                    dropDownKey:[
                        {key : "kgs"},
                        {key : "lts"},
                        {key : "mtr"}
                    ],
                    TitleBartitle: "Análise entregas entre 2 campanhas",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    YearWiseCalTabRequired : true,
                    notAction : true,
                    groupfield: [
                        {field : "Entidade"},
                    ]
                }
            },
            {
                display: "-DCPs por local de recepção",
                linkData: {
                    filters: {
                        Tabs: {
                            Autorização: [
                                {
                                    key: 'n_cartas_CartasA',
                                    displayKey: "Cartas A",
                                    inputType: "text"
                                },
                                {
                                    key: 'n_cartas_CartasB',
                                    displayKey: "Cartas B",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
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
                    TitleBartitle: "DCPs por local de recepção",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    groupfield: [
                        {field : "Contratos"},
                        {field :"Cartas A" },
                        {field :"Cartas B" }
                    ]
                }
            },
            {
                display: "-Colheita por sub-região",
                linkData: {
                    filters: {
                        Tabs: {
                            Autorização: [
                                {
                                    key: 'n_cartas_CartasA',
                                    displayKey: "Cartas A",
                                    inputType: "text"
                                },
                                {
                                    key: 'n_cartas_CartasB',
                                    displayKey: "Cartas B",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
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
                    dropDownKey:[
                        {key : "pipas"},
                        {key : "dipas"},
                        {key : "gipas"}
                    ],
                    navbarOptionsYear: true,
                    TitleBartitle: "Colheita por sub-região",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    notAction : true,
                    groupfield: [
                        {field : "Contratos"},
                        {field :"Cartas A" },
                        {field :"Cartas B" }
                    ]
                }
            },
            {
                display: "-Colheitas em novas parcelas",
                linkData: {
                    filters: {
                        Tabs: {
                            Autorização: [
                                {
                                    key: 'n_cartas_CartasA',
                                    displayKey: "Cartas A",
                                    inputType: "text"
                                },
                                {
                                    key: 'n_cartas_CartasB',
                                    displayKey: "Cartas B",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
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
                    TitleBartitle: "Colheitas em novas parcelas",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    notAction : true,
                    groupfield: [
                        {field : "Contratos"},
                        {field :"Cartas A" },
                        {field :"Cartas B" }
                    ]
                }
            },
            {
                display: "-APs com MG declarado diferente do autorizado",
                linkData: {
                    filters: {
                        Tabs: {
                            Autorização: [
                                {
                                    key: 'n_cartas_CartasA',
                                    displayKey: "Cartas A",
                                    inputType: "text"
                                },
                                {
                                    key: 'n_cartas_CartasB',
                                    displayKey: "Cartas B",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
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
                    TitleBartitle: "APs com MG declarado diferente do autorizado",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    notAction : true,
                    groupfield: [
                        {field : "Contratos"},
                        {field :"Cartas A" },
                        {field :"Cartas B" }
                    ]
                }
            },
            {
                display: "-Entidades só com MG declarado",
                linkData: {
                    filters: {
                        Tabs: {
                            Autorização: [
                                {
                                    key: 'n_cartas_CartasA',
                                    displayKey: "Cartas A",
                                    inputType: "text"
                                },
                                {
                                    key: 'n_cartas_CartasB',
                                    displayKey: "Cartas B",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
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
                    instructMessage : "Não são incluídas parcelas em reestruturação no cálculo das áreas e produção máxima teória (55 hl/ha)",
                    TitleBartitle: "Entidades só com MG declarado",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    dropDownKey:[
                        {key : "pipas"},
                        {key : "dipas"},
                        {key : "gipas"}
                    ],
                    notAction : true,
                    groupfield: [
                        {field : "Contratos"},
                        {field :"Cartas A" },
                        {field :"Cartas B" }
                    ]
                }
            },
            {
                display: "-DCPs entregues fora do prazo",
                linkData: {
                    filters: {
                        Tabs: {
                            Autorização: [
                                {
                                    key: 'n_cartas_CartasA',
                                    displayKey: "Cartas A",
                                    inputType: "text"
                                },
                                {
                                    key: 'n_cartas_CartasB',
                                    displayKey: "Cartas B",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
                    columnkeyMap: {
                        "n_cartas_CartasA": "Cartas A",
                        "valor_CartasA": "valor Cartas A",
                        "n_cartas_CartasB": "Cartas B",
                        "valor_CartasB": "valor Cartas B",
                        "n_cartas_Contratos": "Contratos",
                        "valor_Contratos": "valor Contratos",
                    },
                    actionbuttons: { Edit: false, Redirect: false, Delete: false, detailPopUp : true },
                    listApilink: "/Vindima/ProducerAccount/GetAll",
                    popUpTabName : "Comentários associados ao registo",
                    listdefaultRequest: listdefaultRequest,
                    requestMethod: "post",
                    navbarOptionsYear: true,
                    TitleBartitle: "DCPs entregues fora do prazo",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    notAction : true,
                    groupfield: [
                        {field : "Contratos"},
                        {field :"Cartas A" },
                        {field :"Cartas B" }
                    ]
                }
            },
            {
                display: "-Produção por sub-região",
                linkData: {
                    filters: {
                        Tabs: {
                            Autorização: [
                                {
                                    key: 'n_cartas_CartasA',
                                    displayKey: "Cartas A",
                                    inputType: "text"
                                },
                                {
                                    key: 'n_cartas_CartasB',
                                    displayKey: "Cartas B",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
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
                    TitleBartitle: "Produção por sub-região",
                    TitleBarlogo: "auditing",
                    dropDownKey:[
                        {key : "pipas"},
                        {key : "dipas"},
                        {key : "gipas"}
                    ],
                    TabName: [],
                    notAction : true,
                    groupfield: [
                        {field : "Contratos"},
                        {field :"Cartas A" },
                        {field :"Cartas B" }
                    ]
                }
            },
            {
                display: "-Produção por centro de vinificação",
                linkData: {
                    filters: {
                        Tabs: {
                            Autorização: [
                                {
                                    key: 'n_cartas_CartasA',
                                    displayKey: "Cartas A",
                                    inputType: "text"
                                },
                                {
                                    key: 'n_cartas_CartasB',
                                    displayKey: "Cartas B",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
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
                    TitleBartitle: "Produção por centro de vinificação",
                    TitleBarlogo: "auditing",
                    TitleBarpath: "/vindima_page?name=vinificacao",
                    TitleBarButtonName:"Listar entidades",
                    TabName: [],
                    notAction : true,
                    groupfield: [
                        {field : "Contratos"},
                        {field :"Cartas A" },
                        {field :"Cartas B" }
                    ]
                }
            },
            {
                display: "-Peso da produção própria na produção total dos comerciantes",
                linkData: {
                    filters: {
                        Tabs: {
                            Autorização: [
                                {
                                    key: 'n_cartas_CartasA',
                                    displayKey: "Cartas A",
                                    inputType: "text"
                                },
                                {
                                    key: 'n_cartas_CartasB',
                                    displayKey: "Cartas B",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
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
                    dropDownKey:[
                        {key : "pipas"},
                        {key : "dipas"},
                        {key : "gipas"}
                    ],
                    instructMessage:"O critério de seleção de Entidades é terem compras na DCP. A indicação das empresas que pertençam a um dado grupo, usado no apuramento das áreas e classificação correta da produção (Própria ou Comprada), é feita no menu Tabelas Auxiliares > Grupos de Empresas.",
                    TitleBartitle: "Peso da produção própria na produção total dos comerciantes",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    notAction : true,
                    groupfield: [
                        {field : "Contratos"},
                        {field :"Cartas A" },
                        {field :"Cartas B" }
                    ]
                }
            },
            {
                display: "-Confronto entre valores declarados no REU e DCP",
                linkData: {
                    filters: {
                        Tabs: {
                            Autorização: [
                                {
                                    key: 'n_cartas_CartasA',
                                    displayKey: "Cartas A",
                                    inputType: "text"
                                },
                                {
                                    key: 'n_cartas_CartasB',
                                    displayKey: "Cartas B",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
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
                    instructMessage:"O critério de seleção de Entidades é terem produção maior ou igual a 5000 litros (Produtos próprios ou comprados). São destacadas as linhas com diferenças acima de 5%. A conversão dos Kg para Litros dos valores declarados no REU é feita na proporção 650/550",
                    TitleBartitle: "Confronto entre valores declarados no REU e DCP",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    notAction : true,
                    groupfield: [
                        {field : "Contratos"},
                        {field :"Cartas A" },
                        {field :"Cartas B" }
                    ]
                }
            },
            {
                display: "-Adegas",
                linkData: {
                    filters: {
                        Tabs: {
                            Autorização: [
                                {
                                    key: 'n_cartas_CartasA',
                                    displayKey: "Cartas A",
                                    inputType: "text"
                                },
                                {
                                    key: 'n_cartas_CartasB',
                                    displayKey: "Cartas B",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
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
                    TitleBartitle: "Adegas",
                    TitleBarlogo: "auditing",
                    dropDownKey:[
                        {key : "kgs"},
                        {key : "lts"},
                        {key : "mtr"}
                    ],
                    TabName: [],
                    notAction : true,
                    groupfield: [
                        {field : "Contratos"},
                        {field :"Cartas A" },
                        {field :"Cartas B" }
                    ]
                }
            },
            {
                display: "-Entidades que declaram Anexo III com menção a Quinta e/ou Casta",
                linkData: {
                    filters: {
                        Tabs: {
                            Autorização: [
                                {
                                    key: 'n_cartas_CartasA',
                                    displayKey: "Cartas A",
                                    inputType: "text"
                                },
                                {
                                    key: 'n_cartas_CartasB',
                                    displayKey: "Cartas B",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
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
                    TitleBartitle: "Entidades que declaram Anexo III com menção a Quinta e/ou Casta",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    notAction : true,
                    groupfield: [
                        {field : "Contratos"},
                        {field :"Cartas A" },
                        {field :"Cartas B" }
                    ]
                }
            },
            {
                display: "-Confronto recebimentos teóricos/valores recebidos na prática",
                linkData: {
                    filters: {
                        Tabs: {
                            Autorização: [
                                {
                                    key: 'n_cartas_CartasA',
                                    displayKey: "Cartas A",
                                    inputType: "text"
                                },
                                {
                                    key: 'n_cartas_CartasB',
                                    displayKey: "Cartas B",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
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
                    TitleBarButtonName:"Detalhe DCP",
                    TitleBarpath: "/vindima_page?name=Confronto",
                    TitleBartitle: "Confronto recebimentos teóricos/valores recebidos na prática",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    notAction : true,
                    groupfield: [
                        {field : "Contratos"},
                        {field :"Cartas A" },
                        {field :"Cartas B" }
                    ]
                }
            },
            {
                display: "-Preços praticados na vindima (Base IV e Base V, Estatutos aparentes)",
                linkData: {
                    filters: {
                        Tabs: {
                            Autorização: [
                                {
                                    key: 'n_cartas_CartasA',
                                    displayKey: "Cartas A",
                                    inputType: "text"
                                },
                                {
                                    key: 'n_cartas_CartasB',
                                    displayKey: "Cartas B",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
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
                    TitleBarButtonName:"Detalhe Tipo",
                    TitleBarpath: "/vindima_page?name=Precos",
                    TitleBartitle: "Preços praticados na vindima (Base IV e Base V, Estatutos aparentes)",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    notAction : true,
                    groupfield: [
                        {field : "Contratos"},
                        {field :"Cartas A" },
                        {field :"Cartas B" }
                    ]
                }
            },
            {
                display: "-Distribuição da produção em Base IV (Estatutos aparentes)",
                linkData: {
                    filters: {
                        Tabs: {
                            Autorização: [
                                {
                                    key: 'n_cartas_CartasA',
                                    displayKey: "Cartas A",
                                    inputType: "text"
                                },
                                {
                                    key: 'n_cartas_CartasB',
                                    displayKey: "Cartas B",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
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
                    TitleBarButtonName:"Detalhe por Tipo",
                    TitleBarpath: "/vindima_page?name=Distribuicao",
                    dropDownKey:[
                        {key : "pipas"},
                        {key : "dipas"},
                        {key : "gipas"}
                    ],
                    TitleBartitle: "Distribuição da produção em Base IV (Estatutos aparentes)",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    notAction : true,
                    groupfield: [
                        {field : "Contratos"},
                        {field :"Cartas A" },
                        {field :"Cartas B" }
                    ]
                }
            },
            {
                display: "-Transações Base V - Saldos finais vindima",
                linkData: {
                    filters: {
                        Tabs: {
                            Autorização: [
                                {
                                    key: 'n_cartas_CartasA',
                                    displayKey: "Cartas A",
                                    inputType: "text"
                                },
                                {
                                    key: 'n_cartas_CartasB',
                                    displayKey: "Cartas B",
                                    inputType: "text"
                                }
                            ]
                        },
                        checkbox: []
                    },
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
                    TitleBarButtonName:"Detalhe por Tipo",
                    TitleBarpath: "/vindima_page?name=Transacoes",
                    dropDownKey:[
                        {key : "pipas"},
                        {key : "dipas"},
                        {key : "gipas"}
                    ],
                    TitleBartitle: "Transações Base V - Saldos finais vindima",
                    TitleBarlogo: "auditing",
                    TabName: [],
                    notAction : true,
                    groupfield: [
                        {field : "Contratos"},
                        {field :"Cartas A" },
                        {field :"Cartas B" }
                    ]
                }
            }
        ]
    }
]


class VindimaReportPage extends React.Component{
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
        window.location = "/vindima_report?m=" + mainIndex + "&s=" + subIndex;
        return;
    }

    updateYear = (year) => {
        this.setState({
            year: year
        })
    }

    processJson = (data,formName) => {
        let returnData = [];
        let { year } = this.state
        if(formName === 'Análise entregas entre 2 campanhas'){
            let dataRow = {}
            data.map((_row,i)=>{
                if(!dataRow[_row.n_entidade]){
                    dataRow[_row.n_entidade] = {}
                }
                dataRow[_row.n_entidade]['n_entidade'] = _row.n_entidade
                dataRow[_row.n_entidade]['entidade'] =  _row.entidade
                if(Number(_row.year) === year){
                    dataRow[_row.n_entidade][`currentYear`] =  Number(_row.year)
                    dataRow[_row.n_entidade][`branco_2`] =  _row.branco
                    dataRow[_row.n_entidade][`tinto_2`] =  _row.tinto
                    dataRow[_row.n_entidade][`moscatel_2`] =  _row.moscatel
                    dataRow[_row.n_entidade][`total_2`] = ( parseInt(_row.branco) + parseInt(_row.tinto) + parseInt(_row.moscatel))
                }
                if(Number(_row.year) === year-1){
                    dataRow[_row.n_entidade][`prevYear`] =  Number(_row.year)
                    dataRow[_row.n_entidade][`branco_1`] =  _row.branco
                    dataRow[_row.n_entidade][`tinto_1`] =  _row.tinto
                    dataRow[_row.n_entidade][`moscatel_1`] =  _row.moscatel
                    dataRow[_row.n_entidade][`total_1`] = ( parseInt(_row.branco) + parseInt(_row.tinto) + parseInt(_row.moscatel))
                }
                if(dataRow[_row.n_entidade][`total_1`] && dataRow[_row.n_entidade][`total_2`]){
                    dataRow[_row.n_entidade]['diff_branco'] = parseInt(dataRow[_row.n_entidade][`branco_2`]) - parseInt(dataRow[_row.n_entidade][`branco_1`])
                    dataRow[_row.n_entidade]["diff_tinto"] =  parseInt(dataRow[_row.n_entidade][`tinto_2`]) - parseInt(dataRow[_row.n_entidade][`tinto_1`])
                    dataRow[_row.n_entidade]['diff_moscatel'] =  parseInt(dataRow[_row.n_entidade][`moscatel_2`]) - parseInt(dataRow[_row.n_entidade][`moscatel_1`])
                    dataRow[_row.n_entidade]['diff_total'] = parseInt(dataRow[_row.n_entidade][`total_2`]) - parseInt(dataRow[_row.n_entidade][`total_1`])
                }
            })
            Object.keys(dataRow).map((_key,index)=>{
                returnData.push(dataRow[_key])
            })
        }
        return returnData
    }

    render() {
        console.log("VindimaLinkData", this.state.linkData)
        return (
            <div className="dashboard">
                <NavBar date={new Date()} linkData={this.state.linkData} year={this.state.year} updateYear={(year) => this.updateYear(year)} />
                <SideBar Administration={Administration} />
                <div className="container-fluid">
                    <VindimaReport processJson={(data,formName)=>this.processJson(data,formName)} selectedMainOption={this.state.selectedMainOption} date={new Date()} year={this.state.year} changeOption={(mainIndex, subIndex) => this.changeOption(mainIndex, subIndex)} optionMenuArray={optionMenuArray} linkData={this.state.linkData} selectedtitelotion={this.state.selectedtitelotion} />
                </div>
            </div>
        )
    }
}



export default VindimaReportPage;