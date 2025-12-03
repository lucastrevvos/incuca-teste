FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .


RUN pnpm prisma generate
RUN pnpm build


FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm


COPY package.json pnpm-lock.yaml ./


COPY --from=builder /app/node_modules ./node_modules


COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts


COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
EXPOSE 3333


CMD ["sh", "-c", "pnpm dlx prisma db push --accept-data-loss && pnpm dlx prisma db seed && node dist/http/server.js"]

