import axios from 'axios';
import {
  failDetectorById,
  loadingDetectorById,
  successDetectorById,
} from '../store/admin/detectorByIdSlice';

// eslint-disable-next-line import/prefer-default-export
export const getDetectorById = (id) => (dispatch) => {
  dispatch(loadingDetectorById);
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_BASE_URL}/api/ad/detector/find_by_id/${id}`,
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
