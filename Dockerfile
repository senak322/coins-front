# Строим приложение
FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . ./

RUN npm run build

# Настраиваем Nginx для обслуживания статических файлов
FROM nginx:alpine

# Копируем билд в директорию, обслуживаемую Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Копируем конфигурационный файл Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
