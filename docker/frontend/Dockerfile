#Build Phase
FROM node:16-alpine as build
WORKDIR /app
COPY package.json . 
#sometimes written as COPY package*.json . - to include package-lock.json. Isn't require since the above regenerates the lock file too.
RUN npm install
COPY . .
RUN npm run build

#Run Phase
FROM nginx 
EXPOSE 80
COPY --from=build /app/build /usr/share/nginx/html