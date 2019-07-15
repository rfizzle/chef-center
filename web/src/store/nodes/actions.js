import { enqueueSnackbar, loadedContent, loadingContent } from '../application/actions';
import NodesApi from '../../api/NodesApi';
import * as types from './types';

export const loadNodes = () => {
  return dispatch => {
    Promise.resolve(dispatch(loadingContent()))
      .then(() => NodesApi.index())
      .then(nodes => dispatch(nodesLoaded(nodes)))
      .then(() => dispatch(loadedContent()))
      .catch(error => {
        dispatch(loadedContent());
        dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } }));
      });
  };
};

export const refreshNodes = () => {
  return dispatch => {
    Promise.resolve(dispatch(nodesRefreshing()))
      .then(() => NodesApi.index())
      .then(nodes => dispatch(nodesLoaded(nodes)))
      .catch(error => {
        dispatch(nodesRefreshed());
        dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } }));
      });
  };
};

export const getNode = (id) => {
  return dispatch => {
    Promise.resolve(dispatch(nodesRefreshing()))
      .then(() => dispatch(nodeSelected(id)))
      .then(() => NodesApi.get(id))
      .then(node => dispatch(nodeRetrieved(node)))
  }
};

function nodesLoaded(nodes) {
  return { type: types.NODES_LOADED, nodes };
}

function nodesRefreshing() {
  return { type: types.NODES_REFRESHING };
}

function nodesRefreshed() {
  return { type: types.NODES_REFRESHED };
}

function nodeSelected(id) {
  return { type: types.NODE_SELECTED, id }
}

function nodeRetrieved(data) {
  return { type: types.NODE_RETRIEVED, data }
}