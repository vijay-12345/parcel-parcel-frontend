import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery'

class WizardLeft extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            sel_nev:this.props.sel_nev
        }
    }
    componentDidUpdate(preProp){
        if(preProp.date!==this.props.date){
           this.setState( {
                sel_nev:this.props.sel_nev
            }
           )
        }
    }

    updatesel_nev=(sel_nev)=>{
        this.props.updatesel_nev(sel_nev);
    }

    componentDidMount() {
        $(window).scroll(function(){
            if ($(this).scrollTop() > 65) {
               $('.left-section').addClass('fixed_left');
            } else {
               $('.left-section').removeClass('fixed_left');
            }
        });
    }

    render(){
        return(
            <div className="left-section">
                 
                <ul className="list-unstyled">
                    <li className={this.state.sel_nev=='parcel'?"active":""} onClick={()=>this.updatesel_nev('parcel')} > <a >Parcela</a></li>
                    <li className={this.state.sel_nev=='parcelPointFactors'?"active":""} onClick={()=>this.updatesel_nev('parcelPointFactors')} > <a >Factores de pontuação</a></li>
                    <li className={this.state.sel_nev=='parcelSettlementCharacteristics'?"active":""} onClick={()=>this.updatesel_nev('parcelSettlementCharacteristics')} >
                        <a >Características do povoamento</a></li>
                    <li> <ul className="list-unstyled">
                        <li className={this.state.sel_nev=='parcelPopulationDetails'?"active":""} onClick={()=>this.updatesel_nev('parcelPopulationDetails')}><a >Detalhes do povoamento</a></li>
                        <li className={this.state.sel_nev=='Castas'?"active":""} onClick={()=>this.updatesel_nev('Castas')} ><a >Castas</a></li>
                    </ul>
                    </li>
                    <li className={this.state.sel_nev=='matrixArticle'?"active":""} onClick={()=>this.updatesel_nev('matrixArticle')}><a >Artigo Matricial</a></li>
                    <li className={this.state.sel_nev=='Enquadramento'?"active":""} onClick={()=>this.updatesel_nev('Enquadramento')}><a >Enquadramento legal</a></li>
                    {
                        this.props.id  &&
                        <li className={this.state.sel_nev=='Registo'?"active":""} onClick={()=>this.updatesel_nev('Registo')}><a >Registo de alterações</a></li>
             
                    }
                 </ul>

               
            </div>
        )
    }
}

export default WizardLeft;