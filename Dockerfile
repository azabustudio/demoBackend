FROM node:carbon

WORKDIR /usr/src/app
COPY . .
ADD ~/.aws ~/.aws

CMD node app.js