FROM node:carbon

WORKDIR /usr/src/app
COPY . .
COPY ~/.aws ~/.aws

CMD node app.js