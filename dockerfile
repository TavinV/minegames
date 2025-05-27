# Estágio de construção
FROM node:18-alpine as builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de definição de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código fonte
COPY . .

# Estágio de produção
FROM node:18-alpine

WORKDIR /app

# Copia apenas o necessário do estágio de construção
COPY --from=builder /app .

# Expõe a porta que o servidor usa
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "api/server.js"]