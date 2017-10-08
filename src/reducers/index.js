import {combineReducers} from "redux";
import bookingDetails from "./bookingDetails";
import userDetails from "./userDetails";
import misc from "./misc";

export default combineReducers({
  bookingDetails,
  userDetails,
  misc
});
