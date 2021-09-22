import React from 'react';
import EstatosDetailComponent from '../../components/Estatos/estatos_details';
import Lang from '../../lang'



const InputFieldsAll= {
    Detalhes:[
        // {
        //     key : "codEstatuto",
        //     type : "dropdown",
        //     display : Lang.langCheck.langRequest("Cod Estatuto")
        // },
        {
            key : "currentAccount",
            type : "checkbox",
            display : Lang.langCheck.langRequest("Conta Corrente")
        },
        {
            key : "moduleFiscalization",
            type : "checkbox",
            display : Lang.langCheck.langRequest("Módulo Fiscalização")
        },
        {
            key : "moduleHarvard",
            type : "checkbox",
            display : Lang.langCheck.langRequest("Módulo Vindima")
        },
        {
            key : "moduleParcel",
            type : "checkbox",
            display : Lang.langCheck.langRequest("Módulo Parcela")
        },
        {
            key : "moduloConvocatoria",
            type : "checkbox",
            display : Lang.langCheck.langRequest("Módulo Convocatoria")
        },
    ],
    Descrição : [
        {
            key : "description",
            type : "text",
            display : "Descrição"
        }
    ]
}


class EstatosDetailPage extends React.Component{
    render(){
        return (
            <EstatosDetailComponent  id={this.props} InputFieldsAll={InputFieldsAll}/>
        )
    }
}

export default EstatosDetailPage;