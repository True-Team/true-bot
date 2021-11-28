/* ========== REDDIT API ========== */
// This integration will send random memes from
// r/meme subreddit.
const { reddit } = require('reddit.images');

module.exports = {
  name: 'meme',
  category: 'APIs',
  description: '😂Sends a random meme from Reddit',
  slash: true,

  callback: async ({ interaction }) => {
    try {
      reddit.FetchRandomMeme({ images: true }).then((data) => {
        interaction.reply(data.image);
      });
    } catch (error) {
      console.error(error);
      await interaction.reply(
        `${interaction.user} we're sorry but there was an error while trying to communicate with the API. Please try-again later.`
      );
    }
  },
};
