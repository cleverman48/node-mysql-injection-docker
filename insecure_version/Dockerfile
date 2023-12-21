FROM node:latest
WORKDIR /usr/src/hospital-app
COPY package*.json /
RUN npm install && \
    npm i nodemon --global
EXPOSE 3001
COPY .env .env
COPY . .
CMD ["npm", "run", "start"]