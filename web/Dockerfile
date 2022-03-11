FROM node:16 AS builder
ARG GIT_REV=''
ENV GIT_REV=$GIT_REV
ARG BRANCH=''
ENV BRANCH=$BRANCH
WORKDIR /app
COPY ./.npmrc ./package.json ./yarn.lock .
RUN yarn add @schneefux/klicker
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn run build

FROM node:16
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app ./
RUN rm ./.npmrc
ENV PORT=80
EXPOSE 80
USER node
CMD [ "node", "./node_modules/.bin/nuxt", "start" ]
