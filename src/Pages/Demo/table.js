import React from 'react';
import NavBar from '../../components/common/navbar';
import Main from './main.jsx';
import Products from './products.json';
import SideBar from '../../components/modules/left_sidebar';

class DemoTable extends React.Component{
    columnlist =[
        {field:"ProductID",filter:'numeric',columnMenuType:''},
        {field:"ProductName",columnMenuType:'checkbox'},
        {field:"UnitPrice",filter:'numeric',columnMenuType:''},
        {field:"Discontinued",filter:'boolean',columnMenuType:'checkbox'}
    ]
    
    render(){
        return (
            <div className="dashboard">
                <NavBar />
                <SideBar />
                <div className='row'>
                    <div className='col-md-2'>
                    </div>
                    <div className='col-md-10'>
                    <Main date={new Date()} list={Products} columnlist={this.columnlist}/>  
                    </div>
                </div>
               
            </div>
        )
    }
}

export default DemoTable;