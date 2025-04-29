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

COPY wait-for-it.sh ./wait-for-it.sh
RUN chmod +x ./wait-for-it.sh

# Copy the books app and libs
COPY apps/books ./apps/books
COPY libs ./libs

# Install dependencies
RUN pnpm install

COPY . .