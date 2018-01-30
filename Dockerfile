FROM node:carbon

WORKDIR /usr/src/app
COPY . .
COPY .aws /home/node/.aws

USER node
CMD node app.js