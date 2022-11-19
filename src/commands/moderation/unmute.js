/* ========== UNMUTE COMMAND ========== */
// The command will unmute a previously muted user.
// You'll be able to use the command only if the user
// has been permanently muted. If the time has been
// specified during the mute, the user will be automatically
// unmuted at the end of the time
const mongoose = require('mongoose');
const MissingDatabaseConnection = require('../../errors/dbErrors');
const Collection = require('../../models/guildSettings');

mongoose.connect(process.env.MONGO_URI);

module.exports = {
  name: 'unmute',
  category: 'Moderation',
  description: '📢Use this command to unmute a user',
  slash: true,
  options: [
    {
      name: 'user',
      description: 'The user you want to unmute',
      required: true,
      type: 6,
    },
  ],

  callback: async ({ interaction }) => {
    async function main(guild) {
      //Getting needed parameters
      const realMuteRole = guild.muteRole;
      const roleResolver = interaction.guild.roles.cache.find(
        (r) => r.id === realMuteRole.slice(3, 21)
      );

      const role = interaction.guild.roles.resolve(roleResolver);
      const user = interaction.options.getUser('user');
      const member = interaction.guild.members.resolve(user);

      //Removing the role
      member.roles.remove(role);

      await interaction.reply(`The user ${user} has been unmuted.`);
    }

    Collection.findOne({ _id: interaction.guild.id }).exec((error, data) => {
      if (error) MissingDatabaseConnection(interaction);
      else main(data);
    });
  },
};
