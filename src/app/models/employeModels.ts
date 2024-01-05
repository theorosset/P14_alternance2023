export type employeModel = {
    firstName: string,
    lastName: string,
    birthday: string,
    city: string,
    street: string,
    state: string,
    startDate: string,
    zipcode: number | null
    departmentWork: string
}

export interface employeInformationModel {
    firstName: string,
    lastName: string,
    birthday: string,
    startDate: string,
    departmentWork: string
}
export interface employeAdressModel {
    city: string,
    street: string,
    state: string,
    zipcode: number | null
}