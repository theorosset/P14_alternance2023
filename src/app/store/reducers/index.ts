import { combineReducers } from "redux";
import { employeReducer } from "./user.reducer";
import { EmployeState } from "./user.reducer"

export interface RootState {
    userReducer: EmployeState;
}


export default combineReducers({
    employeReducer,
})