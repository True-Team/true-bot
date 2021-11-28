/* ========== LOCK SYSTEM ========== */
// The lock system will help the guild to
// manage spams and not attacks.
const { Permissions } = require('discord.js');

module.exports = {
  name: 'lock',
  category: 'Utility',
  description: '⛔Locks a specific channel in the server.',
  slash: true,
  permissions: ['BAN_MEMBERS'],

  callback: async ({ interaction }) => {
    await interaction.channel.permissionOverwrites.set([
      {
        id: interaction.guild.roles.everyone.id,
        deny: [
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

    await interaction.reply(
      'Channel locked successfully. Members can not send messages anymore.'
    );
  },
};
