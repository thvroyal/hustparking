import axios from "axios";
import {
  failedField,
  loadingField,
  successField,
} from "../store/admin/fieldSlice";

export const getField = () => {
  return (dispatch) => {
    dispatch(loadingField);
    axios({
      url: `${process.env.REACT_APP_BASE_URL}/api/public/field/find_all`,
      method: "GET",
      headers: {
        token: localStorage.getItem("AccessToken"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        dispatch(successField(res.data.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(failedField(err));
      });
  };
};

export const postField = (data) => {
  return (dispatch) => {
    dispatch(loadingField);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/api/ad/field/create_and_update`,
      data: JSON.stringify(data),
      headers: {
        token: localStorage.getItem("AccessToken"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteField = (id) => {
  return (dispatch) => {
    dispatch(loadingField);
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_BASE_URL}/api/ad/field/delete/${id}`,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
