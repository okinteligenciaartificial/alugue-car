FROM node:20-alpine as builder

WORKDIR /app
COPY package*.json ./
<<<<<<< HEAD

# Instalar dependências com cache em camada separada
RUN npm ci --only=production

# Copiar arquivos do projeto
COPY . .

# Build da aplicação
RUN npm run build

# Imagem final otimizada
FROM nginx:alpine

# Copiar configuração do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar arquivos estáticos do build
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor porta 80
EXPOSE 80

# Iniciar nginx
=======
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
>>>>>>> 891f235cf1aa62efe8d618df22d7938b6ec9cb92
CMD ["nginx", "-g", "daemon off;"]