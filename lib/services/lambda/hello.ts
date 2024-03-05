// exports.main = async function (event, context) {
//   return {
//     statusCode: 200,
//     body: JSON.stringify("Hello from password stuffs lambda"),
//   };
// };



async function passwordHandler(){
    return {
        statusCode: 200,
        body: JSON.stringify("Hello from password stuffs lambda"),
      };
    
}

export {passwordHandler}