const express = require('express');
const fs = require('fs');
const url = require('url');
const app = express();
const PORT = 80;

app.get('/login', function (req, res) {
    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;
    fs.readFile('./users.json', function (err, rawUsers) {
        if (err) {
            console.log(err);
            return;
        } else {
            var users = JSON.parse(rawUsers);
            var loginUser = users.find(function (user) {
                return user.loginName === query.username &&
                    user.password === query.password;
            });
            if (loginUser) {
                res.send({
                    status: 'sucess',
                    user: loginUser
                });
            } else {
                res.send({
                    status: 'failed',
                });
            }
        }

    });
});

app.get('/getCategory', function (req, res) {
    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;
    fs.readFile('./claimTypes.json', function (err, rawCategories) {
        if (err) {
            console.log(err);
            return;
        } else {
            let inputCategory = query.category;
            let categories = JSON.parse(rawCategories);
            res.send({
                status: categories[inputCategory] ? 'success' : 'failed',
                content: categories[inputCategory]
            });
        }
    });
});

app.listen(PORT, _ => {
    console.log(`listening at port:${PORT}`);
});