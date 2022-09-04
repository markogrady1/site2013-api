FROM node:16.15 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .

FROM node:16.15-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app /usr/src/app
EXPOSE 3312

