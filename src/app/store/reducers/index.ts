import { combineReducers } from "redux";
import { employeReducer } from "./user.reducer";
import { EmployeState } from "./user.reducer"

export interface RootState {
    employeReducer: EmployeState;
}


export default combineReducers({
    employeReducer,
})