import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { getPassword } from "./lambda/get_pwrd";

async function passwordGenHandler(event: APIGatewayProxyEvent, context: Context){

  let response: APIGatewayProxyResult;

  try {
    switch (event.httpMethod) {
      case 'GET':
        const getResponse = await getPassword(event)
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

export {passwordGenHandler}