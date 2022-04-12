import axios from 'axios';
import {
  loadingDistrict,
  successDistrict,
  failDistrict,
} from '../store/admin/districtSlice';
import store from '../store';

export const getDistrict = () => (dispatch) => {
  const { auth } = store.getState();
  dispatch(loadingDistrict);
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_BASE_URL}/api/${auth.alias}/districts`,
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      dispatch(successDistrict(res.data.data));
    })
    .catch((err) => {
      dispatch(failDistrict,
        (err));
    });
};

export const getDistrictById = (id) => (dispatch) => {
  dispatch(loadingDistrict);
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_BASE_URL}/api/ad/district/${id}`,
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      dispatch(successDistrict(res.data.data));
    })
    .catch((err) => {
      dispatch(failDistrict,
        (err));
    });
};
