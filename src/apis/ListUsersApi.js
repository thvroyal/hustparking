import axios from 'axios';
import {
  loadingListUsers,
  successListUsers,
  failedListUsers,
} from '../store/admin/UsersSlice';
import store from '../store';


export const fetchListUser = () => (dispatch) => {
  const { auth } = store.getState();
  dispatch(loadingListUsers(true));
  axios({
    url: `${process.env.REACT_APP_BASE_URL}/api/${auth.alias}/user/find_all`,
    method: 'get',
    headers: {
      token: localStorage.getItem('AccessToken'),
    },
  })
    .then((response) => {
      if (response.data.message === 'success') {
        dispatch(loadingListUsers(false));
        dispatch(successListUsers(response.data.data));
      } else {
        dispatch(loadingListUsers(false));
        dispatch(failedListUsers(response.data.message));
      }
    })
    .catch((error) => {
      dispatch(loadingListUsers(false));
      dispatch(failedListUsers('Failed to loading list users'));
      console.log(error);
    });
};
