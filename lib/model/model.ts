

export interface PwrdGenRequestModel {
    length?: string, // Default 15
    upper?: string, // on or off
    repeat?:number, // max 9
    special?:string, // on or off
    number?: string,
}

export interface CalorieCalModel {
    age: number,
    height: number,
    weight: number,
    gender: string,
    activitylevel: number  // on a scale of 1 to 6
}