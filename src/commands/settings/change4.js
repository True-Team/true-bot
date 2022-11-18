/* ========== CHANGE4 COMMAND ========== */
// Add the logging system in the guild
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

module.exports = {
  name: 'change4',
  category: 'Settings',
  description: '🔧Adds the logging system',
  slash: true,

  callback: async ({ interaction }) => {
    //Creating the channel
    await interaction.guild.channels.create('👀logs', {
      type: 'GUILD_TEXT',
      nsfw: false,
    });

    await interaction.reply(
      `${interaction.user} the logging system has been added correctly.`
    );
  },
};
