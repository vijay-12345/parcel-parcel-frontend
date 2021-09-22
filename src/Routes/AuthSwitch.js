import React from 'react';
import {Switch , Route, Redirect} from 'react-router-dom';
import UserLoginPage from '../Pages/LoginPage/login';
import ForgotPassPage from '../Pages/ForgotPassPage/forgot_password_page';
import ResetPassPage from '../Pages/ResetPassPage/reset_pass_page';
import SsoPage from '../Pages/LoginPage/sso_page';


class AuthSwitch extends React.Component{
    render(){
        console.log('Login page')
        return (
            <Switch>
                <Route exact path='/' render={()=>(<Redirect to='/login'/>)}/>
                <Route exact path='/login' component={UserLoginPage} />
                <Route path='/forgot_password' component={ForgotPassPage} />
                <Route path='/reset_password' component={ResetPassPage} />
                <Route path='/sso_page' component={SsoPage} />
            </Switch>
        )
    }
}

export default AuthSwitch;
