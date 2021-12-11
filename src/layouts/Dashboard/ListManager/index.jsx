import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import ImgAva from '../../../assets/img/profile-1.png';
import { getListManager } from '../../../apis/managerFieldApi';
import UpdateField from './UpdateField';
import ModalDeleteMn from '../../../components/Modal/ModalDeleteMn';

function Managers() {
  const dispatch = useDispatch();
  const listManager = useSelector((state) => state.listManager.data);

  // const [isDeleting, setIsDeleting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModelDelete, setOpenModalDelete] = useState(false);
  const [idMn, setIdMn] = useState(null);
  const [selectedMn, setSelectedMn] = useState(null);
  const [listFieldSelected, setListFieldSelected] = useState([]);
  console.log(listFieldSelected);

  // filter list start
  const listFieldFilter = (fieldID) => {
    console.log(listFieldSelected);
    if (listFieldSelected.includes(fieldID)) {
      const filter = listFieldSelected.filter((item) => item !== fieldID);
      return setListFieldSelected([...filter]);
    }
    return setListFieldSelected([...listFieldSelected, fieldID]);
  };

  const listField = (fieldIdx) => setListFieldSelected(() => listFieldFilter(fieldIdx));
  // filter list end

  useEffect(() => {
    dispatch(getListManager());
  }, [dispatch]);

  const onClickUpdate = (id) => {
    setSelectedMn(id);
    setOpenModal(true);
  };

  const onClickDelete = (id) => {
    setIdMn(id);
    setOpenModalDelete(true);
  };

  return (
    <>
      <h1 className="h3 mb-2 text-gray-800">List Manager</h1>
      <div>
        <Link to="/dashboard/new-manager">
          <button type="button" className="btn btn-primary float-right">Create Manager</button>
        </Link>
      </div>
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
                  <td>{mn.lastTimeAccess}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary mr-2" type="button" onClick={() => onClickUpdate(mn.id)}>Set and update fields</button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      type="button"
                      onClick={() => onClickDelete(mn.id)}
                    // disabled={isDeleting}
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
            <>
              <UpdateField
                open={openModal}
                onClose={() => setOpenModal(false)}
                selected={selectedMn}
                listField={listField}
                listFieldSelected={listFieldSelected}
              />
            </>
          )}
        {openModelDelete
          && (
            <ModalDeleteMn
              open={openModelDelete}
              onClose={() => setOpenModalDelete(false)}
              idManager={idMn}
            />
          )}
      </div>
    </>
  );
}

export default React.memo(withRouter(Managers));
