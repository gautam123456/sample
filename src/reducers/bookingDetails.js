import {CART_UPDATED, COUPON_APPLIED, SAVE_BOOKING_DATA, ADDRESS_SELECTED, CLEAR_CART} from '../constants';

const initialState = {
  subTotal: 0,
  total: 0,
  servicesCount: 0,
  minBooking: 800,
  convenienceCharges: 0,
  complementaryOffer: '',
  discount: 30,
  couponCode: 'LOOK30',
  location: '',
  addressLKey: '',
  services: {},
  date: '',
  timing: '',
  serviceIds: '',
  emailId: '',
  comment: ''
};

const localStorageState = localStorage.state ? JSON.parse(localStorage.state) : initialState;

export default function(state = localStorageState, action) {
  switch (action.type) {

    case CART_UPDATED:
    const {id, name, cost, count, operation, discount} = action.options;
      let services = Object.assign({}, state.services),
        newState = null;

      const costInt = parseInt(cost),
        discountInt = parseInt(discount || 0);

      if(operation) {
          if(services[id]){
            services[id].count += 1;
          }else{
            services[id] = {
              count: 1, 
              name, 
              cost: costInt,
              discount: discountInt
            }
          }


          newState = {
            servicesCount: state.servicesCount + 1,
            subTotal: state.subTotal + costInt,
            services,
            total: state.total + (costInt - (costInt * discountInt/100))
          };

      }else{

          services[id].count -= 1;
          if(services[id].count === 0){
            delete services[id];
          }
          const servicesCount = state.servicesCount - 1;

          newState = {
            servicesCount,
            subTotal: servicesCount ?  state.subTotal - costInt : 0,
            services,
            total: servicesCount ? state.total - (costInt - (costInt * discountInt/100)) : 0
          };
      }

      window.localStorage.state = JSON.stringify(Object.assign({}, state, newState));

      return Object.assign({}, state, newState);

    case COUPON_APPLIED:
      const {couponCode, refDiscount, complementaryOffer} = action.options,
        total = (state.subTotal - (state.subTotal * action.options.discount)/100) - refDiscount;
      return Object.assign({}, state, {
        couponCode,
        discount: action.options.discount,
        total,
        complementaryOffer
      });

    case SAVE_BOOKING_DATA:
      const {options: {timing:{date, month, time, year}, mailId, comment}} = action;
      return Object.assign({}, state, {
        date: month + '/' + date + '/' + year,
        timing: time,
        emailId: mailId,
        comment
      });

    case ADDRESS_SELECTED:
      return Object.assign({}, state, {
        addressLKey: action.options.activelkey
      });

    case CLEAR_CART:
      window.localStorage.clear();
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
};
