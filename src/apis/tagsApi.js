import axios from 'axios';
import store from '../store/index';
import {
  failTag,
  loadingTag,
  successTag,
} from '../store/admin/tagsSlice';

// eslint-disable-next-line import/prefer-default-export
export function getTag() {
  const { auth } = store.getState();
  return async (dispatch) => {
    dispatch(loadingTag);
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_BASE_URL}/api/${auth.alias}/tags`,
        method: 'GET',
        headers: {
          token: localStorage.AccessToken,
        },
      });
      if (response.data.message === 'success') {
        const { data } = response.data;
        dispatch(successTag(data));
      } else {
        dispatch(failTag(response.data.message));
      }
    } catch (error) {
      dispatch(failTag('Something wrong. Try again!'));
      console.log(error);
    }
  };
}
