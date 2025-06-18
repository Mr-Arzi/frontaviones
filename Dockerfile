# Etapa de compilación
FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Etapa de producción
FROM nginx:alpine
COPY --from=build /app/dist/aviongram /usr/share/nginx/html
EXPOSE 80
