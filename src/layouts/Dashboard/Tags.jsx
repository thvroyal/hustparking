import React, { useEffect } from 'react';

import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { getTag } from '../../apis/tagsApi';

function Tags() {
  const dispatch = useDispatch();
  // state.Tag nhưng do Tag đang bị trống
  const tagsList = useSelector((state) => state.listTag.data);
  console.log(tagsList);

  useEffect(
    () => {
      dispatch(getTag());
    },
    [dispatch],
  );
  return (
    <>
      <h1 className="h3 mb-2 text-gray-800 mb-4">Tags</h1>

      <div className="card mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            All Tags
          </h6>
        </div>
        <div className="card-body p-0">
          {/* // <!-- Billing history table--> */}
          <div className="table-responsive table-billing-history table-hover">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Tags ID</th>
                </tr>
              </thead>
              <tbody>
                {tagsList ? (
                  tagsList.map((tag) => (
                    <tr key={tag.id}>
                      <td>{tag.id}</td>
                      <td>{tag.tagId}</td>
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
    </>
  );
}

export default React.memo(withRouter(Tags));
