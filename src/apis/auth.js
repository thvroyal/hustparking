import axios from 'axios';
import {
  handleError, setRole, logOut, setLoading, setInfo,
} from '../store/authSlice';

export const SignIn = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/public/login`,
      data,
    );
    dispatch(setLoading(false));
    if (response.data.message === 'fail') dispatch(handleError(response.data.data));
    else {
      localStorage.setItem('AccessToken', response.data.data.token ?? response.data.data);
      if (response.data.message === 'user') {
        dispatch(setRole(1));
        dispatch(setInfo(response.data.data.user));
      } else if (response.data.message === 'admin') {
        dispatch(setRole(2));
      } else if (response.data.message === 'manager') {
        dispatch(setRole(3));
      }
    }
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(handleError('Something Wrong'));
  }
};
export const SignInSocial = (token) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios({
      url: `${process.env.REACT_APP_BASE_URL}/api/login-google/access-token`,
      params: {
        token,
      },
      method: 'get',
    });
    dispatch(setLoading(false));
    if (response.data.message === 'fail') dispatch(handleError(response.data.data));
    else {
      localStorage.setItem('AccessToken', response.data.data.token ?? response.data.data);
      if (response.data.message === 'user') {
        dispatch(setRole(1));
        dispatch(setInfo(response.data.data.user));
      } else if (response.data.message === 'admin') {
        dispatch(setRole(2));
      } else if (response.data.message === 'manager') {
        dispatch(setRole(3));
      }
    }
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(handleError('Something Wrong'));
  }
};

export const ClearTokenBackend = () => (dispatch) => {
  const token = localStorage.getItem('AccessToken');
  localStorage.removeItem('AccessToken');
  axios(`${process.env.REACT_APP_BASE_URL}/api/public/logout`, {
    method: 'GET',
    headers: {
      token,
    },
  })
    .then(() => {
      dispatch(logOut);
      window.location.reload();
    })
    .catch((err) => {
      console.error(err);
    });
};

export const verifyToken = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_BASE_URL}/api/public/get_role`,
      headers: {
        token: localStorage.getItem('AccessToken'),
      },
    });
    dispatch(setLoading(false));
    if (response.data.message === 'success' && response.data.data) {
      if (response.data.data === 'admin') dispatch(setRole(2));
      else if (response.data.data === 'user') dispatch(setRole(1));
      else if (response.data.data === 'manager') dispatch(setRole(3));
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log(error);
  }
};

export const getInfo = () => async (dispatch) => {
  // dispatch(setLoading(true));
  try {
    const response = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_BASE_URL}/api/us/info`,
      headers: {
        token: localStorage.getItem('AccessToken'),
      },
    });
    if (response.data.message === 'success' && response.data.data) {
      dispatch(setInfo(response.data.data));
    }
    // dispatch(setLoading(false));
  } catch (error) {
    // dispatch(setLoading(false));
    console.error(error);
  }
};
