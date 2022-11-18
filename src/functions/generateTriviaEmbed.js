const { EmbedBuilder, CommandInteraction } = require('discord.js');

/**
 * Generates a random Embed for the trivia integration
 * @param {CommandInteraction} interaction
 * @param {String} name
 * @param {String} value
 * @returns {MessageEmbed} Embed
 */

async function createTriviaEmbed(interaction, name, value) {
  const chooses = ['A', 'B', 'C', 'D'];
  const valuePosition = chooses[Math.floor(Math.random(0, 3))];
  let realValue = '';

  if (valuePosition === 'A') {
    realValue = `**A:** ${value}\n**B:**\n**C:**\n**D:**`;
  } else if (valuePosition === 'B') {
    realValue = `**A:**\n**B: ${value}**\n**C:**\n**D:**`;
  } else if (valuePosition === 'C') {
    realValue = `**A:**\n**B:**\n**C: ${value}**\n**D:**`;
  } else {
    realValue = `**A:**\n**B:**\n**C:**\n**D: ${value}**`;
  }

  const Embed = new EmbedBuilder()
    .setAuthor(interaction.user.tag, interaction.user.avatarURL())
    .setColor('RANDOM')
    .setThumbnail(interaction.user.avatarURL())
    .setTimestamp()
    .setFooter(
      `Invoked by ${interaction.user.username}`,
      interaction.user.avatarURL()
    )
    .addField(name, realValue, false);

  return Embed;
}

module.exports = createTriviaEmbed;
