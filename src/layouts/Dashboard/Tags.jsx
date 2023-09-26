import React, { useEffect, useState } from 'react';

import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { getTag } from '../../apis/tagsApi';
import ModalTag from '../../components/Modal/ModalTag/ModalTag';
import ModalDelete from '../../components/Modal/ModalTag/ModalDelete';

function Tags() {
  const dispatch = useDispatch();
  const tagsList = useSelector((state) => state.listTag.data);

  const [isOpenModalTag, setOpenModalTag] = useState(false);
  const [isOpenModalDelete, setOpenModalDelete] = useState(false);
  const [checkField, setCheckField] = useState(false);
  const [id, setId] = useState(0);

  const register = () => {
    setCheckField(true);
    setOpenModalTag(true);
  };
  const update = () => {
    setCheckField(false);
    setOpenModalTag(true);
  };

  useEffect(
    () => {
      dispatch(getTag());
    },
    [dispatch],
  );
  return (
    <>
      <h1 className="h3 mb-2 text-gray-800 mb-4 pt-2">Tags</h1>

      <div className="card mb-4">
        <div className="card-header py-3 d-flex justify-content-between">
          <div>
            <h6 className="m-0 font-weight-bold text-primary mt-2">
              All Tags
            </h6>
          </div>
          <div>
            <button type="button" className="btn btn-outline-primary" onClick={register}>Register</button>
          </div>
        </div>
        <div className="card-body p-0" style={{ backgroundColor: '#f8f9fc' }}>
          {/* // <!-- Billing history table--> */}
          <div className="table-responsive table-billing-history table-hover text-center">
            <table className="list-user">
              <thead>
                <tr>
                  <th scope="col">User ID</th>
                  <th scope="col">Tags ID</th>
                  <th scope="col">User email</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {tagsList ? (
                  tagsList.map((tag) => (
                    <tr key={tag.tagId}>
                      <td>{tag.user?.id}</td>
                      <td>{tag.tagId}</td>
                      <td>{tag.user?.email}</td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <div>
                            <button type="button" className="btn btn-outline-info mr-1" onClick={update}>Update</button>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="btn btn-outline-danger ml-1"
                              onClick={() => {
                                setId(tag.tagId);
                                setOpenModalDelete(true);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <Spinner animation="border" color="primary" />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ModalTag
        onClose={() => setOpenModalTag(false)}
        open={isOpenModalTag}
        checkField={checkField}
      />
      <ModalDelete
        onClose={() => setOpenModalDelete(false)}
        open={isOpenModalDelete}
        id={id}
      />
    </>
  );
}

export default React.memo(withRouter(Tags));
