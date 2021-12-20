import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Modal, Spinner } from 'react-bootstrap';
import { func, bool, number } from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../../TextField';
import { getGateway } from '../../../apis/GatewayApi';

const ModalUpdateGW = ({
  onClose, open, id, idGW,
}) => {
  const [isLoading, setLoading] = useState(false);
  const { alias } = useSelector((state) => state.auth);
  const gateway = useSelector((state) => state.gateway.data);
  console.log(gateway);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGateway());
  }, [dispatch, idGW]);

  const gatewaySelected = gateway.map((item, index) => {
    if (item.id === idGW) {
      return index;
    }
    return -1;
  });
  const gatewaySelectedFilter = gatewaySelected.filter((item) => item >= 0);

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
        <Modal.Title>Update Gateway</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            addressGateway: gateway[gatewaySelectedFilter].address,
            fieldId: id,
          }}
          validationSchema={validateField}
          onSubmit={async (values) => {
            const data = { ...values, id: gateway[gatewaySelectedFilter].id };
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

                toast.success(`Gateway ${responseGateway.id} is updated`, {
                  position: toast.POSITION.TOP_RIGHT,
                  onOpen: handleClose,
                });
                dispatch(getGateway());
              }
            } catch (error) {
              setLoading(false);
              toast.error('Can\'t update gateway. Please try again!');
              console.log(error);
            }
          }}
        >
          {({ errors }) => {
            console.log(errors);
            return (
              <Form className="user">
                <TextField label="address Gateway" name="addressGateway" type="text" placeholder="Enter address field such as a.b.c.d" showLabel />
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
                  Update Gateway
                </button>
              </Form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

ModalUpdateGW.propTypes = {
  onClose: func.isRequired,
  open: bool.isRequired,
  id: number.isRequired,
  idGW: number.isRequired,
};

export default React.memo(ModalUpdateGW);
