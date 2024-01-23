FROM node:14.15.5-slim

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./

RUN yarn install
RUN sed -i -e 's/deb.debian.org/archive.debian.org/g' \
           -e 's|security.debian.org|archive.debian.org/|g' \
           -e '/stretch-updates/d' /etc/apt/sources.list
RUN apt-get update && apt-get install -y curl
RUN curl https://cli-assets.heroku.com/install.sh | sh



ENV PATH="/usr/local/heroku/bin:${PATH}"

COPY . ./

EXPOSE 5000
ENTRYPOINT ["yarn", "dev"]
