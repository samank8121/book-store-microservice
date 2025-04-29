FROM node:alpine AS development

WORKDIR /usr/src/app

# Install required tools
RUN apk add --no-cache \
    iputils \
    mongodb-tools \
    python3 \
    make \
    g++

# Install pnpm
RUN npm install -g pnpm

# Copy root files first
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY nest-cli.json ./

RUN pnpm install

COPY apps/bookstore-api-gateway apps/bookstore-api-gateway
COPY libs ./libs

# Install dependencies
RUN pnpm install
COPY . .