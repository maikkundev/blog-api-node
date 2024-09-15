FROM node:20-alpine

WORKDIR /app

# install pnpm
RUN npm i -g pnpm

# copy files and install dependencies
COPY . .
RUN pnpm install

# execute node app
EXPOSE 3000
ENTRYPOINT [ "pnpm", "dev" ]