import React, { useEffect, useState } from "react";
import ModalDetector from "../../components/Modal/ModalDetector";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useModal from "../../helpers/useModal";
import { getSlotOfField } from "../../apis/slotApi";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { getField } from "../../apis/fieldApi";
import { sortSlot } from "../../store/admin/SlotSlice";

function Slot(props) {
  const match = useLocation();
  //get id field from url
  const fieldId = match.pathname.split("/")[3];
  const dispatch = useDispatch();
  //get list slot from store redux
  const listSlot = useSelector((state) => state.slot.data);
  const field = useSelector((state) => state.field.data);
  const [showNull, setShowNull] = useState(false);
  const [descLastUpdated, invertLastUpdated] = useState(null);
  //get fieldName from list field by ID
  let fieldName;
  if (field)
    fieldName = field.filter((item) => item.id === parseInt(fieldId))[0].name;
  else fieldName = "";
  const { isShowing, toggle } = useModal();
  const [typeModal, changeTypeModal] = useState(null);
  useEffect(() => {
    dispatch(getSlotOfField(fieldId));
    dispatch(getField());
  }, [dispatch, fieldId]);

  //   // Fix later-------------------------------
  //   function deleteDetector(id) {
  //     dispatch(deleteDetectors(id));
  //   }

  //Fix later----------------------------

  function handleTypeModal(type) {
    toggle();
    changeTypeModal(type);
  }

  function changeFilterShowNull() {
    setShowNull(!showNull);
  }

  //handle Sort Type
  function handleSortLastUpdated() {
    if (descLastUpdated === null) invertLastUpdated(true);
    // invert sort
    else invertLastUpdated(!descLastUpdated);
    dispatch(
      sortSlot({
        prop: "lastTimeUpdate",
        desc: descLastUpdated,
        parser: function (item) {
          return new Date(item);
        },
      })
    );
    // sort function
  }

  return (
    <>
      {/*// <!-- Page Heading -->*/}
      <h1 className="h3 mb-4 text-gray-800 text-capitalize">{`Field ${fieldName}`}</h1>

      {/*// <!-- DataTales Example -->*/}
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between align-items-center">
          <h6 className="m-0 font-weight-bold text-primary">{`Database`}</h6>
          {/* <button
            className="btn-action p-2"
            onClick={() => handleTypeModal(-1)}
          >
            <h6 className="m-0 font-weight-bold text-primary text-right">
              <i className="fa fa-plus-square" /> Create
            </h6>
          </button>
          {isShowing && typeModal === -1 ? (
            <ModalDetector isShowing={isShowing} hide={toggle} />
          ) : null} */}
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
                        className={`fa ${
                          !showNull ? "fa-eye" : "fa-eye-slash"
                        } small`}
                        onClick={changeFilterShowNull}
                      />
                    </div>
                  </th>
                  <th>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>Last Update</div>
                      <i
                        className={`fa ${
                          descLastUpdated === null
                            ? "fa-sort"
                            : !descLastUpdated
                            ? "fa-sort-down"
                            : "fa-sort-up"
                        }`}
                        onClick={handleSortLastUpdated}
                      />
                    </div>
                  </th>
                  <th>Last Setup</th>
                </tr>
              </thead>
              <tbody>
                {listSlot ? (
                  listSlot.map((item, index) => {
                    let statusAnd;
                    if (item.statusCam === null)
                      statusAnd = item.statusDetector;
                    if (item.statusDetector === null)
                      statusAnd = item.statusCam;
                    if (item.statusCam === null && item.statusDetector === null)
                      statusAnd = null;
                    if (item.statusCam !== null && item.statusDetector !== null)
                      statusAnd = item.statusDetector && item.statusCam;
                    if (statusAnd === null && showNull) return null;
                    else
                      return (
                        <tr key={index}>
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
                              "No Address"
                            )}
                          </td>
                          <td>{item.addressGateway || "No Address"}</td>

                          <td>
                            <button
                              className={`btn-status ${
                                item.statusDetector
                                  ? "btn-danger"
                                  : item.statusDetector === null
                                  ? "btn-white"
                                  : "btn-success"
                              }`}
                            >
                              {item.statusDetector
                                ? "Busy"
                                : item.statusDetector === null
                                ? "Null"
                                : "Free"}
                            </button>
                          </td>
                          <td>
                            <button
                              className={`btn-status ${
                                item.statusCam
                                  ? "btn-danger"
                                  : item.statusCam === null
                                  ? "btn-white"
                                  : "btn-success"
                              }`}
                            >
                              {item.statusCam
                                ? "Busy"
                                : item.statusCam === null
                                ? "Null"
                                : "Free"}
                            </button>
                          </td>
                          <td>
                            <button
                              className={`btn-status ${
                                statusAnd
                                  ? "btn-danger"
                                  : statusAnd === null
                                  ? "btn-white"
                                  : "btn-success"
                              }`}
                            >
                              {statusAnd
                                ? "Busy"
                                : statusAnd === null
                                ? "Null"
                                : "Free"}
                            </button>
                          </td>
                          <td>{item.lastTimeUpdate || "No Data"}</td>
                          <td>{item.lastTimeSetup || "No Data"}</td>
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
    </>
  );
}

export default Slot;
