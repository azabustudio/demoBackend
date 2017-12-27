const express = require('express');
const qs = require('querystring');
const fs = require('fs');
const url = require('url');
const userService = require('./user.service');
const statusService = require('./status.service');
const claimService = require('./claim.service');
const dynamoUtil = require('./dynamoUtil');
const querystring = require('querystring');
const argv = require('minimist')(process.argv.slice(2));
const bodyParser = require('body-parser');

// default 8080
const PORT = process.argv[2] || 8080;
const app = express();
const subpath = express();

app.use(bodyParser());
app.use('/v1', subpath);
const swagger = require('swagger-node-express').createNew(subpath);

app.use(express.static('dist'));

swagger.setApiInfo({
    title: 'demo API',
    description: 'the API of demo',
    termsOfServiceUrl: '',
    contact: 'azabuStudio9@gmail.com',
    licence: 'MIT',
    licenseUrl: ''
});
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

swagger.configureSwaggerPaths('', 'api-docs', '');

const domain = 'localhost';
if (argv.domain != undefined) {
    domain = argv.domain
} else {
    console.log('No --domain=xxx specified, taking default hostname "localhost".');
}

var applicationUrl = 'http://localhost:' + PORT;
console.log('snapJob API running on ' + applicationUrl);

swagger.configure(applicationUrl, '1.0.0');

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

app.post('/addUser', function (req, res) {

    console.log('Start adding user.');
    let rawData = '';
    req.on('data', function (chunk) {
        rawData += chunk;
    });

    req.on('end', function () {
        let usrInfo = JSON.parse(rawData);

        userService.addUser(usrInfo.loginName, usrInfo.password, usrInfo.lastName, usrInfo.firstName)
            .ok(data => {
                res.send({
                    status: 'success'
                })
                console.log('Adding a user successfully.');
            })
            .fail(res => res.send({
                status: 'failed',
                content: res
            }));
    });
});

app.get('/getClaimList', function (req, res) {

    console.log('Start getting claim list.');

    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;

    claimService.getClaimList(query.loginName)
        .ok(data => {
            res.send({
                status: 'success',
                content: dynamoUtil.simplify(data.Items)
            })
            console.log('Getting claim list successfully.');
        })
        .fail(res => res.send({
            status: 'failed',
            content: res
        }));
});

app.post('/addClaim', function (req, res) {
    console.log('Start adding a claim record.');

    let rawData = '';
    req.on('data', function (chunk) {
        rawData += chunk;
    });

    req.on('end', function () {
        let claim = JSON.parse(rawData);
        console.log(claim);
        claimService.addClaim(claim.category, claim.content, claim.loginName, claim.name, claim.status)
            .then(data => {
                res.send({
                    status: 'success',
                    claim: data.Item
                })
                console.log('Adding a claim record successfully.');
            })
            .catch(res => res.send({
                status: 'failed',
                content: res
            }));
    });
});

app.get('/removeClaim', function (req, res) {

    console.log('Start removing claim');

    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;

    console.log(query.loginName);
    claimService.removeClaim(query.claimId)
        .ok(data => {
            res.send({
                status: 'success'
            })
            console.log('removed claim successfully.');
        })
        .fail(res => res.send({
            status: 'failed',
            content: res
        }));
});

app.post('/updateClaim', function (req, res) {

    let rawData = '';
    req.on('data', function (chunk) {
        rawData += chunk;
    });

    req.on('end', function () {
        let claim = JSON.parse(rawData);
        console.log(claim);
        console.log(`Start updating a claim record.`);
        claimService.updateClaim(claim)
            .ok(data => {
                res.send({
                    status: 'success'
                })
                console.log('updated a claim record successfully.');
            })
            .fail(res => res.send({
                status: 'failed',
                content: res
            }));
    });
});

app.get('/updateClaimStatus', function (req, res) {

    console.log('Start updating claim status');

    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;

    let status = query.status;

    console.log(query.claimId);
    claimService.updateStatus(query.claimId, status)
        .ok(data => {
            res.send({
                status: 'success'
            })
            console.log('claim status updated successfully');
        })
        .fail(res => res.send({
            status: 'failed',
            content: res
        }));
});

app.get('/activateClaim', function (req, res) {

    console.log('Start activating claim status');

    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;

    let active = query.active;

    console.log(query.claimId);
    claimService.activateClaim(query.claimId, active)
        .ok(data => {
            res.send({
                status: 'success'
            });
        })
        .fail(res => res.send({
            status: 'failed',
            content: res
        }));
});


app.listen(PORT, _ => {
    console.log(`listening at port:${PORT}`);
});