
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { calculateDailyCalorieRequirement } from "./utils/cal_cal_req";


export async function getDailyCalories(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    if(event.queryStringParameters) {
        const age: number = event.queryStringParameters['age'] as unknown as number
        const height: number = event.queryStringParameters['height']  as unknown as number
        const weight: number = event.queryStringParameters['weight']  as unknown as number
        const gender: string = event.queryStringParameters['gender']  as unknown as string
        const activitylevel: number = event.queryStringParameters['activitylevel']  as unknown as number

        return {
            statusCode: 200,
            body: JSON.stringify({
                status: 'successful',
                data: calculateDailyCalorieRequirement(age, height, weight, gender, activitylevel)
            })
        }
    
    } 
        return {
            statusCode: 404,
            body: JSON.stringify({
                status: 'failed',
                password: 'Provide parameters to calculate',
            })
        }
    

    

    
}

