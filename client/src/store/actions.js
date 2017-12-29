import api from '../api'
import { log } from '../lib/ke-utils'

export const updateRegisteredUser = (user) => {
  log('actions.updateRegisteredUser: user', user, 'orange')
}

/*
  plain actions above this line
 */

export const markRequestPending = (key) => ({
  type: 'app/markRequestPending',
  meta: { key },
})

export const markRequestSuccess = (key) => {
  // you can use console.log() here
  return ({
      type: 'app/markRequestSuccess',
      meta: { key },
  })
}

export const markRequestFailed = (reason, key) => ({
  type: 'app/markRequestFailed',
  payload: reason,
  meta: { key },
})

export const createRequestThunk = ({ request, key, start = [], success = [], failure = [] }) => {
  return (...args) => (dispatch) => {
    const requestKey = (typeof key === 'function') ? key(...args) : key;

    start.forEach((actionCreator) => dispatch(actionCreator()));
    dispatch(markRequestPending(requestKey));
    return request(...args)
    .then((data) => {
        success.forEach((actionCreator) => dispatch(actionCreator(data)));
        dispatch(markRequestSuccess(requestKey));
    })
    .catch((reason) => {
        failure.forEach((actionCreator) => dispatch(actionCreator(reason)));
        dispatch(markRequestFailed(reason, requestKey));
    });
  };
};

export const requestRegisterUser = createRequestThunk({
  request: api.users.register,
  key: 'api/registerUser',
  success: [ updateRegisteredUser ],
})
