
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { genPassword } from "./utils/gen_pwrd";

export async function getPassword(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    if(event.queryStringParameters) {
        let special: Boolean = true
        let number: Boolean = true
        let upper: Boolean = true
        let length: number = 15
        let passwords: string[] = []
        if (event.queryStringParameters['special'] == 'off') {
            special = false
        }

        if (event.queryStringParameters['number'] == 'off') {
            number = false
        }
        if (event.queryStringParameters['upper'] == 'off') {
            upper = false
        }

        if (event.queryStringParameters['length'] as unknown as number) {
            length = event.queryStringParameters['length'] as unknown as number
        }

        if (event.queryStringParameters['repeat'] as unknown as number > 1) {
           let repeat = event.queryStringParameters['repeat'] as unknown as number
            for (let i = 0; i < repeat + 1; i++) {
                passwords.push(genPassword(number, special, length, upper))
            }

            return {
                statusCode: 200,
                body: JSON.stringify({
                    status: 'successful',
                    password: passwords,
                })
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                status: 'successful',
                password: genPassword(number, special, length, upper),
                params: `special: ${event.queryStringParameters['special']} \n number: ${event.queryStringParameters['number']}, upper: ${event.queryStringParameters['upper']}, length: ${event.queryStringParameters['length']}`
            })
        }
    
    } 

    return {
        statusCode: 200,
        body: JSON.stringify({
            status: 'successful',
            password: genPassword()
        })
    }

    
}