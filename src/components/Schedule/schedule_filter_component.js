import React from 'react';
import SearchFilter from '../filters/SearchFilter';
import { Link } from 'react-router-dom';
import Lang from '../../lang'
import TitleBar from '../common/title_bar'

const filters={
    Tabs:{
        Schedule:[
            {
                key : 'title',
                displayKey : "Search By Title",
                inputType : "text"
            },
            {
                key : 'entity',
                displayKey : "Search By Entity",
                inputType : "text"
            },
            {
                key : 'status',
                displayKey : "Search By Status",
                inputType : "text"
            },
            {
                key : 'observation',
                displayKey : "Search By Observation",
                inputType : "text"
            },
            {
                key : 'attendance',
                displayKey : "Search By Attendance",
                inputType : "text"
            }
        ]
    },
    checkbox:[]
};


class ScheduleFilterComponent extends React.Component{
    render(){
        return(
            <div className="inner-container">
            <div className="outer-space">
            {/* <div className="row">
            <div className="col-md-8 order-sm-1 order-2">
                <div className="heading d-md-flex align-items-center">
                    <img src="imgs/icon1_gray.png" alt=""/>
                    <h3>{Lang.langCheck.langRequest("Schedule")}</h3>
                    <Link to={'/create_schedule'} className="btn btn-theme mr-2 btn-sm">+ Inserir</Link >
                    {
                        // this.props.status ?
                        // <button onClick={()=>this.props.func(false)} className="btn btn-theme mr-2 btn-sm">{Lang.langCheck.langRequest("SWITCH TO NORMAL VIEW")}</button>
                        // :
                        // <button onClick={()=>this.props.func(true)} className="btn btn-theme mr-2 btn-sm">{Lang.langCheck.langRequest("SWITCH TO CALENDAR VIEW")}</button>
                    }
                    <button type="button" className="btn drop-down-black btn-primary dropdown-toggle" data-toggle="dropdown">
                    Opções
                    </button>
                    <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">Opções</a>
                    <a className="dropdown-item" href="#">Opções</a>
                    <a className="dropdown-item" href="#">Opções</a>
                    </div>
                </div>
                <p className="custom-well">Início</p>
            </div>
            </div> */}
            <TitleBar path={'/create_schedule'} title={Lang.langCheck.langRequest("Schedule")} logo="agenda" />
            <SearchFilter filters={filters} handleFilter={(data)=>this.props.handleFilter(data)} data={this.props.data} />
            {/* <h2 className="heading-table">Filter</h2>
                <div className="box-tranparent mt-4">
                    <div className="d-sm-flex justify-content-between">
                    
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Area of Management" />
                    </div>
                
                
                    <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search By Process Field" />
                    </div>
                
                    <div className="form-group calender-field position-relative">
                    <input type="text" className="form-control" placeholder="Date From" />
                    <i className="far fa-calendar-alt" aria-hidden="true"></i>
                    </div>
                
            
                    <div className="form-group calender-field position-relative">
                    <input type="text" className="form-control" placeholder="Date To" />
                    <i className="far fa-calendar-alt" aria-hidden="true"></i>
                    </div>
                
                
                    <div className="form-group">
                        <select className="form-control">
                        <option>Search By User</option>
                        </select>
                    </div>
                    
                
                </div>
                    <div className="d-sm-flex justify-content-between">
                    
                        <div className="form-group">
                        <select className="form-control">
                            <option>Confirmed/Cancelled/Resched</option>
                        </select>
                        </div>
                    
                    
                        <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search By Entity" />
                        </div>
                    
                
                        <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search By State" />
                        </div>
                    
                
                        <div className="form-group ">
                        <button className="btn btn-theme">Search</button>
                        </div>        
                    </div>
                </div> */}
                
                {/* <div className="white-box mb40">
                    <div className="row top-serch aligin-items-center">
                    <div className="col-md-8 form-inline">
                        <div className="form-group text-right">
                        <button className="btn btn-black"><i className="fas fa-plus mr-1 font-14" aria-hidden="true"></i><a href='/create_schedule'> CREATE SCHEDULE</a></button>
                        </div>
                
                    </div>
                    <div className="col-md-4  creat-custom">
                        {
                            this.props.status ?
                            <button onClick={()=>this.props.func(false)} className="theme-color p-2 font-weight-500">SWITCH TO NORMAL VIEW</button>
                            :
                            <button onClick={()=>this.props.func(true)} className="theme-color p-2 font-weight-500">SWITCH TO CALENDAR VIEW</button>
                        }
                    </div>
                    </div>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default ScheduleFilterComponent;