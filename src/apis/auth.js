import axios from "axios";
import { handleError, setRole, logOut, setLoading } from "../store/authSlice";

export const SignIn = (data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/public/login`,
        data
      );
      dispatch(setLoading(false));
      if (response.data.message === "fail")
        dispatch(handleError(response.data.data));
      else {
        localStorage.setItem("AccessToken", response.data.data);
        if (response.data.message === "user") {
          dispatch(setRole(1));
        } else if (response.data.message === "admin") {
          dispatch(setRole(2));
        }
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(handleError("Something Wrong"));
    }
  };
};

export const ClearTokenBackend = () => {
  return (dispatch) => {
    const token = localStorage.getItem("AccessToken");
    localStorage.removeItem("AccessToken");
    axios(`${process.env.REACT_APP_BASE_URL}/api/public/logout`, {
      method: "GET",
      headers: {
        token: token,
      },
    })
      .then((res) => {
        dispatch(logOut);
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
