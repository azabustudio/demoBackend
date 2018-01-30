const dynamoInstance = require('./dynamodb');
const dynamoPromise = require('./dynamoPromise');
const global = require('./global');

const TABLE = 'status' + global.table_suffix;

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
    var request = dynamoInstance.dynamodb.getItem(params);
    request.send();
    return dynamoPromise(request);
}

module.exports.getStatus = getStatus;