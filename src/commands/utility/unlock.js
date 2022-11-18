/* ========== UNLOCK COMMAND ========== */
// The command will unlock the permissions of
// a previously locked channel
const { PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'unlock',
  category: 'Utility',
  description: '🔓Unlocks a previously locked channel',
  slash: true,

  callback: async ({ interaction }) => {
    //Unlocking the channel permissions
    await interaction.channel.permissionOverwrites.set([
      {
        id: interaction.guild.roles.everyone.id,
        allow: [
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

    await interaction.reply('Channel unlocked successfully.');
  },
};
