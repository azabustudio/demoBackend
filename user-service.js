const AWS = require('aws-sdk');
const REGION = "us-east-2"
const ENDPOINT = "https://dynamodb." + REGION + ".amazonaws.com";


AWS.config.update({
    region: REGION,
    endpoint: ENDPOINT
});

var dynamodb = new AWS.DynamoDB();

var params = {
    Key: {
        "id": {
            N: "1"
        }
    },
    TableName: "status"
}

dynamodb.getItem(params, (err, data) => {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
});