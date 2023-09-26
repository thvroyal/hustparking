import axios from 'axios';
import {
  failedGatewayField,
  loadingGatewayField,
  successGatewayField,
} from '../store/admin/gatewayfieldSlice';
import store from '../store/index';


export const getGWField = () => (dispatch) => {
  const { auth } = store.getState();
  dispatch(loadingGatewayField);
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_BASE_URL}/api/${auth.alias}/fieldGateway/find_all`,
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      dispatch(successGatewayField(res.data.data));
    })
    .catch((err) => {
      dispatch(failedGatewayField(err));
    });
};
