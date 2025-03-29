import { combineReducers } from "redux";
import { userReducer } from "../reducers/userReducer";
import { donationReducer } from "../reducers/donationReducers";

const rootReducer = combineReducers({
  users: userReducer,
  donations: donationReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
