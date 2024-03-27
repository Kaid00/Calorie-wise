import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Alarm, Metric, Unit } from "aws-cdk-lib/aws-cloudwatch";
import { SnsAction } from "aws-cdk-lib/aws-cloudwatch-actions";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Topic } from "aws-cdk-lib/aws-sns";
import { LambdaSubscription } from "aws-cdk-lib/aws-sns-subscriptions";
import { Construct } from "constructs";
import { join } from "path";


export class MonitorStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) { 
        super(scope, id, props);

        const webhookLambda = new NodejsFunction(this, 'passGenWebHook' , {
            runtime: Runtime.NODEJS_18_X,
            handler: 'monitorHandler',
            entry: (join(__dirname, '..', 'services', 'monitor', 'monitor_handler.ts'))
        })

        // SNS TOPIC
        const passAlarmTopic = new Topic(this, 'PasswordGenApiAlarmTopic', {
            displayName: 'PasswordGenApiAlarmTopic',
            topicName: 'PasswordGenApiAlarmTopic'
        })

        const calAlarmTopic = new Topic(this, 'CalorieApiAlarmTopic', {
            displayName: 'CalorieApiAlarmTopic',
            topicName: 'CalorieApiAlarmTopic'
        })

        // Subscribing toolsFinderWebhookLambda to the SNS Topic
        passAlarmTopic.addSubscription(new LambdaSubscription(webhookLambda));
        calAlarmTopic.addSubscription(new LambdaSubscription(webhookLambda));


        // CloudWatch Alarm for 4XX errors in the API Gateway
        const calorieAPI_4xxAlarm = new Alarm(this, 'calorieAPI_4xxAlarm', {
            metric: new Metric({
                metricName: '4XXError',
                namespace: 'AWS/ApiGateway',
                period: Duration.minutes(1),
                statistic: 'Sum',
                unit: Unit.COUNT,
                dimensionsMap: {
                    "ApiName": "calorieApi"
                }
            }),
            evaluationPeriods: 1,
            threshold: 5,
            alarmName: 'calorieAPI_4xxAlarm'
        });

        const calorieAPI_5xxAlarm = new Alarm(this, 'calorieAPI_5xxAlarm', {
            metric: new Metric({
                metricName: '5XXError',
                namespace: 'AWS/ApiGateway',
                period: Duration.minutes(1),
                statistic: 'Sum',
                unit: Unit.COUNT,
                dimensionsMap: {
                    "ApiName": "calorieApi"
                }
            }),
            evaluationPeriods: 1,
            threshold: 3,
            alarmName: 'calorieAPI_5xxAlarm'
        });

        const passGenAPI_4xxAlarm = new Alarm(this, 'passGenAPI_4xxAlarm', {
            metric: new Metric({
                metricName: '4XXError',
                namespace: 'AWS/ApiGateway',
                period: Duration.minutes(1),
                statistic: 'Sum',
                unit: Unit.COUNT,
                dimensionsMap: {
                    "ApiName": "passwordGenApi"
                }
            }),
            evaluationPeriods: 1,
            threshold: 5,
            alarmName: 'passGenAPI_4xxAlarm'
        });

        const passGenAPI_5xxAlarm = new Alarm(this, 'passGenAPI_5xxAlarm', {
            metric: new Metric({
                metricName: '5XXError',
                namespace: 'AWS/ApiGateway',
                period: Duration.minutes(1),
                statistic: 'Sum',
                unit: Unit.COUNT,
                dimensionsMap: {
                    "ApiName": "passwordGenApi"
                }
            }),
            evaluationPeriods: 1,
            threshold: 3,
            alarmName: 'passGenAPI_5xxAlarm'
        });


        // Create SNS Action
        const calTopicAction = new SnsAction(calAlarmTopic);
        const passGenTopicAction = new SnsAction(passAlarmTopic);


        // Adding SNS Action to the CloudWatch Alarm
        passGenAPI_4xxAlarm.addAlarmAction(passGenTopicAction);
        passGenAPI_4xxAlarm.addOkAction(passGenTopicAction)
        
        calorieAPI_4xxAlarm.addAlarmAction(calTopicAction);
        calorieAPI_4xxAlarm.addOkAction(calTopicAction)

        calorieAPI_5xxAlarm.addAlarmAction(calTopicAction);
        calorieAPI_5xxAlarm.addOkAction(calTopicAction)

        passGenAPI_5xxAlarm.addAlarmAction(calTopicAction);
        passGenAPI_5xxAlarm.addOkAction(calTopicAction)

    }
}