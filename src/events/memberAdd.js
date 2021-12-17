const Collection = require('../models/guildSettings');

module.exports = (client) => {
  client.on('guildMemberAdd', async (member) => {
    Collection.findOne({ _id: member.guild.id }, async function (error, data) {
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
};

module.exports.config = {
  displayName: 'Member Add Logging System',
  dbName: 'True_Bot',
};
