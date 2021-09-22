import React from 'react';
// import NavBar from '../../components/common/navbar';
// import SideBar from '../../components/modules/left_sidebar';
import CreateUserComponent from '../../components/UserList/CreateUser/create_user_component';
// import FormNavbar from '../../components/common/wizard_navbar';
// import FormleftNev from '../../components/common/FormleftNev';
const InputFieldsAll= {
    PersonalDetails:[
        {
            key : "FullName",
            type : "text",
            display : "Full Name"
        },
        {
            key : "DisplayName",
            type : "text",
            display : "Display Name"
        },
        {
            key : "DOB",
            type : "date",
            display : "DOB"
        },
        {
            key : "status",
            type : "dropdown",
            display : "Estado de utilizador",
            dropdownData: {1: 'Ativo',
                           2: 'Inativo'}
        }
       
    ],
    Contatos:[
        {
            key : "Email",
            type : "text",
            display : "Email"
        },
        {
            key : "ContactNumber",
            type : "number",
            display : "Contact Number"
        },
       
    ],
    OtherDetails:[
        {
            key : "Password",
            type : "password",
            display : "Password"
        },
        {
            key : "Notes",
            type : "text",
            display : "Notes"
        },
        {
            key : "designation",
            type : "dropdown",
            display : "Designation"
        },
       
    ]
    
}


class CreateUserPage extends React.Component{
    render(){
        return (
            <CreateUserComponent  {...this.props} InputFieldsAll={InputFieldsAll}/>
        )
    }
}

export default CreateUserPage;