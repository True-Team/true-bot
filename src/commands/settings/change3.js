/* ========== CHANGE3 COMMAND ========== */
// Adds the verification system in the guild.
const { Permissions } = require('discord.js');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

module.exports = {
  name: 'change3',
  category: 'Settings',
  description: '🔧Adds the verification system',
  slash: true,
  permissions: ['BAN_MEMBERS'],

  callback: async ({ interaction }) => {
    await interaction.guild.channels.create('✅verify', {
      type: 'GUILD_TEXT',
      nsfw: false,
    });

    await interaction.guild.roles.create({
      name: '✔Verified',
      color: 'GREEN',
      permissions: [
        Permissions.FLAGS.SEND_MESSAGES,
        Permissions.FLAGS.SEND_MESSAGES_IN_THREADS,
        Permissions.FLAGS.SPEAK,
        Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
        Permissions.FLAGS.VIEW_CHANNEL,
        Permissions.FLAGS.ADD_REACTIONS,
        Permissions.FLAGS.CONNECT,
        Permissions.FLAGS.READ_MESSAGE_HISTORY,
      ],
    });

    await interaction.reply(
      `${interaction.user} the Verification system has been added correctly.`
    );
  },
};
