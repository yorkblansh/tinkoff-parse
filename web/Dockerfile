FROM node:16

WORKDIR /app

# COPY package*.json ./
# COPY tsconfig.build.json ./
# COPY tsconfig.json ./

COPY . .
# COPY package*.json ./

# npm stuff
# RUN npm config set legacy-peer-deps true
# RUN npm i
# RUN npm run build
# RUN npm i -g npm
# RUN npm i -g yarn
RUN yarn set version stable 
RUN yarn install
RUN yarn run build



# RUN yarn run build



# RUN npm install
# RUN ls -a && npm run build

ENV PORT=8080

EXPOSE 8080

CMD [ "yarn","run", "start:prod" ]
