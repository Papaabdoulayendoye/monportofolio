FROM node:22-alpine

RUN apk add --no-cache libc6-compat g++ make python3

WORKDIR /app

COPY package*.json ./

RUN npm ci --build-from-source=lightningcss && npm cache clean --force
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
