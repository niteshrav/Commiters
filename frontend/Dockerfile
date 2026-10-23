# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Set at deploy time when the API is live, e.g.:
# docker build --build-arg VITE_API_BASE_URL=https://api.commiters.com .
ARG VITE_API_BASE_URL=
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

ARG VITE_ADMIN_URL=
ENV VITE_ADMIN_URL=$VITE_ADMIN_URL

# Public reCAPTCHA v3 site key — must be present at `npm run build` (not runtime).
ARG VITE_RECAPTCHA_SITE_KEY=
ENV VITE_RECAPTCHA_SITE_KEY=$VITE_RECAPTCHA_SITE_KEY

COPY package.json package-lock.json ./
RUN npm ci

COPY index.html vite.config.ts tsconfig.json ./
COPY public ./public
COPY scripts ./scripts
COPY src ./src

RUN npm run build

# Production stage
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
