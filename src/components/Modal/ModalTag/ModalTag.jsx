import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import {
  func, bool,
} from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getTag } from '../../../apis/tagsApi';

const ModalTag = ({
  onClose, open, checkField,
}) => {
  const dispatch = useDispatch();
  const { alias } = useSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(0);
  const [tagId, setTagId] = useState(0);

  const handleClose = () => {
    onClose();
  };

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangeTagId = (e) => setTagId(Number(e.target.value));
  const handleChangeUserId = (e) => setUserId(Number(e.target.value));

  const handleClickCreate = async () => {
    const data = {
      tagId,
      email,
    };
    console.log(data);
    try {
      setLoading(true);
      const response = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BASE_URL}/api/${alias}/tags`,
        headers: {
          token: localStorage.getItem('AccessToken'),
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
      });
      dispatch(getTag());

      setLoading(false);
      if (response.data.message === 'success') {
        console.log(response.data.data);
        toast.success('Created new tag', {
          position: toast.POSITION.TOP_RIGHT,
          onOpen: handleClose,
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error('Can\'t create new tag for this field');
      console.log(error);
    }
  };

  const handleClickUpdate = async () => {
    const data = {
      tagId,
      userId,
    };
    console.log(data);
    try {
      setLoading(true);
      const response = await axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_BASE_URL}/api/${alias}/tags`,
        headers: {
          token: localStorage.getItem('AccessToken'),
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
      });
      dispatch(getTag());

      setLoading(false);
      if (response.data.message === 'success') {
        console.log(response.data.data);
        toast.success('Updated new tag', {
          position: toast.POSITION.TOP_RIGHT,
          onOpen: handleClose,
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error('Can\'t update new tag for this field');
      console.log(error);
    }
  };

  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Tag</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          {checkField ? (
            <div className="form-group row align-items-center">
              <label htmlFor="field" className="col-sm-4 col-form-label">Email</label>
              <div className="col-sm-8">
                <input type="email" className="form-control-plaintext" id="field" placeholder="Enter your email" onChange={handleChangeEmail} />
              </div>
            </div>
          ) : (
            <div className="form-group row align-items-center">
              <label htmlFor="userId" className="col-sm-4 col-form-label">User ID</label>
              <div className="col-sm-8">
                <input type="text" className="form-control-plaintext" id="userId" placeholder="Enter your user id" onChange={handleChangeUserId} />
              </div>
            </div>
          )}
          <div className="form-group row align-items-center">
            <label htmlFor="tagId" className="col-sm-4 col-form-label">Tag ID</label>
            <div className="col-sm-8">
              <input type="text" className="form-control-plaintext" id="tagId" placeholder="Enter your tag id" onChange={handleChangeTagId} />
            </div>
          </div>
        </form>
        {checkField ? (
          <button className="btn btn-primary float-right" type="button" onClick={handleClickCreate} disabled={isLoading}>Create</button>
        ) : (
          <button className="btn btn-primary float-right" type="button" onClick={handleClickUpdate} disabled={isLoading}>Update</button>
        )}
      </Modal.Body>
    </Modal>
  );
};

ModalTag.propTypes = {
  onClose: func.isRequired,
  open: bool.isRequired,
  checkField: bool.isRequired,
};

export default React.memo(ModalTag);
