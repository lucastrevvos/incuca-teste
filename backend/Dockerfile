FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml* ./

RUN npm install -g pnpm


RUN pnpm install --prod=false

COPY . .

RUN pnpm build

EXPOSE 3333

CMD ["node", "dist/http/server.js"]
