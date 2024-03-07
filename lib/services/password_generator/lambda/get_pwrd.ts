
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { genPassword } from "./utils/gen_pwrd";

export async function getPassword(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    if(event.queryStringParameters) {
        const special = event.queryStringParameters['special']
        const number = event.queryStringParameters['number']
        const upper = event.queryStringParameters['upper']
        const lower = event.queryStringParameters['lower']
        const length = event.queryStringParameters['length']


    } 

    const result = genPassword()
    return {
        statusCode: 200,
        body: JSON.stringify({
            status: 'successful',
            password: result
        })
    }
}