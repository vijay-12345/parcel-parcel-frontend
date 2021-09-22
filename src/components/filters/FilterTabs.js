import React from 'react';

class FilterTabs extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            NavTab : [],
        }
    }
  
    componentDidMount() {
        let  tabs=this.props.tabs;
        let NavTab= Object.keys(tabs).map(function(key) {
        return   <li className="nav-item">
                    <a className="nav-link active" onClick={()=>this.props.} data-toggle="tab" href="#tab0">{key}</a>
                </li>
      });
        this.setState({
            NavTab 
        })
    }
    render () {
    return (
        <div className="mbl-responsive">
            <ul className="nav nav-tabs">
                {
                        this.state.NavTab
                }
            </ul>
        </div>
    )
}
}

export default FilterTabs;