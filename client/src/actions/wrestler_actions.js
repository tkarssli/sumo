import * as APIUtil from '../util/wrestlers_util';

export const RECEIVE_WRESTLER = "RECEIVE_WRESTLER";


// Wrestler Actions
export const receiveWrestler = wrestler => ({
  type: RECEIVE_WRESTLER,
  wrestler
});

// Thunk Actions
export const getWrestler = webId => dispatch => (
  APIUtil.getWrestler(webId).then(res => (
    dispatch(receiveWrestler(res.data.wrestler))
  ), err => (
    console.log(err)
  ))
)

window.getWrestler = getWrestler