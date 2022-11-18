/* ========== BAN COMMAND ========== */
// The command will permanently ban a user in the guild
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'tempban',
  category: 'Moderation',
  description: '⌚Temporarely bans a user from the server.',
  slash: true,
  options: [
    {
      name: 'user',
      description: 'The user you want to ban',
      required: true,
      type: 6,
    },
    {
      name: 'reason',
      description: 'Why you want to ban the user',
      required: false,
      type: 3,
    },
  ],

  callback: async ({ interaction }) => {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');
    const days = interaction.options.getInteger('days');

    interaction.guild.members.ban(user, { reason: reason, days: days });

    const Embed = new EmbedBuilder()
      .setColor('#66b032')
      .setAuthor({
        name: `Moderator: ${interaction.user.username}#${interaction.user.discriminator}`,
      })
      .setThumbnail(interaction.options.getUser('user').avatarURL())
      .setFooter({
        text: `Invoked by ${interaction.user.username}#${interaction.user.discriminator}`,
      })
      .setTimestamp()
      .addFields({
        name: 'User banned from the guild',
        value: `The  user **${
          interaction.options.getUser('user').username
        }** has been banned from the guild with the following reason:\n**${
          interaction.options.getString('reason') || 'No reason provided'
        }**`,
        inline: true,
      });

    await interaction.reply({ embeds: [Embed] });
  },
};
