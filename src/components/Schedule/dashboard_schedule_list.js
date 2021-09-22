import React from 'react';
import services from '../../services';
import TableHeader from './../common/table_header';
import TablePagination from './../common/TablePagination.js';
import Lang from '../../lang'





class DashboardGroup extends React.Component{

    render(){
        return ( 
    <div className="inner-container">
    <div className="outer-space">
      <div className="container-fluid">
         <div className="table-responsive table-section">
          <h3> A pesquisa retornou {this.props.data.totalcount} resultados </h3>
          {/* <table className="table table-hover">
            <thead>
              <tr>
                <TableHeader columename={Lang.langCheck.langRequest("Title")} columnkey="title" func={(sort,columnkey)=>this.props.updatelistsort(sort,columnkey)} />
                <TableHeader columename={Lang.langCheck.langRequest("Entity")} columnkey="entity" func={(sort,columnkey)=>this.props.updatelistsort(sort,columnkey)} />
                <TableHeader columename={Lang.langCheck.langRequest("Status")} columnkey="status" func={(sort,columnkey)=>this.props.updatelistsort(sort,columnkey)} /> */}
                {/* <TableHeader columename={Lang.langCheck.langRequest("Last Login Date")} columnkey="Last Login Date" func={(sort,columnkey)=>this.props.updatelistsort(sort,columnkey)} /> */}
                {/* <TableHeader columename={Lang.langCheck.langRequest("Observations")} columnkey="observation" func={(sort,columnkey)=>this.props.updatelistsort(sort,columnkey)} />
                <TableHeader columename={Lang.langCheck.langRequest("Attendance")} columnkey="attendance" func={(sort,columnkey)=>this.props.updatelistsort(sort,columnkey)} />
                <th>{Lang.langCheck.langRequest("Action")}</th>
              </tr>
            </thead>
            <tbody>
            {
            this.props.data.data.map((_row,index)=>(
                <tr >
                    <td>{_row.title}</td>
                    <td>{_row.entity}</td> */}
                    {/* <td>{_row."Last Login Date}</td> */}
                    {/* <td>{_row.status}</td>
                    <td>{_row.observation}</td>
                    <td>{_row.attendance}</td>
                  <td>
                    <div className="action">
                      <a  href={`create_schedule?id=${_row.id}`} ><i className="fas fa-edit text-active" aria-hidden="true"></i></a>
                      <a href={`schedule_detail?id=${_row.id}`} ><i className="fas fa-caret-square-left text-yellow"></i></a>
                      <a href="#"><i className="fas fa-times-circle text-inactive"></i></a>
                       */}
                      {/* <a href="#"><i className="fas fa-sync-alt text-blue"></i></a> */}
                    {/* </div>
                   </td>
                  
              </tr>
               ))
              }
              <tr>
                <td colspan="6">
                        <TablePagination  totalcount={this.props.data.totalcount} PageSize={this.props.data.PageSize}  currentpage={this.props.data.Page} func={(PageSize, page_num)=>this.props.updatelistpagenumsize(PageSize, page_num)} />
                </td>
            </tr>
            </tbody>
          </table> */}
          {
            this.props.telkikTable
          }
          </div>
      </div>
      </div>
      </div>
        )
    }
}

export default DashboardGroup;