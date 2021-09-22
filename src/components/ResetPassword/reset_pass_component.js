import React from 'react';
import services from '../../services';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { Input } from '@progress/kendo-react-inputs';
import Lang from '../../lang'

class ResetPassComponent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email : '',
            new_pass : ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if(this.state.email === '' || this.state.new_pass === ''){
            toast.error(Lang.langCheck.langRequest("Enter Email and Password"))
        }else if(this.state.email !=='' && !reg.test(this.state.email)){
            toast.error(Lang.langCheck.langRequest("Enter Correct Email"))
        }else{
            let data = {
                UserName : this.state.email,
                password : this.state.new_pass
            }
            let _r = await services.apiCall.requestApi('/Login/updatepassword',data,'post')
            if(_r){
                toast.success("Senha atualizada com sucesso");
                this.props.history.push({
                    pathname : '/login'
                })
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
                        <h2>Redefinir Senha</h2>
                        <div className="login-details-form">
                    
                        {/* <h3 className="reset">Reset Password</h3> */}
                            <div className="tab-content">
                            <div className="tab-pane container active" id="first">
                                <form id="form">
                                <div className="input-box active-grey">
                                    {/* <label className="input-label">Email</label>
                                    <input type="text" name="email" value={this.state.email} onChange={this.handleChange} className="input-1"  placeholder="abc@gmail.com" /> */}
                                    <Input
                                        type="text"
                                        style={{ width: "100%" }}
                                        className="input-1"
                                        label="Utilizador"
                                        name="email"
                                        onChange={this.handleChange}
                                        value={this.state.email}
                                    />
                                </div>
                                <div className="input-box active-grey position-relative">
                                    {/* <label className="input-label">New Password</label>
                                    <input type="password" name="new_pass" value={this.state.new_pass} onChange={this.handleChange} placeholder="Enter New Password" className="input-1" onfocus="setFocus(true)" onblur="setFocus(false)" /> */}
                                    <Input
                                        type="password"
                                        name="new_pass"
                                        style={{ width: "100%" }}
                                        className="input-1"
                                        label="Palavra-passe"
                                        onChange={this.handleChange}
                                        value={this.state.new_pass}
                                    />
                                </div>
                                <button type="button" onClick={this.handleSubmit} className="btn w-100 theme-btn mb-4">Confirmar</button>
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

export default withRouter(ResetPassComponent);