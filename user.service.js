const dynamodb = require('./dynamodb');
const dynamoPromise = require('./dynamoPromise');

const TABLE = 'users';

/**
 * @param {string} loginName
 */
var getUser = function (loginName) {
    const params = {
        TableName: TABLE,
        Key: {
            "loginName": {
                S: loginName
            }
        }
    }
    var request = dynamodb.getItem(params);
    return dynamoPromise(request);
}

module.exports.getUser = getUser;