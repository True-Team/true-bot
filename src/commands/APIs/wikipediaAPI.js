/* ========== WIKIPEDIA API ========== */
// The integration will create a summary of a wikipedia
// page, basd on what you've searched.
const { MessageEmbed } = require('discord.js');
const wiki = require('wikipedia');

module.exports = {
  name: 'search',
  category: 'APIs',
  description: '🔎Searches for seomthing on Wikipedia',
  slash: true,
  options: [
    {
      name: 'text',
      description: 'What you want to search',
      required: true,
      type: 3,
    },
  ],

  callback: async ({ interaction }) => {
    try {
      const result = await wiki.summary(interaction.options.getString('text'));

      const Embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTimestamp()
        .setThumbnail(interaction.user.avatarURL())
        .setFooter(`Invoked by ${interaction.user.tag}`)
        .addFields({
          name: result.title,
          value: result.extract,
        });

      await interaction.reply({ embeds: [Embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply(
        `${interaction.user} we're sorry but there was an error while trying to communicate with the API. Please try-again later.`
      );
    }
  },
};
