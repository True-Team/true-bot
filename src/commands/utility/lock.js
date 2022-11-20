/* ========== LOCK SYSTEM ========== */
// The lock system will help the guild to
// manage spams and not attacks.
const { PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'lock',
  category: 'Utility',
  description: '⛔Locks a specific channel in the server.',
  slash: true,

  callback: async ({ interaction }) => {
    await interaction.channel.permissionOverwrites.set([
      {
        id: interaction.guild.roles.everyone.id,
        deny: [
          PermissionsBitField.Flags.SendMessages,
          PermissionsBitField.Flags.Stream,
          PermissionsBitField.Flags.ViewChannel,
          PermissionsBitField.Flags.EmbedLinks,
          PermissionsBitField.Flags.ReadMessageHistory,
          PermissionsBitField.Flags.AddReactions,
          PermissionsBitField.Flags.SendTTSMessages,
          PermissionsBitField.Flags.AttachFiles,
          PermissionsBitField.Flags.UseApplicationCommands,
        ],
      },
    ]);

    await interaction.reply(
      'Channel locked successfully. Members can not send messages anymore.'
    );
  },
};
