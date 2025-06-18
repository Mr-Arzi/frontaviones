# Etapa 1: construir Angular
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa 2: servir con nginx
FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/aviongram /usr/share/nginx/html
