import axios from 'axios';
import {
  failTag,
  loadingTag,
  successTag,
} from '../store/admin/tagsSlice';

// eslint-disable-next-line import/prefer-default-export
export function getTag() {
  return async (dispatch) => {
    dispatch(loadingTag);
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_BASE_URL}/api/ad/tags`,
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

export function registerTag() {

}

export function updateTag() {

}

export function deleteTag() {

}
