import axios from 'axios';
import {
  failedPackageTag,
  loadingPackageTag,
  successPackageTag,
} from '../store/debug/packageTagSlice';
import store from '../store';

// eslint-disable-next-line import/prefer-default-export
export const getTagPackage = () => (dispatch) => {
  const { auth } = store.getState();
  dispatch(loadingPackageTag);
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_BASE_URL}/api/${auth.alias}/tag_packages`,
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      dispatch(successPackageTag(res.data.data));
    })
    .catch((err) => {
      console.log('err', err);
      dispatch(failedPackageTag(err));
    });
};

export const getQuantityTagPackage = (quantity) => (dispatch) => {
  const { auth } = store.getState();
  dispatch(loadingPackageTag);
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_BASE_URL}/api/${auth.alias}/tag_packages?quantity=${quantity}`,
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      dispatch(successPackageTag(res.data.data));
    })
    .catch((err) => {
      console.log('err', err);
      dispatch(failedPackageTag(err));
    });
};
