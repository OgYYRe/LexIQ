FROM nginx:1.27-alpine

COPY index.html /usr/share/nginx/html/index.html
COPY style.css /usr/share/nginx/html/style.css
COPY script.js /usr/share/nginx/html/script.js

EXPOSE 80

CMD ["sh", "-c", "printf 'window.API_BASE_URL = \"%s\";\\n' \"${API_BASE_URL:-http://localhost:5000}\" > /usr/share/nginx/html/config.js && exec nginx -g 'daemon off;'"]
