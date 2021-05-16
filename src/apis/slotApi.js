import axios from 'axios';
import { failedSlot, loadingSlot, successSlot } from '../store/admin/SlotSlice';

export const getSlotOfField = (fieldId) => (dispatch) => {
  dispatch(loadingSlot);
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_BASE_URL}/api/ad/slot/find_all`,
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      let slotInField = res.data.data.filter(
        (item) => item.fieldId === parseInt(fieldId, 10),
      );
      slotInField = slotInField.map((item) => {
        const dCam = new Date(item.lastTimeCam).getTime();
        const dDetector = new Date(item.lastTimeDetector).getTime();
        if (dCam > dDetector) item.lastTimeUpdate = item.lastTimeCam;
        else item.lastTimeUpdate = item.lastTimeDetector;
        return item;
      });
      dispatch(successSlot(slotInField));
    })
    .catch((err) => {
      console.log(err);
      dispatch(failedSlot(err));
    });
};

export const postSlot = (data) => (dispatch) => {
  dispatch(loadingSlot);
  axios({
    method: 'POST',
    url: `${process.env.REACT_APP_BASE_URL}/api/ad/slot/create_and_update`,
    data: JSON.stringify(data),
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
    },
  })
    .then(() => {
      dispatch(loadingSlot(false));
    })
    .catch((err) => {
      console.log(err);
      dispatch(loadingSlot(false));
    });
};

export const deleteSlot = (id) => (dispatch) => {
  dispatch(loadingSlot);
  axios({
    method: 'DELETE',
    url: `${process.env.REACT_APP_BASE_URL}/api/ad/slot/delete/${id}`,
  })
    .then(() => {
      dispatch(loadingSlot(false));
    })
    .catch((err) => {
      console.log(err);
      dispatch(loadingSlot(false));
    });
};
