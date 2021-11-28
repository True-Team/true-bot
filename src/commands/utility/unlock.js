/* ========== UNLOCK COMMAND ========== */
// The command will unlock the permissions of
// a previously locked channel
const { Permissions } = require('discord.js');

module.exports = {
  name: 'unlock',
  category: 'Utility',
  description: '🔓Unlocks a previously locked channel',
  slash: true,
  permissions: ['BAN_MEMBERS'],

  callback: async ({ interaction }) => {
    //Unlocking the channel permissions
    await interaction.channel.permissionOverwrites.set([
      {
        id: interaction.guild.roles.everyone.id,
        allow: [
          Permissions.FLAGS.SEND_MESSAGES,
          Permissions.FLAGS.STREAM,
          Permissions.FLAGS.VIEW_CHANNEL,
          Permissions.FLAGS.EMBED_LINKS,
          Permissions.FLAGS.READ_MESSAGE_HISTORY,
          Permissions.FLAGS.ADD_REACTIONS,
          Permissions.FLAGS.SEND_TTS_MESSAGES,
          Permissions.FLAGS.ATTACH_FILES,
          Permissions.FLAGS.USE_APPLICATION_COMMANDS,
        ],
      },
    ]);

    await interaction.reply('Channel unlocked successfully.');
  },
};
