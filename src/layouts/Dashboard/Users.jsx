import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import ImgAva from '../../assets/img/profile-1.png';
import { fetchListUser } from '../../apis/ListUsersApi';
import ExportExcel from '../../utils/ExportExcel';

function Users() {
  const dispatch = useDispatch();
  const listUser = useSelector((state) => state.listUser.data);
  useEffect(() => {
    dispatch(fetchListUser());
  }, [dispatch]);

  const nowDate = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    today = mm + dd + yyyy;
    return today;
  };
  return (
    <>
      <h1 className="h3 mb-2 text-gray-800">List Users</h1>
      {/* <p className="mb-4">Update after 10 seconds.</p> */}

      <div className="table-responsive mt-4">
        {listUser ? (
          <>
            <ExportExcel dataSet={listUser} name={`Users-${nowDate()}`}>
              <button className="btn-action p-2 border border-primary float-right" type="button">
                <h6 className="m-0 font-weight-bold text-primary text-right">
                  <i className="fa fa-file-export" />
                  {' '}
                  Export Excel
                </h6>
              </button>
            </ExportExcel>
            <table
              className="list-user"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Equipment</th>
                  <th>Last Time Access</th>
                </tr>
              </thead>
              <tbody>
                {listUser.map((user) => (
                  <tr key={user.id}>
                    <td className="avatar">
                      <img className="avatar-img" src={ImgAva} alt="" />
                      {' '}
                      <Link
                        to={`/dashboard/contract/${user.id}`}
                        className="nav-link"
                      >
                        {user.idNumber}
                      </Link>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>{user.equipment}</td>
                    <td>{user.lastTimeAccess}</td>
                    {/* <td>
                      <div className="badge badge-success badge-pill">
                        Online
                      </div>
                    </td>
                    <td>
                      <i className="fa fa-ellipsis-v" />
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <div className="text-center w-100 h3 mt-5">No data</div>
        )}
      </div>
    </>
  );
}

export default React.memo(withRouter(Users));
