

export interface PwrdGenRequestModel {
    length?: string, // Default 15
    upper?: string, // on or off
    lower?: string, // on or off
    repeat?:number, // max 9
    special?:string, // on or off
    number?: string
}