import axios from 'axios';
import { failedListManager, loadingListManager, setListManager } from '../store/admin/managersSlice';

export const getListManager = () => async (dispatch) => {
  axios({
    url: `${process.env.REACT_APP_BASE_URL}/api/ad/manager/find_all`,
    method: 'GET',
    headers: {
      token: localStorage.getItem('AccessToken'),
    },
  })
    .then((response) => {
      if (response.data.message === 'success') {
        dispatch(loadingListManager(false));
        dispatch(setListManager(response.data.data));
      } else {
        dispatch(loadingListManager(false));
        dispatch(failedListManager(response.data.message));
      }
    })
    .catch((error) => {
      dispatch(loadingListManager(false));
      dispatch(failedListManager('Failed to loading list users'));
      console.log(error);
    });
};
