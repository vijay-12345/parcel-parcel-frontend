import React from 'react';
import AppSwitch  from './Routes/AppSwitch'
import AuthSwitch from './Routes/AuthSwitch'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {__getUserCredential } from './store/actions/login_action'
const loadingPanel = (
  <div className="k-loading-mask Display_loadiing">
      <span className="k-loading-text">Loading</span>
      <div className="k-loading-image"></div>
      <div className="k-loading-color"></div>
  </div>
  )
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn : window.localStorage.getItem('token') ? true : false
    }
  } 

  componentDidMount(){
    window.localStorage.setItem('vpn',1);
    if(!window.localStorage.getItem('username')){
      window.localStorage.setItem('username',"test")  
   }
   if(!window.localStorage.getItem('Local')){
    window.localStorage.setItem('Local', "");
   }
  }
  

  render(){
    console.log('Testing Redux',this.props)
    return (
      <div>
        {this.state.isLoggedIn ? <AppSwitch /> : <AuthSwitch />}
        {loadingPanel}
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
      __getUserCredential
    },
    dispatch
  )


export default connect(mapStateToProps,mapDispatchToProps)(App);