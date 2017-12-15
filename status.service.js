const dynamodb = require('./dynamodb');
const dynamoPromise = require('./dynamoPromise');

const TABLE = 'status';

/**
 * @param {string} loginName
 */
var getStatus = function (category) {
    const params = {
        TableName: TABLE,
        Key: {
            "category": {
                S: category
            }
        }
    }
    var request = dynamodb.getItem(params);
    request.send();
    return dynamoPromise(request);
}

module.exports.getStatus = getStatus;