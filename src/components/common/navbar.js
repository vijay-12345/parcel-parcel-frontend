import React from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import { Select } from 'antd';
import OpenAndCloseCashier from './OpenAndCloseCashier';
var moment = require('moment')
const { Option } = Select;

class NavBar extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         yearlist: null
      }
   }

   componentDidMount() {
      this.yearOptions();
   }
   componentDidUpdate(preProps) {
      if (this.props.date && preProps.date != this.props.date) {
         this.yearOptions();
      }
   }

   handleLogout = () => {
      window.localStorage.removeItem('token');
      window.location = '/'
   }

   updateYear = (e) => {
      this.props.updateYear(e)
   }

   yearOptions() {
      let year = new Date();
      year = year.getFullYear();
      let Preyear = year - 20;
      let yearlistArray = [];
      this.setState({
         yearlist: null
      })
      if (this.props.linkData && this.props.linkData.navbarOptionsYear) {
         while (Preyear <= year) {
            yearlistArray.push(year);
            year--;
         }
         let yearlist = yearlistArray.map((_r, i) => (
            <Option value={_r}> {_r} </Option>
         ))
         this.setState({
            yearlist: yearlist
         })
      }
   }

   render() {

      return (
         <nav className="navbar navbar-expand-md  navbar-dark justify-content-end">
            <div className="container-fluid">


               <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                  <span className="navbar-toggler-icon"></span>
               </button>

               <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                  {
                     this.state.yearlist &&
                     <>
                        <label className="mr-2">Campanha</label>
                        <Select className='mr-2' style={{ width: "100px" }} onChange={(e) => this.updateYear(e)} value={this.props.year} showSearch placeholder="Years" optionFilterProp="children" >
                           {
                              this.state.yearlist
                           }
                        </Select>
                     </>
                  }
                  {
                     this.props.linkData && this.props.linkData.OpenAndCloseCashier &&
                     <OpenAndCloseCashier  date={new Date()}/>
                  }
   
                  <ul className="navbar-nav custom-menu float-right mr-4">
                     <li className="nav-item dropdown">
                        <a className="nav-link " href="#" id="navbardrop" data-toggle="dropdown">
                           {/* <span className="d-inline-block first-icon  bg-well"><i className="fas fa-bell"></i></span> */}
                           <span className="d-inline-block first-icon k-icon k-i-notification"></span>
                        </a>
                        <div className="dropdown-menu well-alert">
                           <a className="dropdown-item" href="#">
                              <span className="content">
                                 <p className="theme-color mb-2">Alertas</p>
                                 <p className="d-flex justify-content-between">
                                    <span>Reinaldo Farujo</span>
                                    <span className="pl-2">25/4</span>
                                 </p>
                                 <p className="small">Instituto dos Vinhos do Douro e do Porto</p>
                              </span>
                           </a>
                           <a className="dropdown-item" href="#">
                              <span className="content">

                                 <p className="d-flex justify-content-between">
                                    <span>Reinaldo Farujo</span>
                                    <span>25/4</span>
                                 </p>
                                 <p className="small">Instituto dos Vinhos do Douro e do Porto</p>
                              </span>
                           </a>
                        </div>
                     </li>
                  </ul>

                  <ul className="navbar-nav custom-menu float-right mr-2 user-alert-head">
                     <li className="nav-item dropdown">
                        <a className="nav-link d-flex justify-content-between" href="#" id="navbardrop" data-toggle="dropdown">
                           <span className="d-inline-block first-icon">{window.localStorage.getItem('username').substr(0, 2).toUpperCase()}</span>
                           <div className="dropdown-toggle">
                              <span>{window.localStorage.getItem('username')}</span>
                           </div>
                        </a>
                        <div className="dropdown-menu user-alert">
                           <a className="dropdown-item" href="#">
                              <span className="content">
                                 <p>{window.localStorage.getItem('username')}</p>
                                 <p className="small">Instituto dos Vinhos do Douro e do Porto</p>
                              </span>
                           </a>
                           <a onClick={this.handleLogout} className="dropdown-item" href="#">
                              <span className="content">
                                 <p>Sair <span className="float-right mt-1 k-icon k-i-logout"></span></p>
                              </span>
                           </a>
                        </div>

                     </li>

                  </ul>
               </div>
            </div>
         </nav>
      )
   }
}

export default NavBar;