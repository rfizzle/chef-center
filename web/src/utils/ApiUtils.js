import axios from 'axios';
import settings from '../settings';

const defaultConfig = { withCredentials: true };

export const apiPost = (url, data = {}, failSilent = false, config = defaultConfig) =>
  axios.post(`${settings.url}${url}`, data, config)
    .then(response => {
      if (response.status !== 200) {
        if (failSilent) {
          return Promise.resolve(errorHandler(response));
        } else {
          return Promise.reject(errorHandler(response));
        }
      } else {
        return Promise.resolve(response.data.data);
      }
    })
    .catch(error => Promise.reject(errorHandler(error)));

export const apiGet = (url, failSilent = false, config = defaultConfig) =>
  axios.get(`${settings.url}${url}`, config)
    .then(response => {
      if (response.status !== 200) {
        if (failSilent) {
          return Promise.resolve(errorHandler(response));
        } else {
          return Promise.reject(errorHandler(response));
        }
      } else {
        return Promise.resolve(response.data.data);
      }
    })
    .catch(error => Promise.reject(errorHandler(error)));

export const apiPut = (url, data, failSilent = false, config = defaultConfig) =>
  axios.put(`${settings.url}${url}`, data, config)
    .then(response => {
      if (response.status !== 200) {
        if (failSilent) {
          return Promise.resolve(errorHandler(response));
        } else {
          return Promise.reject(errorHandler(response));
        }
      } else {
        return Promise.resolve(response.data.data);
      }
    })
    .catch(error => Promise.reject(errorHandler(error)));

export const apiDelete = (url, failSilent = false, config = defaultConfig) =>
  axios.delete(`${settings.url}${url}`, config)
    .then(response => {
      if (response.status !== 200) {
        if (failSilent) {
          return Promise.resolve(errorHandler(response));
        } else {
          return Promise.reject(errorHandler(response));
        }
      } else {
        return Promise.resolve(response.data.data);
      }
    })
    .catch(error => Promise.reject(errorHandler(error)));

const errorHandler = (error) => {
  if (error && error.response) {
    if (error.response.data) {
      if (error.response.data.status === 'fail') {
        return {
          status: error.response.status,
          statusText: error.response.statusText,
          message: error.response.data.data.message,
          data: error.response.data.data,
        };
      } else if (error.response.data.status === 'error') {
        if (error.response.data.message && error.response.data.message.errors) {
          return {
            status: error.response.status,
            statusText: error.response.statusText,
            message: error.response.data.message.errors[0],
          };
        } else {
          return {
            status: error.response.status,
            statusText: error.response.statusText,
            message: error.response.data.message,
          };
        }
      } else {
        return {
          status: error.response.status,
          statusText: error.response.statusText,
          message: (error.response.message || error.response.statusText),
        };
      }
    }
  } else if (error && error.request) {
    return {
      status: -1,
      statusText: 'Client Side Error',
      message: error.message,
    };
  } else {
    return {
      status: -1,
      statusText: 'An error occurred',
      message: 'An error occurred',
    };
  }
};
