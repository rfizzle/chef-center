import { enqueueSnackbar, loadedContent, loadingContent } from '../application/actions';
import UsersApi from '../../api/UsersApi';
import * as types from './types';

export const loadUsers = () => {
  return dispatch => {
    Promise.resolve(dispatch(loadingContent()))
      .then(() => UsersApi.index())
      .then(users => dispatch(usersLoaded(users)))
      .then(() => dispatch(loadedContent()))
      .catch(error => {
        dispatch(loadedContent());
        dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } }));
      });
  };
};

export const refreshUsers = () => {
  return dispatch => {
    Promise.resolve(dispatch(usersRefreshing()))
      .then(() => UsersApi.index())
      .then(users => dispatch(usersLoaded(users)))
      .catch(error => {
        dispatch(usersRefreshed());
        dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } }));
      });
  };
};

function usersLoaded(users) {
  return { type: types.USERS_LOADED, users };
}

function usersRefreshing() {
  return { type: types.USERS_REFRESHING };
}

function usersRefreshed() {
  return { type: types.USERS_REFRESHED };
}