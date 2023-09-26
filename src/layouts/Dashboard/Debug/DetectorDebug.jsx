import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPacket } from '../../../apis/packageApi';
import ExportExcel from '../../../utils/ExportExcel';
import { LIST_FILTER } from '../../../helpers/constants';

function DetectorDebug() {
  const dispatch = useDispatch();
  const listDetectors = useSelector((state) => state.packet.data);
  const [listNode, setListFilter] = useState([]);

  const handlePackageDetector = (num = 20) => {
    if (listDetectors) {
      const tempArr = listNode ?? [];
      const detector = listDetectors.slice(listDetectors.length - num, listDetectors.length);
      for (const item in detector) {
        if (!tempArr.includes(detector[item].nodeAddress)) {
          tempArr.push(detector[item].nodeAddress);
        }
      }
      setListFilter(tempArr);
    }
  };

  useEffect(() => {
    handlePackageDetector();
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

  // Filter packages
  const [togglePackage, setTogglePackage] = useState(false);
  const [numFilter, setNumFilter] = useState(20);
  function handleFilterPackageShow() {
    setTogglePackage(!togglePackage);
  }
  const showAll = () => {
    setNumFilter(listDetectors.length);
    handlePackageDetector(listDetectors.length);
  };

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
      {/* // <!-- DataTales Example --> */}
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex align-items-center flex-row-reverse justify-content-between">
          {listDetectors ? (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <div style={{ position: 'relative', marginRight: '10px' }}>Filter</div>
                {' '}
                <i
                  className="fas fa-filter text-primary"
                  onClick={handleFilterPackageShow}
                  style={{ cursor: 'pointer' }}
                  aria-hidden="true"
                />
              </div>
              <div className="dropdown text-end position-absolute">
                <ul
                  className={`dropdown-menu text-small ${togglePackage ? 'show' : ''}`}
                  aria-labelledby="dropdownUser1"
                  style={
                    togglePackage
                      ? {
                        position: 'absolute',
                        inset: '0px auto auto 0px',
                        margin: '0px',
                        transform: 'translate(-150px, 13px)',
                        overflow: 'auto',
                      }
                      : {}
                  }
                >
                  <li>
                    <a
                      className="dropdown-item text-small text-end text-danger"
                      href="#foo"
                      onClick={showAll}
                    >
                      Show all
                    </a>
                    <hr className="dropdown-divider" />
                  </li>
                  {LIST_FILTER
                    ? LIST_FILTER.map((item) => (
                      <li key={item}>
                        <a
                          className="dropdown-item"
                          href="#foo"
                          onClick={() => {
                            setNumFilter(item);
                            handlePackageDetector(item);
                          }}
                        >
                          {item}
                        </a>
                        <hr className="dropdown-divider" />
                      </li>
                    ))
                    : null}
                </ul>
              </div>
              <ExportExcel dataSet={listDetectors} name={`Detector-${nowDate()}`}>
                <button className="btn-action p-2" type="button">
                  <h6 className="m-0 font-weight-bold text-primary text-right">
                    <i className="fa fa-file-export" />
                    {' '}
                    Export Excel
                  </h6>
                </button>
              </ExportExcel>
            </>
          ) : null}
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
                  <th>Seq. Number</th>
                  <th>ID Slot</th>
                  <th>Battery</th>
                  <th>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>Node Address</div>
                      {' '}
                      <i
                        className={`fas fa-filter ${toggle || filter.length ? 'text-primary' : ''}`}
                        onClick={handleFilterShow}
                        style={{ cursor: 'pointer' }}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="dropdown text-end position-absolute">
                      <ul
                        className={`dropdown-menu text-small ${toggle ? 'show' : ''}`}
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
                    .slice(listDetectors.length - numFilter, listDetectors.length)
                    .map((item) => {
                      if (filter.includes(item.nodeAddress) || !filter.length) {
                        const convertTimeYear = item.time.slice(0, 4);
                        const convertTimeMonth = item.time.slice(4, 6);
                        const convertTimeDay = item.time.slice(6, 8);
                        const convertTimeHours = item.time.slice(8, 10);
                        const convertTimeMin = item.time.slice(11, 13);
                        const convertTimeSecond = item.time.slice(12);
                        console.log(item.time);
                        const date = `${convertTimeHours}:${convertTimeMin}:${convertTimeSecond} ${convertTimeDay}:${convertTimeMonth}:${convertTimeYear}`;
                        return (
                          <tr key={item.id}>
                            <td>{item.packetNumber}</td>
                            <td>{item.location}</td>
                            <td>{item.batteryLevel}</td>
                            <td>{item.nodeAddress}</td>
                            <td>
                              <button
                                className={`btn-status ${item.state ? 'btn-danger' : 'btn-success'}`}
                                type="button"
                              >
                                {item.state ? 'Busy' : 'Free'}
                              </button>
                            </td>
                            <td>{item.communicationLevel}</td>
                            <td>{date}</td>
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
