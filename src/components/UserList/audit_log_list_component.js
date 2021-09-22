import React from 'react';



class AuditLogUserListComponent extends React.Component{
    render(){
        return (
            <>
                <h2 className="heading-table">Audit Logs</h2>
          <div className="table-responsive table-section">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th><a href="#">Activity</a></th>
                  <th><a href="#">Time</a></th>
                  <th><a href="#">User </a></th>
                  <th><a href="#">Date</a></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Created New Group #7584</td>
                  <td>12:23 PM</td>
                  <td>Ada Lovelace</td>
                  <td>22/11/2019</td>
                </tr>
                <tr>
                  <td>Created New Group #7584</td>
                  <td>12:23 PM</td>
                  <td>Ada Lovelace</td>
                  <td>22/11/2019</td>
                </tr>
                <tr>
                  <td>Created New Group #7584</td>
                  <td>12:23 PM</td>
                  <td>Ada Lovelace</td>
                  <td>22/11/2019</td>
                </tr>
              </tbody>
            </table>
            </div>
            </>
        )
    }
}

export default AuditLogUserListComponent;