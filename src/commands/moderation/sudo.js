/* ========== SUDO COMMAND ========== */
// The command will alert a user.
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'sudo',
  category: 'Moderation',
  description: '❗Alerts a user with a mention and a custom message',
  slash: true,
  permissions: ['BAN_MEMBERS'],
  options: [
    {
      name: 'user',
      description: 'The user you want to alert',
      required: true,
      type: 6,
    },
    {
      name: 'reason',
      description: 'Why you want to alert the user',
      required: false,
      type: 3,
    },
  ],

  callback: async ({ interaction }) => {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');

    const colors = ['#dc143c', '#ff4040', '#fe2712', '#cf1020'];
    let color = colors[Math.floor(Math.random() * 4)];

    const Embed = new MessageEmbed()
      .setColor(color)
      .setTimestamp()
      .setFooter(`Invoked by ${user.tag}`)
      .setThumbnail(user.avatarURL())
      .addField(
        '🏛 INFO ALERT',
        `The user ${user} has been alerted by Moderators with the following reason:**\n\`\`\`arm\n${
          reason || 'No reason provided.'
        }\`\`\`**`,
        true
      );

    interaction.reply({ embeds: [Embed] });
  },
};
