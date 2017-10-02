import {FETCHED_ITEMS, SAVED_SERVER_TIME, SAVE_BOOKED_DATA} from '../constants';

const initialState = {
  items: null,
  source: '',
  bookingID: '',
  moneySaved: 0,
  finalAmount: 0
};

export default function(state = initialState, action) {
  switch (action.type) {

    case FETCHED_ITEMS:
      const {items, source} = action;
      return Object.assign({}, state, {
        items,
        source
      });

    case SAVE_BOOKED_DATA:
      const {data: {moneySaved, finalAmount, bookingID}} = action;
      return Object.assign({}, state, {
        bookingID,
        moneySaved,
        finalAmount
      });

    default:
      return state;
  }
};
