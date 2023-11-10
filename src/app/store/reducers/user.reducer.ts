

export interface EmployeState {
    email: string,
    token: string,
    firstName: string,
    lastName: string,
    birthday: string,
    adress: {
      city: string,
      street: string,
      state: string,
      zipcode: number | null
    },
    departmentWork: string
}



const initialState: EmployeState = {
    email: '',
    firstName: '',
    lastName: '',
    token: '',
    birthday: '',
    adress: {
      city: '',
      street: '',
      state: '',
      zipcode: null
    },
    departmentWork: ''
};

export const employeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

