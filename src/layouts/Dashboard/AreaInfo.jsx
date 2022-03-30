import React from 'react';

function AreaInfo() {
  return (
    <div className="card-body p-0">
      <div className="table-responsive table-billing-history table-hover">
        <table className="list-user">
          <thead>
            <tr>
              <th scope="col">Area name</th>
              <th scope="col">Field name</th>
              <th scope="col">Total slots of field</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bách Khoa</td>
              <td>C9</td>
              <td>200</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AreaInfo;
