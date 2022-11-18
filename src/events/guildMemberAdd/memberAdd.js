const Collection = require('../../models/guildSettings');

module.exports = (member) => {
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
};
