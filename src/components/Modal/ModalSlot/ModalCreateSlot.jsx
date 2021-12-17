import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import {
  func, bool, string,
} from 'prop-types';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getSlotOfFieldViewMin } from '../../../apis/slotApi';

const ModalCreateSlot = ({
  onClose, open, fieldName, fieldId,
}) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [slotId, setSlotId] = useState();

  const { alias } = useSelector((state) => state.auth);

  const handleClose = () => {
    onClose();
  };

  const handleCreateSlotId = (e) => setSlotId(Number(e.target.value));

  const handleClick = async () => {
    const data = {
      fieldId,
      id: slotId,
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
      dispatch(getSlotOfFieldViewMin(fieldId));

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
          <label htmlFor={`field-${fieldId}`} className="col-sm-4 col-form-label">Field name</label>
          <div className="col-sm-8">
            <input type="text" readOnly className="form-control-plaintext" id={`field-${fieldId}`} value={fieldName} />
          </div>
        </div>
        <div className="form-group row align-items-center">
          <label htmlFor="fieldId" className="col-sm-4 col-form-label">Field ID</label>
          <div className="col-sm-8">
            <input type="text" readOnly className="form-control-plaintext" id="fieldId" value={fieldId} />
          </div>
        </div>
        <div className="form-group row align-items-center">
          <label htmlFor="id" className="col-sm-4 col-form-label">SLot ID</label>
          <div className="col-sm-8">
            <input type="text" className="form-control-plaintext" id="id" placeholder="Create slot id" onChange={handleCreateSlotId} />
          </div>
        </div>
        <button className="btn btn-primary float-right" type="button" onClick={handleClick} disabled={isLoading}>Create</button>
      </Modal.Body>
    </Modal>
  );
};

ModalCreateSlot.propTypes = {
  onClose: func.isRequired,
  open: bool.isRequired,
  fieldName: string,
  fieldId: string.isRequired,
};

ModalCreateSlot.defaultProps = {
  fieldName: '',
};
export default React.memo(ModalCreateSlot);
