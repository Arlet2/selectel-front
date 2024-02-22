FROM node:21-alpine3.18 as build

COPY . .

CMD npm install
CMD npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build out /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]