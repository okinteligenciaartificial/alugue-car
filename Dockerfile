FROM node:20-alpine as builder

WORKDIR /app
COPY package*.json ./

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
CMD ["nginx", "-g", "daemon off;"]