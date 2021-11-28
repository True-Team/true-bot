/* ========== HELP COMMAND ========== */
// A simple help command for True bot
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'help',
  category: 'Utility',
  description: '📚Learn more about True Bot',
  slash: true,

  callback: async ({ interaction }) => {
    const websiteButton = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Website')
        .setStyle('LINK')
        .setURL('https://truebot.xyz')
    );
    const learnButton = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Learning Platform')
        .setStyle('LINK')
        .setURL('https://learn.truebot.xyz')
    );

    const statusPage = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Status Page')
        .setStyle('LINK')
        .setURL('https://status.truebot.xyz')
    );

    await interaction.reply({
      content: `${interaction.user} here are some useful links about True Bot`,
      components: [websiteButton, learnButton, statusPage],
      inline: true,
    });
  },
};
