# use latest node alpine (12)
FROM node:alpine
# copy package.json and package-lock.json on your app's root directory
COPY package*.json /usr/src/app/
# set your app's root directory as the work directory
WORKDIR /usr/src/app

# install packages only for production and delete the temporary app folder
RUN npm install --production
# copy the src directory on your app's root directory
COPY src/ /usr/src/app/src

EXPOSE 3000
# run `npm start` to setup the server
CMD [ "npm", "start" ]