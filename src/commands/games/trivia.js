const axios = require('axios');
const createTriviaEmbed = require('../../functions/generateEmbed');
const ExternalAPIError = require('../../errors/APIErrors');

module.exports = {
  name: 'trivia',
  category: 'Games',
  description: 'Quick question about general culture',
  slash: true,
  testOnly: true,

  callback: async ({ interaction }) => {
    let categories = [
      'artliterature',
      'language',
      'sciencenature',
      'general',
      'fooddrink',
      'geography',
      'historyholidays',
      'entertainment',
      'toysgames',
      'music',
      'mathematics',
      'religionmythology',
      'sportsleisure',
    ];

    let category = categories[Math.floor(Math.random(0, 12))];

    await axios
      .get(`https://api.api-ninjas.com/v1/trivia?category=${category}`, {
        headers: {
          'X-Api-Key': process.env.NINJA_API_KEY,
        },
      })
      .then(async function (response) {
        const data = response.data[0];

        createTriviaEmbed(interaction, data.question, data.answer)
          .then(async function (data) {
            await interaction.reply({ embeds: [data] });
          })
          .catch(async function (error) {
            ExternalAPIError(interaction);
          });
      })
      .catch(async function (error) {
        console.log(error);
        await interaction.reply({
          content: 'Something went wrong. Please try again later',
          ephemeral: true,
        });
      });
  },
};
