import React, { useEffect, useState } from 'react';
import { useLocation, withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getDetectors } from '../../apis/detectorsApi';
import ModalCreateDetector from '../../components/Modal/ModalDetector/ModalCreateDetector';
import ModalDeleteDetector from '../../components/Modal/ModalDetector/ModalDeleteDetector';

const Detectors = React.memo(() => {
  const match = useLocation();
  const idField = match.pathname.split('/')[3];
  const idGW = match.pathname.split('/')[5];
  console.log(match, idGW);
  const dispatch = useDispatch();
  const listDetectors = useSelector((state) => state.detector.data);
  console.log(listDetectors);
  const [isOpenModalDetector, setOpenModalDetector] = useState(false);
  const [isOpenModalDelete, setOpenModalDelete] = useState(false);
  const [checkField, setCheckField] = useState(false);
  const [addrDetector, setAddrDetector] = useState('');
  const [id, setId] = useState(0);

  const creatDetector = () => {
    setCheckField(false);
    setOpenModalDetector(true);
  };

  useEffect(() => {
    dispatch(getDetectors(idGW));
  }, [dispatch, idGW]);
  return (
    <>
      {/* // <!-- Page Heading --> */}
      <h1 className="h3 mb-2 text-gray-800">Gateway</h1>
      <p className="mb-4">{`Gateway #${idGW}`}</p>

      {/* // <!-- DataTales Example --> */}
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between align-items-center">
          <h6 className="m-0 font-weight-bold text-primary">Database Detectors</h6>
          <div>
            <button type="button" className="btn btn-outline-primary" onClick={creatDetector}>Create Detector</button>
          </div>
        </div>
        <div className="card-body" style={{ backgroundColor: '#f8f9fc' }}>
          <div className="table-responsive table-hover">
            <table
              className="list-user"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>Detector ID</th>
                  <th>Address</th>
                  <th>Slot ID</th>
                  <th>Gateway ID</th>
                  <th>Last Update</th>
                  <th>Last Setup</th>
                  <th>Battery Level</th>
                  <th>Communication Level</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {listDetectors ? (
                  listDetectors.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>
                        <Link
                          className="card-link"
                          to={`/dashboard/detector/${item.id}`}
                        >
                          {item.addressDetector}
                        </Link>
                      </td>
                      <td>{Number(item.slotId) - Number(idField) * 1000}</td>
                      <td>{item.gatewayId}</td>
                      <td>{item.lastTimeUpdate}</td>
                      <td>{item.lastTimeSetup}</td>
                      <td>{item.batteryLevel}</td>
                      <td>{item.communication_level}</td>
                      <td>
                        <div className="d-flex justify-content-around align-item-center">
                          <button
                            type="button"
                            className="btn btn-outline-info mr-1"
                            onClick={() => {
                              setCheckField(true);
                              setAddrDetector(item.addressDetector);
                              setOpenModalDetector(true);
                            }}
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger ml-1"
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
                  ))
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
      <ModalCreateDetector
        onClose={() => setOpenModalDetector(false)}
        open={isOpenModalDetector}
        checkField={checkField}
        idGW={idGW}
        id={id}
        idField={idField}
        addrDetector={addrDetector}
      />
      <ModalDeleteDetector
        onClose={() => setOpenModalDelete(false)}
        open={isOpenModalDelete}
        id={id}
        idGW={idGW}
      />
    </>
  );
});

export default withRouter(Detectors);
