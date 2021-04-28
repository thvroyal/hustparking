import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "../../components/TextField";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { SignIn } from "../../apis/auth";
import GoogleLogin from "react-google-login";

const LoginForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const validate = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .min(2, "Password must be at least 2 charaters")
      .required("Password is required"),
  });

  const handleLogin = async (googleData) => {
    console.log(googleData);
    // const res = await fetch("/api/v1/auth/google", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     token: googleData.tokenId,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
  };
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
              type="text"
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
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID}
              render={(renderProps) => (
                <button
                  className="btn btn-google btn-user btn-block"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <i className="fab fa-google fa-fw"></i> Login with Google
                </button>
              )}
              buttonText="Log in with Google"
              onSuccess={handleLogin}
              onFailure={handleLogin}
              cookiePolicy={"single_host_origin"}
            />
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
