const dynamoInstance = require('./dynamodb');
const dynamoPromise = require('./dynamoPromise');

const TABLE = 'claim';
const SEQUENCE_TABLE = 'sequence';

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
var addClaim = function (category, content, loginName, name, status) {
    let params = {
        TableName: TABLE,
        Item: {
            "category": category,
            "content": content,
            "loginName": loginName,
            "name": name,
            "status": 'processing',
            "active": true,
        },
    }

    return new Promise(function (resolve, reject) {
        getNewSequence().then(data => {
            let id = data.Attributes.current_number;
            console.log('new sequence is: ' + id);
            params.Item.id = Number(id);
            var claimRequest = dynamoInstance.docClient.put(params);
            return claimRequest.promise()
                .then(_ => getClaim(id)
                    .then(data => resolve(data))
                    .catch(err => reject(err)))
                .catch(err => console.error(err));
        });
    });
}

var getClaim = function (claimId) {
    let params = {
        TableName: TABLE,
        Key: {
            id: Number(claimId)
        }
    }

    console.log('claim request send: ');
    console.log(params);
    var request = dynamoInstance.docClient.get(params)
    return request.promise();
}

/**
 * @returns {DynamoPromise} dynamoPromise
 */
var getNewSequence = function () {
    let params = {
        TableName: SEQUENCE_TABLE,
        Key: {
            name: TABLE
        },
        UpdateExpression: "set current_number = current_number + :val",
        ExpressionAttributeValues: {
            ":val": 1
        },
        ReturnValues: "UPDATED_NEW"
    }
    var request = dynamoInstance.docClient.update(params);
    return request.promise();
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
            ':n': claimData.name,
            ':c': claimData.content,
            ':t': claimData.category
        }
    }
    var request = dynamoInstance.docClient.update(params);
    request.send();
    return dynamoPromise(request);
}

var activateClaim = function (claimId, active) {
    let params = {
        TableName: TABLE,
        Key: {
            id: Number(claimId)
        },
        ExpressionAttributeNames: {
            '#active': 'active'
        },
        ExpressionAttributeValues: {
            ':a': active,
        },
        UpdateExpression: 'set #active = :a'

    };
    console.log(claimId + active);
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
    updateStatus: updateStatus,
    activateClaim: activateClaim
}