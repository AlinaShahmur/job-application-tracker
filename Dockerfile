FROM node:20-alpine
COPY package.json /app/
COPY src /app/src

WORKDIR /app

RUN npm install 
RUN set NODE_ENV=production

COPY tsconfig.json /app
RUN npx tsc -p ./tsconfig.json

COPY dist /app/dist

CMD [ "node","dist/main.js"]