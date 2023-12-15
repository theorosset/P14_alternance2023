import { employeModel } from "../../models/employeModels"
export interface EmployeState {
  employe: employeModel
  allEmploye: employeModel[]
}



const initialState: EmployeState = {
  employe: {
    firstName: '',
    lastName: '',
    birthday: '',
    city: '',
    street: '',
    state: '',
    zipcode: null,
    departmentWork: '',
  },
  allEmploye: []
   
};
export const employeReducer = (state = initialState, action: any) => {
  switch (action.type) {
     
    case "SET_PROFILE_INFORMATION": 
      return {...state, employe: {...state.employe, ...action.payload}}

    case "SET_NEW_EMPLOYE": {
      const newEmployee = action.payload
      const updatedAllEmploye = [...state.allEmploye, newEmployee]

      return { ...state, allEmploye: updatedAllEmploye }
    }
    default:
      return state;
    }
};

