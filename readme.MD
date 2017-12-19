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

1. login (GET)<br>
send the username & password to verify.
```
http://localhost:8080/login?username=test&password=test
```

2. get category (GET)<br>
get the category.
```
http://localhost:8080/getStatus?category=A
```

3. Register user (POST)<br>
Register a user.
```
http://localhost:8080/addUser?id=xxx&password=yyy&firstName=Fname&lastName=Lname
```

4. Add claim (POST)<br>
Add a claim record.
```
http://localhost:8080/addClaim?loginName=a&id=b&catetory=c&name=d&content=e
```

5. get claim list (GET)<br>
Get all of claims belong to the longin user.
```
http://localhost:8080/getClaimList?loginName=xxx
```
