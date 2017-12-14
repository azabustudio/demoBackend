# Simple API for http request

## 1. How to Install
```
git clone git@github.com:azabustudio/demoBackend.git
cd demoBackend
npm install
```

## 2. How to Run
### start the server
```
cd demoBackend
node app.js [port]
```
The server listens to the port `8080` at default.
You can change the listenning port by give the start command an optional parameter `port`.

### send a request
there are two kinds of requests

1. login
send the username & password to verify.
```
http://localhost:8080/login?username=test&password=test
```

2. get category
get the category.
```
http://localhost:8080/getCategory?category=A
```