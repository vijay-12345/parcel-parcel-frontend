import React from 'react';
import {Switch , Route, Redirect} from 'react-router-dom'
import DashBoardPage from '../Pages/MainPages/Dashboard'
import WizardFormPage from '../Pages/MainPages/WizardForm'
import WizardEditFormPage from '../Pages/MainPages/WizardEditForm'
import UserListPage from '../Pages/UserListPage/user_list_page';
import CreateUserPage from '../Pages/UserListPage/create_user_page';
import AdminDashboardAudit from '../Pages/MainPages/AdminDashboardAudit';
import AdminDashboardGroupPage from '../Pages/Group/AdminDashboardGroup';
import AdminDashboardGroupUserPage from '../Pages/Group/AdminDashboardGroupUser';
import AdminDashboardPermissions from '../Pages/Group/AdminDashboardPermissions';

import Schedule from '../Pages/MainPages/Schedule';
import ScheduleDetailPage from '../Pages/SchedulePage/schedule_detail_page';
import ScheduleCalenderPage from '../Pages/SchedulePage/schedule_calender_page';
import CreateSchedulePage from '../Pages/SchedulePage/create_schedule';

import DemoTable from '../Pages/Demo/table';
import EstotusListPage from '../Pages/EstotusPage/estotus_list_page';
import EstatosDetailPage from '../Pages/EstotusPage/estotus_detail_page';
import EntityRuleListPage from '../Pages/EntityRule/entity_rule_list_page';
import EntityRuleFormPage from '../Pages/EntityRule/entity_rule_form_page';
import VidimaMainPage from '../Pages/VidimaModule/vidima_Conta_de_Produtor_page';
import TesourariaReceitas from '../components/Revenue/TesourariaReceitas';
import TesourariaConta from '../components/Revenue/TesourariaConta';
import TesourariaFaturas from '../components/Revenue/TesourariaFaturas';
import VindimaAutorizacaoPage from '../Pages/VidimaModule/vindima_Autorização_page';
import VindimaRegistoPage from '../Pages/VidimaModule/vindima_Registo_page';
import VindimaDeclaracaoPage from '../Pages/VidimaModule/vindima_Declaração_page';
import VindimaReportPage from '../Pages/VidimaModule/vindima_report_page';
import VindimaSecondScreenComponent from '../components/VidimaModule/vindimaSecondScreenComponent';
import ReceitasSecondScreen from '../components/Revenue/ReceitasSecondScreen';
import RecaboDeAdiantamento from '../components/Revenue/RecaboDeAdiantamento';
import Cashier from '../components/Revenue/Cashier';
import GeneralAccount from '../components/Revenue/GeneralAccount';
import TesourariaGerfip from '../components/Revenue/TesourariaGerfip';


class AppSwitch extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log("sdfg",this.props)
        return (
            <Switch>
                <Route exact path='/' render={()=>(<Redirect to="/dashboard"/>)} />
                <Route exact path='/dashboard' component={DashBoardPage} />
                
                <Route path='/wizard_form' component={WizardFormPage} />
                <Route path='/wizard_edit_form' component={WizardEditFormPage} />
                
                <Route path='/user_list' component={UserListPage} />
                <Route path='/create_user' component={CreateUserPage} />

                <Route path='/admin_dashboard_estato' component={EstotusListPage} />
                <Route path='/estato_detail' component={EstatosDetailPage} />

                <Route path='/entity_rule_list' component={EntityRuleListPage} />
                <Route path='/entity_rule_form' component={EntityRuleFormPage} />
                
                <Route path='/admin_dashboard_audit' component={AdminDashboardAudit} />
                 
                <Route path='/admin_dashboard_groups' component={AdminDashboardGroupPage} />
                <Route path='/admin_dashboard_group_user' component={AdminDashboardGroupUserPage} />
                <Route path='/admin_dashboard_permissions' component={AdminDashboardPermissions} />
                
                <Route path='/schedule' component={Schedule} />            
                <Route path='/schedule_detail' component={ScheduleDetailPage} />
                <Route path='/schedule_calender_show' component={ScheduleCalenderPage} />
		        <Route path='/create_schedule' component={CreateSchedulePage} />
                <Route path='/create_schedule/:id' component={CreateSchedulePage} />
                <Route path='/admin_demo' component={DemoTable} />
                

                {/* Vidima Routes */}
                <Route path='/vindima_Conta_de_Produtor' component={VidimaMainPage} />
                <Route path='/vindima_authorizacao' component={VindimaAutorizacaoPage} />
                <Route path='/vindima_registo' component={VindimaRegistoPage} />
                <Route path='/vindima_declaracao' component={VindimaDeclaracaoPage} />
                <Route path='/vindima_report' component={VindimaReportPage} />
                <Route path='/vindima_page' component={VindimaSecondScreenComponent} />

                {/*Revenue*/}
                <Route path='/revenue_receitas' component={TesourariaReceitas} />
                <Route path='/revenue_conta' component={TesourariaConta} />
                <Route path='/revenue_faturas' component={TesourariaFaturas} />
                <Route path='/revenue_page' component={ReceitasSecondScreen} />
                <Route path='/recabo_de_adiantamento' component={RecaboDeAdiantamento} />
                <Route path='/cashier' component={Cashier} />
                <Route path='/gerfip' component={TesourariaGerfip} />
                <Route path='/general_account' component={GeneralAccount} />
                
                
        </Switch>
        )
    }
}

export default AppSwitch;
