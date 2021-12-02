/* ========== REDDIT API ========== */
// This integration will send random memes from
// r/meme subreddit.
const reddit = require('reddit-image-fetcher');

module.exports = {
  name: 'meme',
  category: 'APIs',
  description: '😂Sends a random meme from Reddit',
  slash: true,

  callback: async ({ interaction }) => {
    try {
      reddit.fetch({ type: 'meme' }).then((data) => {
        interaction.reply(data[0].image);
      });
    } catch (error) {
      console.error(error);
      interaction.reply(
        `${interaction.user} we're sorry but there was an error while trying to communicate with the API. Please try-again later.`
      );
    }
  },
};
