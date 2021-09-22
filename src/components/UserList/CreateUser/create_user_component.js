import React from 'react';
import { DatePicker, Checkbox, Select } from 'antd';
import { toast } from 'react-toastify';
import services from '../../../services';
import { withRouter } from 'react-router-dom';
import FormleftNev from '../../common/FormleftNev';
import FormNavbar from '../../common/wizard_navbar';
import queryString from 'query-string'
import Lang from '../../../lang'
import { Input } from '@progress/kendo-react-inputs';
const moment = require('moment');

const { Option } = Select
const dateFormat = 'DD-MM-YYYY';
const InputFieldsAll = {
    PersonalDetails: [
        {
            key: "FullName",
            type: "text",
            display: Lang.langCheck.langRequest("Full Name")
        },
        {
            key: "Email",
            type: "text",
            display: Lang.langCheck.langRequest("Email")
        },
        {
            key: "DisplayName",
            type: "text",
            display: Lang.langCheck.langRequest("Display Name")
        },
        {
            key : "status",
            type : "dropdown",
            display : "User Status",
            dropdownData: {1: 'ativo',
                           2: 'inativo'}
            
        }
    ],
    Contatos:[
        {
            key : "Email",
            type : "text",
            display : "Email"
        },
        {
            key : "ContactNumber",
            type : "number",
            display : "Contact Number"
        },
       
    ],
    OtherDetails: [
        {
            key: "Password",
            type: "password",
            display: Lang.langCheck.langRequest("Password")
        },
        {
            key: "Notes",
            type: "text",
            display: Lang.langCheck.langRequest("Notes")
        },
        {
            key: "designation",
            type: "dropdown",
            display: Lang.langCheck.langRequest("Designation")
        },
        {
            key: "DOB",
            type: "date",
            display: Lang.langCheck.langRequest("DOB")
        }
    ],
    'Grupo_de_Acesso':[]

}

const InputFields = [
    {
        key: "FullName",
        type: "text",
        display: "Full Name"
    },
    {
        key: "Email",
        type: "text",
        display: "Email"
    },
    {
        key: "DisplayName",
        type: "text",
        display: "Display Name"
    },
    {
        key: "ContactNumber",
        type: "number",
        display: "Contact Number"
    },
    {
        key: "Password",
        type: "password",
        display: "Password"
    },
    {
        key: "Notes",
        type: "text",
        display: "Notes"
    },
    {
        key: "designation",
        type: "dropdown",
        display: "Designation"
    },
    {
        key: "DOB",
        type: "date",
        display: "DOB"
    },
]

class CreateUserComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            FullName: '',
            Email: '',
            DisplayName: '',
            ContactNumber: '',
            Password: '',
            designation: '',
            Notes: '',
            DOB: '',
            isGroupAssign: false,
            assign_group: [],
            group_list: [],
            datePicker: '',
            desig_list: [],
            id : ''

        }
    }

    createInputs(nevkey) {
        let inputs = this.props.InputFieldsAll[nevkey].map((row, i) => {
            switch (row.type) {
                case "dropdown":
                    return (
                        row.dropdownData?
                        <div className="col-md-3">
                            <div className="input-box active-grey">
                                <span className="k-textbox-container k-state-empty w-100">
                                    <select type={row.type} className="form-control" onChange={this.handleChange} placeholder={row.display} value= {this.state.status ||''}
                                    name={row.key}>
                                        <option selected value="">{Lang.langCheck.langRequest(row.display)}</option>
                                        {
                                            Object.keys(row.dropdownData).map((key) => (
                                                <option value={key}>{row.dropdownData[key]}</option>
                                            ))
                                        }
                                    </select>
                                </span>
                            </div>
                        </div>
                        :
                        <div className="col-md-3">
                        <div className="input-box active-grey">
                            {/* <label className="input-label">{row.display}</label> */}
                            <span className="k-textbox-container k-state-empty w-100">
                                <select type={row.type} className="form-control" value={this.state[row.key] || ''} onChange={this.handleChange} placeholder={row.display} name={row.key}>
                                    <option selected value="">{Lang.langCheck.langRequest("Select Designation")}</option>
                                    {
                                        this.state.desig_list.map((_d, i) => (
                                            <option key={i} value={_d.id}>{_d.name}</option>
                                        ))
                                    }
                                </select>
                            </span>
                        </div>
                    </div>
                    )
                    break;
                case "date":
                    return (
                        <div className="col-md-3">
                            <div className="input-box active-grey">
                                <span className="k-textbox-container k-state-empty">
                                    {
                                        this.state.id ?
                                            this.state.datePicker
                                            :
                                            <DatePicker
                                                className="form-control"
                                                size="middle"
                                                name="DOB"
                                                format={dateFormat}
                                                disabledDate={this.disabledDate}
                                                placeholder="Data de Nascimento"
                                                onChange={this.handleDate}
                                            />
                                    }
                                </span>
                            </div>
                        </div>
                    )
                    break;
                default:
                    return (
                        <div className={row.key === 'Email' || row.key === 'FullName' ? "col-md-12" : "col-md-3"}>
                            <div className="input-box active-grey">
                                {/* <label className="input-label hidden">{row.display}</label>
                            <input type={row.type} className="input-1" value={this.state[row.key]} onChange={this.handleChange} placeholder={row.display} name={row.key}  /> */}
                                {
                                    row.key === 'Email' && (this.props && this.props.location && this.props.location.state && this.props.location.state.user_id) ?
                                        <Input
                                            name={row.key}
                                            type={row.type}
                                            readOnly
                                            style={{ width: "100%" }}
                                            className="input-1"
                                            label={Lang.langCheck.langRequest(`${row.display}`)}
                                            value={this.state[row.key] || ''}
                                        />
                                        :
                                        <Input
                                            name={row.key}
                                            type={row.type}
                                            style={{ width: "100%" }}
                                            className="input-1"
                                            label={Lang.langCheck.langRequest(`${row.display}`)}
                                            onChange={this.handleChange}
                                            value={this.state[row.key] || ''}
                                        />
                                }
                            </div>
                        </div>
                    )
            }
        });
        return inputs
    }


    createInputFields = () => {

        let InputFieldsdivs = Object.keys(this.props.InputFieldsAll).map((nevkey) => {
            return (<div className="bg-white middle p20" id={nevkey}>
                <div className="head">
                    <h2> {Lang.langCheck.langRequest(`${nevkey}`)}</h2>
                    <p className="font-14">{/*"Lorem ipsum dolor sit amet, consetetur sadipscing elitrdiam"*/}</p>
                </div>
                <div className="row">
                    {this.createInputs(nevkey)}
                </div>
            </div>
            )
        });

        return InputFieldsdivs;
    }

    componentDidMount() {
        console.log(this.props)
        let parsed = queryString.parse(window.location.search)
        if (parsed.id) {
            this.setState({
                id : parsed.id
            },()=>{this.getUserById(parsed.id)})
        }
        this.getGroupList();
        this.getDesignationList();
    }

    // componentDidUpdate(){
    //     services.lablecheck.setlable();
    // }

    handleDatePicker = () => {
        let datePicker = (<DatePicker
            className="form-control"
            size="middle"
            placeholder="Data de Nascimento"
            defaultValue={moment(`${this.state.DOB}`, dateFormat)}
            disabledDate={this.disabledDate}
            format={dateFormat}
            onChange={this.handleDate}
        />)
        this.setState({
            datePicker
        })
    }

    disabledDate = (current) => {
        // Can not select days before today and today
        return current && current.valueOf() > new Date();
    }

    getDesignationList = async () => {
        let data = {
            Filters: null,
            IsPagination: false,
            Page: 0,
            PageSize: 0,
            IsSortTypeDESC: false,
            SortBy: ''
        }
        let desig = await services.apiCall.requestApi("/Designationlist/getall", data, 'post');
        if (desig) {
            this.setState({
                desig_list: desig
            })
        }
    }

    getGroupList = async () => {
        let data = {
            Filters: null,
            IsPagination: false,
            Page: 0,
            PageSize: 0,
            IsSortTypeDESC: false,
            SortBy: ''
        }
        let grp = await services.apiCall.requestApi("/Groups/AllGroups", data, 'post');
        if (grp) {
            this.setState({
                group_list: grp
            })
        }
    }

    getUserById = async (id) => {
        let userDetail = await services.apiCall.requestApi(`/User/${id}`, {}, 'get')
        console.log(userDetail)
        if (userDetail) {
            this.setState({
                FullName: userDetail.fullName,
                Email: userDetail.email,
                DOB: moment(userDetail.dob).format(dateFormat) + '',
                DisplayName: userDetail.displayName,
                ContactNumber: userDetail.contactNumber,
                Notes: userDetail.notes,
                designation: userDetail.designationid,
                assign_group: userDetail.assignGroup,
                isGroupAssign: userDetail.assignGroup.length > 0 ? true : false,
                status: userDetail.status
            }, () => this.handleDatePicker())
        }
    }

    handleDate = (e) => {
        this.setState({
            DOB: e && e._d && moment(e._d).format(dateFormat)
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log('aaaaaaaa',e.target.name)
    }

    handleCheck = (e) => {
        this.setState({
            isGroupAssign: e.target.checked
        })
    }

    handleSelect = (e) => {
        console.log("Select", e)
        this.setState({ assign_group: e })
    }

    handleSubmit = (e, backUrl) => {
        e.preventDefault();
        
        if (this.state.id) {
            this.handleUpdateUser(backUrl);
        } else {
            this.handleCreateUser(backUrl);
        }
    }

    handleUpdateUser = async (backUrl) => {
        let data = {}
        data = {
            id: this.state.id,
            FullName: this.state.FullName,
            Email: this.state.Email,
            DisplayName: this.state.DisplayName,
            Password: this.state.Password,
            ContactNumber: this.state.ContactNumber,
            DesignationId: Number(this.state.designation),
            DOB: this.state.DOB,
            Notes: this.state.Notes,
            AssignGroup: this.state.isGroupAssign ? this.state.assign_group : [],
            status: parseInt(this.state.status)
        }
        console.log('handleUpdateUser',this.props)
        let res = await services.apiCall.requestApi(`/User/Create/${data.id}`, data, 'post')
        if (res) {
            if (backUrl) {
                this.props.history.push({
                    pathname: backUrl
                })
            }
        }
    }

    handleCreateUser = async (backUrl) => {
        let data = {}
        data = {
            FullName: this.state.FullName,
            Email: this.state.Email,
            DisplayName: this.state.DisplayName,
            Password: this.state.Password,
            ContactNumber: this.state.ContactNumber,
            DesignationId: Number(this.state.designation),
            DOB: this.state.DOB,
            Notes: this.state.Notes,
            AssignGroup: this.state.isGroupAssign ? this.state.assign_group : []
        }
        console.log('handleCreateUser')
        let res = await services.apiCall.requestApi('/User/Create', data, 'post')
        if (res) {
            if (backUrl) {
                this.props.history.push({
                    pathname: backUrl
                })
            }
        }

    }

    render() {
        console.log("props", this.props)
        return (
            <div className="dashboard">
                {
                    (this.state.id) ?
                        <FormNavbar to={'/user_list'} handleSubmit={(e, url) => this.handleSubmit(e, url)} type='user' headName="Edit User" />
                        :
                        <FormNavbar to={'/user_list'} handleSubmit={(e, url) => this.handleSubmit(e, url)} type='user' headName="Create New User" />
                }
                <div className="full-container edit-ward">
                    <FormleftNev InputFieldsAll={InputFieldsAll} />
                    <div className="right-section">

                        <div className="row top-serch">
                            {
                                this.createInputFields()
                            }
                            {/* <div className="col-md-3">
                    <div className="form-group ">
                        <input type="text" name="FullName" value={this.state.FullName} onChange={this.handleChange}  className="form-control" placeholder="Full Name" />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group ">
                    <input type="text" className="form-control" name="DisplayName" value={this.state.DisplayName} onChange={this.handleChange} placeholder="Display Name" />
                </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group ">
                    <input type="number" className="form-control" name="ContactNumber" value={this.state.ContactNumber} onChange={this.handleChange} placeholder="Contact Number" />
                </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group ">
                    <input type="text" className="form-control" name="Email" value={this.state.Email} onChange={this.handleChange} placeholder="Email" />
                </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group ">
                    <input type="Password" className="form-control" name="Password" value={this.state.Password} onChange={this.handleChange} placeholder="Password" />
                </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group ">
                    <select type="number" className="form-control" name="designation" value={this.state.designation} onChange={this.handleChange}>
                        <option selected value="">Select Designation</option>
                        {
                            this.state.desig_list.map((_d,i)=>(
                                <option key={i} value={_d.id}>{_d.name}</option>
                            ))
                        }
                    </select>
                </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group calender-field position-relative">
                    <div>
                    { 
                        this.props && this.props.location && this.props.location.state && this.props.location.state.user_id ? 
                            this.state.datePicker
                        :
                        <DatePicker 
                            className="form-control"
                            size="middle"
                            name="DOB"
                            format={dateFormat}
                            placeholder="Date of Birth"
                            onChange={this.handleDate}
                        />
                    }
                    </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group ">
                    <input type="text" className="form-control" name="Notes" value={this.state.Notes} onChange={this.handleChange} placeholder="Notes" />
                </div>
                </div> */}

                            <div className="bg-white middle p20" id="Grupo_de_Acesso">
                                <div className="head">
                                    <h2>Grupo de Acesso</h2>
                                    <p className="font-14"></p>
                                </div>



                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" checked={this.state.isGroupAssign} onChange={this.handleCheck} id="customCheck1" name="example1" />
                                                <label className="custom-control-label" for="customCheck1">{Lang.langCheck.langRequest("Assign Group")}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    this.state.isGroupAssign &&
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <Select
                                                    mode="multiple"
                                                    className="form-control"
                                                    placeholder={Lang.langCheck.langRequest("Select Group")}
                                                    value={this.state.assign_group}
                                                    onChange={this.handleSelect}
                                                >
                                                    {
                                                        this.state.group_list.map((_list, index) => (
                                                            _list.status === 'Active' &&
                                                            <Option key={index} value={_list.id}>{_list.groupName}</Option>
                                                        ))
                                                    }
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        {/* <div className="row">
                <div className="col-md-12 text-center">
                    {
                        (this.props && this.props.location && this.props.location.state && this.props.location.state.user_id) ?
                        <button type="button" onClick={this.handleUpdateUser} className="btn btn-theme mr-4">UPDATE USER</button>
                        :
                        <button type="button" onClick={this.handleCreateUser} className="btn btn-theme mr-4">CREATE USER</button>
                    }
                </div>
                </div> */}
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(CreateUserComponent);