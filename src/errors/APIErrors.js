const {
  MessageActionRow,
  MessageButton,
  CommandInteraction,
} = require('discord.js');

/**
 * Function for handling general APIs errors
 * @param {CommandInteraction} interaction
 */

async function ExternalAPIError(interaction) {
  //Buttons for website redirects
  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel('Website')
      .setStyle('LINK')
      .setURL('https://truebot.xyz'),

    new MessageButton()
      .setLabel('Report Form')
      .setStyle('LINK')
      .setURL('https://forms.gle/sH97ZjbR7opgU9ic6')
  );

  return await interaction.reply({
    content: `${interaction.user} there was an error while trying to communicate with the API.\n**If you see this message more than 5 times, please consider visiting our website or reporting the problem.**`,
    ephemeral: true,
    components: [row],
  });
}

module.exports = ExternalAPIError;
