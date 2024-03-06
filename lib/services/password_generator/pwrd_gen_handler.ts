import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

async function passwordGenHandler(event: APIGatewayProxyEvent, context: Context){


    switch (event.httpMethod) {
        case 'GET':

        default:
            break;
    }

    const response: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify("Hello from password stuffs lambda"),
    }
    return response;
    
}

export {passwordGenHandler}