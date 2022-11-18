/* ========== HELP COMMAND ========== */
// A simple help command for True bot
const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  category: 'Utility',
  description: '📚Learn more about True Bot',
  slash: true,

  callback: async ({ interaction }) => {
    const websiteButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Website')
        .setStyle('Link')
        .setURL('https://truebot.xyz')
    );
    const learnButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Learning Platform')
        .setStyle('Link')
        .setURL('https://learn.truebot.xyz')
    );

    const statusPage = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Status Page')
        .setStyle('Link')
        .setURL('https://status.truebot.xyz')
    );

    await interaction.reply({
      content: `${interaction.user} here are some useful links about True Bot`,
      components: [websiteButton, learnButton, statusPage],
      inline: true,
    });
  },
};
