import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaStack } from "../stacks/lambda_stack";


export class PipelineStage extends Stage {
    constructor(scope: Construct, id: string, props: StageProps) {
        super(scope, id, props)

        const lambdaStack = new LambdaStack(this, 'testLambdaStack')
      
      


    }
}