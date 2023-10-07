FROM node:20

COPY package.json ./
RUN yarn install --non-interactive

WORKDIR /usr/src/app

COPY ./*.js /usr/src/app/

CMD [ "node", "index.js" ]
