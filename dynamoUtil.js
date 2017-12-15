const dynamoKeyWords = ["S", "N", "SS", "NS", "BS", "M"]

/**
 * @param {Object} dynamoData
 * @return {Object}
 */
var simplify = function (dynamoData) {
    console.log('handling :' + dynamoData);
    if (typeof dynamoData !== 'object') {
        console.log('returning:' + dynamoData);
        return dynamoData;
    } else {
        let keys = Object.keys(dynamoData);
        if (keys.length === 1 && dynamoKeyWords.indexOf(keys[0]) !== -1) {
            console.log('find ' + keys[0] + ' is ' + dynamoData[keys[0]]);
            return dynamoData[keys[0]]
        } else {
            keys.forEach(key => {
                dynamoData[key] = simplify(dynamoData[key]);
            });
            return dynamoData;
        }
    }
};

module.exports.simplify = simplify;