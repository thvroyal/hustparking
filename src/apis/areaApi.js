import axios from 'axios';
import {
  loadingArea,
  successArea,
  failArea,
} from '../store/admin/areaSlice';
import store from '../store';

export const getArea = () => (dispatch) => {
  const { auth } = store.getState();
  dispatch(loadingArea);
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_BASE_URL}/api/${auth.alias}/areas`,
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      dispatch(successArea(res.data.data));
    })
    .catch((err) => {
      dispatch(failArea(err));
    });
};
