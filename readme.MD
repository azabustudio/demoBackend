# Backend Instruction

Backend provide

## 1. How to Install

  ```cmd
  git clone git@github.com:azabustudio/demoBackend.git
  cd demoBackend
  npm install
  ```

## 2. How to Run

### Start the server

  ```cmd
  cd demoBackend
  node app.js [port]
  ```
The server listens to the port `8080` at default.
You can change the listenning port by give the start command an optional parameter `port`.

### Send a request

**About the response:** as usual, a rest api should return different status code in response. In this project, all the response returns status 200 while they carrying the real status information in the response body. If you are doing some future work on this, please design full response structure.

We describe the REST api refer to [here](https://bocoup.com/blog/documenting-your-api)

1. Get status

    |___Title___|get the status of claim|
    |-:|:-|
    |___URL___|/getStatus?category=:category|
    |___Method___|GET|
    |___URL Params___|**Required:** category=[string]|
    ||**Example:** category=A|

1. Add a claim

    |___Title___|Add a claim record|
    |-:|:-|
    |___URL___|/addClaim|
    |___Method___|POST|
    |||

    ___DATA Params___

    **Example:**
    ```json
    {
        "loginName" : "a",
        "id" : "b",
        "catetory" : "c",
        "name" : "d",
        "content" : "e"
    }
    ```
1. Get claim list

    |___Title___|Get all claims belong to specic user|
    |-:|:-|
    |___URL___|/getClaimList|
    |___Method___|POST|
    |___URL Params___|**Required:** loginName=[string]|
    ||**Example:** loginName=testUser|

1. Update a claim

    |___Title___|Update claim|
    |-:|:-|
    |___URL___|/updateClaim|
    |___Method___|POST|
    |||

    ___DATA Params___

      **Example:**
      ```json
      {
          "id" : "b",
          "catetory" : "c",
          "name" : "d",
          "content" : "e"
      }
      ```
