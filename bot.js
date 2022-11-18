const DiscordJS = require('discord.js');
const { IntentsBitField, Partials } = require('discord.js');
const WOKCommands = require('wokcommands');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Collection = require('./src/models/guildSettings');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const client = new DiscordJS.Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
  ],

  partials: [Partials.Channel],
});

client.on('ready', async (bot) => {
  console.log(`Logged in as ${bot.user.tag}`);

  new WOKCommands({
    client,
    commandsDir: path.join(__dirname, './src/commands'),
    events: {
      dir: path.join(__dirname, './src/events'),
    },
    testServers: ['906969919260876810'],
    mongoUri: process.env.MONGO_URI,
  });

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
