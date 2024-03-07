import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

async function passwordGenHandler(event: APIGatewayProxyEvent, context: Context){

  let response: APIGatewayProxyResult;

  try {
    switch (event.httpMethod) {
      case 'GET':
        response = {
          statusCode: 404,
          body: JSON.stringify("Invalid method"),
        }
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