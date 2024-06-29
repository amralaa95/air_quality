FROM node:18.20-alpine

ADD . /usr/src/app
WORKDIR /usr/src/app


RUN yarn && \
  yarn build && \
  rm -rf src tests scripts && \
  yarn --production && \
  yarn cache clean && \
  rm -rf .npmrc

EXPOSE 5105