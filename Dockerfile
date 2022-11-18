FROM node

RUN mkdir -p /usr/src/true-bot
WORKDIR /usr/src/true-bot

COPY package.json /usr/src/true-bot/
RUN npm install

COPY . /usr/src/true-bot/

CMD ["node" "bot.js"]