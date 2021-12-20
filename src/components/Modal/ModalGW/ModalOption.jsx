import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import {
  func, bool, string,
} from 'prop-types';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getGateway } from '../../../apis/GatewayApi';
import ModalUpdateGW from './ModalUpdateGW';

const ModalOption = ({
  onClose, open, idGW, id,
}) => {
  const handleClose = () => {
    onClose();
  };
  const dispatch = useDispatch();
  const { alias } = useSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(false);
  const [openModalUpdateGW, setOpenModalUpdateGW] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await axios({
        method: 'DELETE',
        url: `${process.env.REACT_APP_BASE_URL}/api/${alias}/gateway/delete/${idGW}`,
        headers: {
          token: localStorage.getItem('AccessToken'),
          'Content-Type': 'application/json',
        },
      });
      dispatch(getGateway());

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
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleClick}
              disabled={isLoading}
            >
              Delete
            </button>
            <button
              className="btn btn-info"
              type="button"
              onClick={() => setOpenModalUpdateGW(true)}
            >
              Update Gateway
            </button>
            <Link
              to={`/dashboard/field/${id}/gateway/${idGW}`}
              className="btn-link"
              key={idGW}
            >
              <button className="btn btn-primary" type="button" disabled={isLoading}>
                Go to all detector
                <i className="fas fa-long-arrow-alt-right ml-2" />
              </button>
            </Link>
          </div>
        </form>
      </Modal.Body>
      <ModalUpdateGW
        onClose={() => setOpenModalUpdateGW(false)}
        open={openModalUpdateGW}
        id={id}
        idGW={idGW}
      />
    </Modal>
  );
};

ModalOption.propTypes = {
  onClose: func.isRequired,
  open: bool.isRequired,
  idGW: string.isRequired,
  id: string.isRequired,

};

export default React.memo(ModalOption);
