/* eslint-disable no-unused-vars */
import { createReducer, createActions } from 'reduxsauce';
import R from 'ramda';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  upload: ['token', 'uri', 'filetype'],
  uploadSuccess: ['status', 'imageurl'],
  uploadError: ['error'],
});

export const FileTypes = Types;
export default Creators;


/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  error: null,
  uploading: null,
  url: null,
};

/* ------------- Reducers ------------- */


export const upload = (state, { token, uri, filetype }) => R.merge(state, { uploading: true, error: null });
export const uploadSuccess = (state, { status, imageurl }) => R.merge(state, { uploading: false, url: imageurl });
export const uploadError = (state, { error }) => R.merge(state, { uploading: false, error });


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPLOAD]: upload,
  [Types.UPLOAD_SUCCESS]: uploadSuccess,
  [Types.UPLOAD_ERROR]: uploadError,
});
