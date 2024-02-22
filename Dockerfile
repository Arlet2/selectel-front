FROM node:21-alpine3.18 as build

COPY . .

RUN npm install
RUN npm run build

COPY copy copy/

FROM nginx:alpine as run

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build out /usr/share/nginx/html

COPY --from=build nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]