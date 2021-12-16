const { MessageEmbed, CommandInteraction } = require('discord.js');

/**
 * Utility function for creating Embeds in a easy in fast way
 * @param {CommandInteraction} interaction
 * @param {String} name
 * @param {String} value
 * @returns {MessageEmbed} Embed
 */

async function createEmbed(interaction, name, value) {
  const Embed = new MessageEmbed()
    .setAuthor(interaction.user.tag, interaction.user.avatarURL())
    .setColor('RANDOM')
    .setThumbnail(interaction.user.avatarURL())
    .setTimestamp()
    .setFooter(
      `Invoked by ${interaction.user.username}`,
      interaction.user.avatarURL()
    )
    .addField(name, value, false);

  return Embed;
}

module.exports = createEmbed;
