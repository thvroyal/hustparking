import React from 'react';
import { Modal } from 'react-bootstrap';
// import {
//   func, bool, string, arrayOf,
// } from 'prop-types';
import PropTypes from 'prop-types';

const ModalTableMap = ({ onClose, open, listFields }) => {
  const handleClose = () => {
    onClose();
  };
  return (
    <>
      <Modal show={open} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Total fields</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-body p-0">
            <div className="table-responsive table-billing-history table-hover">
              <table className="list-user">
                <thead>
                  <tr>
                    <th scope="col">Field id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Longitude</th>
                    <th scope="col">Latitude</th>
                    <th scope="col">Status</th>
                    <th scope="col">Price</th>
                    <th scope="col">Total book</th>
                    <th scope="col">Busy slot</th>
                    <th scope="col">Total slot</th>
                    <th scope="col">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {listFields ? (
                    listFields.listOfFields.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.longitude}</td>
                        <td>{item.latitude}</td>
                        <td>{item.openstatus}</td>
                        <td>{item.price}</td>
                        <td>{item.totalBook}</td>
                        <td>{item.busySlot}</td>
                        <td>{item.totalSlot}</td>
                        <td>{item.details}</td>
                      </tr>
                    ))
                  ) : ''}
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(ModalTableMap);

ModalTableMap.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  listFields: PropTypes.arrayOf.isRequired,
};
