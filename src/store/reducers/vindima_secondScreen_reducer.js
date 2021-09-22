const defaultState = {
    linkData: {
        link: '',
        requestMethod: '',
        columnkeyMap: {},
        filters: {},
        TitleBartitle: '',
        TitleBarlogo: "",
        dropDownKey: [],
        actionbuttons: { Edit: false, Redirect: false, Delete: false, detailPopUp: false },
        groupfield: [],
        navbarOptionsYear: true,
        instructMessage: '',
        notAction: true,
        popUpTabName: '',
        prevPageName: '',
        prevPageLink: ''
    }
}


export default (state = defaultState, action) => {
    switch (action.type) {
        case 'GET_DATA_OF_VINIFICACAO':
            return {
                ...state,
                linkData: {
                    ...state.linkData,
                    link: '/Vindima/ImportedPaymentFiles/GetAll',
                    requestMethod: 'post',
                    columnkeyMap: {
                        "n_ficheiro": "Nº Ficheiro",
                        "entidade": "Entidade",
                        "ficheiro": "Ficheiro",
                        "n_rec": "Nº Rec",
                        "valor_total": "Valor total",
                        "estado": "Estado"
                    },
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
                    TitleBartitle: 'Entidades que vinificam em locais com entreposto fiscal',
                    TitleBarlogo: "auditing",
                    prevPageName: 'Produção por centro de vinificação',
                    prevPageLink: '/vindima_report?m=0&s=9',
                    dropDownKey: [
                        { key: "pipas" },
                        { key: "dipas" },
                        { key: "gipas" }
                    ],
                    groupfield: [
                        { field: "Entidade" },
                        { field: "Estado" },
                    ]
                }
            }
        case 'GET_DATA_OF_CONFRONTO':
            return {
                ...state,
                linkData: {
                    ...state.linkData,
                    link: '/Vindima/ImportedPaymentFiles/GetAll',
                    requestMethod: 'post',
                    columnkeyMap: {
                        "n_ficheiro": "Nº Ficheiro",
                        "entidade": "Entidade",
                        "ficheiro": "Ficheiro",
                        "n_rec": "Nº Rec",
                        "valor_total": "Valor total",
                        "estado": "Estado"
                    },
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
                    prevPageName: 'Confronto recebimentos teóricos/valores recebidos na prática',
                    prevPageLink: '/vindima_report?m=0&s=14',
                    notAction: false,
                    actionbuttons: { Edit: false, Redirect: false, Delete: false, detailPopUp: true },
                    popUpTabName:'Comentários associados',
                    TitleBartitle: 'Detalhe por DCP',
                    TitleBarlogo: "auditing",
                    groupfield: [
                        { field: "Entidade" },
                        { field: "Estado" },
                    ],
                    instructMessage: 'Dependendo do intervalo, a consulta pode demorar vários minutos. Para além disso serão colocadas em estado de cobradas as DCPs que não tenham valores para cobrar e estejam em cobrança e recolocadas em cobrança as DCPs com diferenças nos valores cobrados/calculados e que estavam dadas como cobradas (tolerância de 0,05€).'
                }
            }
        case 'GET_DATA_OF_DISTRIBUICAO':
            return {
                ...state,
                linkData: {
                    ...state.linkData,
                    link: '/Vindima/ImportedPaymentFiles/GetAll',
                    requestMethod: 'post',
                    columnkeyMap: {
                        "n_ficheiro": "Nº Ficheiro",
                        "entidade": "Entidade",
                        "ficheiro": "Ficheiro",
                        "n_rec": "Nº Rec",
                        "valor_total": "Valor total",
                        "estado": "Estado"
                    },
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
                    prevPageName: 'Distribuição da produção em Base IV (Estatutos aparentes)',
                    prevPageLink: '/vindima_report?m=0&s=16',
                    TitleBartitle: 'Detalhe por Tipo',
                    TitleBarlogo: "auditing",
                    dropDownKey: [
                        { key: "pipas" },
                        { key: "dipas" },
                        { key: "gipas" }
                    ],
                    groupfield: [
                        { field: "Entidade" },
                        { field: "Estado" },
                    ]
                }
            }
        case 'GET_DATA_OF_TRANSACOES':
            return {
                ...state,
                linkData: {
                    ...state.linkData,
                    link: '/Vindima/ImportedPaymentFiles/GetAll',
                    requestMethod: 'post',
                    columnkeyMap: {
                        "n_ficheiro": "Nº Ficheiro",
                        "entidade": "Entidade",
                        "ficheiro": "Ficheiro",
                        "n_rec": "Nº Rec",
                        "valor_total": "Valor total",
                        "estado": "Estado"
                    },
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
                    prevPageName: 'Transações Base V - Saldos finais vindima',
                    prevPageLink: '/vindima_report?m=0&s=17',
                    notAction: false,
                    actionbuttons: { Edit: false, Redirect: false, Delete: false, detailPopUp: true },
                    TitleBartitle: 'Detalhe por Tipo',
                    TitleBarlogo: "auditing",
                    popUpTabName:'Detalhes movimento',
                    dropDownKey: [
                        { key: "pipas" },
                        { key: "dipas" },
                        { key: "gipas" }
                    ],
                    groupfield: [
                        { field: "Entidade" },
                        { field: "Estado" },
                    ]
                }
            }
        case 'GET_DATA_OF_PRECOS':
            return {
                ...state,
                linkData: {
                    ...state.linkData,
                    link: '/Vindima/ImportedPaymentFiles/GetAll',
                    requestMethod: 'post',
                    columnkeyMap: {
                        "n_ficheiro": "Nº Ficheiro",
                        "entidade": "Entidade",
                        "ficheiro": "Ficheiro",
                        "n_rec": "Nº Rec",
                        "valor_total": "Valor total",
                        "estado": "Estado"
                    },
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
                    prevPageName: 'Preços praticados na vindima (Base IV e Base V, Estatutos aparentes)',
                    prevPageLink: '/vindima_report?m=0&s=15',
                    notAction: false,
                    actionbuttons: { Edit: false, Redirect: false, Delete: false, detailPopUp: true },
                    popUpTabName:'Preço de Vindima (Detalhe por Entidade)',
                    TitleBartitle: 'Detalhes por tipo de produto',
                    TitleBarlogo: "auditing",
                    dropDownKey: [
                        { key: "pipas" },
                        { key: "dipas" },
                        { key: "gipas" }
                    ],
                    groupfield: [
                        { field: "Entidade" },
                        { field: "Estado" },
                    ]
                }
            }
        default:
            return {
                ...state
            }
    }
}