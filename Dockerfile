FROM node:20.10.0-alpine as base

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
CMD ["yarn", "preview"]
EXPOSE 4000 80
FROM base as production
