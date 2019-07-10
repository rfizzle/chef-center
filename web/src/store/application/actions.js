import * as types from './types';

export const enqueueSnackbar = notification => ({
  type: types.ENQUEUE_SNACKBAR,
  notification: {
    key: new Date().getTime() + Math.random(),
    ...notification,
  },
});

export const removeSnackbar = key => ({
  type: types.REMOVE_SNACKBAR,
  key,
});

export function loadingContent() {
  return { type: types.CONTENT_LOADING };
}

export function loadedContent() {
  return { type: types.CONTENT_LOADED };
}
