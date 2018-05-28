# First step: Build with Node.js
FROM node:alpine AS Builder
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app
RUN yarn build

# Deliver the dist folder with Nginx
FROM nginx:stable-alpine
LABEL maintainer="mail@georg-ledermann.de"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=Builder /app/dist /usr/share/nginx/html
COPY entrypoint.sh /

CMD ["/entrypoint.sh"]
