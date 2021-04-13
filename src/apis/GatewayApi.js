import axios from "axios";
import {
  failedGateway,
  loadingGateway,
  successGateway,
} from "../store/admin/gatewaySlice";

export const getGateway = () => {
  return (dispatch) => {
    dispatch(loadingGateway);
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}/api/ad/gateway/find_all`,
      headers: {
        token: localStorage.getItem("AccessToken"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        dispatch(successGateway(res.data.data));
      })
      .catch((err) => {
        dispatch(failedGateway(err));
      });
  };
};
