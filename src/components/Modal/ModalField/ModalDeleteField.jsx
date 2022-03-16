import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import {
  func, bool, string,
} from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getField } from '../../../apis/fieldApi';
import ModalUpdateField from './ModalUpdateField';

const ModalDeleteField = ({
  onClose, open, id,
}) => {
  const { alias } = useSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
  };

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await axios({
        method: 'DELETE',
        url: `${process.env.REACT_APP_BASE_URL}/api/${alias}/field/delete/${id}`,
        headers: {
          token: localStorage.getItem('AccessToken'),
          'Content-Type': 'application/json',
        },
      });
      dispatch(getField());

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
        <Modal.Title>What do you want to do?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group row align-items-center d-flex justify-content-around">
            <button className="btn btn-danger" type="button" onClick={handleClick} disabled={isLoading}>Delete</button>
            <button
              className="btn btn-info"
              type="button"
              onClick={() => setOpenModalUpdate(true)}
            >
              Update Field
            </button>
            <Link to={`/dashboard/fields/${id}`} className="card-link">
              <button type="button" className="btn btn-primary">Go to list slot</button>
            </Link>
            <Link to={`/dashboard/fields/${id}/2d_maps`} className="card-link">
              <button type="button" className="btn btn-warning">Go to 2D maps</button>
            </Link>
          </div>
        </form>
      </Modal.Body>
      <ModalUpdateField
        onClose={() => setOpenModalUpdate(false)}
        open={openModalUpdate}
        id={id}
      />
    </Modal>
  );
};

ModalDeleteField.propTypes = {
  onClose: func.isRequired,
  open: bool.isRequired,
  id: string.isRequired,
};

export default React.memo(ModalDeleteField);
