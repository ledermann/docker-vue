# First step: Build with Node.js
FROM node:16 AS Builder
RUN apt-get update || : && apt-get install python -y
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install
COPY . /app
RUN yarn build

# Deliver the dist folder with Nginx
FROM nginx:stable-alpine
LABEL maintainer="mail@ledermann.dev"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=Builder /app/dist /usr/share/nginx/html
COPY entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]
