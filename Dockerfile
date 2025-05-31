FROM node:18-slim

RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN mkdir -p uploads

EXPOSE 8080

CMD ["npm", "start"]
