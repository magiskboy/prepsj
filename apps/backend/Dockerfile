FROM node:20.10.0-slim

LABEL maintainer="Nguyen Khac Thanh <nguyenkhacthanh244@gmail.com>"

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY ./dist ./

EXPOSE 3000

ENTRYPOINT ["node", "main.js"]
