import { enqueueSnackbar, loadedContent, loadingContent } from '../application/actions';
import * as types from './types';
import NodesApi from '../../api/NodesApi';
import RolesApi from "../../api/RolesApi";
import CookbooksApi from "../../api/CookbooksApi";
import { rolesLoaded } from '../roles/actions'
import { cookbookRecipesLoaded } from "../cookbooks/actions";
import EnvironmentsApi from "../../api/EnvironmentsApi";
import { environmentsLoaded } from "../environments/actions";

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
      .then(() => RolesApi.index())
      .then(roles => dispatch(rolesLoaded(roles)))
      .then(() => CookbooksApi.recipes())
      .then(recipes => dispatch(cookbookRecipesLoaded(recipes)))
      .then(() => EnvironmentsApi.index())
      .then(environments => dispatch(environmentsLoaded(environments)))
      .then(() => NodesApi.get(id))
      .then(node => dispatch(nodeLoaded(node)))
      .catch(error => {
        dispatch(nodesRefreshed());
        dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } }));
      });
  };
};

export const updateNode = (id, data) => {
  return dispatch => {
    Promise.resolve(dispatch(nodesRefreshing()))
      .then(() => NodesApi.update(id, data))
      .then(node => dispatch(nodeLoaded(node)))
      .catch(error => {
        dispatch(nodesRefreshed());
        dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } }));
      });
  };
};

export const clearCurrentNode = () => {
  return dispatch => {
    Promise.resolve(dispatch(nodeCleared()))
  };
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

// TODO: Break this out into own store
function nodeLoaded(data) {
  return { type: types.NODE_LOADED, data }
}

function nodeCleared() {
  return { type: types.NODE_CLEARED }
}