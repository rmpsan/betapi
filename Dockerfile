FROM node:16-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY index.js server.js ./

EXPOSE 3000

CMD ["node", "server.js"]
