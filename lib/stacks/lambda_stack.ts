import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaFunction } from "aws-cdk-lib/aws-events-targets";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { join } from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";



export class LambdaStack extends Stack {
    public readonly pwrdlambdaIntegration: LambdaIntegration
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props) 

      
        const pwrdGenLambda =  new NodejsFunction(this, 'passwordGenLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'passwordHandler',
            entry: (join(__dirname, '..' ,'services', 'password_generator', 'pwrd_gen_handler.ts')),
         
        })

        this.pwrdlambdaIntegration = new LambdaIntegration(pwrdGenLambda)
   
    }
}