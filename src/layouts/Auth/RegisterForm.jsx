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
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validate = Yup.object({
    address: Yup.string().required("Address is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
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
        phone: "",
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
              label="Phone"
              name="phone"
              type="tel"
              placeholder="Phone number"
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
            <hr />
            <a href="index.html" className="btn btn-google btn-user btn-block">
              <i className="fab fa-google fa-fw"></i> Register with Google
            </a>
            <a
              href="index.html"
              className="btn btn-facebook btn-user btn-block"
            >
              <i className="fab fa-facebook-f fa-fw"></i> Register with Facebook
            </a>
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
