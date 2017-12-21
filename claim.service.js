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
 * @param claimData
 *
 */
var addClaim = function (loginName, id, catetory, name, content) {
    let params = {
        TableName: TABLE,
        Item: {
            "loginName": loginName,
            "id": id,
            "catetory": catetory,
            "name": name,
            "content": content
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