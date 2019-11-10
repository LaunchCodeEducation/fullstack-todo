FROM node
# pro tip from: https://dev.to/alex_barashkov/using-docker-for-nodejs-in-development-and-production-3cgp
WORKDIR /usr/src/app

COPY . .

# ignore dev dependency installation with production option
RUN npm i --production 

CMD npm start