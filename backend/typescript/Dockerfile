FROM node:20.12.2-slim

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./

RUN yarn install

COPY . ./

EXPOSE 5000
ENTRYPOINT ["yarn", "dev"]
