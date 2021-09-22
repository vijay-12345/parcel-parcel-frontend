import React from 'react';

class TableHeader extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            sort : false,
        }
    }
    changeSort = (sort) => {
        this.setState({
            sort : sort?false:true 
        },()=>this.props.func(this.state.sort,this.props.columnkey))
    }
    
    render(){
        console.log(this.props);
        return(
            <th><a className="float-left" className={this.props.className ? this.props.className : ''} onClick={()=>this.changeSort(this.state.sort)}  >{this.props.columename}
            {
                (this.state.sort)? 
                <i className="fas fa-caret-up ml-1"></i>
                :
                <i className="fas fa-caret-down ml-1"></i>
            }
            </a></th>
        )
    }
}

export default TableHeader;