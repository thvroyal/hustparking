import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import Axios from 'axios';
import { Spinner } from 'react-bootstrap';
import RadioField from '../../components/RadioField';
import TextField from '../../components/TextField';

const RegisterForm = () => {
  const [isSuccess, handleIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const validate = Yup.object({
    email: Yup.string()
      .email('Must be a valid email such as user123@gmail.com')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('You have not entry the password'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password is not match, please try again')
      .required('You have not entry the confirm password'),
  });
  return (
    <Formik
      initialValues={{
        address: '',
        birth: '',
        email: '',
        image: '',
        equipment: '',
        idNumber: 0,
        password: '',
        phone: '',
        rePassword: '',
        sex: '',
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        setLoading(true);
        try {
          const response = await Axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/public/register`,
            values,
          );
          setLoading(false);
          if (response.data.message === 'success') {
            handleIsSuccess(true);
            setTimeout(() => {
              history.push(`/verify?email=${values.email}`);
            }, 1000);
          }
        } catch (err) {
          setLoading(false);
          console.err(err);
        }
      }}
    >
      {() => (
        <div>
          <Form className="user">
            {isSuccess ? (
              <div className="alert alert-warning" role="alert">
                You need to verify your email to finish register!
              </div>
            ) : null}
            <TextField
              label="email"
              name="email"
              type="mail"
              placeholder="Email"
            />
            <TextField
              label="birth"
              name="birth"
              type="date"
              placeholder="Your birth"
            />
            <div className="mt-3 float-left mb-3">
              <p style={{ textAlign: 'left' }}>Gender</p>
              <RadioField label="Female" name="sex" value="F" />
              <RadioField label="Male" name="sex" value="M" />
              <RadioField label="Other" name="sex" value="O" />
            </div>

            <TextField
              label="phone"
              name="phone"
              type="tel"
              placeholder="Your phone"
            />
            <TextField
              label="address"
              name="address"
              type="text"
              placeholder="Address"
            />
            <TextField
              label="equipment"
              name="equipment"
              type="text"
              placeholder="Equipment"
            />
            <TextField
              label="idNumber"
              name="idNumber"
              type="text"
              placeholder="ID Number"
            />
            <TextField
              label="password"
              name="password"
              type="password"
              placeholder="Password"
            />
            <TextField
              label="rePassword"
              name="rePassword"
              type="password"
              placeholder="Re-password"
            />
            <button
              type="submit"
              className="btn btn-primary btn-user btn-block mt-5"
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
              Register
            </button>
          </Form>
          <hr />
          <div className="text-center">
            <Link className="small" to="/login">
              Already have an account? Login now
            </Link>
          </div>
        </div>
      )}
    </Formik>
  );
};
export default RegisterForm;
