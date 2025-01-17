import { combineReducers } from "redux";
import { userReducer } from "../reducers/userReducer";

const rootReducer = combineReducers({ users: userReducer });
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
