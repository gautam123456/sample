import {FETCHED_USER, NON_FETCHED_USER, SAVE_LOGIN_DATA, USER_REGISTERED} from '../constants';

const initialState = {
  isFetching: true,
  isLoggedIn: false,
  details: null,
  isNewUser: false,
  number: '',
  token: '',
  otp: '',
  referredBy: ''
};

export default function(state = initialState, action) {
  switch (action.type) {

    case FETCHED_USER:
      return Object.assign({}, state, {
        isFetching: false,
        isLoggedIn: true,
        details: action.details
      });

    case NON_FETCHED_USER:
      return Object.assign({}, state, {
        isFetching: false,
        isLoggedIn: false,
        details: null
      });

    case SAVE_LOGIN_DATA:
      return Object.assign({}, state, {
        number: action.data.number,
        token: action.data.token,
        otp: action.data.otp,
        referredBy: action.data.referredBy,
        isNewUser: action.data.isNewUser
      });

    case USER_REGISTERED:
      return Object.assign({}, state, {
        isNewUser: false,
        isLoggedIn: true
      });

    default:
      return state;
  }
};
