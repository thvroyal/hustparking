import axios from 'axios';
import {
  loadingArea,
  successArea,
  failArea,
} from '../store/admin/areaSlice';

export const getArea = () => (dispatch) => {
  dispatch(loadingArea);
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_BASE_URL}/api/ad/areas`,
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
