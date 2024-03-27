import { SNSEvent } from "aws-lambda";

// Slack webhook URL for sending alerts
const slackWebHookUrl = "https://hooks.slack.com/services/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"
// Lambda function handler for monitoring AWS resources
async function monitorHandler(event: SNSEvent) {
    for(const record of event.Records) {
        
        // Send a message to Slack channel using the webhook URL
        await fetch(slackWebHookUrl, {
            method: 'POST',
            body: JSON.stringify({
                "text": `${record.Sns.Message}`
            })
        })
    }
}

export { monitorHandler }