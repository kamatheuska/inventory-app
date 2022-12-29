##
## Stage 1
##
FROM node:18-alpine AS builder
WORKDIR /app


COPY package.json ./
COPY yarn.lock ./
COPY packages/api/package.json ./packages/api/
COPY packages/types ./packages/types
RUN yarn

COPY packages/api/tsconfig.json ./packages/api/tsconfig.json
COPY packages/api/src ./packages/api/src
RUN ls -la /app/
RUN ls -la /app/packages/types
RUN ls -la /app/packages/
RUN ls -la /app/packages/api
RUN yarn build:api


##
## Stage 2
##
FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV="production"
COPY package.json ./
COPY yarn.lock ./
COPY packages/api/package.json ./packages/api/
COPY packages/api/fastify.config.prod.js ./packages/api/
COPY packages/types ./packages/types
RUN yarn install --production --ignore-scripts 

COPY --from=builder /app/packages/api/dist ./packages/api/dist
RUN ls -la packages/api
RUN cat 
EXPOSE 6000
CMD ["yarn", "start:api"]