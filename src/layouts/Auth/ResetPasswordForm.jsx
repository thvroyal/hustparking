import { React, useState } from 'react';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import TextField from '../../components/TextField';

function ResetPasswordForm({ match }) {
  const history = useHistory();
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  const validate = Yup.object({
    email: Yup.string().required('Email is required'),
    pass: Yup.string()
      .min(2, 'Password must be at least 2 charaters')
      .required('Password is required'),
    code: Yup.string().required('Please enter code verify'),
  });
  return (
    <div>

      <Formik
        initialValues={{
          email: match.params.mail,
          code: '',
          pass: '',
        }}
        validationSchema={validate}
        onSubmit={async (values) => {
          setLoadingVerify(true);
          try {
            const response = await axios({
              method: 'POST',
              url: `${process.env.REACT_APP_BASE_URL}/api/public/verify_reset_pass`,
              data: values,
            });
            setLoadingVerify(false);
            if (response.data.message === 'success') {
              setMsg('Reset password success. Log in now!');
              setErr(null);
              setTimeout(() => {
                history.push('/login');
              }, 1500);
            } else {
              setErr(response.data.data);
            }
          } catch (error) {
            setLoadingVerify(false);
            console.error(error);
          }
        }}
      >
        {() => (
          <div>
            <div className="small">
              Enter new password and code verify was sent to your mail
            </div>
            {err ? (
              <div className="alert alert-danger mt-2" role="alert">
                {err}
              </div>
            ) : null}
            {msg ? (
              <div className="alert alert-success mt-2" role="alert">
                {msg}
              </div>
            ) : null}

            <Form className="user">
              <TextField
                label="email"
                name="email"
                type="email"
                placeholder="Please enter your email"
                disabled
              />
              <TextField
                label="password"
                name="pass"
                type="password"
                placeholder="Please enter new password"
              />
              <TextField
                label="code"
                name="code"
                type="text"
                placeholder="Code verify"
              />

              <button
                type="submit"
                className="btn btn-primary btn-user btn-block mt-4"
                disabled={loadingVerify}
              >
                {loadingVerify && (
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

          </div>
        )}
      </Formik>
    </div>
  );
}

export default ResetPasswordForm;

ResetPasswordForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      mail: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
