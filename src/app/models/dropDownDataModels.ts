export interface dropDownDataModels {
    state: stateData[]
    department: departmentData[]
}

export type stateData = {
    id: number,
    name: string,
    abbreviation: string
}

export type departmentData = {
    id: number,
    name: string,
}