import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaFunction } from "aws-cdk-lib/aws-events-targets";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { join } from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";



export class LambdaStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props) 

      
         new NodejsFunction(this, 'helloLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'hello.main',
            entry: (join(__dirname, '..' ,'services', 'lambda', 'hello.js')),
         
        })
   
    }
}