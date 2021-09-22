import React from 'react';
import Lang from '../../lang'
import EntityRuleFormComponent from '../../components/EntityRule/entity_rule_form_component';



const InputFieldsAll= {
    Detalhes:[
        {
            key : "codEntidadeName",
            type : "dropdown1",
            display : Lang.langCheck.langRequest("Lista de Entidades")
        },
        {
            key : "codEstatutoName",
            type : "dropdown",
            display : Lang.langCheck.langRequest("Lista de regras")
        },
    ]
}


class EntityRuleFormPage extends React.Component{
    render(){
        return (
            <EntityRuleFormComponent  id={this.props} InputFieldsAll={InputFieldsAll}/>
        )
    }
}

export default EntityRuleFormPage;