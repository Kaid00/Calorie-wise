
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { genPassword } from "./utils/gen_pwrd";

export async function getPassword(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    if(event.queryStringParameters) {
        let special: Boolean = true
        let number: Boolean = true
        let upper: Boolean = true
        if (event.queryStringParameters['special'] == 'off') {
            special = false
        }

        if (event.queryStringParameters['number'] == 'off') {
            number = false
        }
        if (event.queryStringParameters['upper'] == 'off') {
            upper = false
        }

        const length: number = event.queryStringParameters['length'] as unknown as number

        return {
            statusCode: 200,
            body: JSON.stringify({
                status: 'successful and has params',
                password: genPassword(number, special, length, upper),
                params: `special: ${event.queryStringParameters['special']} \n number: ${event.queryStringParameters['number']}, upper: ${event.queryStringParameters['upper']}, length: ${event.queryStringParameters['length']}`
            })
        }
    
    } 

    // const result = genPassword()
    return {
        statusCode: 200,
        body: JSON.stringify({
            status: 'successful',
            password: genPassword()
        })
    }

    
}