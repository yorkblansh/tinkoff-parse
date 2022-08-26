# FROM alpine:latest

# RUN apk add --update nginx && rm -rf /var/cache/apk/*

FROM nginx:stable

# WORKDIR /build

COPY ./t/nginx.conf /etc/nginx/nginx.conf

COPY ./build ./usr/share/nginx/html

# EXPOSE 8080 80

# CMD ["nginx", "-g", "daemon off;"]