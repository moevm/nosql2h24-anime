FROM node as build
WORKDIR /usr/src/app
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend/ ./
RUN npm run build
FROM nginx:1.16.0-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]