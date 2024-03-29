import axios from 'axios';
import {
  loadingListUsers,
  successListUsers,
  failedListUsers,
} from '../store/admin/UsersSlice';

// eslint-disable-next-line import/prefer-default-export
export const fetchListUser = () => (dispatch) => {
  dispatch(loadingListUsers(true));
  axios({
    url: `${process.env.REACT_APP_BASE_URL}/api/ad/user/find_all`,
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
