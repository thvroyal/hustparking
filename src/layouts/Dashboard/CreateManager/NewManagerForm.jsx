import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { func } from 'prop-types';
import TextField from '../../../components/TextField';

const NewManagerForm = ({ onSuccess }) => {
  const validate = Yup.object({
    // sex: Yup.string().required('Gender is required'),
  });
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validate}
      onSubmit={async () => {
        console.log('submitted');
        onSuccess();
      }}
    >
      {() => (
        <>
          <Form className="user">
            <TextField showLabel label="email" name="email" type="mail" placeholder="Enter your email" />
            <TextField showLabel label="password" name="password" type="password" placeholder="Enter password" />
            <button
              type="submit"
              className="btn btn-primary btn-user btn-block mt-5"
            >
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
