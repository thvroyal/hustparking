import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import {
  func, bool, string,
} from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getDetectors } from '../../../apis/detectorsApi';

const ModalDeleteDetector = ({
  onClose, open, id, idGW,
}) => {
  const { alias } = useSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
  };

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await axios({
        method: 'DELETE',
        url: `${process.env.REACT_APP_BASE_URL}/api/${alias}/detector/${id}`,
        headers: {
          token: localStorage.getItem('AccessToken'),
          'Content-Type': 'application/json',
        },
      });
      dispatch(getDetectors(idGW));

      setLoading(false);
      if (response.data.message === 'success') {
        console.log(response.data.data);
        toast.success('Delete', {
          position: toast.POSITION.TOP_RIGHT,
          onOpen: handleClose,
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error('Can\'t delete for this field');
      console.log(error);
    }
  };

  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Do you want to delete?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group row align-items-center d-flex justify-content-around">
            <button className="btn btn-info" type="button" onClick={handleClose} disabled={isLoading}>Back</button>
            <button className="btn btn-danger" type="button" onClick={() => handleClick()} disabled={isLoading}>Delete</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

ModalDeleteDetector.propTypes = {
  onClose: func.isRequired,
  open: bool.isRequired,
  id: string.isRequired,
  idGW: string.isRequired,
};

export default React.memo(ModalDeleteDetector);
