/* ========== SETUP COMMAND ========== */
// Resets the guild settings query to default
// parameters and values in the database.
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');

const mongoose = require('mongoose');
const Collection = require('../../models/guildSettings');

mongoose.connect(process.env.MONGO_URI);

module.exports = {
  name: 'setup',
  category: 'Settings',
  description: '🧮Creates the setup for the server in the Database',
  slash: true,

  callback: async ({ interaction }) => {
    try {
      await new Collection({
        _id: interaction.guild.id,
        serverOwner: interaction.guild.ownerId,
        staffRole: '',
        verifyChannel: '',
        logsChannel: '',
        verifiedRole: '',
        muteRole: '',
        loggingChannel: '',
      }).save();

      const Embed = new EmbedBuilder()
        .setColor('#228b22')
        .setTimestamp()
        .setFooter({ text: `Invoked by ${interaction.user.tag}` })
        .setThumbnail(interaction.user.avatarURL())
        .addFields({
          name: '✅ Guild setup completed successfully',
          value: `${interaction.user} the guild has now been inserted in our system. You can now start customizing True. Use the link provided down below to learn more about this.`,
          inline: true,
        });

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel('Learn more about True Bot customization')
          .setStyle('Link')
          .setURL('https://learn.truebot.xyz/learn/customizing-true-settings')
      );

      await interaction.reply({ embeds: [Embed], components: [row] });
    } catch (err) {
      await interaction.reply({
        content: 'The guild has already been set up in the Database.',
      });
    }
  },
};
