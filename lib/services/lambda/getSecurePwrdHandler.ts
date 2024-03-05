// import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";


// async function getSecurePwrdHandler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
//     let response: APIGatewayProxyResult;

//     try {
//         switch (event.httpMethod) {
//             case 'GET':

//             default:
//                 break;
//         }
//     } catch (error) {
//         console.error(error)

//         if (error instanceof MissingFieldError) {
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify(error.message)
//             }
//         }

//         if (error instanceof JSONError) {
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify(error.message)
//             }
//         }

//         return {
//             statusCode: 500,
//             body: JSON.stringify(error.message)
//         }
//     }
   
//     // addCorsHeader(response)
//     return response;

// }

// export {getSecurePwrdHandler}
