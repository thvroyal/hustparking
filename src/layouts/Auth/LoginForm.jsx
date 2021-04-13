import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "../../components/TextField";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { SignIn } from "../../apis/auth";

const LoginForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const validate = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .min(2, "Password must be at least 2 charaters")
      .required("Password is required"),
  });
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        dispatch(SignIn(values));
      }}
    >
      {(formik) => (
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
              type="email"
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
            >
              Login
            </button>
            <hr />
            <a href="index.html" className="btn btn-google btn-user btn-block">
              <i className="fab fa-google fa-fw"></i> Login with Google
            </a>
            <a
              href="index.html"
              className="btn btn-facebook btn-user btn-block"
            >
              <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
            </a>
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
