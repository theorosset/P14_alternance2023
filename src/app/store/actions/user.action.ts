import { Dispatch } from 'redux'

export const SET_PROFILE = 'SET_PROFILE'

export const setStateEmploye = (state: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: 'state', payload: { state } })
  }
}

export const setDepartmentEmploye = (department: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: 'department', payload: { departmentWork: department } })
  }
}

