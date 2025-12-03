FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm prisma generate
RUN pnpm build


FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package.json pnpm-lock.yaml ./ 

ENV NODE_ENV=production
EXPOSE 3333

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/http/server.js"]
