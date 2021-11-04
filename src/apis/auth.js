import axios from 'axios';
import { SET_USER, SET_AD, SET_MN } from '../helpers/constants';
import {
  handleError, setRole, logOut, setLoading, setInfo,
} from '../store/authSlice';
import store from '../store/index';

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
        dispatch(setRole(SET_USER));
        dispatch(setInfo(response.data.data.user));
      } else if (response.data.message === 'admin') {
        dispatch(setRole(SET_AD));
      } else if (response.data.message === 'manager') {
        dispatch(setRole(SET_MN));
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
        dispatch(setRole(SET_USER));
        dispatch(setInfo(response.data.data.user));
      } else if (response.data.message === 'admin') {
        dispatch(setRole(SET_AD));
      } else if (response.data.message === 'manager') {
        dispatch(setRole(SET_MN));
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
      if (response.data.data === 'admin') dispatch(setRole(SET_AD));
      else if (response.data.data === 'user') dispatch(setRole(SET_USER));
      else if (response.data.data === 'manager') dispatch(setRole(SET_MN));
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log(error);
  }
};

export const getInfo = () => async (dispatch) => {
  const { auth } = store.getState();
  // dispatch(setLoading(true));
  try {
    const response = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_BASE_URL}/api/${auth.alias}/info`,
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
