import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { Link } from 'react-router-dom';
import ImgAva from '../../../assets/img/profile-1.png';
import { getListManager } from '../../../apis/managerFieldApi';
import UpdateField from './UpdateField';

function Managers() {
  const dispatch = useDispatch();
  const listManager = useSelector((state) => state.listManager.data);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMn, setSelectedMn] = useState(null);
  useEffect(() => {
    dispatch(getListManager());
  }, [dispatch]);

  const onClickUpdate = (id) => {
    setSelectedMn(id);
    setOpenModal(true);
  };

  const handleDeleteManager = async (idManager) => {
    setIsDeleting(true);
    try {
      const response = await axios({
        method: 'DELETE',
        url: `${process.env.REACT_APP_BASE_URL}/api/ad/manager/delete/${idManager}`,
        headers: {
          token: localStorage.getItem('AccessToken'),
        },
      });
      setIsDeleting(false);
      if (response.data.message === 'success') {
        // neu xoa thanh cong thi se call api load lai state moi
        dispatch(getListManager());
        // TODO: add notification show delete success
      }
    } catch (error) {
      setIsDeleting(false);
      // TODO: add notification show delete success
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="h3 mb-2 text-gray-800">List Manager</h1>
      <div className="table-responsive mt-4">
        {listManager && (
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listManager.map((mn) => (
                <tr key={mn.id}>
                  <td className="avatar">
                    <img className="avatar-img" src={ImgAva} alt="" />
                    {' '}
                    <Link
                      to={`/dashboard/contract/${mn.id}`}
                      className="nav-link"
                    >
                      {mn.idNumber}
                    </Link>
                  </td>
                  <td>{mn.email}</td>
                  <td>{mn.address}</td>
                  <td>{mn.equipment}</td>
                  <td>{mn.lastTimeAccess}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary mr-2" type="button" onClick={() => onClickUpdate(mn.id)}>Update Fields</button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      type="button"
                      onClick={() => { handleDeleteManager(mn.id); }}
                      disabled={isDeleting}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!listManager
          && <div className="text-center w-100 h3 mt-5">No data</div>}
        {openModal
        && (
        <UpdateField
          open={openModal}
          onClose={() => setOpenModal(false)}
          selected={selectedMn}
        />
        )}
      </div>
    </>
  );
}

export default React.memo(withRouter(Managers));