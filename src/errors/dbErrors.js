/* ========== DATABASE ERROR HANDLING ========== */
const {
  MessageActionRow,
  MessageButton,
  CommandInteraction,
} = require('discord.js');

/**
 * Function for handling a missed Database connection
 * @param {CommandInteraction} interaction
 */

async function MissingDatabaseConnection(interaction) {
  //Buttons for website redirects
  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel('Status Page')
      .setStyle('LINK')
      .setURL('https://status.truebot.xyz'),

    new MessageButton()
      .setLabel('Report Form')
      .setStyle('LINK')
      .setURL('https://forms.gle/sH97ZjbR7opgU9ic6')
  );

  return await interaction.reply({
    content: `${interaction.user} unable to connect to the database, please try again later.\n**If you see this message more than 5 times, please consider visiting our Status page or reporting the problem.**`,
    ephemeral: true,
    components: [row],
  });
}

module.exports = MissingDatabaseConnection;
