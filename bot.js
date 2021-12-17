const DiscordJS = require('discord.js');
const WOKCommands = require('wokcommands');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Collection = require('./src/models/guildSettings');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const { Intents } = DiscordJS;

const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.on('ready', async (bot) => {
  console.log(`Logged in as ${bot.user.tag}`);

  new WOKCommands(client, {
    commandsDir: path.join(__dirname, './src/commands'),
    featuresDir: path.join(__dirname, './src/events'),
    testServers: ['906969919260876810'],
    mongoUri: process.env.MONGO_URI,
  }).setCategorySettings([
    {
      name: 'Moderation',
      emoji: '👮‍♂️',
    },
    {
      name: 'Utility',
      emoji: '🚀',
    },
    {
      name: 'Settings',
      emoji: '🔧',
    },
    {
      name: 'APIs',
      emoji: '🐛',
    },
    {
      name: 'Music',
      emoji: '🎶',
    },
  ]);

  bot.user.setActivity('The new True Bot', { type: 'WATCHING' });
});

client.on('guildCreate', async (guild) => {
  await new Collection({
    _id: guild.id,
    serverOwner: guild.ownerId,
    staffRole: '',
    verifyChannel: '',
    logsChannel: '',
    verifiedRole: '',
    muteRole: '',
    loggingChannel: '',
  }).save();
});

client.on('guildDelete', async (guild) => {
  Collection.findOneAndRemove({ _id: guild.id });
});

client.login(process.env.TOKEN);
