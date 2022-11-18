/* ========== REPORT USER COMMAND ========== */
// The command will report a user to moderators
// The report will be sent to the logging channel
// If it doesn't exists, the report will be sent
// the server owner DM
const mongoose = require('mongoose');
const Collection = require('../../models/guildSettings');
const { EmbedBuilder } = require('discord.js');
const MissingDatabaseConnection = require('../../errors/dbErrors');

mongoose.connect(process.env.MONGO_URI);

module.exports = {
  name: 'usereport',
  category: 'Utility',
  description: '🤦‍♂️Report a user',
  slash: true,
  options: [
    {
      name: 'user',
      description: 'The user you want to report',
      required: true,
      type: 6,
    },
    {
      name: 'reason',
      description: 'Why you want to report the user',
      required: false,
      type: 3,
    },
  ],

  callback: async ({ interaction }) => {
    async function main(guild) {
      //Getting user, reason and logging channel
      const user = interaction.options.getUser('user');
      const reason = interaction.options.getString('reason');

      if (
        interaction.guild.channels.cache.get(
          String(guild.loggingChannel).slice(2, 20)
        )
      ) {
        const channel = interaction.guild.channels.cache.get(
          String(guild.loggingChannel).slice(2, 20)
        );

        const Embed = new EmbedBuilder()
          .setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.avatarURL(),
          })
          .setColor('Orange')
          .setTimestamp()
          .setThumbnail(interaction.guild.iconURL())
          .setFooter({ text: `Invoked by ${interaction.user.tag}` })
          .addFields({
            name: '❗User report case',
            value: `The user ${user} has been reported top moderators with the following reason:\n${reason}`,
            inline: true,
          });

        await channel.send({ embeds: [Embed] });

        await interaction.reply({
          content: `${interaction.user} the user has been reported successfully`,
          ephemeral: true,
        });
      } else {
        const ownerID = interaction.guild.ownerId;
        const owner = interaction.guild.members.cache.get(parseInt(ownerID));

        const Embed = new EmbedBuilder()
          .setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.avatarURL(),
          })
          .setColor('Orange')
          .setTimestamp()
          .setThumbnail(interaction.guild.iconURL())
          .setFooter({ text: `Invoked by ${interaction.user.tag}` })
          .addFields({
            name: '❗User report case',
            value: `The user ${user} has been reported top moderators with the following reason:\n${reason}`,
            inline: true,
          });

        await owner.send({ embeds: [Embed] });

        await interaction.reply({
          content: `${interaction.user} the user has been reported successfully`,
          ephemeral: true,
        });
      }
    }

    Collection.findOne(
      { _id: interaction.guild.id },
      async function (error, data) {
        if (error) {
          MissingDatabaseConnection(interaction);
        } else {
          main(data);
        }
      }
    );
  },
};
