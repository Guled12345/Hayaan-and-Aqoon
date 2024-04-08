import axios from 'axios';
import { server } from '../store';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });

    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    console.log(error.response); // Debugging line
    dispatch({
      type: 'loginFail',
      payload: error.response?.data?.message || 'An error occurred',
    });
  }
};
export const register = formdata => async dispatch => {
  try {
    dispatch({ type: 'registerRequest' });

    // If formdata is a regular JavaScript object, convert it to FormData
    const formData = new FormData();
    for (let key in formdata) {
      formData.append(key, formdata[key]);
    }

    const { data } = await axios.post(`${server}/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    dispatch({ type: 'registerSuccess', payload: data });
  } catch (error) {
    console.log('Error:', error);
    console.log('Error Response:', error.response);
    dispatch({
      type: 'registerFail',
      payload: error.response?.data?.message || 'An error occurred',
    });
  }
};

export const loadUser = () => async dispatch => {
  try {
    dispatch({ type: 'loadUserRequest' });

    const { data } = await axios.get(`${server}/me`, {
      withCredentials: true,
    });
    dispatch({ type: 'loadUserSuccess', payload: data.user });
  } catch (error) {
    console.log(error.response); // Debugging line
    dispatch({
      type: 'loadUserFail',
      payload: error.response?.data?.message || 'An error occurred',
    });
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch({ type: 'logoutRequest' });

    const { data } = await axios.get(`${server}/logout`, {
      withCredentials: true,
    });
    dispatch({ type: 'logoutSuccess', payload: data.message });
  } catch (error) {
    console.log(error.response); // Debugging line
    dispatch({
      type: 'logoutFail',
      payload: error.response?.data?.message || 'An error occurred',
    });
  }
};

export const buySubscription = () => async dispatch => {
  try {
    dispatch({ type: 'buySubscriptionRequest' });

    const { data } = await axios.get(`${server}/subscribe`, {
      withCredentials: true,
    });

    dispatch({ type: 'buySubscriptionSuccess', payload: data.subscriptionId });
  } catch (error) {
    console.log(error.response); // Debugging line
    dispatch({
      type: 'buySubscriptionFail',
      payload: error.response?.data?.message || 'An error occurred',
    });
  }
};

export const cancelSubscription = () => async dispatch => {
  try {
    dispatch({ type: 'cancelSubscriptionRequest' });

    const { data } = await axios.delete(`${server}/subscribe/cancel`, {
      withCredentials: true,
    });

    dispatch({ type: 'cancelSubscriptionSuccess', payload: data.message });
  } catch (error) {
    console.log(error.response); // Debugging line
    dispatch({
      type: 'cancelSubscriptionFail',
      payload: error.response?.data?.message || 'An error occurred',
    });
  }
};
