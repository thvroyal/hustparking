import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import {
  func, bool, string, shape, number,
} from 'prop-types';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ModalSavePoint = ({
  onClose, open, fieldName, currentPoint,
}) => {
  const [isLoading, setLoading] = useState(false);

  const { alias } = useSelector((state) => state.auth);

  const handleClose = () => {
    onClose();
  };

  const handleClick = async () => {
    const data = {
      currentPoint,
      id: 0,
    };

    try {
      setLoading(true);
      const response = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BASE_URL}/api/${alias}/slot/create_and_update`,
        headers: {
          token: localStorage.getItem('AccessToken'),
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
      });

      setLoading(false);
      if (response.data.message === 'success') {
        console.log(response.data.data);
        toast.success('Created new slot', {
          position: toast.POSITION.TOP_RIGHT,
          onOpen: handleClose,
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error('Can\'t create new slot for this field');
      console.log(error);
    }
  };

  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Slot</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group row align-items-center">
          <label className="col-sm-4 col-form-label">Field name</label>
          <div className="col-sm-8">
            <input type="text" readOnly className="form-control-plaintext" value={fieldName} />
          </div>
        </div>
        <div className="form-group row align-items-center">
          <label className="col-sm-4 col-form-label">Status Camera</label>
          <div className="col-sm-8">
            Hehe
          </div>
        </div>
        <div className="form-group row align-items-center">
          <label className="col-sm-4 col-form-label">Status Detector</label>
          <div className="col-sm-8">
            Hihi
          </div>
        </div>
        <button className="btn btn-primary float-right" type="button" onClick={handleClick} disabled={isLoading}>Create</button>
      </Modal.Body>
    </Modal>
  );
};

ModalSavePoint.propTypes = {
  onClose: func.isRequired,
  open: bool.isRequired,
  fieldName: string,
  currentPoint: shape({
    lat: number,
    lng: number,
  }).isRequired,
};

ModalSavePoint.defaultProps = {
  fieldName: '',
};
export default React.memo(ModalSavePoint);
