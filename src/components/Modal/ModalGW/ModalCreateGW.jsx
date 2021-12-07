import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Modal, Spinner } from 'react-bootstrap';
import { func, bool } from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../../TextField';
import { getGateway } from '../../../apis/GatewayApi';

const ModalCreateGW = ({
  onClose, open,
}) => {
  const [isLoading, setLoading] = useState(false);
  const { alias } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const validateField = Yup.object({
    addressGateway: Yup.string().required('Address is required'),
    fieldId: Yup.number(),
  });

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Gateway</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            addressGateway: '',
            fieldId: 0,
          }}
          validationSchema={validateField}
          onSubmit={async (values) => {
            const data = { ...values, id: 0 };
            try {
              setLoading(true);
              const response = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_BASE_URL}/api/${alias}/gateway/create_and_update`,
                headers: {
                  token: localStorage.getItem('AccessToken'),
                  'Content-Type': 'application/json',
                },
                data: JSON.stringify(data),
              });

              setLoading(false);
              if (response.data.message === 'success') {
                const responseGateway = response.data.data;

                toast.success(`Gateway ${responseGateway.id} is created`, {
                  position: toast.POSITION.TOP_RIGHT,
                  onOpen: handleClose,
                });
                dispatch(getGateway());
              }
            } catch (error) {
              setLoading(false);
              toast.error('Can\'t create new gateway. Please try again!');
              console.log(error);
            }
          }}
        >
          {({ errors }) => {
            console.log(errors);
            return (
              <Form className="user">
                <TextField label="address Gateway" name="addressGateway" type="text" placeholder="Enter address field" showLabel />
                <TextField label="field id" name="fieldId" type="text" placeholder="Enter field id" showLabel />
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
                  Create new Gateway
                </button>
              </Form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

ModalCreateGW.propTypes = {
  onClose: func.isRequired,
  open: bool.isRequired,
};

export default React.memo(ModalCreateGW);
