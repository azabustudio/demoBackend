const dynamoInstance = require('./dynamodb');
const dynamoPromise = require('./dynamoPromise');

const TABLE = 'claim';

/**
 * Get all of claims belong to login user.
 * 
 * @param {string} loginName
 */
var getClaimList = function (loginName, claimId) {
    var params = {
        TableName : TABLE,
        KeyConditionExpression: "#loginName = :loginName",
        ExpressionAttributeNames:{
            "#loginName": "loginName"
        },
        ExpressionAttributeValues: {
            ":loginName":loginName
        }
    };

    var request = dynamoInstance.docClient.query(params);
    request.send();
    return dynamoPromise(request);
}

/**
 * Add a claim record.
 * 
 * @param {string} loginName
 * 
 * @param {string} claimId
 * @param {string} claimName
 * @param {string} claimCatetory
 * 
 */
var addClaim = function (loginName, claimId, claimName, claimCatetory) {
    let params = {
        TableName : TABLE,
        Item:{
            "loginName" : loginName,
            "claimId" : claimId,
           "claimCatetory" : claimCatetory,
           "claimName" : claimName
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
