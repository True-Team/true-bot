/* ========== SET VERIFY CHANNEL ========== */
// Sets the verify channel in the guild.
const mongoose = require('mongoose');
const Collection = require('../../models/guildSettings');

mongoose.connect(process.env.MONGO_URI);

module.exports = {
  name: 'verifychannel',
  category: 'Settings',
  description: '📒Sets the verification channel of the guild',
  slash: true,
  permissions: ['BAN_MEMBERS'],
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
      verifyChannel: interaction.options.getString('channel'),
    };

    await Collection.updateOne({ _id: interaction.guild.id }, update);

    await interaction.reply(
      `${interaction.user} The Verify channel has been updated successfully.`
    );
  },
};
