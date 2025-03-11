FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force && npm install
# Hoặc thử npm install --legacy-peer-deps nếu lỗi dependency
RUN apt-get update && apt-get install -y unixodbc-dev

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
