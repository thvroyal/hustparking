import React, { useState } from "react";
import { Formik, Form } from "formik";
import { TextField } from "../../components/TextField";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import * as Yup from "yup";
import Axios from "axios";

const RegisterForm = () => {
  const [isSuccess, handleIsSuccess] = useState(false);
  const history = useHistory();
  const validate = Yup.object({
    address: Yup.string().required("Address is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .min(2, "Password must be at least 2 charaters")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
    equipment: Yup.string().required("Equipment is required"),
    idNumber: Yup.string().required("ID Number is required"),
  });
  return (
    <Formik
      initialValues={{
        address: "",
        equipment: "",
        email: "",
        password: "",
        rePassword: "",
        idNumber: "",
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        try {
          const response = await Axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/public/register`,
            values
          );
          if (response.data.message === "success") {
            handleIsSuccess(true);
            setTimeout(function () {
              history.push("/login");
            }, 1000);
          }
        } catch (err) {
          console.err(err);
        }
      }}
    >
      {(formik) => (
        <div>
          <Form className="user">
            {isSuccess ? (
              <div className="alert alert-success" role="alert">
                Sign up success
              </div>
            ) : null}
            <TextField
              label="email"
              name="email"
              type="mail"
              placeholder="Email"
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
            >
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
