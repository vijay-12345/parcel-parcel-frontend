import React from 'react';
import { Button } from '@progress/kendo-react-buttons'
import { withRouter, Link } from 'react-router-dom';
import lang from '../../lang';





class TitleBar extends React.Component {

    handleRouting = () => {
        // this.props.history.push({
        //     pathname: `${this.props.path}`
        // })
        window.location.href = `${this.props.path}`
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-8 order-sm-1 order-2">
                    <div className="heading d-md-flex align-items-center">
                        {/* <img src="imgs/icon1_gray.png" alt=""/> */}
                        <span className={`sivdp-icon sivdp-${this.props.logo} font-23 mr-3 ml-2 text-grey`}></span>
                        <h3>{this.props.title}</h3>
                        {
                            this.props.linkData && this.props.linkData.TitleBarPopUpButton &&
                            <Button data-toggle="modal" data-target="#vindima-Registar" primary={true} className="k-button btn-theme mr-2  k-primary">+ Registar Impressão</Button>
                        }
                        {
                            this.props.path ? (
                                this.props.TitleBarButtonName ?
                                    <Button onClick={() => this.handleRouting()} primary={true} className="k-button btn-theme mr-2  k-primary">{this.props.TitleBarButtonName}</Button>
                                    :
                                    <Button onClick={() => this.handleRouting()} primary={true} className="k-button btn-theme mr-2  k-primary">+ INSERIR</Button>
                            )
                                :
                                ''
                        }
                        {
                          this.props.linkData &&  this.props.linkData.nevOptionLinks && 
                            <div className="dropdown">
                                <Button primary={true} className="k-button btn-theme mr-2 k-primary dropdown-toggle" data-toggle="dropdown">
                                    {("Menu").toUpperCase()} <i className="fas fa-sort-down ml-1 mb-1"></i>
                                </Button>
                                <ul className="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                                {
                                    this.props.linkData.nevOptionLinks.map((row)=>(
                                        row.url=== this.props.linkData.currentPath ?
                                        <li className="dropdown-item active"><a href={row.url}>{row.name}</a></li>
                                        :
                                        <li className="dropdown-item"><a href={row.url}>{row.name}</a></li>
                                        
                                    ))
                                }
                                </ul>
                            </div>
                        }
                         {
                          this.props.linkData &&  this.props.linkData.nevOptionChange && 
                            <div className="dropdown">
                                <Button primary={true} className="k-button btn-theme mr-2 k-primary dropdown-toggle" data-toggle="dropdown">
                                    {("Menu").toUpperCase()} <i className="fas fa-sort-down ml-1 mb-1"></i>
                                </Button>
                                <ul className="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                                {
                                    this.props.linkData.nevOptionChange.map((row)=>(
                                        row.name === this.props.linkData.prevPageName ?
                                        <li className="dropdown-item active" 
                                        // onClick={(name,url)=>this.props.changeOption(row.name,row.url )} 
                                        ><a href={row.url+"?u="+row.url+"&p="+row.name+"&t="+row.tableName}>{row.name}</a></li>
                                        :
                                        <li className="dropdown-item" 
                                        //onClick={(name,url)=>this.props.changeOption(row.name,row.url )}
                                         ><a href={row.url+"?u="+row.url+"&p="+row.name+"&t="+row.tableName}>{row.name}</a></li>  
                                    ))
                                }
                                </ul>
                            </div>
                        }
                        



                        {
                            this.props.pageName && this.props.TitleBarButtonName && this.props.TitleBarSecondButtonName &&
                            <>
                            
                                <Button onClick={() => this.props.updateNavDropdown(this.props.TitleBarButtonName, this.props.pageName)} primary={true} className="k-button btn-theme mr-2  k-primary">{
                                lang.langCheck.langRequest(this.props.TitleBarButtonName)
                                }</Button>
                                <Button onClick={() => this.props.updateNavDropdown(this.props.TitleBarSecondButtonName, this.props.pageName)} primary={true} className="k-button btn-theme mr-2  k-primary">{
                                lang.langCheck.langRequest(this.props.TitleBarSecondButtonName)
                                }</Button>
                            </>
                        }
                      
                        
                        {
                            this.props.noOption ?
                                ''
                                :
                                <div className="multilevel-menu">
                                    <div className="dropdown">

                                        <Button primary={true} className="k-button btn-theme mr-2 k-primary dropdown-toggle" data-toggle="dropdown">
                                            {("Opções").toUpperCase()} <i className="fas fa-sort-down ml-1 mb-1"></i>
                                        </Button>
                                        {
                                            this.props.optionMenuArray &&
                                            <ul className="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                                                {
                                                    this.props.optionMenuArray.length > 0 &&
                                                    this.props.optionMenuArray.map((_option, i) => (
                                                        _option.main &&
                                                        _option.sub_menu ?
                                                            <li key={i} className="dropdown-submenu">
                                                                {
                                                                    this.props.selectedMainOption == _option.main ?
                                                                        <a className="dropdown-item active" tabindex="-1" href="#">{_option.main}</a>
                                                                        :
                                                                        <a className="dropdown-item" tabindex="-1" href="#">{_option.main}</a>
                                                                }
                                                                <ul className="dropdown-menu second-level">
                                                                    {
                                                                        _option.sub_menu.map((lstOption, k) => (
                                                                            this.props.selectedtitelotion == lstOption.display ?
                                                                                <li className="dropdown-item active" onClick={() => this.props.changeOption(i, k)} >{lstOption.display}</li>
                                                                                :
                                                                                <li className="dropdown-item" onClick={() => this.props.changeOption(i, k)} >{lstOption.display}</li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            </li>
                                                            :
                                                            <li className="dropdown-item" href="#">{_option.main}</li>
                                                    ))
                                                }
                                            </ul>

                                        }
                                    </div>
                                </div>


                        }


                    </div>

                    {
                        this.props.prevPageName && this.props.prevPageLink ?
                            <>
                            <p className="custom-well">Início</p>/ <Link to={this.props.prevPageLink} className="custom-well">{this.props.prevPageName} </Link>
                                {/* <Link to={this.props.prevPageLink} className="custom-well">Início</Link>/<p className="custom-well">{this.props.prevPageName}</p> */}
                            </>
                            :
                            <p className="custom-well">Início</p>
                    }
                </div >
            </div >
        )
    }
}


export default withRouter(TitleBar);