import React from 'react';
import services from '../../services';
import { toast } from 'react-toastify';

const queryString = require('query-string');

class SsoPage extends React.Component{
    constructor(props){
        super(props);
        this.state ={}
    }
    componentDidMount(){
        const data = queryString.parse(this.props.location.search);
        this.getlogin(data);
    }

    getlogin = async (data ) => {
        let _r = await services.apiCall.requestApi('/LoginSSO',data,'get');
        if(_r){
            toast.success("SuccessFully Login");
            let token = _r
                window.localStorage.setItem('token',token);
                window.location = '/'
            }             
    }

    render(){
        return (
            <div className="dashboard">
                    <div> loading...</div>
            </div>
        )
    }
}
export default SsoPage;