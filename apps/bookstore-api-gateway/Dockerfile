FROM node:alpine AS development

RUN apk add --no-cache iputils
RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN pnpm install

COPY apps/bookstore-api-gateway apps/bookstore-api-gateway
COPY libs libs

RUN cd apps/bookstore-api-gateway && pnpm install

RUN pnpm run build bookstore-api-gateway

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/bookstore-api-gateway/main"]