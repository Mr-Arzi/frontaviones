# Etapa 1: construir la app
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Etapa 2: nginx para servir
FROM nginx:alpine
COPY --from=builder /app/dist/aviongram /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
