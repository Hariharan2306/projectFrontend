import { combineReducers } from "redux";
import { userReducer } from "../reducers/userReducer";
import { donationReducer } from "../reducers/donationReducers";
import donationRequestReducer from "../reducers/donationRequestsReducers";
import approvalReducers from "../reducers/approvalReducers";

const rootReducer = combineReducers({
  users: userReducer,
  donations: donationReducer,
  donationRequests: donationRequestReducer,
  approvals: approvalReducers,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
