const dynamoInstance = require('./dynamodb');
const dynamoPromise = require('./dynamoPromise');

const TABLE = 'claim';

/**
 * Get all of claims belong to login user.
 *
 * @param {string} loginName
 */
var getClaimList = function (loginName) {
    var params = {
        TableName: TABLE,
        IndexName: 'loginName-index',
        KeyConditionExpression: "#loginName = :loginName",
        ExpressionAttributeNames: {
            "#loginName": "loginName"
        },
        ExpressionAttributeValues: {
            ":loginName": loginName
        }
    };

    var request = dynamoInstance.docClient.query(params);
    request.send();
    return dynamoPromise(request);
}

/**
 * Add a claim record.
 *
 * @param {string} category
 * @param {string} content
 * @param {string} loginName
 * @param {string} name
 * @param {string} status
 *
 */
var addClaim = function (id, category, content, loginName, name, status) {
    let params = {
        TableName: TABLE,
        Item: {
            "id" : Number(id),
            "category": category,
            "content": content,
            "loginName": loginName,
            "name": name,
            "status": status
        }
    }

    var request = dynamoInstance.docClient.put(params);
    request.send();
    return dynamoPromise(request);
}

module.exports = {
    addClaim: addClaim,
    getClaimList: getClaimList
}