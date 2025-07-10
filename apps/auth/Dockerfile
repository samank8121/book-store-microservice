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

# Copy the auth app and libs
COPY apps/auth ./apps/auth
COPY libs ./libs

# Install dependencies
RUN pnpm install

COPY . .