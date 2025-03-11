# Sử dụng Node.js phiên bản LTS
FROM node:18
RUN apt-get update && apt-get install -y unixodbc unixodbc-dev

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Mở cổng cho ứng dụng
EXPOSE 3333

# Chạy ứng dụng
CMD ["node", "src/server.js"]
