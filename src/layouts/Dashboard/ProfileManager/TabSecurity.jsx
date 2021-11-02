import { Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { getInfo } from '../../../apis/auth';

import TextField from '../../../components/TextField';

function TabSecurity() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getInfo());
  }, [dispatch]);
  const [isSuccess, handleIsSuccess] = useState(-1);
  const validateNoPass = Yup.object({
    oldPassword: Yup.string(), // : Yup.string().required('Old password is required'),
    password: Yup.string()
      .min(2, 'Password must be at least 2 characters')
      .required('New password is required'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required'),
  });
  const validate = Yup.object({
    oldPassword: Yup.string().required('Old password is required'),
    password: Yup.string()
      .min(2, 'Password must be at least 2 characters')
      .required('New password is required'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required'),
  });
  return (
    <>
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-header">
              Change Password
            </div>
            <div className="card-body">
              <Formik
                initialValues={{
                  oldPassword: '',
                  password: '',
                  rePassword: '',
                }}
                validationSchema={info.password ? validate : validateNoPass}
                onSubmit={async (values) => {
                  setLoading(true);
                  try {
                    const response = await Axios({
                      method: 'POST',
                      url: `${process.env.REACT_APP_BASE_URL}/api/mn/changePass`,
                      data: values,
                      headers: {
                        token: localStorage.AccessToken,
                      },
                    });
                    setLoading(false);
                    if (response.data.message === 'success' && response.data.data) handleIsSuccess(1);
                    else handleIsSuccess(0);
                  } catch (error) {
                    setLoading(false);
                    handleIsSuccess(0);
                    console.error(false);
                  }
                }}
              >
                {() => (
                  <>
                    <Form className="user">
                      <TextField showLabel label="Old password" name="oldPassword" type="password" placeholder="Enter your old password" />
                      <TextField showLabel label="New password" name="password" type="password" placeHolder="Enter your new password" />
                      <TextField showLabel label="Confirm password" name="rePassword" type="password" placeHolder="Enter password again" />
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
                        Change password
                      </button>
                    </Form>
                    {isSuccess === 1 && (
                    <div className="alert alert-success mt-3" role="alert">
                      Change password success
                    </div>
                    )}
                    {isSuccess === 0 && (
                    <div className="alert alert-danger mt-3" role="alert">
                      Change password fail
                    </div>
                    )}
                  </>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TabSecurity;
