# Stage 1: Build the React app
FROM node:current-alpine3.22 AS builder

WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the build using Nginx
FROM nginx:alpine

# Copy React build
COPY --from=builder /src/dist /usr/share/nginx/html

# Copy the custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

