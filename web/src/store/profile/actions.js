import { enqueueSnackbar, loadedContent, loadingContent } from '../application/actions';
import ProfileApi from '../../api/ProfileApi';
import * as types from './types';

export const loadProfile = () => {
  return dispatch => {
    Promise.resolve(dispatch(loadingContent()))
      .then(() => ProfileApi.index())
      .then(res => dispatch(profileLoaded(res.name, res.email)))
      .then(() => dispatch(loadedContent()))
      .catch(error => {
        dispatch(loadedContent());
        dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } }));
      });
  };
};

export const updateProfile = (name) => {
  return dispatch => {
    Promise.resolve(dispatch(profileRefreshing()))
      .then(() => ProfileApi.update(name))
      .then(res => dispatch(profileLoaded(res.name, res.email)))
      .then(() => dispatch(profileRefreshed()))
      .then(() => {
        let message = 'Profile updated';
        dispatch(enqueueSnackbar({ message: message, options: { variant: 'success' } }));
      })
      .catch(error => {
        dispatch(profileRefreshed());
        dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } }));
      });
  };
};

function profileLoaded(name, email) {
  return { type: types.PROFILE_LOADED, name, email };
}

function profileRefreshing() {
  return { type: types.PROFILE_REFRESHING };
}

function profileRefreshed() {
  return { type: types.PROFILE_REFRESHED };
}