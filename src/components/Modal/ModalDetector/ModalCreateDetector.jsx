import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Modal, Spinner } from 'react-bootstrap';
import {
  func,
  bool,
  number,
  string,
} from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import TextField from '../../TextField';
import { getDetectors } from '../../../apis/detectorsApi';
// import { set } from 'immer/dist/internal';

const ModalCreateDetector = ({
  onClose, open, checkField, idGW, addrDetector, idField,
}) => {
  const { alias } = useSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(false);
  const [timeSetup, setTimeSetup] = useState('');
  const dispatch = useDispatch();

  const validateFieldCreate = Yup.object({
    addressDetector: Yup.string().required('Address is required'),
    gatewayId: Yup.number(),
    slotId: Yup.number(),
  });
  const validateFieldUpdate = Yup.object({
    addressDetector: Yup.string().required('Address is required'),
    gatewayId: Yup.number(),
    slotId: Yup.number(),
  });

  const handleClose = () => {
    onClose();
  };

  const lastTimeSetup = () => {
    const timeUpdate = moment().format();
    console.log(timeUpdate);
    return setTimeSetup(timeUpdate);
  };

  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{!checkField ? 'Create New Detector' : 'Update Detector'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!checkField ? (
          <Formik
            initialValues={{
              addressDetector: '',
              gatewayId: idGW,
              slotId: 0,
            }}
            validationSchema={validateFieldCreate}
            onSubmit={async (values) => {
              const data = {
                ...values,
                slotId: Number(values.slotId) + Number(idField) * 1000,
                lastTimeSetup: timeSetup,
              };
              console.log(data.lastTimeSetup);
              try {
                setLoading(true);
                const response = await axios({
                  method: 'POST',
                  url: `${process.env.REACT_APP_BASE_URL}/api/${alias}/detector`,
                  headers: {
                    token: localStorage.getItem('AccessToken'),
                    'Content-Type': 'application/json',
                  },
                  data: JSON.stringify(data),
                });
                dispatch(getDetectors(idGW));

                setLoading(false);
                if (response.data.message === 'success') {
                  const responseDetector = response.data.data;
                  toast.success(`Detector ${responseDetector.id} is created`, {
                    position: toast.POSITION.TOP_RIGHT,
                    onOpen: handleClose,
                  });
                }
              } catch (error) {
                setLoading(false);
                toast.error('Can\'t create new detector. Please try again!');
                console.log(error);
              }
            }}
          >
            {({ values }) => {
              console.log(values);
              return (
                <Form className="user">
                  <TextField label="address Detector" name="addressDetector" type="text" placeholder="Enter address detector such as a.b.c.d" showLabel />
                  <TextField label="slot id" name="slotId" type="text" placeholer="Create id slot" showLabel />
                  <TextField label="id" name="id" type="number" placeholder="Create id same the gateway's node code" showLabel />
                  <button
                    type="submit"
                    className="btn btn-primary mt-4"
                    onClick={lastTimeSetup}
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
                    Create new detector
                  </button>
                </Form>
              );
            }}
          </Formik>
        ) : (
          <Formik
            initialValues={{
              addressDetector: addrDetector,
              gatewayId: idGW,
              slotId: 0,
            }}
            validationSchema={validateFieldUpdate}
            onSubmit={async (values) => {
              const data = {
                ...values,
                slotId: Number(values.slotId) + Number(idField) * 1000,
                lastTimeUpdate: timeSetup,
              };
              try {
                setLoading(true);
                const response = await axios({
                  method: 'PUT',
                  url: `${process.env.REACT_APP_BASE_URL}/api/ad/detector`,
                  headers: {
                    token: localStorage.getItem('AccessToken'),
                    'Content-Type': 'application/json',
                  },
                  data: JSON.stringify(data),
                });
                dispatch(getDetectors(idGW));

                setLoading(false);
                if (response.data.message === 'success') {
                  const responseDetector = response.data.data;
                  toast.success(`Detector ${responseDetector.id} is updated`, {
                    position: toast.POSITION.TOP_RIGHT,
                    onOpen: handleClose,
                  });
                }
              } catch (error) {
                setLoading(false);
                toast.error('Can\'t update detector. Please try again!');
                console.log(error);
              }
            }}
          >
            {({ values }) => {
              console.log(values);
              return (
                <Form className="user">
                  <TextField label="address Detector" name="addressDetector" type="text" placeholder="Enter address detector such as a.b.c.d" showLabel />
                  <TextField label="slot id" name="slotId" type="text" placeholer="Create id slot" showLabel />
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
                    Update new detector
                  </button>
                </Form>
              );
            }}
          </Formik>
        )}
      </Modal.Body>
    </Modal>
  );
};

ModalCreateDetector.propTypes = {
  onClose: func.isRequired,
  open: bool.isRequired,
  checkField: bool.isRequired,
  idGW: number.isRequired,
  addrDetector: string.isRequired,
  idField: string.isRequired,
};

export default React.memo(ModalCreateDetector);
