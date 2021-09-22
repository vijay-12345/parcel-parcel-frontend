import React from 'react';
import { Link } from 'react-router-dom';
import Lang from '../../lang'
import $ from 'jquery'

class FormleftNev extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            sel_nev:""
        }
    }

    updatesel_nev=(sel_nev)=>{
        this.setState({
            sel_nev
        })
        $('html, body').animate({
            scrollTop: $('#'+sel_nev).offset().top - 70 //#DIV_ID is an example. Use the id of your destination on the page
        }, 'slow');
    }


    componentDidMount(){
        $(window).scroll(function(){
            if ($(this).scrollTop() > 65) {
               $('.left-section').addClass('fixed_left');
            } else {
               $('.left-section').removeClass('fixed_left');
            }
        });
    }

    // allLi=()=>{
    //   let   InputFieldsAll =this.props.InputFieldsAll;
    //   let  sel_nev= this.state.sel_nev;
      
    //  let columnlist =[] 
    //  Object.keys(InputFieldsAll).map(function(key) {
    //     columnlist.push(
    //             <li className={sel_nev==key?"active":""}
    //             onClick={()=>this.updatesel_nev(key)} 
    //             >
    //                 <a href={`#${key}`}>{Lang.langCheck.langRequest(`${key}`)}</a>
    //             </li>
    //         )
    //     });
    //      return columnlist;
    // }
  
 
    render(){
        return(
            <div className="left-section">
                <ul className="list-unstyled">
               {
                    Object.keys(this.props.InputFieldsAll).map((key)=>
                    (
                                <li className={this.state.sel_nev==key?"active":""}
                                onClick={()=>this.updatesel_nev(key)} 
                                >
                                    <a >{Lang.langCheck.langRequest(`${key}`)}</a>
                                </li>
                    ))
               }
               </ul>

               
            </div>
        )
    }
}

export default FormleftNev;