FROM node:16 AS builder
WORKDIR /app
COPY ./package.json ./yarn.lock .
RUN yarn install --frozen-lockfile
COPY . .

FROM cubejs/cube:v0.29
COPY --from=builder /app .
EXPOSE 4000