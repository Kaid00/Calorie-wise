import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaStack } from "../stacks/lambda_stack";
import { ApiStack } from "../stacks/api_stack";
import { MonitorStack } from "../stacks/monitor_stack";


export class PipelineStage extends Stage {
    constructor(scope: Construct, id: string, props: StageProps) {
        super(scope, id, props)

        const lambdaStack = new LambdaStack(this, 'LambdaStack')
        new ApiStack(this, 'ApiStack', {
            lambdaIntegration: lambdaStack.pwrdlambdaIntegration,
            calorieLambdaIntegration: lambdaStack.calorieLambdaIntegration
        })
      
        new MonitorStack(this, 'MonitorStack')
      


    }
}