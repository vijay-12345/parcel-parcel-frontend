import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import services from '../../services';
import { Input } from '@progress/kendo-react-inputs';
import Lang from '../../lang'


class ForgotPasswordComponent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email : ''
        }
    }

    handleChange = (e) => {
        this.setState({
            email : e.target.value
        })
    }

    handleForgot = async (e) => {

        e.preventDefault();
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(this.state.email === ''){
            toast.error(Lang.langCheck.langRequest("Enter Your Email"))
        }else if(this.state.email !== '' && !reg.test(this.state.email)){
            toast.error(Lang.langCheck.langRequest("Enter Correct Email"))
        }else{
            let _r = await services.apiCall.requestApi('/Login/forgotpassword',{UserName : this.state.email},'post');
            if(_r){
                toast.success("Redefina o link da senha enviada para o seu email com sucesso.")
            }
        }
    }

    render(){
        return (
            <div className="login_home">
                <div className="container">
                <div className="row">
                    <div className="col-md-6 order-2 order-md-1">
                    <div className="login-box">
                        <img src="imgs/logo.png" alt="" />
                        {/* <h2>Bem-vindo, <br/> Inicie a sua sessão.</h2> */}
                        <h2>Recuperação de acesso</h2>
                        <div className="login-details-form">
                        {/* <h3 className="reset">Forget Password</h3> */}
                            <div className="tab-content">
                            <div className="tab-pane container active" id="first">
                                <form id="form">
                                <div className="input-box active-grey">
                                    {/* <label className="input-label">Email</label> */}
                                    {/* <input type="text" className="input-1" value={this.state.email} onChange={this.handleChange}  placeholder="abc@gmail.com" /> */}
                                    <Input
                                        type="text"
                                        style={{ width: "100%" }}
                                        className="input-1"
                                        label="Utilizador"
                                        onChange={this.handleChange}
                                        value={this.state.email}
                                    />
                                </div>
                                
                                <button type="button " onClick={this.handleForgot} className="btn w-100 theme-btn">Confirmar</button>
                                <p className="term-contion"><Link to="/login">Iniciar Sessão</Link></p>
                                </form>
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

export default ForgotPasswordComponent;