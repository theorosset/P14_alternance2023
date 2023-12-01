export interface employeModel {
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

export interface employeInformationModel {
    firstName: string,
    lastName: string,
    birthday: string,
    departmentWork: string
}
export interface employeAdressModel {
        city: string,
        street: string,
        state: string,
        zipcode: number | null
}