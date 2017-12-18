const AWS = require('aws-sdk');
const REGION = "us-east-2"
const ENDPOINT = "https://dynamodb." + REGION + ".amazonaws.com";


AWS.config.update({
    region: REGION,
    endpoint: ENDPOINT
});

const dynamodb = new AWS.DynamoDB();
const docClient  = new AWS.DynamoDB.DocumentClient();

module.exports = {
    dynamodb: dynamodb,
    docClient: docClient
}