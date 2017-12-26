const dynamoInstance = require('./dynamodb');
const dynamoPromise = require('./dynamoPromise');

const TABLE = 'users';

/**
 * Get user information from Dynamo DB.
 * @param {string} loginName
 */
var getUser = function (loginName) {
    let params = {
        TableName: TABLE,
        Key: {
            "loginName": {
                S: loginName
            }
        }
    }
    var request = dynamoInstance.dynamodb.getItem(params);
    request.send();
    return dynamoPromise(request);
}

/**
 * Register user information to Dynamo DB.
 *
 * @param {string} loginId
 * @param {string} password
 * @param {string} lastName
 * @param {string} firstName
 */
var addUser = function (loginName, password, lastName, firstName) {
    let params = {
        TableName: TABLE,
        Item: {
            "loginName": loginName,
            "password": password,
            "lastName": lastName,
            "firstName": firstName
        }
    }

    var request = dynamoInstance.docClient.put(params);
    request.send();
    return dynamoPromise(request);
}

module.exports = {
    getUser: getUser,
    addUser: addUser
}