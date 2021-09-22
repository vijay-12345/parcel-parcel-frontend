import React from 'react';
import {__updateUserCredential} from '../../store/actions/login_action'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import services from '../../services';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Input } from '@progress/kendo-react-inputs';
import Lang from '../../lang'



class UserLogin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            UserName : '',
            Password : '',
            type : 'password',
        }
    }

    componentDidUpdate(){
        console.log("update")
        // services.lablecheck.setlable();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleShowHide = () => {
        this.setState({
            type : this.state.type === 'password' ? 'text' : 'password'
        })
    }

    handleSubmit = async () => {
        
            let data = {
                UserName : this.state.UserName,
                password : this.state.Password
            }
            let _r = await services.apiCall.requestApi('User/authenticate',data,'post');
            if(_r){
                toast.success("Login efetuado com sucesso");
                let token='';
                if(_r.user){
                   
                    token= _r.user.token
                    window.localStorage.setItem('token',token);
                    window.localStorage.setItem('nav_bar','/dashboard')
                    if(_r.user.fullName){
                        window.localStorage.setItem('username',_r.user.fullName)
                    }else{
                        window.localStorage.setItem('username',`${_r.user.firstName} ${_r.user.lastname}`)
                    }
                    window.location = '/'
                }             
            }
    }

    handleSSOLogin = async () => {
        // let _r = await services.apiCall.requestApi('Loginsso/authenticate',{},'post');
        // if(_r){
        //     console.log("hii",_r)
        //     window.location = _r
        // }
        // return
        let link = document.createElement('a');
        link.target = '_blank';
        link.href = 'https://login.microsoftonline.com/e69bb1d7-6ec5-4add-995b-400ca94ec539/oauth2/authorize?client_id=1a33dded-dcf3-4413-b855-25a1ba84549c&response_type=code&response_mode=query&prompt=admin_consent&resource_id=https://enukesoftware.com/IVPD2';
        link.click();
        // window.location = 'https://login.microsoftonline.com/e69bb1d7-6ec5-4add-995b-400ca94ec539/oauth2/authorize?client_id=1a33dded-dcf3-4413-b855-25a1ba84549c&response_type=code&response_mode=query&prompt=admin_consent&resource_id=https://enukesoftware.com/IVPD2'
    }

    render(){
        return (
            <div className="login_home">
                <div className="container">
                <div className="row">
                    <div className="col-md-6 order-2 order-md-1">
                    <div className="login-box">
                        <img src="imgs/logo.png" alt="" />
                        <h2>Bem-vindo, <br/> Inicie a sua sessão.</h2>
                        <div className="login-details-form">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <a className="nav-link active" data-toggle="tab" href="#first">Utilizador</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#second">SSO</a>
                                </li>
                            </ul>

                            <div className="tab-content">
                            <div className="tab-pane container active" id="first">
                                <form id="form">
                                <div className="input-box active-grey">
                                    {/* <label className="input-label">Utilizador</label> */}
                                    {/* <input type="text" className="input-1" name='UserName'  placeholder="abc@gmail.com" value={this.state.UserName} onChange={this.handleChange} /> */}
                                    <Input
                                        name="UserName"
                                        style={{ width: "100%" }}
                                        className="input-1"
                                        label="Utilizador"
                                        onChange={this.handleChange}
                                        value={this.state.UserName}
                                    />
                                </div>
                                <div className="input-box active-grey position-relative eye-input">
                                    {/* <label className="input-label">Palavra-passe</label>
                                    <input type={this.state.type} placeholder="*****" className="input-1" name='password' value={this.state.password} onChange={this.handleChange} onfocus="setFocus(true)" onblur="setFocus(false)" /> */}
                                    <Input
                                        name="Password"
                                        type={this.state.type}
                                        style={{ width: "100%" }}
                                        className="input-1"
                                        label="Palavra-passe"
                                        onChange={this.handleChange}
                                        value={this.state.Password}
                                    />
                                    <span className="eye-icon" onClick={this.handleShowHide}>{this.state.type === 'password' ? <i className="fas fa-eye"></i> : <i className="fa fa-eye-slash"></i>}</span>
                                </div>
                                <button type="button" onClick={()=>this.handleSubmit()} className="btn w-100 theme-btn">Aceder</button>
                                <p className="term-contion">Esqueci-me do acesso <Link to="/forgot_password"> Recuperar</Link></p> 
                                </form>
                            </div>
                            <div className="tab-pane container fade" id="second">
                               
                                {/* <div className="input-box active-grey">
                                    <label className="input-label">Utilizador</label>
                                    <input type="text" className="input-1" placeholder="abc@gmail.com"  />
                                </div>
                                <div className="input-box active-grey position-relative eye-input">
                                    <label className="input-label">Palavra-passe</label>
                                    <input type="password" placeholder="*****" className="input-1" onfocus="setFocus(true)" onblur="setFocus(false)" />
                                    <a className="eye-icon" href="#"><i className="fas fa-eye"></i></a>
                                </div> */}
                                <button type="button " className="btn w-100 theme-btn" onClick={this.handleSSOLogin}>Aceder</button>
                                {/* <p className="term-contion">Esqueci-me do acesso <Link to="/forgot_password"> Recuperar</Link></p>  */}
                               
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-6 order-1 order-md-2">
                    <h1 className="display">
                        Instituto dos <br/> vinhos do <span>Douro</span> e <br/> do <span>Porto.</span>
                    </h1>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ login }) => ({
    ...login
  })
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        __updateUserCredential
      },
      dispatch
    )
  

export default connect(mapStateToProps,mapDispatchToProps)(UserLogin);