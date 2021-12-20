import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Modal, Spinner } from 'react-bootstrap';
import { func, bool, number } from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../../TextField';
import { getField } from '../../../apis/fieldApi';

const ModalUpdateField = ({
  onClose, open, id,
}) => {
  const dispatch = useDispatch();
  const { alias } = useSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(false);
  const listField = useSelector((state) => state.field.data);

  useEffect(() => {
    dispatch(getField());
  }, [dispatch, id]);

  const fieldSelected = listField.map((item, index) => {
    if (item.id === id) {
      return index;
    }
    return -1;
  });
  const fieldSelectedFilter = fieldSelected.filter((item) => item >= 0);

  const validateField = Yup.object({
    address: Yup.string().required('Address is required'),
    details: Yup.string(),
    latitude: Yup.string().required('Latitude is required'),
    longitude: Yup.string().required('Longitude is required'),
    name: Yup.string().required('Name is required'),
    openstatus: Yup.string()
      .required('Open status is required')
      .matches(/^[0-1]+$/, 'Only value 0 (close) or 1 (open)'),
    price: Yup.number().required('Price is required'),
  });

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Field</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            address: listField[fieldSelectedFilter].address,
            details: listField[fieldSelectedFilter].details,
            image: listField[fieldSelectedFilter].image,
            latitude: listField[fieldSelectedFilter].latitude,
            longitude: listField[fieldSelectedFilter].longitude,
            name: listField[fieldSelectedFilter].name,
            openstatus: listField[fieldSelectedFilter].openstatus,
            price: listField[fieldSelectedFilter].price,
            space: listField[fieldSelectedFilter].space,
          }}
          validationSchema={validateField}
          onSubmit={async (values) => {
            const data = { ...values, id };
            try {
              setLoading(true);
              const response = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_BASE_URL}/api/${alias}/field/create_and_update`,
                headers: {
                  token: localStorage.getItem('AccessToken'),
                  'Content-Type': 'application/json',
                },
                data: JSON.stringify(data),
              });

              setLoading(false);
              if (response.data.message === 'success') {
                const responseField = response.data.data;
                toast.success(`Field ${responseField.name} is created`, {
                  position: toast.POSITION.TOP_RIGHT,
                  onOpen: handleClose,
                });
                dispatch(getField());
              }
            } catch (error) {
              setLoading(false);
              toast.error('Can\'t create new field. Please try again!');
              console.log(error);
            }
          }}
        >
          {({ errors }) => {
            console.log(errors);
            return (
              <Form className="user">
                <TextField label="field name" name="name" type="text" placeholder="Enter field name" showLabel />
                <TextField label="address" name="address" type="text" placeholder="Enter address field" showLabel />
                <TextField label="image" name="image" type="text" placeholder="e.g: https://url.com/image.png" showLabel />
                <TextField label="open status" name="openstatus" type="text" placeholder="0 is close, 1 is open" showLabel />
                <div className="form-row">
                  <div className="col-md-6">
                    <TextField label="price" name="price" type="number" placeholder="e.g: 40000" showLabel />
                  </div>
                  <div className="col-md-6">
                    <TextField label="space" name="space" type="number" placeholder="e.g: 30" showLabel />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-4">
                    <TextField label="longitude" name="longitude" type="text" placeholder="e.g: 21.0369823" showLabel />
                  </div>
                  <div className="col-md-4">
                    <TextField label="latitude" name="latitude" type="text" placeholder="e.g: 105.7752916" showLabel />
                  </div>
                  <button type="button" className="btn btn-info col-md-4" style={{ height: '48px', transform: 'translateY(32px)' }}>Get place</button>
                </div>
                <TextField label="details" name="details" type="text" placeholder="Enter details here" showLabel />
                <button
                  type="submit"
                  className="btn btn-primary mt-4"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Spinner
                      animation="border"
                      color="primary"
                      size="sm"
                      className="mr-3"
                    />
                  )}
                  Update field
                </button>
              </Form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

ModalUpdateField.propTypes = {
  onClose: func.isRequired,
  open: bool.isRequired,
  id: number.isRequired,
};

export default React.memo(ModalUpdateField);
