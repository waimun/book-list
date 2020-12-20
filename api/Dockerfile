FROM node:14.15.0-alpine
WORKDIR /usr/src/app
COPY [ "README.md", "package*.json", "./" ]
RUN npm ci --only=production
COPY src src/
ENTRYPOINT [ "node", "./src/server.js" ]
