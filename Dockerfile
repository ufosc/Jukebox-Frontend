# Define the image to use. Bookworm runs Node 20 inside a Debian container.
# View node:20-bookworm image here: https://hub.docker.com/_/node
FROM node:20-bookworm AS setup
LABEL maintainer="Isaac Hunter"

# Copy essential node & npm files to the container for initialization
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./index.html /app/index.html
COPY ./vite.config.ts /app/vite.config.ts
COPY ./tsconfig.json /app/tsconfig.json
COPY ./tsconfig.node.json /app/tsconfig.node.json

# Set the working directory to /app/client
WORKDIR /app

# Install the dependencies inside container
RUN npm install && \
    npm install -g rimraf

# Copy the rest of the files to the container
COPY ./public /app/public
COPY ./src /app/src

# Build the app
RUN npm run build

# Creates a volume for the dist folder so that the server can access it
VOLUME /app/dist

# EXPOSE and CMD are not needed for the client container
# because it is not a server. It is only used to build the
# static files for the server to serve.