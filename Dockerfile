FROM node:13

WORKDIR /app

COPY server.js package.json package-lock.json ./

RUN npm install

ENV PORT=8080

USER 1001

EXPOSE 8080

CMD node server.js