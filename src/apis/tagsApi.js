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
        url: `${process.env.REACT_APP_BASE_URL}/api/ad/all-news-tag`,
        method: 'GET',
        headers: {
          token: localStorage.AccessToken,
        },
      });
      if (response.data.message === 'success') {
        const { data } = response.data;
        // console.log(data, idUser);
        // if (idUser !== 'all') { data = data.filter((x) => x.userId === parseInt(idUser, 10)); }
        // console.log(data);
        const dataProcessed = data.map((tag) => {
          const dataPr = {
            id: tag.id,
            userId: tag.userId,
          };
          return dataPr;
        });
        dispatch(successTag(dataProcessed));
      } else {
        dispatch(failTag(response.data.message));
      }
    } catch (error) {
      dispatch(failTag('Something wrong. Try again!'));
      console.log(error);
    }
  };
}
