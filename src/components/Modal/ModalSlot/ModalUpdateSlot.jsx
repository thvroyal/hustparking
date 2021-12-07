import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import {
  func, bool, string,
} from 'prop-types';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import SwitchToggle from '../../SwitchToggle';
import { getSlotOfField } from '../../../apis/slotApi';

const ModalUpdateSlot = ({
  onClose, open, fieldName, fieldId,
}) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [statusCam, setStatusCam] = useState(false);
  const [statusDetector, setStatusDetector] = useState(false);

  const { alias } = useSelector((state) => state.auth);

  const handleClose = () => {
    onClose();
  };

  const handleClick = async () => {
    const data = {
      statusCam,
      statusDetector,
      fieldId,
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
      dispatch(getSlotOfField(fieldId));

      setLoading(false);
      if (response.data.message === 'success') {
        console.log(response.data.data);
        toast.success('Updated new slot', {
          position: toast.POSITION.TOP_RIGHT,
          onOpen: handleClose,
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error('Can\'t update new slot for this field');
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
          <label htmlFor={`field-${fieldId}`} className="col-sm-4 col-form-label">Field name</label>
          <div className="col-sm-8">
            <input type="text" readOnly className="form-control-plaintext" id={`field-${fieldId}`} value={fieldName} />
          </div>
        </div>
        <div className="form-group row align-items-center">
          <label htmlFor={`field-${fieldId}`} className="col-sm-4 col-form-label">Status Camera</label>
          <div className="col-sm-8">
            <SwitchToggle
              onChecked={() => setStatusCam(true)}
              onUnchecked={() => setStatusCam(false)}
              scale={0.7}
            />
          </div>
        </div>
        <div className="form-group row align-items-center">
          <label htmlFor={`field-${fieldId}`} className="col-sm-4 col-form-label">Status Detector</label>
          <div className="col-sm-8">
            <SwitchToggle
              onChecked={() => setStatusDetector(true)}
              onUnchecked={() => setStatusDetector(false)}
              scale={0.7}
            />
          </div>
        </div>
        <button className="btn btn-primary float-right" type="button" onClick={handleClick} disabled={isLoading}>Update</button>
      </Modal.Body>
    </Modal>
  );
};

ModalUpdateSlot.propTypes = {
  onClose: func.isRequired,
  open: bool.isRequired,
  fieldName: string,
  fieldId: string.isRequired,
};

ModalUpdateSlot.defaultProps = {
  fieldName: '',
};
export default React.memo(ModalUpdateSlot);
