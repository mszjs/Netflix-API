FROM node:14-alpine
EXPOSE 80/tcp
WORKDIR /app/db_api
ADD . .
RUN npm i
CMD node app.js