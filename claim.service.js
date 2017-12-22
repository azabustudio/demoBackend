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
        KeyConditionExpression: '#loginName = :loginName',
        ExpressionAttributeNames: {
            '#loginName': 'loginName'
        },
        ExpressionAttributeValues: {
            ':loginName': loginName
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
            "id": Number(id),
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

var removeClaim = function (id) {
    let params = {
        TableName: TABLE,
        Key: {
            'id': id
        }
    }
    var request = dynamoInstance.docClient.delete(params);
    request.send();
    return dynamoPromise(request);
}

/**
 *
 * @param {Claim} claimData
 */
var updateClaim = function (claimData) {
    let params = {
        TableName: TABLE,
        Key: {
            'id': Number(claimData.id)
        },
        UpdateExpression: 'set #name=:n, #content=:c, #category=:t',
        ExpressionAttributeNames: {
            '#name': 'name',
            '#content': 'content',
            '#category': 'category'
        },
        ExpressionAttributeValues: {
            ':r': claimData.name,
            ':c': claimData.content,
            ':t': claimData.catetory
        }
    }
    var request = dynamoInstance.docClient.update(params);
    request.send();
    return dynamoPromise(request);
}

var updateStatus = function (claimId, status) {
    let params = {
        TableName: TABLE,
        Key: {
            id: Number(claimId)
        },
        ExpressionAttributeNames: {
            '#status': 'status'
        },
        ExpressionAttributeValues: {
            ':s': status,
        },
        UpdateExpression: 'set #status = :s'

    };
    console.log(claimId + status);
    console.log(params);
    var request = dynamoInstance.docClient.update(params);
    request.send();
    return dynamoPromise(request);
}

module.exports = {
    addClaim: addClaim,
    getClaimList: getClaimList,
    removeClaim: removeClaim,
    updateClaim: updateClaim,
    updateStatus: updateStatus
}