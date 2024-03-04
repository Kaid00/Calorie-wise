import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep, ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { PipelineStage } from '../stage/pipeline_stage';


export class CwCiCdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);



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


   const devPipeline = new CodePipeline(this, 'DEV-CalorieWisePipeline', {
    pipelineName: 'Dev-CW-Pipeline',
    synth: new ShellStep('Synth', {
      input: CodePipelineSource.gitHub('Kaid00/Calorie-wise', 'development'),
      commands: [
        'npm ci',
        'npx cdk synth'
      ],   
    })
   })

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

  const productionStage = devPipeline.addStage(new PipelineStage(this, 'PipelineDevStage', {
    stageName: 'dev'
  }));

  productionStage.addPre(new ManualApprovalStep('Manual approval before development'))




  }
}
