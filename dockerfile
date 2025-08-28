FROM node:current-alpine3.22
WORKDIR /second_serve
COPY . .
RUN npm install
CMD ["node","server.js"]