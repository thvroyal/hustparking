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

export const registerTag = (data) => (dispatch) => {
  dispatch(loadingTag);
  axios({
    method: 'POST',
    url: `${process.env.REACT_APP_BASE_URL}/api/ad/tags`,
    data: JSON.stringify(data),
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateTag = (data) => (dispatch) => {
  dispatch(loadingTag);
  axios({
    method: 'PUT',
    url: `${process.env.REACT_APP_BASE_URL}/api/ad/tags`,
    data: JSON.stringify(data),
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteTag = (id) => (dispatch) => {
  dispatch(loadingTag);
  axios({
    method: 'DELETE',
    url: `${process.env.REACT_APP_BASE_URL}/api/ad/tags?id=${id}`,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
