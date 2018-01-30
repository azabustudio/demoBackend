FROM node:carbon

WORKDIR /usr/src/app
COPY . .

USER root
CMD node app.js