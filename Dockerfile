FROM node:22.20.0

WORKDIR /app

COPY . .

WORKDIR /app/frontend
RUN npm i
RUN npm run build

WORKDIR /app/backend
RUN npm i

EXPOSE 3001

CMD [ "node", "app.js" ]