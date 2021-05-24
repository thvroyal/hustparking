import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap';
import Axios from 'axios';
import TextField from '../../../components/TextField';
import RadioField from '../../../components/RadioField';

function TabEdit() {
  const { info } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [isSuccess, handleIsSuccess] = useState(-1);
  const validate = Yup.object({

  });
  function formatString(str) {
    if (str) return str.split('+')[0].split('T')[0];
    return 'N/A';
  }
  return (
    <div className="row">
      <div className="col-md-5">
        {/*  Avatar card */}
        <div className="flex-center flex-column">
          <div className="position-relative">
            <button
              className="flex-center rounded-circle position-absolute bg-primary border border-3 border-white text-white"
              style={{
                width: '35px',
                height: '35px',
                bottom: '25px',
                right: '30px',
              }}
              type="button"
            >
              <i className="fas fa-pen small" />

            </button>
            <img className="rounded-circle mb-4" src={info.image ? info.image : 'https://picsum.photos/300/300/'} alt="Avatar" width="200" />
          </div>
          <h3 className="text-dark">User Name</h3>
          <p>🚗 🚕 🚙</p>
        </div>
      </div>
      <div className="col">
        <div className="card">
          <div className="card-header">
            Detail Information
          </div>
          <div className="card-body">
            <Formik
              initialValues={{
                phone: info.phone,
                email: info.email,
                address: info.address,
                birth: formatString(info.birth),
                sex: info.sex,
                equipment: info.equipment,
                idNumber: info.idNumber,
              }}
              validationSchema={validate}
              onSubmit={async (values) => {
                setLoading(true);
                try {
                  const response = await Axios({
                    method: 'post',
                    url: `${process.env.REACT_APP_BASE_URL}/api/us/update_info`,
                    data: values,
                    headers: {
                      token: localStorage.AccessToken,
                    },
                  });
                  setLoading(false);
                  if (response.data.message === 'success') handleIsSuccess(1);
                  else handleIsSuccess(0);
                } catch (error) {
                  setLoading(false);
                  handleIsSuccess(0);
                  console.error(error);
                }
              }}
            >
              {() => (
                <>
                  <Form className="user">
                    <TextField showLabel label="phone" name="phone" type="tel" placeHolder="Update your phone" />
                    <TextField showLabel label="email" name="email" type="mail" placeholder="Update your email" />
                    <TextField showLabel label="date of birth" name="birth" type="date" placeHolder="Update your birthday" />
                    <div className="float-left mb-3 ml-3 w-100">
                      <p style={{ textAlign: 'left' }} className="text-uppercase text-primary small">Gender</p>
                      <RadioField label="Female" name="sex" value="F" checked={info.sex === 'F'} />
                      <RadioField label="Male" name="sex" value="M" checked={info.sex === 'M'} />
                      <RadioField label="Other" name="sex" value="O" checked={info.sex === 'O'} />
                    </div>
                    <TextField showLabel label="address" name="address" type="text" placeHolder="Update your address" />
                    <TextField showLabel label="equipment" name="equipment" type="text" placeHolder="Update your equipment" />
                    <TextField showLabel label="ID number" name="idNumber" type="text" placeHolder="Update your ID number" />
                    <button
                      type="submit"
                      className="btn btn-primary btn-user btn-block mt-3"
                      disabled={loading}
                    >
                      {loading && (
                      <Spinner
                        animation="border"
                        color="primary"
                        size="sm"
                        className="mr-3"
                      />
                      )}
                      {' '}
                      Update
                    </button>
                  </Form>
                  {isSuccess === 1 && (
                  <div className="alert alert-success mt-3" role="alert">
                    Update information success!
                  </div>
                  )}
                  {isSuccess === 0 && (
                  <div className="alert alert-danger mt-3" role="alert">
                    Update information fail!
                  </div>
                  )}
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabEdit;
