FROM node:8-alpine

# Install `serve` to run the application.
RUN yarn global add serve

# Set the command to start the node server.
CMD serve -s dist

# Tell Docker about the port we'll run on.
EXPOSE 5000

# Install dependencies
COPY package.json package.json
RUN yarn install

# Copy all local files into the image.
COPY . .

# Build for production.
RUN yarn build
