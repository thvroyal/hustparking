import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { func } from 'prop-types';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import TextField from '../../../components/TextField';

const NewManagerForm = ({ onSuccess }) => {
  const validate = Yup.object({
    email: Yup.string().required('Email is required'),
    pass: Yup.string()
      .min(2, 'Password must be at least 2 characters')
      .required('Password is required'),
  });
  const [loading, setLoading] = useState(false);
  return (
    <Formik
      initialValues={{
        email: '',
        pass: '',
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        const data = { ...values, acp: true, id: 0 };
        setLoading(true);
        try {
          const response = await axios({
            method: 'POST',
            url: `${process.env.REACT_APP_BASE_URL}/api/ad/manager/create_and_update`,
            data: JSON.stringify(data),
            headers: {
              token: localStorage.getItem('AccessToken'),
              'Content-Type': 'application/json',
            },
          });
          setLoading(false);
          if (response.data.message === 'success' && response.data.data) {
            onSuccess(response.data.data.id);
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      }}
    >
      {() => (
        <>
          <Form className="user">
            <TextField showLabel label="email" name="email" type="mail" placeholder="Enter your email" />
            <TextField showLabel label="password" name="pass" type="password" placeholder="Enter password" />
            <button
              type="submit"
              className="btn btn-primary btn-user btn-block mt-5"
            >
              {loading && (
                <Spinner
                  animation="border"
                  color="primary"
                  size="sm"
                  className="mr-3"
                />
              )}
              Create manager
            </button>
          </Form>
        </>
      )}
    </Formik>
  );
};

NewManagerForm.propTypes = {
  onSuccess: func.isRequired,
};

export default React.memo(NewManagerForm);
