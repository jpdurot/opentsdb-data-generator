FROM node:argon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY sources/* /usr/src/app/

RUN npm install
RUN npm run build

COPY entrypoint.sh /usr/src/app

ENTRYPOINT ["entrypoint.sh"]