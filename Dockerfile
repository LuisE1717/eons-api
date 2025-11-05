# Etapa 1: Construcción de la aplicación
FROM node:18-alpine AS build
WORKDIR /app

# Instalar Yarn
RUN apk add --no-cache yarn

# Copiar archivos de dependencias
COPY package.json yarn.lock ./

# Instalar dependencias, incluyendo Prisma
RUN yarn install --frozen-lockfile

# Copiar el resto de los archivos de la aplicación
COPY . .

# Generar Prisma Client
RUN yarn prisma generate

# Construir la aplicación
RUN yarn build

# Etapa 2: Configuración de la imagen final
FROM node:18-alpine
WORKDIR /app

# Instalar Yarn
RUN apk add --no-cache yarn

# Copiar archivos necesarios desde la etapa de build
COPY --from=build /app/package.json /app/yarn.lock ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/dist ./dist
COPY .env .env

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para ejecutar las migraciones y iniciar la aplicación
CMD ["sh", "-c", "yarn prisma migrate deploy && node dist/main"]