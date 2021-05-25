import { React, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import TextField from '../../components/TextField';

const ForgotPasswordForm = () => {
  const history = useHistory();
  const [loadingSend, setLoadingSend] = useState(false);
  const [err, setErr] = useState(null);
  const validate = Yup.object({
    email: Yup.string().required('Email is required'),
  });

  const handleSendMail = async (email) => {
    setLoadingSend(true);
    console.log('Submiting');
    const data = {
      email,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/public/reset_pass`,
        data,
      );
      setLoadingSend(false);
      if (response.data.message === 'success') {
        history.push(`forgot-password/${data.email}`);
      } else {
        setErr('Fail to reset password. Try again!');
      }
    } catch (error) {
      setLoadingSend(false);
      console.log(error);
    }
  };
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        handleSendMail(values.email);
      }}
    >
      {() => (
        <div>
          <div className="small">
            Please enter your email to receive password recovery information
          </div>
          {err ? (
            <div className="alert alert-danger mt-2" role="alert">
              {err}
            </div>
          ) : null}

          <Form className="user">
            <TextField
              label="email"
              name="email"
              type="email"
              placeholder="Please enter your email"
            />

            <button
              type="submit"
              className="btn btn-primary btn-user btn-block mt-4"
              disabled={loadingSend}
            >
              {loadingSend && (
                <Spinner
                  animation="border"
                  color="primary"
                  size="sm"
                  className="mr-3"
                />
              )}
              Reset password
            </button>
          </Form>

        </div>
      )}
    </Formik>
  );
};
export default ForgotPasswordForm;
