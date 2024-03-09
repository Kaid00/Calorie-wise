import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { getDailyCalories } from "./lambda/get_daily_cal";

async function calorieHandler(event: APIGatewayProxyEvent, context: Context){

  let response: APIGatewayProxyResult;

  try {
    switch (event.httpMethod) {
      case 'GET':
        const getResponse = await getDailyCalories(event)
        response = getResponse
        break
      default:
        response = {
          statusCode: 404,
          body: JSON.stringify("Invalid method"),
        }
          break;
   }
  } catch (error) {
      console.error(error)

      return {
          statusCode: 500,
          body: JSON.stringify('Error occured')
      }
  }
   return response;
    
}

export {calorieHandler}