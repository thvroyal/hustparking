import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap';
import Axios from 'axios';
import TextField from '../../../components/TextField';
import RadioField from '../../../components/RadioField';
import { getInfo } from '../../../apis/auth';

function TabEdit() {
  const { info } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isSuccess, handleIsSuccess] = useState(-1);
  useEffect(() => {
    dispatch(getInfo());
  }, [dispatch]);
  const validate = Yup.object({
    sex: Yup.string().required('Gender is required'),
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
            <img className="rounded-circle mb-4" src={info.image ? info.image : `https://i.pravatar.cc/350?u=${info.id}`} alt="Avatar" width="200" />
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
                address: info.address,
                birth: formatString(info.birth),
                sex: info.sex,
                idNumber: info.idNumber,
              }}
              validationSchema={validate}
              onSubmit={async (values) => {
                setLoading(true);
                try {
                  const response = await Axios({
                    method: 'post',
                    url: `${process.env.REACT_APP_BASE_URL}/api/mn/update_info`,
                    data: JSON.stringify({ ...values, image: 'string' }),
                    headers: {
                      token: localStorage.AccessToken,
                      'Content-Type': 'application/json',
                    },
                  });
                  setLoading(false);
                  if (response.data.message === 'success' && response.data.data) {
                    handleIsSuccess(1);
                  } else {
                    handleIsSuccess(0);
                  }
                } catch (error) {
                  setLoading(false);
                  handleIsSuccess(0);
                  console.error(error);
                }
              }}
            >
              {({ values }) => (
                <>
                  <Form className="user">
                    <TextField showLabel label="phone" name="phone" type="tel" placeholder="Update your phone" />
                    <TextField showLabel label="date of birth" name="birth" type="date" placeholder="Update your birthday" />
                    <div className="float-left mb-3 ml-3 w-100">
                      <p style={{ textAlign: 'left' }} className="text-uppercase text-primary small">Gender</p>
                      <RadioField label="Female" name="sex" value="F" checked={values.sex === 'F'} />
                      <RadioField label="Male" name="sex" value="M" checked={values.sex === 'M'} />
                      <RadioField label="Other" name="sex" value="O" checked={values.sex === 'O'} />
                    </div>
                    <TextField showLabel label="address" name="address" type="text" placeholder="Update your address" />
                    <TextField showLabel label="ID number" name="idNumber" type="number" placeholder="Update your ID number" />
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
