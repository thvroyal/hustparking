import axios from 'axios';
import { failedSlot, loadingSlot, successSlot } from '../store/admin/SlotSlice';
import { setInfo } from '../store/notifySlice';
import store from '../store';

export const getSlotOfField = (fieldId) => (dispatch) => {
  const { auth } = store.getState();
  dispatch(loadingSlot);
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_BASE_URL}/api/${auth.alias}/slot/find_all?field=${fieldId}`,
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      // let slotInField = res.data.data.filter(
      //   (item) => item.fieldId === parseInt(fieldId, 10),
      // );
      const slotInField = res.data.data.map((item) => {
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

export const getQuantitySlotOfField = (fieldId, quantity) => (dispatch) => {
  const { auth } = store.getState();
  dispatch(loadingSlot);
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_BASE_URL}/api/${auth.alias}/slot/find_all?field=${fieldId}&quantity=${quantity}`,
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      const slotInField = res.data.data.map((item) => {
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

export const getSlotOfFieldViewMin = (fieldId) => (dispatch) => {
  const { auth } = store.getState();
  dispatch(loadingSlot);
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_BASE_URL}/api/${auth.alias}/slots?field=${fieldId}`,
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      // let slotInField = res.data.data.filter(
      //   (item) => item.fieldId === parseInt(fieldId, 10),
      // );
      const slotInField = res.data.data.map((item) => {
        const dCam = new Date(item.lastTimeCam).getTime();
        const dDetector = new Date(item.lastTimeDetector).getTime();
        if (dCam > dDetector) item.lastTimeUpdate = item.lastTimeCam;
        else item.lastTimeUpdate = item.lastTimeDetector;
        return item;
      });
      dispatch(successSlot(slotInField));
      dispatch(setInfo(res.data.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(failedSlot(err));
    });
};

export const getQuantitySlotOfFieldViewMin = (fieldId, quantity) => (dispatch) => {
  const { auth } = store.getState();
  dispatch(loadingSlot);
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_BASE_URL}/api/${auth.alias}/slots?field=${fieldId}&quantity=${quantity}`,
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      // let slotInField = res.data.data.filter(
      //   (item) => item.fieldId === parseInt(fieldId, 10),
      // );
      const slotInField = res.data.data.map((item) => {
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

export const getAllSlot = () => (dispatch) => {
  const { auth } = store.getState();
  dispatch(loadingSlot);
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_BASE_URL}/api/${auth.alias}/slots`,
    headers: {
      token: localStorage.getItem('AccessToken'),
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      // let slotInField = res.data.data.filter(
      //   (item) => item.fieldId === parseInt(fieldId, 10),
      // );
      const slotInField = res.data.data.map((item) => {
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
  const { auth } = store.getState();
  dispatch(loadingSlot);
  axios({
    method: 'POST',
    url: `${process.env.REACT_APP_BASE_URL}/api/${auth.alias}/slot/create_and_update`,
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
