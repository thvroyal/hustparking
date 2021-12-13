import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import {
  func,
  bool,
  number,
} from 'prop-types';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getField } from '../../../apis/fieldApi';
import UpdateFieldRow from './UpdateFieldRow';

const UpdateField = ({
  onClose, open, selected,
}) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const allFields = useSelector((state) => state.field.data);
  const [listFieldSelected, setListFieldSelected] = useState([]);

  const handleClose = () => {
    onClose();
  };

  const listFieldFilter = (fieldID) => {
    if (listFieldSelected.includes(fieldID)) {
      const filter = listFieldSelected.filter((item) => item !== fieldID);
      return setListFieldSelected([...filter]);
    }
    return setListFieldSelected([...listFieldSelected, fieldID]);
  };

  const listField = (fieldIdx) => setListFieldSelected(() => listFieldFilter(fieldIdx));

  const addFieldForManager = async () => {
    const data = {
      fieldId: listFieldSelected,
      managerId: selected,
    };
    try {
      const response = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BASE_URL}/api/ad/managerField/create_and_update`,
        data: JSON.stringify(data),
        headers: {
          token: localStorage.getItem('AccessToken'),
          'Content-Type': 'application/json',
        },
      });
      if (response.data.message === 'success') {
        toast.success('Success', {
          position: toast.POSITION.TOP_RIGHT,
          onOpen: handleClose,
        });
      }
    } catch (error) {
      toast.error('Can\'t create or update for this field');
      console.log(error);
    }
  };

  const handleToggle = (id) => {
    if (listFieldSelected) {
      if (listFieldSelected.includes(id)) {
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
        const filterField = fieldOfManagerId.filter((i) => i > 0);
        setListFieldSelected(filterField);
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
              listField={listField}
            />
          ))}
        </ul>
        {isLoading && <span>Loading</span>}
        <button type="button" className="btn btn-primary float-right" onClick={addFieldForManager}>Save</button>
      </Modal.Body>
    </Modal>
  );
};

UpdateField.propTypes = {
  onClose: func.isRequired,
  open: bool.isRequired,
  selected: number.isRequired,
  // listField: func.isRequired,
  // listFieldSelected: arrayOf.isRequired,
  // setListFieldSelected: func.isRequired,
};
export default React.memo(UpdateField);
