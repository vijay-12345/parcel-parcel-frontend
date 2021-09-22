import React from 'react';
import { Pagination } from 'antd';

class TablePagination extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
          page_size:10,
          page_num:1
        }
    }
        
    onShowSizeChange = (current, pageSize) => {
       this.setState({
            page_size :pageSize,
            page_num  :current
        },()=>this.props.func(this.state.page_size,this.state.page_num))
    }

    onChange =(pageNumber) =>{
      this.setState({
            page_num  :pageNumber
        },()=>this.props.func(this.state.page_size,this.state.page_num))
    }

    render(){
        return(
            <Pagination
                showSizeChanger
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onChange}
                defaultPageSize={this.props.PageSize} 
                defaultCurrent={this.props.currentpage} 
                total={this.props.totalcount} 
            />
        )
    }
}

export default TablePagination;