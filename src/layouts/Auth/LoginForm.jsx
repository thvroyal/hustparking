import React from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { Spinner } from 'react-bootstrap';
import { SignIn } from '../../apis/auth';
import TextField from '../../components/TextField';

const LoginForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const validate = Yup.object({
    email: Yup.string().required('Email is required'),
    password: Yup.string()
      .min(2, 'Password must be at least 2 charaters')
      .required('Password is required'),
  });

  const handleLogin = async (googleData) => {
    console.log('success', googleData);
    try {
      const res = await axios(
        `${process.env.REACT_APP_BASE_URL}/api/login-google`,
        {
          method: 'GET',
          headers: {
            token: googleData.tokenObj.access_token,
          },
        },
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
      // }
    }
  };
  const handleErrorGoogle = async (googleData) => {
    console.log('error', googleData);
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        dispatch(SignIn(values));
      }}
    >
      {() => (
        <div>
          {error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : null}
          <Form className="user">
            <TextField
              label="email"
              name="email"
              type="text"
              placeholder="Email"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
            />
            <button
              type="submit"
              className="btn btn-primary btn-user btn-block mt-4"
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
              Login
            </button>
            <hr />
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID}
              render={(renderProps) => (
                <button
                  className="btn btn-google btn-user btn-block"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  type="button"
                >
                  <i className="fab fa-google fa-fw" />
                  {' '}
                  Login with Google
                </button>
              )}
              buttonText="Log in with Google"
              onSuccess={handleLogin}
              onFailure={handleErrorGoogle}
              cookiePolicy="single_host_origin"
            />
          </Form>

          <hr />
          <div className="text-center">
            <Link className="small" to="/register">
              Create an Account!
            </Link>
          </div>
        </div>
      )}
    </Formik>
  );
};
export default LoginForm;
