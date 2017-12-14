/**
 * @param {AWS.Request} awsRequest
 */
module.exports = function (awsRequest) {
    awsRequest.send();
    console.log('Request send!');
    return {
        ok: function (f) {
            awsRequest
                .on('success', function (res) {
                    console.log('request success!');
                    f.apply(null, [null, res.data]);
                })
                .on('error', function (res) {
                    console.log('request error!');
                    f.apply(null, [res, null]);
                })
                .on('complete', function () {
                    console.log('request complete!');
                });
        }
    };
}