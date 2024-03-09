import { PwrdGenRequestModel } from "../model/model";
import { CalorieCalModel } from "../model/model";


export class JSONError extends Error {
    
}

export class NoContentSpecChoosenError extends Error {
    constructor(missingField: string) {
        super(`There is no content specification choosen for the password. Set one of the parameters ${missingField} ON and try again`)
    }
}

export class MissingCalField extends Error {
    constructor(missingField: string) {
        super(`Value for ${missingField} expected`)
    }
}

export class InvalidFieldValue extends Error {
    constructor(missingField: string) {
        super(`Value for ${missingField} is invalid, it should be either "male" or "female" `)
    }
}

export function validatePasswordEntry(arg: any) {
    if ((arg as PwrdGenRequestModel).upper == 'off' && (arg as PwrdGenRequestModel).special == 'off' && (arg as PwrdGenRequestModel).number == 'off')  {
        throw new NoContentSpecChoosenError('password')
    }
}

export function validateCalorieCalEntry(arg: any) {


    if ((arg as CalorieCalModel).age == undefined) {
        throw new MissingCalField('age')
    }

    if ((arg as CalorieCalModel).height == undefined) {
        throw new MissingCalField('height')
    }

    if ((arg as CalorieCalModel).weight == undefined) {
        throw new MissingCalField('weight')
    }

    if ((arg as CalorieCalModel).gender == undefined) {
        throw new MissingCalField('gender')
    }

    if ((arg as CalorieCalModel).gender != 'male' || (arg as CalorieCalModel).gender != 'female' ) {
        throw new InvalidFieldValue('gender')
    }

    if ((arg as CalorieCalModel).activitylevel > 6 || (arg as CalorieCalModel).activitylevel < 1 ) {
        throw new InvalidFieldValue('activitylevel')
    }

}