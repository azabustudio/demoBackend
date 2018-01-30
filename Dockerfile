FROM node:carbon

WORKDIR /usr/src/app
COPY . .
COPY .aws /home/node/.aws

CMD node app.js