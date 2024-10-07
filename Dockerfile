# Строим приложение
# Строим приложение
FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./

# Обновляем npm до последней версии
# RUN npm install -g npm@latest

# Устанавливаем зависимости с флагами
RUN npm install --no-audit --no-fund

COPY . ./

RUN npm run build

# Настраиваем Nginx для обслуживания статических файлов
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
