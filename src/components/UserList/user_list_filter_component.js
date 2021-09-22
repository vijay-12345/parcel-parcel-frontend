import React from 'react';
import { Link } from 'react-router-dom';
import { DatePicker } from 'antd';
var moment = require('moment')



class UserListFilterComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            UserName : '',
            ProfileId: '',
            Date: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleDate = (e) => {
        this.setState({
            Date : moment(e._d).format('YYYY-MM-DD')
        })
    }

    handleSearch = () => {
        let data = [{...this.state}]
        let filters = {}
        Object.keys(this.state).map((_k,i)=>{
            if(data[0][_k] !== ''){
                filters[_k] = data[0][_k]
            }
        })
        console.log(filters)
        if(Object.keys(filters).length !== 0){
            this.props.getFilter(filters)
        }else{
            this.props.getFilter('')
        }
    }

    render(){
        return(
            <React.Fragment>
                <div className="white-box mt-4 mb40">
                <div className="row top-serch">
                <div className="col-md-10 form-inline">
                    <div className="form-group ">
                        <input type="text" name="UserName" className="form-control" value={this.state.UserName} onChange={this.handleChange} placeholder="search by username" />
                    </div>
                    <div className="form-group">
                    <input type="text" name="ProfileId" className="form-control" value={this.state.ProfileId} onChange={this.handleChange} placeholder="search by profile" />
                    </div>
                    <div className="form-group calender-field position-relative">
                        <DatePicker 
                            className="form-control"
                            size="middle"
                            name="Date"
                            placeholder="Search By Date"
                            onChange={this.handleDate}  
                        />
                    </div>
                    <div className="form-group">
                    <button type="button" onClick={this.handleSearch} className="btn btn-theme mr-4">SEARCH</button>
                    </div>
                </div>
                <div className="col-md-2  creat-custom">
                    <Link to={'/create_user'} className="btn btn-black"><i className="fas fa-plus mr-1 font-14"></i> CREATE USER</Link>
                </div>
                </div>
                </div>
                <div className="mb-4">
                </div>
            </React.Fragment>
        )
    }
}


export default UserListFilterComponent;