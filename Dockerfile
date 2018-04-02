FROM mhart/alpine-node:latest

MAINTAINER Nicolai Bruhn mail@bruhno.com

WORKDIR /app
ADD . .

RUN npm install

EXPOSE 8889

CMD ["npm", "run", "start:prod"]
