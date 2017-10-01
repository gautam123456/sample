import {FETCHED_ITEMS, SAVED_SERVER_TIME} from '../constants';

const initialState = {
  items: null,
  serverTime: '',
  source: ''
};

export default function(state = initialState, action) {
  switch (action.type) {

    case FETCHED_ITEMS:
      return Object.assign({}, state, {
        items: action.items,
        source: action.source
      });

    case SAVED_SERVER_TIME:
      return Object.assign({}, state, {
        serverTime: action.serverTime
      });

    default:
      return state;
  }
};
