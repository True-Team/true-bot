const axios = require('axios');

module.exports = {
  name: 'trivia',
  category: 'Games',
  description: 'Quick question about general culture',
  slash: true,

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

    axios.get(
      {
        url: 'https://api.api-ninjas.com/v1/trivia?category=' + category,
        headers: {
          'X-Api-Key': process.env.NINJA_API_KEY,
        },
      },
      function (error, response, body) {
        if (error)
          return interaction.reply({
            content: 'Something went wrong. Please try again later',
          });
      }
    );
  },
};
