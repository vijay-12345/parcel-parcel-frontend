import React from 'react';
import { withRouter } from 'react-router-dom';
import Lang from '../../lang';
import $ from 'jquery'

// $(".mainSidemenu").hover(function(){
//     console.log("dfvfdvtr");
//     $(".submenuleft").css("display","none");
//     $(this).find(".submenuleft").css("display","block");
// });
// $(".mainSidemenu").click(function(){
//     console.log("fgytbytbty");
//     $(".submenuleft").css("display","none");
//     $(this).find(".submenuleft").css("display","block");
// });
// $(".sidebar_shift").mouseleave(function(){
//     $(this).find(".submenuleft").css("display","none");
// })



let nav_bar = window.localStorage.getItem('nav_bar')

class UnOrderedList extends React.Component{
   
    handleRoute = (data) => {
        console.log(data);
        window.localStorage.setItem('nav_bar',data.url);
        this.props.history.push({
             pathname : data.url
        })
    }

   

    getAffectiveUrl=()=>{
        let url="";
        if(this.props.linkdata){
            if(this.props.linkdata.submenu){
                let listarray=  this.props.submenus[this.props.linkdata.submenu];
                listarray.map((list,index)=>(
                    url += ","+list.url
                ) )
            }else{
               url= this.props.linkdata.url
            }
        }
        
        return url;
    }

   

    createSelectedLi = () => {
        
        let url = this.getAffectiveUrl()
        this.props.linkdata['url'] = url
        let navBarSelected = window.localStorage.getItem('nav_bar')

        if(this.props.linkdata && this.props.linkdata.url){
            return (
                <li className={url.includes(navBarSelected)? "active" : ''}   onMouseEnter={()=>this.props.mouseHover(this.props.index)}>
                    {
                       this.props.linkdata.submenu ?
                            <a data-toggle="tab dd">
                                <span>
                                    <span className={`sivdp-icon sivdp-${this.props.linkdata.type}`}></span>
                                </span>
                                <span className="title">{this.props.name}</span>
                                {
                                    this.createSubMenu(this.props.submenus[this.props.linkdata.submenu])
                                }
                            </a>
                        :
                        <a  data-toggle="tab" onClick={()=>this.handleRoute(this.props.linkdata)}>
                            <span>
                                <span className={`sivdp-icon sivdp-${this.props.linkdata.type}`}></span>
                            </span>
                            <span className="title">{this.props.name}</span>
                        </a>
                    }
                </li>
            )
        }else{
            return (
                <li className={navBarSelected === url? "active" : ''} onMouseEnter={()=>this.props.mouseHover(this.props.index)}>
                {
                    this.props.linkdata.submenu ?
                        <a data-toggle="tab">
                            <span>
                                <span className={`sivdp-icon sivdp-${this.props.linkdata.type}`}></span>
                            </span>
                            <span className="title">{this.props.name}</span>
                            {
                                this.createSubMenu(this.props.submenus[this.props.linkdata.submenu])
                            }
                        </a>
                    :
                    <a  data-toggle="tab" onClick={()=>this.handleRoute(this.props.linkdata)}>
                        <span>
                            <span className={`sivdp-icon sivdp-${this.props.linkdata.type}`}></span>
                        </span>
                        <span className="title">{this.props.name}</span>
                    </a>
                }
            </li>
            )
        }
       
    }

    createSubMenu = (list) => {
        return (
            <ul className={this.props.subMenuDisplay[this.props.index]?"list-unstyled sub-menu subMenudisplay":"list-unstyled sub-menu"}>
                {/* <span className="closeSubmenu"><i className="fas fa-times"></i></span> */}
            {
                list.map((_li,index) =>(
                    <li key={index} className={window.localStorage.getItem('nav_bar')==_li.url ? "active" : ''} onClick={()=>this.handleRoute(_li)} >
                        <a href="#">
                            <span>
                                <span className={`sivdp-icon sub-icon sivdp-${_li.type}`}></span>
                            </span>
                            <span className="title1">{Lang.langCheck.langRequest(`${_li.name}`)}</span>
                        </a>
                    </li>
                ))
            }
            </ul>
        )
    }

    render () {
            return (
                this.createSelectedLi()
            )
        }
}

export default withRouter(UnOrderedList);