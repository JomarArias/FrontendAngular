FROM node:22
WORKDIR /app
RUN npm install -g @angular/cli@17
COPY package*.json ./
RUN npm install
COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]