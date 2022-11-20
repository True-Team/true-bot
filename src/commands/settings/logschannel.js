/* ========== SET LOGGING CHANNEL ========== */
// Sets the logging channel in the guild.
const mongoose = require('mongoose');
const Collection = require('../../models/guildSettings');

mongoose.connect(process.env.MONGO_URI);

module.exports = {
  name: 'logschannel',
  category: 'Settings',
  description: '👀Sets the logs channel of the guild',
  slash: true,
  options: [
    {
      name: 'channel',
      description: 'The channel you want to set as default logging channel',
      required: true,
      type: 3,
    },
  ],

  callback: async ({ interaction }) => {
    const update = {
      loggingChannel: interaction.options.getString('channel'),
    };

    await Collection.updateOne({ _id: interaction.guild.id }, update);

    await interaction.reply(
      `${interaction.user} The Logging channel has been updated successfully.`
    );
  },
};
