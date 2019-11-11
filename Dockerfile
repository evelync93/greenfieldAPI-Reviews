# node version
FROM node:latest

RUN mkdir /app
ADD . /app
WORKDIR /app
RUN npm install

# application's default port
EXPOSE 3000
CMD ["node", "./server/index.js"]