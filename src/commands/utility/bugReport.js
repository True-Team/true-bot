/* ========== BUG REPORT COMMAND ========== */
// The command will report a user to moderators
// and admins. ❗ The reporting system will be
// implemented as fast as possible with the
//logging system
const mongoose = require('mongoose');
const Collection = require('../../models/guildSettings');
const { MessageEmbed } = require('discord.js');
const MissingDatabaseConnection = require('../../errors/dbErrors');

mongoose.connect(process.env.MONGO_URI);

module.exports = {
  name: 'bugreport',
  category: 'Utility',
  description: '🐛Reports a bug',
  slash: true,
  permissions: ['BAN_MEMBERS'],
  options: [
    {
      name: 'bug',
      description: 'The bug you want to report',
      required: true,
      type: 3,
    },
  ],

  callback: async ({ interaction }) => {
    async function main(guild) {
      //Getting user, reason and logging channel
      const bug = interaction.options.getString('bug');

      if (
        interaction.guild.channels.cache.get(
          String(guild.loggingChannel).slice(2, 20)
        )
      ) {
        const channel = interaction.guild.channels.cache.get(
          String(guild.loggingChannel).slice(2, 20)
        );

        const Embed = new MessageEmbed()
          .setAuthor(interaction.user.tag, interaction.user.avatarURL())
          .setColor('ORANGE')
          .setTimestamp()
          .setThumbnail(interaction.guild.iconURL())
          .setFooter(`Invoked by ${interaction.user.tag}`)
          .addField(
            '❗Bug report',
            `The following bug has been reported:\n${bug}`
          );

        await channel.send({ embeds: [Embed] });

        await interaction.reply({
          content: `${interaction.user} the user has been reported successfully`,
          ephemeral: true,
        });
      } else {
        const ownerID = interaction.guild.ownerId;
        const owner = interaction.guild.members.cache.get(parseInt(ownerID));

        const Embed = new MessageEmbed()
          .setAuthor(interaction.user.tag, interaction.user.avatarURL())
          .setColor('ORANGE')
          .setTimestamp()
          .setThumbnail(interaction.guild.iconURL())
          .setFooter(`Invoked by ${interaction.user.tag}`)
          .addField(
            '❗Bug report',
            `The following bug has been reported:\n${bug}`
          );

        await owner.send({ embeds: [Embed] });

        await interaction.reply({
          content: `${interaction.user} the bug has been reported successfully`,
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
