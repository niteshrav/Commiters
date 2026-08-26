# Build stage
FROM node:22-alpine AS build

WORKDIR /app

ARG VITE_API_BASE_URL=https://api.commiters.com
ARG VITE_SITE_URL=https://www.commiters.com
ARG VITE_PUBLIC_SITE_URL=https://www.commiters.com

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_SITE_URL=$VITE_SITE_URL
ENV VITE_PUBLIC_SITE_URL=$VITE_PUBLIC_SITE_URL

COPY package.json package-lock.json ./
RUN npm ci

COPY index.html vite.config.ts tsconfig.json ./
COPY src ./src

RUN npm run build

# Production stage
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
