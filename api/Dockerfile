FROM node:11-alpine

# maintainer label
LABEL maintainer="jianhan@mail.com"

# make app dir
RUN mkdir -p /usr/src/app

# set working directory form the rest of the instructions
WORKDIR /usr/src/app

# copy content from current dir to work dir
COPY . .

# dependencies
RUN npm install

EXPOSE 8008

CMD ["npm", "run", "start"]