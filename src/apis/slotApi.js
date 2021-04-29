import axios from "axios";
import { failedSlot, loadingSlot, successSlot } from "../store/admin/SlotSlice";

export const getSlotOfField = (fieldId) => {
  return (dispatch) => {
    dispatch(loadingSlot);
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}/api/ad/slot/find_all`,
      headers: {
        token: localStorage.getItem("AccessToken"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        let slotInField = res.data.data.filter(
          (item) => item.fieldId === parseInt(fieldId)
        );
        slotInField = slotInField.map((item, index) => {
          let dCam = new Date(item.lastTimeCam).getTime();
          let dDetector = new Date(item.lastTimeDetector).getTime();
          if (dCam > dDetector) item["lastTimeUpdate"] = item.lastTimeCam;
          else item["lastTimeUpdate"] = item.lastTimeDetector;
          return item;
        });
        dispatch(successSlot(slotInField));
      })
      .catch((err) => {
        console.log(err);
        dispatch(failedSlot(err));
      });
  };
};

export const postSlot = (data) => {
  return (dispatch) => {
    dispatch(loadingSlot);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/api/ad/slot/create_and_update`,
      data: JSON.stringify(data),
      headers: {
        token: localStorage.getItem("AccessToken"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        dispatch(loadingSlot(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(loadingSlot(false));
      });
  };
};

export const deleteSlot = (id) => {
  return (dispatch) => {
    dispatch(loadingSlot);
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_BASE_URL}/api/ad/slot/delete/${id}`,
    })
      .then((res) => {
        dispatch(loadingSlot(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(loadingSlot(false));
      });
  };
};
