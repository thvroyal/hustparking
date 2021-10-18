import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextField from '../../components/TextField';
import CheckboxField from '../../components/CheckboxField';

function NewManager() {
  const validate = Yup.object({
    // sex: Yup.string().required('Gender is required'),
  });
  return (
    <>
      {/* // <!-- Page Heading --> */}
      <h1 className="h3 mb-2 text-gray-800">Create a new manager</h1>
      <p className="mb-4">A manager will have limited permissions to add, edit, and delete.</p>

      {/* // <!-- DataTales Example --> */}
      <div className="row">
        <div className="col-md-3">
          <div className="card shadow mb-4">
            <div className="card-body">
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                  acp: false,
                }}
                validationSchema={validate}
                onSubmit={async () => {
                  console.log('submitted');
                }}
              >
                {({ values }) => (
                  <>
                    <Form className="user">
                      <TextField showLabel label="email" name="email" type="mail" placeholder="Enter your email" />
                      <TextField showLabel label="password" name="password" type="password" placeholder="password" />
                      <CheckboxField name="acp" label="Accept something" checked={values.acp === true} className="ml-3" />
                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block mt-3"
                      >
                        {/* {loading && (
                    <Spinner
                      animation="border"
                      color="primary"
                      size="sm"
                      className="mr-3"
                    />
                    )}
                    {' '} */}
                        Create manager
                      </button>
                    </Form>
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

export default NewManager;
