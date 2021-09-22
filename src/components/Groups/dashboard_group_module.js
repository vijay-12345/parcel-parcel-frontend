import React from 'react';
import services from '../../services';
import Lang from '../../lang'
import $ from 'jquery'
import { Input } from '@progress/kendo-react-inputs';



class DashboardGroupmodule extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        groupName : '',
        Active : false,
        groupDescription : '',
        editGroupName : '',
        editActive : false,
        editGroupDescription : ''
      }
    }

    componentDidMount () {
      if(this.props.grpId !== ''){
        this.getGroupById(this.props.grpId);
      }
    }

    componentDidUpdate (prevProps) {
      if(this.props.grpId !== '' && prevProps.grpId !== this.props.grpId){
        this.getGroupById(this.props.grpId);
      }
    }

    getGroupById = async (id) => {
      await services.apiCall.requestApi(`Groups/${id}`,{},'get').then((res)=>{
        if(res){
          this.setState({
            editGroupName : res[0].groupName,
            editGroupDescription : res[0].obzervations,
            editActive : res[0].status === 'Active' ? true : false
          })
        }
      })
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name] : e.target.value
      })
    }

    handleEditChange = (e) => {
      this.setState({
        [e.target.name] : e.target.value
      })
    }

    handleEditCheck = (e) => {
      this.setState({
        editActive : this.state.editActive ? false : true
      })
    }

    handleCheck = (e) => {
      this.setState({
        Active : e.target.checked
      })
    }

    handleCreateGroup = async () => {
      let data = {
        GroupName : this.state.groupName,
        GroupDescription : this.state.groupDescription,
        Active : this.state.Active
      }
      await services.apiCall.requestApi('/Groups/Create',data,'post').then(res=>{
        if(res){
          this.setState({
            groupName : '',
            groupDescription : '',
            Active : false
          },()=>this.props.groupList())
          $('.close').trigger('click');
        }
      })
    } 

    handleClose = () => {
      // $(".close, .popup-overlay").on("click", function() {
      //   $(".popup-overlay, .popup-content").removeClass("active");
      // });
          $('.close').trigger('click');
    }

    handleUpdateGroup = async () => {
      let data = {
        id : this.props.grpId,
        GroupName : this.state.editGroupName,
        GroupDescription : this.state.editGroupDescription,
        Active : this.state.editActive
      }
      await services.apiCall.requestApi(`/Groups/Create/${data.id}`,data,'post').then(res=>{
        if(res){
          this.props.groupList();
          $('.close').trigger('click');
        }
      })
    }

    render(){
        return (
              <div className="modal-content">
                <div className="modal-header">
                  {
                    this.props.grpId ? 
                    <h4 className="modal-title w-100">{Lang.langCheck.langRequest("Edit Group")}</h4>
                    :
                    <h4 className="modal-title w-100">{Lang.langCheck.langRequest("Create New Group")}</h4>
                  }
                  <button onClick={()=>this.handleClose()} type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                
                <div className="modal-body text-center">
                 <div className="form-group">
                   {
                     this.props.grpId ?
                    //  <input type="text" value={this.state.editGroupName} name="editGroupName" onChange={this.handleEditChange} className="form-control" placeholder={Lang.langCheck.langRequest("Enter Group Name")} />
                     <Input
                        type="text"
                        style={{ width: "100%"}}
                        className="form-control"
                        name="editGroupName"
                        value={this.state.editGroupName}
                        label={Lang.langCheck.langRequest("Enter Group Name")}
                        onChange={this.handleEditChange}
                      />
                     :
                    //  <input type="text" value={this.state.groupName} name="groupName" onChange={this.handleChange} className="form-control" placeholder={Lang.langCheck.langRequest("Enter Group Name")} />
                    <Input
                      type="text"
                      style={{ width: "100%"}}
                      className="form-control"
                      name="groupName"
                      value={this.state.groupName}
                      label={Lang.langCheck.langRequest("Enter Group Name")}
                      onChange={this.handleChange}
                    />
                   }
                 </div>
                 <div className="form-group">
                  {
                    this.props.grpId ?
                    <Input
                        type="text"
                        style={{ width: "100%"}}
                        className="form-control"
                        name="editGroupDescription"
                        value={this.state.editGroupDescription}
                        label={Lang.langCheck.langRequest("Enter Group Description")}
                        onChange={this.handleEditChange}
                      />
                    // <input type="text" className="form-control" value={this.state.editGroupDescription} name="editGroupDescription" onChange={this.handleEditChange} placeholder={Lang.langCheck.langRequest("Enter Group Description")} />
                    :
                    <Input
                        type="text"
                        style={{ width: "100%"}}
                        className="form-control"
                        name="groupDescription"
                        value={this.state.groupDescription}
                        label={Lang.langCheck.langRequest("Enter Group Description")}
                        onChange={this.handleChange}
                      />
                    // <input type="text" className="form-control" value={this.state.groupDescription} name="groupDescription" onChange={this.handleChange} placeholder={Lang.langCheck.langRequest("Enter Group Description")} />
                  }
                </div>
                <div className="form-group">
                  <div className="custom-control custom-checkbox text-left">
                    {
                      this.props.grpId ?
                      <input type="checkbox" onChange={this.handleEditCheck} checked={this.state.editActive}/>
                      :
                      <input type="checkbox" onChange={this.handleCheck} checked={this.state.Active}/>
                    }
                    {/* <label className="custom-control-label" for="customCheck2">{Lang.langCheck.langRequest("Active")}</label> */}
                    <label className="ml-2">{Lang.langCheck.langRequest("Active")}</label>
                  </div>
                </div>
                <div className="form-group">
                  {
                    this.props.grpId ?
                    <button onClick={this.handleUpdateGroup} className="btn btn-theme mr-4">{Lang.langCheck.langRequest("UPDATE GROUP")}</button>
                    :
                    <button onClick={this.handleCreateGroup} className="btn btn-theme mr-4">{Lang.langCheck.langRequest("CREATE GROUP")}</button>
                  }
              </div>
                </div>
              </div>
        )
    }
}

export default DashboardGroupmodule;