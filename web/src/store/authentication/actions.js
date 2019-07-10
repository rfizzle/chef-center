import * as types from './types';
import Authenticator from '../../lib/Authenticator';
import { push } from 'connected-react-router';
import { enqueueSnackbar } from '../application/actions';

let auth = new Authenticator();

export const authLogin = (email, password, nextPath, otp = '') => {
  return dispatch => {
    auth.login(email, password, otp)
      .then(res => dispatch(loginSuccess(res.email, res.name)))
      .then(() => dispatch(clearNextPath()))
      .then(() => dispatch(push(nextPath)))
      .then(() => dispatch(loginComplete()))
      .catch(error => {
        if (error.status === 400 && error.data.mfa && error.data.mfa === 'MFA required') {
          return dispatch(mfaRequired());
        } else {
          dispatch(loginFailure());
          return dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } }));
        }
      });
  };
};

export const authRegister = (name, email, password, mfaSecret = '', mfaOtp = '') => {
  return dispatch => {
    auth.register(name, email, password, mfaSecret, mfaOtp)
      .then(() => dispatch(registerSuccess()))
      .then(() => dispatch(push('/login')))
      .catch(error => dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } })));
  };
};

export const authLogout = () => {
  return dispatch => {
    Authenticator.logout()
      .then(dispatch(logoutSuccess()))
      .catch();
  };
};

export const authCheck = () => {
  return dispatch => {
    Authenticator.checkAuth()
      .then(() => dispatch(loginSuccess()))
      .catch(() => {
      });
  };
};

export const savePath = (path) => {
  return dispatch => {
    dispatch(setNextPath(path));
  };
};

export const deletePath = () => {
  return dispatch => {
    dispatch(clearNextPath());
  };
};

export function loginSuccess(email, name) {
  return { type: types.LOGIN_SUCCESS, email, name };
}

function loginComplete() {
  return { type: types.LOGIN_COMPLETE };
}

function loginFailure() {
  return { type: types.LOGIN_FAILURE };
}

export function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS };
}

function mfaRequired() {
  return { type: types.MFA_REQUIRED };
}

function registerSuccess() {
  return { type: types.REGISTER_SUCCESS };
}

function setNextPath(path) {
  return { type: types.SET_NEXT_PATH, path };
}

function clearNextPath() {
  return { type: types.CLEAR_NEXT_PATH };
}