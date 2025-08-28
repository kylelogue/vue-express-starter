FROM nginx:alpine

ARG NODE_ENV=development

# Remove default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy configuration based on environment
COPY nginx.${NODE_ENV}.conf /etc/nginx/conf.d/default.conf

# Create directory for static files
RUN mkdir -p /var/www/html

EXPOSE 80 443