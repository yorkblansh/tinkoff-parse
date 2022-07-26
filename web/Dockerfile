FROM node:16

WORKDIR /app

# COPY package*.json ./
# COPY tsconfig.build.json ./
# COPY tsconfig.json ./
COPY . .

# COPY package*.json ./

# npm stuff
RUN npm config set legacy-peer-deps true
RUN npm install
RUN ls -a && npm run build

ENV PORT=8080

EXPOSE 8080

CMD [ "npm","run", "start:prod" ]
