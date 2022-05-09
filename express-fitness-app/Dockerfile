FROM node:14.17.3
WORKDIR /app
# COPY package*.json .
COPY server/package*.json /app/
RUN npm install
COPY . .
EXPOSE 5001
CMD [ "npm","start" ]

