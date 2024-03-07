import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
    lambdaIntegration: LambdaIntegration
}

export class ApiStack extends Stack {
    constructor(scope: Construct, id: string, props?: ApiStackProps) {
        super(scope, id, props)

        // Password generator API
        const passwordGenApi = new RestApi(this, 'passwordGenApi');
        const securePwrdResource = passwordGenApi.root.addResource('passwordgenerator')
        securePwrdResource.addMethod('GET', props?.lambdaIntegration)

        // Calorie counter API
        // const calorieApi = new RestApi(this, 'calorieApi');
        // const calorieResource = passwordGenApi.root.addResource('dailycalorie')

    }
}