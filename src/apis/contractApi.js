import axios from 'axios';
import {
  failContract,
  loadingContract,
  successContract,
} from '../store/admin/contractSlice';

// eslint-disable-next-line import/prefer-default-export
export function getContract(idUser) {
  return async (dispatch) => {
    dispatch(loadingContract);
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_BASE_URL}/api/ad/contract/find_all`,
        method: 'GET',
        headers: {
          token: localStorage.AccessToken,
        },
      });
      if (response.data.message === 'success') {
        let { data } = response.data;
        // console.log(data, idUser);
        if (idUser !== 'all') { data = data.filter((x) => x.userId === parseInt(idUser, 10)); }
        // console.log(data);
        const dataProcessed = data.map((ctr) => {
          const tCarIn = new Date(ctr.timeCarIn).getTime();
          const tCarOut = new Date(ctr.timeCarOut).getTime();
          const tBookIn = new Date(ctr.timeInBook).getTime();
          // let tBookOut = new Date(ctr.timeOutBook).getTime();

          if (!tCarIn && tBookIn) {
            ctr.status = 'Booking';
            return ctr;
          } if (tCarIn && !tCarOut) {
            ctr.status = 'Parking';
            return ctr;
          } if (tCarIn && tCarOut) {
            ctr.status = 'Leaved';
            return ctr;
          }
          return ctr;
        });
        dispatch(successContract(dataProcessed));
      } else {
        dispatch(failContract(response.data.message));
      }
    } catch (error) {
      dispatch(failContract('Something wrong. Try again!'));
      console.log(error);
    }
  };
}
