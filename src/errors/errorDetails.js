/* ========== DATABASE ERROR HANDLING ========== */
const {
  MessageActionRow,
  MessageButton,
  CommandInteraction,
} = require('discord.js');
const createEmbed = require('../functions/generateEmbed');

/**
 * Function for handling a missed Database connection
 * @param {CommandInteraction} interaction
 * @param {String} error
 * @returns {MessageEmbed} Embed
 */

async function GetErrorDetails(interaction, error) {
  //Buttons for website redirects
  const row = new MessageActionRow().addComponents(
    new MessageButton().setLabel('YES').setStyle('SUCCESS').setCustomId('yes'),
    new MessageButton().setLabel('NO').setStyle('PRIMARY').setCustomId('no')
  );

  await interaction.reply({
    content: `${interaction.user} Do you want to gert the full error? **`,
    ephemeral: true,
    components: [row],
  });

  const collector = interaction.channel.createMessageComponentCollector({
    time: 60000,
  });

  collector.on('collect', async (i) => {
    if (i.customId === 'yes') {
      createEmbed(interaction, 'Full Error details', error)
        .then(async function (data) {
          return await interaction.reply({ embeds: [data] });
        })
        .catch(async function (error) {
          console.log(error);
          return await interaction.reply(
            'Something went wrong. please try again later'
          );
        });
    } else if (i.customId === 'no') {
      return await interaction.reply('Erroor details not requested.');
    }
  });
}

module.exports = GetErrorDetails;
