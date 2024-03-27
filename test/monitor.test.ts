import { SNSEvent } from "aws-lambda";
import { monitorHandler } from "../lib/services/monitor/monitor_handler";


const snsEvent: SNSEvent = {
    Records: [{
        Sns: {
            Message: 'This is a test'
        }
    }]
} as any;

monitorHandler(snsEvent)