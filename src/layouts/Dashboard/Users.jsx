import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import ImgAva from '../../assets/img/profile-1.png';
import { fetchListUser } from '../../apis/ListUsersApi';

function Users() {
  const dispatch = useDispatch();
  const listUser = useSelector((state) => state.listUser.data);
  useEffect(() => {
    dispatch(fetchListUser());
  }, [dispatch]);
  return (
    <>
      <h1 className="h3 mb-2 text-gray-800">List Users</h1>
      {/* <p className="mb-4">Update after 10 seconds.</p> */}

      <div className="table-responsive mt-4">
        {listUser ? (
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
        ) : (
          <div className="text-center w-100 h3 mt-5">No data</div>
        )}
      </div>
    </>
  );
}

export default React.memo(withRouter(Users));
