import axios from 'axios';
import store from '../store/index';
import {
  failedField,
  loadingField,
  successField,
} from '../store/admin/fieldSlice';

const checkRole = () => {
  const { auth } = store.getState();
  switch (auth.role) {
    case 0: return -1;
    case 1: return -1;
    case 2: return 'ad';
    case 3: return 'mn';
    case undefined: return -1;
    case null: return -1;
    default: return -1;
  }
};
const fieldPerson = checkRole();

export const getField = () => (dispatch) => {
  dispatch(loadingField);
  axios({
    url: `${process.env.REACT_APP_BASE_URL}/api/${fieldPerson}/field/find_all`,
    method: 'GET',
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
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

export const getFieldUser = () => (dispatch) => {
  dispatch(loadingField);
  axios({
    url: `${process.env.REACT_APP_BASE_URL}/api/public/field/find_all`,
    method: 'GET',
  })
    .then((res) => {
      dispatch(successField(res.data.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(failedField(err));
    });
};

export const postField = (data) => (dispatch) => {
  dispatch(loadingField);
  axios({
    method: 'POST',
    url: `${process.env.REACT_APP_BASE_URL}/api/${fieldPerson}/field/create_and_update`,
    data: JSON.stringify(data),
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteField = (id) => (dispatch) => {
  dispatch(loadingField);
  axios({
    method: 'DELETE',
    url: `${process.env.REACT_APP_BASE_URL}/api/${fieldPerson}/field/delete/${id}`,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
