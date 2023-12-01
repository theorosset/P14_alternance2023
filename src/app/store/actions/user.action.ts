import { Dispatch } from 'redux'
import { RootState } from '../reducers'

//Multi actions for set profile 
export const SET_PROFILE_ADRESS = 'SET_PROFILE_ADRESS'
export const SET_PROFILE_INFORMATION = 'SET_PROFILE_INFORMATION'

export const setStateEmploye = (state: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: SET_PROFILE_ADRESS, payload: { state } })
    
  }
}

export const setDepartmentEmploye = (department: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: SET_PROFILE_INFORMATION, payload: { departmentWork: department } })
  }
}

export const setProfileEmploye = (info: any) => {
  return async (dispatch: Dispatch) => {
    if(info.firstName) {
      dispatch({ type: SET_PROFILE_INFORMATION, payload: info})
    }
    if(info.city) {
      dispatch({ type: SET_PROFILE_ADRESS, payload: info})
    }
  }
}

export const SET_NEW_EMPLOYE = 'SET_NEW_EMPLOYE'

export const setNewEmploye = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { ...keyUse } = getState().employeReducer.employe;
      dispatch({ type: 'SET_NEW_EMPLOYE', payload: { employe: keyUse } })
  }
}
