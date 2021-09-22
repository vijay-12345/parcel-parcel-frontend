import React from 'react';
import FormNavBar from '../../components/common/wizard_navbar';
import WizardEditFormComponent from '../../components/MainPageComponent/wizard_edit_form';


class WizardEditFormPage extends React.Component{
    render(){
        return (
            <div className="dashboard">
                <FormNavBar />
                <WizardEditFormComponent />
            </div>
        )
    }
}


export default WizardEditFormPage;