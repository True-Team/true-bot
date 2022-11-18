/* ========== SERVER OWNER ========== */
// Sets the server owner in the guild
const mongoose = require('mongoose');
const Collection = require('../../models/guildSettings');

mongoose.connect(process.env.MONGO_URI);

module.exports = {
  name: 'setowner',
  category: 'Settings',
  description: '👑Sets the owner for the current server',
  slash: true,
  options: [
    {
      name: 'user',
      description: 'The user you want to set as server owner',
      required: true,
      type: 3,
    },
  ],

  callback: async ({ interaction }) => {
    const update = {
      serverOwner: interaction.options.getString('user'),
    };

    await Collection.updateOne({ _id: interaction.guild.id }, update);

    await interaction.reply(
      `${interaction.user} The Server owner has been updated successfully.`
    );
  },
};
