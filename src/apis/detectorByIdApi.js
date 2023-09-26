import axios from 'axios';
import {
  failDetectorById,
  loadingDetectorById,
  successDetectorById,
} from '../store/admin/detectorByIdSlice';
import store from '../store';


export const getDetectorById = (id) => (dispatch) => {
  const { auth } = store.getState();
  dispatch(loadingDetectorById);
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_BASE_URL}/api/${auth.alias}/detector/find_by_id/${id}`,
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      dispatch(successDetectorById(res.data.data));
    })
    .catch((err) => {
      dispatch(failDetectorById(err));
    });
};
