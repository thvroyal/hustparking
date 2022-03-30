import axios from 'axios';
import { Form, Formik, Field } from 'formik';
import { bool, func } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { getArea } from '../../../apis/areaApi';
import { getField } from '../../../apis/fieldApi';
import TextField from '../../TextField';

const ModalCreateField = ({
  onClose, open,
}) => {
  const { alias } = useSelector((state) => state.auth);
  const listArea = useSelector((state) => state.area.data);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArea());
  }, [dispatch]);

  // const onChangeValue = () => {
  //   setValueOption(parseInt(selectAreaRef.current.value, 10));
  //   console.log(valueOption);
  // };
  const validateField = Yup.object({
    address: Yup.string().required('Address is required'),
    details: Yup.string(),
    latitude: Yup.string().required('Latitude is required'),
    longitude: Yup.string().required('Longitude is required'),
    name: Yup.string().required('Name is required'),
    openstatus: Yup.string()
      .required('Open status is required')
      .matches(/^[0-1]+$/, 'Only value 0 (close) or 1 (open)'),
    idArea: Yup.number().required('Id area is required'),
    price: Yup.number().required('Price is required'),
  });

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Field</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            address: '',
            details: '',
            image: '',
            latitude: '',
            longitude: '',
            name: '',
            openstatus: '',
            idArea: 1,
            price: 0,
            space: 30,
          }}
          validationSchema={validateField}
          onSubmit={async (values) => {
            const data = { ...values, id: 0 };
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
                <Field
                  as="select"
                  className="custom-select"
                  style={{
                    borderRadius: '50px',
                    height: '50px',
                  }}
                  name="idArea"
                >
                  {listArea && listArea.map((f) => (
                    <option value={f.id} key={f.id}>{f.areaName}</option>
                  ))}
                </Field>
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
                  Create new field
                </button>
              </Form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

ModalCreateField.propTypes = {
  onClose: func.isRequired,
  open: bool.isRequired,
};

export default React.memo(ModalCreateField);
