import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { getSlotOfField } from '../../apis/slotApi';
import { getField } from '../../apis/fieldApi';
import { sortSlot } from '../../store/admin/SlotSlice';
import ModalCreateSlot from '../../components/Modal/ModalSlot/ModalCreateSlot';
import ModalDeleteSlot from '../../components/Modal/ModalSlot/ModalDeleteSlot';

function Slot() {
  const match = useLocation();
  // get id field from url
  const fieldId = match.pathname.split('/')[3];
  const dispatch = useDispatch();
  // get list slot from store redux
  const listSlot = useSelector((state) => state.slot.data);
  const field = useSelector((state) => state.field.data);

  const [showNull, setShowNull] = useState(false);
  const [descLastUpdated, invertLastUpdated] = useState(null);
  const [isOpenModalCreateSlot, setOpenModalCreateSlot] = useState(false);
  const [isOpenModalDelete, setOpenModalDelete] = useState(false);
  const [id, setId] = useState(0);
  // get fieldName from list field by ID
  let fieldName;
  if (field) { fieldName = field.filter((item) => item.id === parseInt(fieldId, 10))[0].name; } else fieldName = '';
  useEffect(() => {
    dispatch(getSlotOfField(fieldId));
    dispatch(getField());
  }, [dispatch, fieldId]);

  function changeFilterShowNull() {
    setShowNull(!showNull);
  }

  // handle Sort Type
  function handleSortLastUpdated() {
    if (descLastUpdated === null) invertLastUpdated(true);
    // invert sort
    else invertLastUpdated(!descLastUpdated);
    dispatch(
      sortSlot({
        prop: 'lastTimeUpdate',
        desc: descLastUpdated,
        parser(item) {
          return new Date(item);
        },
      }),
    );
    // sort function
  }

  return (
    <>
      <h1 className="h3 mb-4 text-gray-800 text-capitalize">{`Field ${fieldName}`}</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between align-items-center">
          <h6 className="m-0 font-weight-bold text-primary">Database</h6>
          <button className="btn btn-outline-primary" type="button" onClick={() => setOpenModalCreateSlot(true)}>Create Field</button>
        </div>
        <div className="card-body">
          <div className="table-responsive table-hover">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>Slot ID</th>
                  <th>Address Detector</th>
                  <th>Address Gateway</th>
                  <th>Status Detector</th>
                  <th>Status Cam</th>
                  <th>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>Status</div>
                      <i
                        className={`fa ${!showNull ? 'fa-eye' : 'fa-eye-slash'} small`}
                        onClick={changeFilterShowNull}
                        aria-hidden="true"
                      />
                    </div>
                  </th>
                  <th>Last Time Cam</th>
                  <th>Last Time Detector</th>
                  <th>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>Last Update</div>
                      <i
                        className={`fa ${descLastUpdated === null
                          ? 'fa-sort'
                          : !descLastUpdated
                            ? 'fa-sort-down'
                            : 'fa-sort-up'}`}
                        onClick={handleSortLastUpdated}
                        aria-hidden="true"
                      />
                    </div>
                  </th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {listSlot ? (
                  listSlot.map((item) => {
                    let statusAnd;
                    if (item.statusCam === null) statusAnd = item.statusDetector;
                    if (item.statusDetector === null) statusAnd = item.statusCam;
                    if (item.statusCam === null && item.statusDetector === null) statusAnd = null;
                    if (item.statusCam !== null && item.statusDetector !== null) {
                      statusAnd = item.statusDetector && item.statusCam;
                    }
                    if (statusAnd === null && showNull) return null;
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                          {item.addressDetector ? (
                            <Link
                              to={`/dashboard/detector/${item.detectorId}`}
                              className="card-link"
                            >
                              {item.addressDetector}
                            </Link>
                          ) : (
                            'No Address'
                          )}
                        </td>
                        <td>{item.addressGateway || 'No Address'}</td>

                        <td>
                          <button
                            className={`btn-status ${item.statusDetector
                              ? 'btn-danger'
                              : item.statusDetector === null
                                ? 'btn-white'
                                : 'btn-success'}`}
                            type="button"
                          >
                            {item.statusDetector
                              ? 'Busy'
                              : item.statusDetector === null
                                ? 'Null'
                                : 'Free'}
                          </button>
                        </td>
                        <td>
                          <button
                            className={`btn-status ${item.statusCam
                              ? 'btn-danger'
                              : item.statusCam === null
                                ? 'btn-white'
                                : 'btn-success'}`}
                            type="button"
                          >
                            {item.statusCam
                              ? 'Busy'
                              : item.statusCam === null
                                ? 'Null'
                                : 'Free'}
                          </button>
                        </td>
                        <td>
                          <button
                            className={`btn-status ${statusAnd
                              ? 'btn-danger'
                              : statusAnd === null
                                ? 'btn-white'
                                : 'btn-success'}`}
                            type="button"
                          >
                            {statusAnd
                              ? 'Busy'
                              : statusAnd === null
                                ? 'Null'
                                : 'Free'}
                          </button>
                        </td>
                        <td>{item.lastTimeCam || 'No Data'}</td>
                        <td>{item.lastTimeDetector || 'No Data'}</td>
                        <td>{item.lastTimeUpdate || 'No Data'}</td>
                        <td>
                          <div className="d-flex align-item-center">
                            <button
                              type="button"
                              className="btn btn-danger ml-1"
                              onClick={() => {
                                setId(item.id);
                                setOpenModalDelete(true);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>
                      <Spinner animation="border" color="primary" />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ModalCreateSlot
        onClose={() => setOpenModalCreateSlot(false)}
        open={isOpenModalCreateSlot}
        fieldName={fieldName}
        fieldId={fieldId}
      />
      <ModalDeleteSlot
        onClose={() => setOpenModalDelete(false)}
        open={isOpenModalDelete}
        fieldId={fieldId}
        id={id}
      />
    </>
  );
}

export default Slot;
