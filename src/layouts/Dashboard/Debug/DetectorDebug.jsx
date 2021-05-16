import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPacket } from '../../../apis/packageApi';
import ExportExcel from '../../../utils/ExportExcel';

function DetectorDebug() {
  const dispatch = useDispatch();
  const listDetectors = useSelector((state) => state.packet.data);
  const [listNode, setListFilter] = useState([]);
  useEffect(() => {
    if (listDetectors) {
      const tempArr = listNode ?? [];
      const detector = listDetectors.slice(
        listDetectors.length - 25,
        listDetectors.length,
      );
      for (const item in detector) {
        if (!tempArr.includes(detector[item].nodeAddress)) {
          tempArr.push(detector[item].nodeAddress);
        }
      }
      setListFilter(tempArr);
    }
  }, [listDetectors]);
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getPacket());
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  // Filter Node Address
  const [toggle, isToggle] = useState(false);
  const [filter, mapFilter] = useState([]);
  function handleFilterShow() {
    isToggle(!toggle);
  }
  function handleFilter(data) {
    if (filter.includes(data)) {
      mapFilter([...filter.filter((value) => value !== data)]);
    } else mapFilter([...filter, data]);
  }
  function clearFilter() {
    mapFilter([]);
  }
  function nowDate() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    today = mm + dd + yyyy;
    return today;
  }
  //   function getData() {
  //     dispatch(getPacket());
  //   }
  return (
    <>
      {/* // <!-- Page Heading --> */}
      <h1 className="h3 mb-2 text-gray-800">Debug</h1>
      <p className="mb-4">Checking Realtime. . . </p>

      {/* // <!-- DataTales Example --> */}
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between align-items-center">
          <h6 className="m-0 font-weight-bold text-primary">Database Detectors</h6>
          {listDetectors ? (
            <ExportExcel dataSet={listDetectors} name={`Detector-${nowDate()}`}>
              <button className="btn-action p-2" type="button">
                <h6 className="m-0 font-weight-bold text-primary text-right">
                  <i className="fa fa-file-export" />
                  {' '}
                  Export Excel
                </h6>
              </button>
            </ExportExcel>
          ) : null}
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
                  <th>Seq. Number</th>
                  <th>ID Slot</th>
                  <th>Battery</th>
                  <th>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>Node Address</div>
                      {' '}
                      <i
                        className={`fas fa-filter ${
                          toggle || filter.length ? 'text-primary' : ''
                        }`}
                        onClick={handleFilterShow}
                        style={{ cursor: 'pointer' }}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="dropdown text-end position-absolute">
                      <ul
                        className={`dropdown-menu text-small ${
                          toggle ? 'show' : ''
                        }`}
                        aria-labelledby="dropdownUser1"
                        style={
                          toggle
                            ? {
                              position: 'absolute',
                              inset: '0px auto auto 0px',
                              margin: '0px',
                              transform: 'translate(-8px, 13px)',
                              overflow: 'auto',
                            }
                            : {}
                        }
                      >
                        <li>
                          <a
                            className="dropdown-item text-small text-end text-danger"
                            href="#foo"
                            onClick={clearFilter}
                          >
                            Clear all
                          </a>
                          <hr className="dropdown-divider" />
                        </li>
                        {listNode
                          ? listNode.map((item) => (
                            <li key={item}>
                              <a
                                className="dropdown-item"
                                href="#foo"
                                onClick={() => handleFilter(item)}
                              >
                                {item}
                                {filter.includes(item) ? (
                                  <i className="ml-2 fas fa-check text-primary" />
                                ) : (
                                  ''
                                )}
                              </a>
                              <hr className="dropdown-divider" />
                            </li>
                          ))
                          : null}
                      </ul>
                    </div>
                  </th>
                  <th>State</th>
                  <th>Communication Level</th>
                  <th>Time</th>
                  <th>Node ID</th>
                </tr>
              </thead>
              <tbody>
                {listDetectors ? (
                  listDetectors
                    .slice(listDetectors.length - 25, listDetectors.length)
                    .map((item) => {
                      if (filter.includes(item.nodeAddress) || !filter.length) {
                        return (
                          <tr key={item.id}>
                            <td>{item.packetNumber}</td>
                            <td>{item.location}</td>
                            <td>{item.batteryLevel}</td>
                            <td>{item.nodeAddress}</td>
                            <td>
                              <button
                                className={`btn-status ${
                                  item.state ? 'btn-danger' : 'btn-success'
                                }`}
                                type="button"
                              >
                                {item.state ? 'Busy' : 'Free'}
                              </button>
                            </td>
                            <td>{item.communicationLevel}</td>
                            <td>{item.time}</td>
                            <td>{parseInt(item.idNode, 10)}</td>
                          </tr>
                        );
                      }
                      return null;
                    })
                ) : (
                  <Spinner
                    animation="border"
                    color="primary"
                    className="mt-3"
                  />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(DetectorDebug);
