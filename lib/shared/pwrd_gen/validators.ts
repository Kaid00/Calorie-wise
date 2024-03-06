import { PwrdGenRequestModel } from "../../services/model/pwrd_gen_model";


export class JSONError extends Error {
    
}

export class NoContentSpecChoosenError extends Error {
    constructor(missingField: string) {
        super(`There is no content specification choosen for the password. Set one of the parameters ${missingField} ON and try again`)
    }
}

export function validatePasswordEntry(arg: any) {
    if ((arg as PwrdGenRequestModel).upper == 'off' && (arg as PwrdGenRequestModel).lower == 'off' && (arg as PwrdGenRequestModel).special == 'off' && (arg as PwrdGenRequestModel).number == 'off')  {
        throw new NoContentSpecChoosenError('password')
    }
}