import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "../../components/TextField";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { SignIn } from "../../apis/auth";
import { useEffect } from "react";

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (role === 1) history.push("/");
    else if (role === 2) history.push("/dashboard");
  }, [role, history]);
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validate = Yup.object({
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });
  return (
    <Formik
      initialValues={{
        phone: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        dispatch(SignIn(values));
        if (role === 1) history.push("/");
        else if (role === 2) history.push("/dashboard");
      }}
    >
      {(formik) => (
        <div>
          <Form className="user">
            <TextField
              label="Phone"
              name="phone"
              type="tel"
              placeholder="Phone number"
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
