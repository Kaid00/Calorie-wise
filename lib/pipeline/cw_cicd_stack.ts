import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { PipelineStage } from '../stage/pipeline_stage';


export class CwCiCdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

  // PRODUCTION PIPELINE
   const prodPipeline = new CodePipeline(this, 'PRODCalorieWisePipeline', {
    pipelineName: 'Production-CW-Pipeline',
    synth: new ShellStep('Synth', {
      input: CodePipelineSource.gitHub('Kaid00/Calorie-wise', 'master'),
      commands: [
        'npm ci',
        'npx cdk synth'
      ],   
    })
   })

   const testPipeline = new CodePipeline(this, 'TEST-CalorieWisePipeline', {
    pipelineName: 'Test-CW-Pipeline',
    synth: new ShellStep('Synth', {
      input: CodePipelineSource.gitHub('Kaid00/Calorie-wise', 'staging'),
      commands: [
        'npm ci',
        'npx cdk synth'
      ],   
    })
   })


   new CodePipeline(this, 'DEV-CalorieWisePipeline', {
    pipelineName: 'Dev-CW-Pipeline',
    synth: new ShellStep('Synth', {
      input: CodePipelineSource.gitHub('Kaid00/Calorie-wise', 'development'),
      commands: [
        'npm ci',
        'npx cdk synth'
      ],   
    })
   })


  }
}
