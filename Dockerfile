# Stage 1
FROM node:16.20-alpine as builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

#stage 2
FROM nginx:1.22-alpine
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
