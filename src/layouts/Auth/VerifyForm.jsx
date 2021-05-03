import { React, useState } from "react";
import { Formik, Form } from "formik";
import { TextField } from "../../components/TextField";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const VerifyForm = () => {
  const query = useQuery();
  const history = useHistory();
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);
  const validate = Yup.object({
    code: Yup.number().required("Code is required"),
  });

  const handleVerify = async (code) => {
    const data = {
      email: query.get("email"),
      code: code,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/public/verify`,
        data
      );
      if (response.data.message === "success" && response.data.data) {
        setMsg("Your email is verified. Login now!");
        setErr(null);
      } else {
        setErr("Wrong code. Try again!");
        setMsg(null);
      }
      setTimeout(function () {
        history.push("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      initialValues={{
        code: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        handleVerify(values.code);
      }}
    >
      {(formik) => (
        <div>
          <div className="small">
            Please enter the verification code that you will receive at
            <span className="font-weight-bold">{` ${query.get("email")}`}</span>
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
              label="code"
              name="code"
              type="text"
              placeholder="Please enter your code"
            />

            <button
              type="submit"
              className="btn btn-primary btn-user btn-block mt-4"
            >
              Verify
            </button>
          </Form>

          {/* <hr />
          <div className="text-center">
            <Link className="small" to="/register">
              Create an Account!
            </Link>
          </div> */}
        </div>
      )}
    </Formik>
  );
};
export default VerifyForm;
