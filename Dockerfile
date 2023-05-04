FROM node:16 as dev

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm i
COPY . .
RUN npm run tsc

# docker build -t diary-api .
# docker run --name diary-api -p 3000:3000 diary-api
CMD ["node", "dist/index.js"]
