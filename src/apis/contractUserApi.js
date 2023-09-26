import axios from 'axios';
import {
  setLoading,
  fetchListContract,
  handleError,
} from '../store/user/listContractSlice';


export const getListContract = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_BASE_URL}/api/us/get_list_contract`,
      headers: {
        token: localStorage.getItem('AccessToken'),
      },
    });
    if (response.data.message === 'success') {
      dispatch(fetchListContract(response.data.data));
    } else dispatch(handleError(response.data.data));
  } catch (error) {
    dispatch(handleError(error));
    console.log(error);
  }
};
