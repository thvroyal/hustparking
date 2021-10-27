import axios from 'axios';
import {
  failedGateway,
  loadingGateway,
  successGateway,
} from '../store/admin/gatewaySlice';
import store from '../store/index';

// eslint-disable-next-line import/prefer-default-export
export const getGateway = () => (dispatch) => {
  const { auth } = store.getState();
  dispatch(loadingGateway);
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_BASE_URL}/api/${auth.alias}/gateway/find_all`,
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      dispatch(successGateway(res.data.data));
    })
    .catch((err) => {
      dispatch(failedGateway(err));
    });
};
