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

  const wok = new WOKCommands(client, {
    commandsDir: path.join(__dirname, './src/commands'),
    testServers: ['906969919260876810'],
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

client.on('guildMemberAdd', async (member) => {
  Collection.findOne({ _id: memebr.guild.id }, async function (error, data) {
    if (error) {
      console.error(error);
    } else {
      try {
        const loggingChannel = member.guild.cache.get(
          String(data.loggingChannel).slice(2, 20)
        );

        await loggingChannel.send(`The user ${member} has joined the guild`);
      } catch (e) {
        return null;
      }
    }
  });
});

client.on('guildMemberRemove', async (member) => {
  Collection.findOne({ _id: memebr.guild.id }, async function (error, data) {
    if (error) {
      console.error(error);
    } else {
      try {
        const loggingChannel = member.guild.cache.get(
          String(data.loggingChannel).slice(2, 20)
        );

        await loggingChannel.send(`The user ${member} has left the guild`);
      } catch (e) {
        return null;
      }
    }
  });
});

client.on('guildDelete', async (guild) => {
  Collection.findOneAndRemove({ _id: guild.id });
});

client.login(process.env.TOKEN);
