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
RUN yarn run nest:generate-prisma
RUN yarn run nest:symlink_common
RUN yarn run nest:build
# RUN yarn add @prisma/client
# RUN yarn run prisma generate
# RUN yarn run build




# RUN yarn run build



# RUN npm install
# RUN ls -a && npm run build

ENV PORT=8081

EXPOSE 8081

CMD [ "yarn","run", "nest:start:prod" ]
