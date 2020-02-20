import { enqueueSnackbar, loadedContent, loadingContent } from '../application/actions';
import ClientsApi from '../../api/ClientsApi';
import * as types from './types';

export const loadClients = () => {
  return dispatch => {
    Promise.resolve(dispatch(loadingContent()))
      .then(() => ClientsApi.index())
      .then(clients => dispatch(clientsLoaded(clients)))
      .then(() => dispatch(loadedContent()))
      .catch(error => {
        dispatch(loadedContent());
        dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } }));
      });
  };
};

export const refreshClients = () => {
  return dispatch => {
    Promise.resolve(dispatch(clientsRefreshing()))
      .then(() => ClientsApi.index())
      .then(clients => dispatch(clientsLoaded(clients)))
      .catch(error => {
        dispatch(clientsRefreshed());
        dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } }));
      });
  };
};

export const getClient = (id) => {
  return dispatch => {
    Promise.resolve(dispatch(clientsRefreshing()))
      .then(() => dispatch(clientSelected(id)))
      .then(() => ClientsApi.get(id))
      .then(client => dispatch(clientLoaded(client)))
      .catch(error => {
        dispatch(clientsRefreshed());
        dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } }));
      });
  };
};

export function clientsLoaded(clients) {
  return { type: types.CLIENTS_LOADED, clients };
}

export function clientsRefreshing() {
  return { type: types.CLIENTS_REFRESHING };
}

export function clientsRefreshed() {
  return { type: types.CLIENTS_REFRESHED };
}

function clientSelected(id) {
  return { type: types.CLIENT_SELECTED, id };
}

// TODO: Break this out into own store
function clientLoaded(data) {
  return { type: types.CLIENT_LOADED, data };
}