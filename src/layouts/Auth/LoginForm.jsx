import React from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
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
      .min(2, 'Password must be at least 2 characters')
      .required('Password is required'),
  });

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
            <Link className="small float-right my-2 mr-2" to="/forgot-password">
              Forgot password ?
            </Link>
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
