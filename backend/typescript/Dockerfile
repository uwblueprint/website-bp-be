FROM node:14.15.5-slim

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./

RUN yarn install

COPY . ./

EXPOSE 5000
ENTRYPOINT ["yarn", "dev"]
