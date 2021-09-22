import React from 'react';



class InstructionMessage extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="messageClass">
                    <span style={{marginTop:"3px"}} className="k-icon k-i-information"></span>
                    <p style={{marginLeft:"15px"}}>{this.props.message}</p>
                </div>
            </React.Fragment>
        )
    }
}

export default InstructionMessage;