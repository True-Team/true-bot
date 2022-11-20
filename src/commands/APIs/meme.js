/* ========== REDDIT API ========== */
// This integration will send random memes from
// r/meme subreddit.
const memes = require('random-memes');
const { CommandType } = require('wokcommands');

module.exports = {
  name: 'meme',
  category: 'APIs',
  description: '😂Sends a random meme from Reddit',
  slash: true,

  callback: async ({ interaction }) => {
    memes.fromReddit('en').then((meme) => {
      interaction.reply({ content: meme.image });
    });
  },
};
