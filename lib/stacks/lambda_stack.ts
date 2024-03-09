import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaFunction } from "aws-cdk-lib/aws-events-targets";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { join } from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";



export class LambdaStack extends Stack {
    public readonly pwrdlambdaIntegration: LambdaIntegration
    public readonly calorieLambdaIntegration: LambdaIntegration
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props) 

      
        const pwrdGenLambda =  new NodejsFunction(this, 'passwordGenLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'passwordGenHandler',
            entry: (join(__dirname, '..' ,'services', 'password_generator', 'pwrd_gen_handler.ts')),
         
        })

        const calorieLambda =  new NodejsFunction(this, 'calorieLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'calorieHandler',
            entry: (join(__dirname, '..' ,'services', 'calorie_calculator', 'calorie_handler.ts')),
         
        })

        this.pwrdlambdaIntegration = new LambdaIntegration(pwrdGenLambda)
        this.calorieLambdaIntegration = new LambdaIntegration(calorieLambda)

   
    }
}