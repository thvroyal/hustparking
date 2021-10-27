import axios from 'axios';
import {
  failDetector,
  isDeleteDetector,
  isEditDetector,
  loadingDetector,
  successDetector,
} from '../store/admin/detectorSlice';
import store from '../store';

export const getDetectors = (id) => (dispatch) => {
  const { auth } = store.getState();
  dispatch(loadingDetector);
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_BASE_URL}/api/${auth.alias}/detector/find_all`,
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      const detectorOfGW = res.data.data.filter(
        (item) => item.gatewayId === parseInt(id, 10),
      );
      dispatch(successDetector(detectorOfGW));
    })
    .catch((err) => {
      console.log('err', err);
      dispatch(failDetector(err));
    });
};

export const editDetectors = (data) => (dispatch) => {
  dispatch(isEditDetector(data.id));
  axios({
    method: 'PUT',
    url: `${process.env.REACT_APP_BASE_URL}/api/v1/detectors/${data.id}`,
    data: JSON.stringify(data),
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
    },
  })
    .then(() => {
      dispatch(isEditDetector(false));
    })
    .catch((err) => {
      console.log('err', err);
      dispatch(isEditDetector(false));
    });
};

export const deleteDetectors = (id) => (dispatch) => {
  dispatch(isDeleteDetector(id));
  axios({
    method: 'DELETE',
    url: `${process.env.REACT_APP_BASE_URL}/api/v1/detectors/${id}`,
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
    },
  })
    .then(() => {
      // getDetectors();
      dispatch(isDeleteDetector(false));
    })
    .catch((err) => {
      console.log('err', err);
      dispatch(isDeleteDetector(false));
    });
};
