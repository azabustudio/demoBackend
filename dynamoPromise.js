/**
 * @param {Function} f
 * @param {string} message
 */
var applyCallBack = function (f, message, args) {
    console.log(message);
    f.apply(null, args);
}

/**
 * @param {AWS.Request} awsRequest
 */
module.exports = function (awsRequest) {
    console.log('Request send!');
    return {
        ok: function (f) {
            awsRequest
                .on('success', res => applyCallBack(f, 'request success', [res.data]))
            return this;
        },
        fail: function (f) {
            awsRequest
                .on('fail', res => applyCallBack(f, 'request error', [res]))
            return this;
        },
        always: function (f) {
            awsRequest
                .on('complete', res => applyCallBack(f, 'request complete', [res]));
            return this;
        }
    };
}