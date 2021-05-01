import axios from "axios";
import {
  failContract,
  loadingContract,
  successContract,
} from "../store/admin/contractSlice";

export function getContract() {
  return async (dispatch) => {
    dispatch(loadingContract);
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_BASE_URL}/api/ad/contract/find_all`,
        method: "GET",
        headers: {
          token: localStorage["AccessToken"],
        },
      });
      if (response.data.message === "success") {
        let { data } = response.data;
        let dataProcessed = data.map((ctr) => {
          let tCarIn = new Date(ctr.timeCarIn).getTime();
          let tCarOut = new Date(ctr.timeCarOut).getTime();
          let tBookIn = new Date(ctr.timeInBook).getTime();
          let tBookOut = new Date(ctr.timeOutBook).getTime();

          if (!tCarIn && tBookIn) {
            ctr.status = "Booking";
            return ctr;
          } else if (tCarIn && !tCarOut) {
            ctr.status = "Parking";
            return ctr;
          } else if (tCarIn && tCarOut) {
            ctr.status = "Leaved";
            return ctr;
          }
          return ctr;
        });
        dispatch(successContract(dataProcessed));
      } else {
        dispatch(failContract(response.data.message));
      }
    } catch (error) {
      dispatch(failContract("Something wrong. Try again!"));
      console.log(error);
    }
  };
}
