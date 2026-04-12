# Imagen base liviana
FROM node:20-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar solo dependencias primero (optimiza cache)
COPY app/package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el resto del código
COPY apps/ .

# Exponer puerto
EXPOSE 3000

# Usuario no root (best practice)
USER node

# Comando de inicio
CMD ["node", "index.js"] 
