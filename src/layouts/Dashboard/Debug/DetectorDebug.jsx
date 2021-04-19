import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPacket } from "../../../apis/packageApi";

function DetectorDebug(props) {
  const dispatch = useDispatch();
  const listDetectors = useSelector((state) => state.packet.data);
  const [listNode, setListFilter] = useState([]);
  useEffect(() => {
    if (listDetectors) {
      const tempArr = listNode ?? [];
      for (let item in listDetectors) {
        if (!tempArr.includes(listDetectors[item].nodeAddress))
          tempArr.push(listDetectors[item].nodeAddress);
      }
      setListFilter(tempArr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listDetectors]);
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getPacket());
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  //Filter Node Address
  const [toggle, isToggle] = useState(false);
  const [filter, mapFilter] = useState([]);
  function handleFilterShow() {
    isToggle(!toggle);
  }
  function handleFilter(data) {
    if (filter.includes(data))
      mapFilter([...filter.filter((value) => value !== data)]);
    else mapFilter([...filter, data]);
  }
  function clearFilter() {
    mapFilter([]);
  }
  //   function getData() {
  //     dispatch(getPacket());
  //   }
  return (
    <>
      {/*// <!-- Page Heading -->*/}
      <h1 className="h3 mb-2 text-gray-800">Debug</h1>
      <p className="mb-4">Checking Realtime. . . </p>

      {/*// <!-- DataTales Example -->*/}
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between align-items-center">
          <h6 className="m-0 font-weight-bold text-primary">{`Database Detectors`}</h6>
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
                      <div>Node Address</div>{" "}
                      <i
                        className={`fas fa-filter ${
                          toggle || filter.length ? "text-primary" : ""
                        }`}
                        onClick={handleFilterShow}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div className="dropdown text-end">
                      <ul
                        className={`dropdown-menu text-small ${
                          toggle ? "show" : ""
                        }`}
                        aria-labelledby="dropdownUser1"
                        style={
                          toggle
                            ? {
                                position: "absolute",
                                inset: "0px auto auto 0px",
                                margin: "0px",
                                transform: "translate(-8px, 13px)",
                                overflow: "auto",
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
                          ? listNode.map((item, key) => {
                              return (
                                <li key={key}>
                                  <a
                                    className="dropdown-item"
                                    href="#foo"
                                    onClick={() => handleFilter(item)}
                                  >
                                    {item}
                                    {filter.includes(item) ? (
                                      <i className="ml-2 fas fa-check text-primary" />
                                    ) : (
                                      ""
                                    )}
                                  </a>
                                  <hr className="dropdown-divider" />
                                </li>
                              );
                            })
                          : null}
                      </ul>
                    </div>
                  </th>
                  <th>State</th>
                  <th>Communication Level</th>
                  <th>Time</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {listDetectors ? (
                  listDetectors.map((item, index) => {
                    if (filter.includes(item.nodeAddress) || !filter.length)
                      return (
                        <tr key={index}>
                          <td>{item.packetNumber}</td>
                          <td>{item.id}</td>
                          <td>{item.batteryLevel}</td>
                          <td>{item.nodeAddress}</td>
                          <td>
                            <button
                              className={`btn-status ${
                                item.state ? "btn-danger" : "btn-success"
                              }`}
                            >
                              {item.state ? "Busy" : "Free"}
                            </button>
                          </td>
                          <td>{item.communicationLevel}</td>
                          <td>{item.time}</td>
                          <td>{item.location}</td>
                        </tr>
                      );
                    else return null;
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
    </>
  );
}

export default withRouter(DetectorDebug);
