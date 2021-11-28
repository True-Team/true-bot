/* ========== MUTE ROLE ROLE ========== */
// Sets the mute role in the guild
const mongoose = require('mongoose');
const Collection = require('../../models/guildSettings');

mongoose.connect(process.env.MONGO_URI);

module.exports = {
  name: 'muterole',
  category: 'Settings',
  description: '🔕Sets the role for muted users',
  slash: true,
  permissions: ['BAN_MEMBERS'],
  options: [
    {
      name: 'role',
      description: 'The role you want to set as default mute role',
      required: true,
      type: 3,
    },
  ],

  callback: async ({ interaction }) => {
    const update = {
      muteRole: interaction.options.getString('role'),
    };

    await Collection.updateOne({ _id: interaction.guild.id }, update);

    await interaction.reply(
      `${interaction.user} The Mute role has been updated successfully.`
    );
  },
};
