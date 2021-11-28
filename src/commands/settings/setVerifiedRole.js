/* ========== SET VERIFY ROLE ========== */
// Sets the verify role in the guild.
const mongoose = require('mongoose');
const Collection = require('../../models/guildSettings');

mongoose.connect(process.env.MONGO_URI);

module.exports = {
  name: 'verified',
  category: 'Settings',
  description: '🙋‍♂️Sets the role for verified users',
  slash: true,
  permissions: ['BAN_MEMBERS'],
  options: [
    {
      name: 'role',
      description: 'The role you want to set as default verified role',
      required: true,
      type: 3,
    },
  ],

  callback: async ({ interaction }) => {
    const update = {
      verifiedRole: interaction.options.getString('role'),
    };

    await Collection.updateOne({ _id: interaction.guild.id }, update);

    await interaction.reply(
      `${interaction.user} The Verified role has been updated successfully.`
    );
  },
};
