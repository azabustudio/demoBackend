const express = require('express');
const fs = require('fs');
const url = require('url');
const app = express();
const userService = require('./user.service');
const statusService = require('./status.service');
const dynamoUtil = require('./dynamoUtil');
// default 8080
const PORT = process.argv[2] || 8080;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/getStatus', function (req, res) {
    console.log('start getting status');
    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;
    statusService.getStatus(query.category)
        .ok(data => res.send({
            status: 'success',
            content: dynamoUtil.simplify(data.Item).status
        }))
        .fail(res => res.send({
            status: 'failed',
            content: res
        }));
});

app.get('/login', function (req, res) {
    console.log('start logging in');
    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;
    userService.getUser(query.username)
        .ok(data => res.send({
            status: (data.Item && data.Item.password.S === query.password) ? 'success' : 'failed',
            user: dynamoUtil.simplify(data.Item)
        }))
        .fail(err => res.send(err));
});

app.listen(PORT, _ => {
    console.log(`listening at port:${PORT}`);
});