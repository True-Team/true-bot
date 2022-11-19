/* ========== CHANGE1 COMMAND ========== */
// Removes the verification system in the guild
const mongoose = require('mongoose');
const MissingDatabaseConnection = require('../../errors/dbErrors');
const Collection = require('../../models/guildSettings');

mongoose.connect(process.env.MONGO_URI);

module.exports = {
  name: 'change1',
  category: 'Settings',
  description: '🔧Removes the verification system',
  slash: true,

  callback: async ({ interaction }) => {
    async function main(guild) {
      const verifyChannel = guild.verifyChannel;
      const verifiedRole = guild.verifiedRole;

      //Getting channel and role from Database
      const channel = interaction.guild.channels.cache.get(
        String(verifyChannel).slice(2, 20)
      );
      const role = interaction.guild.roles.cache.get(
        String(verifiedRole).slice(3, 20)
      );

      //Deleting channel and role
      channel.delete();
      role.delete();

      await interaction.reply(
        `${interaction.user} The verification system has been deleted successfully.`
      );
    }

    Collection.findOne({ _id: interaction.guild.id }).exec((error, data) => {
      if (error) MissingDatabaseConnection(interaction);
      else main(data);
    });
  },
};
