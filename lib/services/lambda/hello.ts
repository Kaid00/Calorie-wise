import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";


async function passwordHandler(event: APIGatewayProxyEvent, context: Context){
    const response: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify("Hello from password stuffs lambda"),
    }
    return response;
    
}

export {passwordHandler}