import axios from 'axios';
import {
  failedPackage,
  loadingPackage,
  successPackage,
} from '../store/debug/packageSlice';
import store from '../store';


export const getPacket = () => (dispatch) => {
  const { auth } = store.getState();
  dispatch(loadingPackage);
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_BASE_URL}/api/${auth.alias}/package/find_all`,
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      dispatch(successPackage(res.data.data));
    })
    .catch((err) => {
      console.log('err', err);
      dispatch(failedPackage(err));
    });
};

export const getQuantityPacket = (quantity) => (dispatch) => {
  const { auth } = store.getState();
  dispatch(loadingPackage);
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_BASE_URL}/api/${auth.alias}/package/find_all?quantity=${quantity}`,
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      dispatch(successPackage(res.data.data));
    })
    .catch((err) => {
      console.log('err', err);
      dispatch(failedPackage(err));
    });
};
