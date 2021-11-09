import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { func, bool, number } from 'prop-types';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getField } from '../../../apis/fieldApi';
import UpdateFieldRow from './UpdateFieldRow';

const UpdateField = ({ onClose, open, selected }) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [fields, setFields] = useState([]);
  const allFields = useSelector((state) => state.field.data);

  const handleClose = () => {
    onClose();
  };

  const handleToggle = (id) => {
    if (fields) {
      if (fields.includes(id)) {
        return true;
      }
    }
    return false;
  };
  useEffect(async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_BASE_URL}/api/ad/managerField/find_all`,
        headers: {
          token: localStorage.getItem('AccessToken'),
        },
      });
      setLoading(false);
      if (response.data.message === 'success' && response.data.data) {
        const fieldOfManagerId = response.data.data.map((d) => {
          if (d.managerId === selected) return d.fieldId;
          return -1;
        });
        setFields(fieldOfManagerId);
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(getField());
  }, [selected]);
  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Field</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul className="list-group list-group-flush">
          {allFields && allFields.map((field) => (
            <UpdateFieldRow
              title={field.name}
              toggled={handleToggle(field.id)}
              fieldId={field.id}
              managerId={selected}
              key={field.id}
            />
          ))}
        </ul>
        {isLoading && <span>Loading</span>}
      </Modal.Body>
    </Modal>
  );
};

UpdateField.propTypes = {
  onClose: func.isRequired,
  open: bool.isRequired,
  selected: number.isRequired,
};
export default React.memo(UpdateField);
