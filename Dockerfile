FROM node:20-bullseye as build

COPY . .

RUN npm install
RUN rm -rf .next out; exit 0
RUN env
RUN npm run build

FROM nginx:alpine as run

WORKDIR /

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /out /usr/share/nginx/html

COPY --from=build nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
