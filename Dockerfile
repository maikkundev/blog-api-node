FROM node:lts-alpine

WORKDIR /api
RUN npm i -g pnpm

COPY package.json ./
RUN pnpm i
COPY . .
RUN pnpm prisma generate

CMD ["pnpm", "dev"]