import axios from 'axios';
import {
  loadingListHistoryDemo,
  successListHistoryDemo,
  failedListHistoryDemo,
} from '../store/historyDemo';
// import store from '../store';

export const fetchListUser = () => (dispatch) => {
  // const { auth } = store.getState();
  dispatch(loadingListHistoryDemo(true));
  axios({
    // url: 'http://202.191.56.104:5525/api/historydemo/getAllHistoryDemo',
    url: `${process.env.REACT_APP_BASE_URL}/api/historydemo/getAllHistoryDemo`,
    method: 'get',
    headers: {
      token: localStorage.getItem('AccessToken'),
    },
  })
    .then((response) => {
      if (response.data.message === 'success') {
        dispatch(loadingListHistoryDemo(false));
        dispatch(successListHistoryDemo(response.data.data));
      } else {
        dispatch(loadingListHistoryDemo(false));
        dispatch(failedListHistoryDemo(response.data.message));
      }
    })
    .catch((error) => {
      dispatch(loadingListHistoryDemo(false));
      dispatch(failedListHistoryDemo('Failed to loading list demo'));
      console.log(error);
    });
};
