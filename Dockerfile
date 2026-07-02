FROM php:8.3-cli

# PHP extensions + Node.js
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    curl \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql zip

# Install Node.js 22
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

# PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Node dependencies
RUN npm install

# Build Vite assets
RUN npm run build

# Laravel setup
RUN cp .env.example .env

RUN php artisan key:generate --force

RUN php artisan config:clear
RUN php artisan cache:clear
RUN php artisan route:clear
RUN php artisan view:clear

EXPOSE 10000

CMD php artisan serve --host=0.0.0.0 --port=10000