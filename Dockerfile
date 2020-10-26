FROM node:lts-alpine

WORKDIR /home/node/app

ADD . .

ENV NODE_ENV=production

RUN yarn

USER node

EXPOSE 3333

CMD [ "node", "src/index.js" ]
