import axios from 'axios';
import {
  failSlotById,
  loadingSlotById,
  successSlotById,
} from '../store/admin/slotByIdSlice';

// eslint-disable-next-line import/prefer-default-export
export const getSlotById = (id) => (dispatch) => {
  dispatch(loadingSlotById);
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_BASE_URL}/api/public/slot/find_by_id/${id}`,
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      dispatch(successSlotById(res.data.data));
    })
    .catch((err) => {
      dispatch(failSlotById(err));
    });
};
