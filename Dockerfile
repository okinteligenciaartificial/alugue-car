FROM node:20-alpine as builder

WORKDIR /app
COPY package*.json ./

# Comentário para quebrar o cache: ${TIMESTAMP}
# Instalar TODAS as dependências (incluindo DevDependencies) para permitir o build
RUN npm install

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