FROM node:alpine
COPY . /app
RUN apk add --no-cache python alpine-sdk
WORKDIR "/app/Frontend caroster"
RUN npm ci && npm run build && rm -rf node_modules

WORKDIR "/app/Backend Caroster"
RUN npm ci

CMD npm start
