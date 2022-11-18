/* ========== CHANGE2 COMMAND ========== */
// Removes the logging system in the guild
const mongoose = require('mongoose');
const Collection = require('../../models/guildSettings');
const { MessageActionRow, MessageButton } = require('discord.js');

mongoose.connect(process.env.MONGO_URI);

module.exports = {
  name: 'change2',
  category: 'Settings',
  description: '🔧Removes the logging system',
  slash: true,

  callback: async ({ interaction }) => {
    async function main(guild) {
      const loggingChannel = guild.loggingChannel;

      //Getting channelfrom Database
      const channel = interaction.guild.channels.cache.get(
        String(loggingChannel).slice(2, 22)
      );

      //Deleting channel
      channel.delete();
    }

    Collection.findOne(
      { _id: interaction.guild.id },
      async function (error, data) {
        if (error) {
          //Sending error for missing database connection
          const row = new MessageActionRow().addComponents(
            new MessageButton()
              .setLabel('Status Page')
              .setStyle('LINK')
              .setURL('https://status.truebot.xyz'),

            new MessageButton()
              .setLabel('Report Form')
              .setStyle('LINK')
              .setURL('https://forms.gle/sH97ZjbR7opgU9ic6')
          );

          await interaction.reply({
            content: `${interaction.user} unable to connect to the database, please try again later.\n**If you see this message more than 5 times, please consider visiting our Status page or reporting the problem.**`,
            ephemeral: true,
            components: [row],
          });
        } else {
          main(data);
        }
      }
    );
  },
};
