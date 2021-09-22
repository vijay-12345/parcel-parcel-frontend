import React from 'react';
import {withRouter, Link} from 'react-router-dom'
import UnOrderedList from './sidebar_ul';
import Lang from '../../lang'


const listParam = [
    {
        name : 'Parcela',
        src1 : 'imgs/icon1.png',
        src2 : 'imgs/icon1_active.png',
        url  : '/dashboard',
        type : 'parcelas'
    },
    {
 
        name : 'Vindima',
        src1 : 'imgs/icon2.png',
        src2 : 'imgs/icon2_active.png',
        type : 'vindima',
        url:"",
        submenu:"vindima"
    },
    {
        name : 'Conta corrente',
        src1 : 'imgs/icon3.png',
        src2 : 'imgs/icon3_active.png',
        type : 'contacorrente'
       
    },
    {
        name : 'Fiscalização',
        src1 : 'imgs/icon4.png',
        src2 : 'imgs/icon4_active.png',
        type : 'fiscalizacao'
    },
    {
        name : 'Selos',
        src1 : 'imgs/icon5.png',
        src2 : 'imgs/icon5_active.png',
        type : 'selos'
    },
    {
        name : 'Rótulos',
        src1 : 'imgs/icon6.png',
        src2 : 'imgs/icon6_active.png',
        type : 'rotulos'
    },
    {
        name : 'Convocatórias',
        src1 : 'imgs/icon7.png',
        src2 : 'imgs/icon7_active.png',
        url  : '/schedule',
        type : 'agenda'
    },
    {
        name : 'Entidades',
        src1 : 'imgs/icon7.png',
        src2 : 'imgs/icon7_active.png',
        type : 'entidades'
    },
    {
        name : 'Processos',
        src1 : 'imgs/icon7.png',
        src2 : 'imgs/icon7_active.png',
        type : 'processos'
    },
    {
        name : 'Agregação de Receitas',
        src1 : 'imgs/icon7.png',
        src2 : 'imgs/icon7_active.png',
        type : 'tesouraria',
        url  : '',
        submenu:"Tesouraria"
    },
    {
        name : 'Estatisticas',
        src1 : 'imgs/icon7.png',
        src2 : 'imgs/icon7_active.png',
        type : 'estatisticas'
    },
    {
        name : 'Administarion',
        src1 : 'imgs/icon7.png',
        src2 : 'imgs/icon7_active.png',
        url  : '',
        type : 'admin',
        submenu:"Administration"
    }
]

const submenus={
    Administration:[
        {
            name : 'User',
            src1 : 'imgs/icon-new1.png',
            src2 : 'imgs/icon-new1-active.png',
            url  : '/user_list',
            type : 'user'
        },
        {
            name : 'Group',
            src1 : 'imgs/icon-new4.png',
            src2 : 'imgs/icon-new4-active.png',
            url  : '/admin_dashboard_groups',
            type : 'users'
        },
        {
            name : 'Audit',
            src1 : 'imgs/icon-new3.png',
            src2 : 'imgs/icon-new3-active.png',
            url  : '/admin_dashboard_audit',
            type : 'auditing'
        },
        {
            name : 'Estatuto',
            src1 : 'imgs/icon-new3.png',
            src2 : 'imgs/icon-new3-active.png',
            url  : '/admin_dashboard_estato',
            type : 'auditing'
        },
        {
            name : 'Regras da Entidade',
            src1 : 'imgs/icon-new3.png',
            src2 : 'imgs/icon-new3-active.png',
            url  : '/entity_rule_list',
            type : 'auditing'
        }
    ],
    vindima:[
        {
            name : 'Conta de Produtor',
            src1 : 'imgs/icon-new3.png',
            src2 : 'imgs/icon-new3-active.png',
            url  : '/vindima_Conta_de_Produtor',
            type : 'auditing'
        },
        {
            name : 'Autorização de Produção (AP)',
            src1 : 'imgs/icon-new3.png',
            src2 : 'imgs/icon-new3-active.png',
            url  : '/vindima_authorizacao',
            type : 'auditing'
        },
        {
            name : 'Registo de entrada de Uvas (REU)',
            src1 : 'imgs/icon-new3.png',
            src2 : 'imgs/icon-new3-active.png',
            url  : '/vindima_registo',
            type : 'auditing'
        },
        {
            name : 'Declaração de Compra e produção (DCP)',
            src1 : 'imgs/icon-new3.png',
            src2 : 'imgs/icon-new3-active.png',
            url  : '/vindima_declaracao',
            type : 'auditing'
        },
        {
            name : 'Area de analise / report de informação',
            src1 : 'imgs/icon-new3.png',
            src2 : 'imgs/icon-new3-active.png',
            url  : '/vindima_report',
            type : 'auditing'
        }
    ],
    "Tesouraria":[
        {
            name : 'Tesouraria',
            src1 : 'imgs/icon-new3.png',
            src2 : 'imgs/icon-new3-active.png',
            url  : 'revenue_receitas',
            type : 'auditing'
        },
        {
            name : 'Faturas',
            src1 : 'imgs/icon-new3.png',
            src2 : 'imgs/icon-new3-active.png',
            url  : 'revenue_faturas',
            type : 'auditing'
        },
        {
            name : 'Caixa',
            src1 : 'imgs/icon-new3.png',
            src2 : 'imgs/icon-new3-active.png',
            url  : 'cashier',
            type : 'auditing'
        },
        {
            name : 'GERFIP',
            src1 : 'imgs/icon-new3.png',
            src2 : 'imgs/icon-new3-active.png',
            url  : 'gerfip',
            type : 'auditing'
        },
        {
            name : 'Conta Geral',
            src1 : 'imgs/icon-new3.png',
            src2 : 'imgs/icon-new3-active.png',
            url  : 'general_account',
            type : 'auditing'
        }
    ]
}


class LeftSideBar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {subMenuDisplay:{}}
    }

    componentDidMount(){
            let url = window.location.pathname;
            window.localStorage.setItem('nav_bar',url)
    }
    goBack(){
        this.props.history.push({
            pathname : "/dashboard"
        })
    }
   
    mouseHover=(key)=>{
        let subMenuDisplay={...this.state.subMenuDisplay};
        Object.keys(subMenuDisplay).map((_k)=>{
            subMenuDisplay[_k]=false;
        })
        subMenuDisplay[key]=true;
        this.setState({subMenuDisplay})
    }
    mouseLeave=()=>{
        let subMenuDisplay={...this.state.subMenuDisplay};
        Object.keys(subMenuDisplay).map((_k)=>{
            subMenuDisplay[_k]=false;
        })
        this.setState({subMenuDisplay})
    }


    render(){
        return(
            <div className="sidebar_shift" onMouseLeave={()=>this.mouseLeave()} >
                <a className="mobile-expend" href="#"><i className="fas fa-chevron-right"></i></a>
                <Link to={'/dashboard'}><img className="logo" src="imgs/small-logo.png" /></Link>
                <ul className="list-unstyled nav" role="tablist">
                {
                    listParam.map((list,index)=>(
                        <UnOrderedList 
                        mouseHover={(keys)=>this.mouseHover(keys)}
                        mouseLeave={()=>this.mouseLeave()}
                        subMenuDisplay={this.state.subMenuDisplay} 
                        key={index} 
                        index={index}
                        submenus={submenus} 
                        name={Lang.langCheck.langRequest(`${list.name}`)} linkdata={list} />
                    ))
                }
                <li  onMouseEnter={()=>this.mouseHover(listParam.length+1)} 
                    style={{backgroundColor:"#fff"}}
                >&nbsp;</li>
                </ul>
            </div>
        )
    }
}


export default withRouter(LeftSideBar);