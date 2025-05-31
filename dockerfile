
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src ./src
COPY server.cjs .
COPY tsconfig.json .
COPY tsconfig.app.json .
COPY tsconfig.node.json .
COPY vite.config.ts . 
COPY index.html . 

# COPY . .

RUN npm run build

# RUN npx pkg . --targets node16-linux-x64 --output app

FROM gcr.io/distroless/nodejs20

COPY --from=builder /app/server.cjs /server.cjs
COPY --from=builder /app/node_modules /node_modules
COPY --from=builder /app/dist /dist

WORKDIR /

EXPOSE 4000

CMD ["server.cjs"]

