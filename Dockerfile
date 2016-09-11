FROM node:argon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm install
RUN npm run build

ADD entrypoint.sh /
RUN chmod u+x /entrypoint.sh

CMD ["/entrypoint.sh"]
