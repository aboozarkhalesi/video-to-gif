FROM node:18-slim

# نصب ffmpeg
RUN apt-get update && apt-get install -y ffmpeg

# تنظیم دایرکتوری کاری
WORKDIR /app

# کپی فایل‌های package و نصب
COPY package*.json ./
RUN npm install

# کپی بقیه فایل‌ها
COPY . .

# ساخت پوشه uploads
RUN mkdir -p uploads

# باز کردن پورت
EXPOSE 8080

# اجرای اپلیکیشن
CMD ["npm", "start"]
