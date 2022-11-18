/* ========== MUTE COMMAND ========== */
// The command will kick a user from the guild
const { EmbedBuilder } = require('discord.js');
const mongoose = require('mongoose');
const Collection = require('../../models/guildSettings');

mongoose.connect(process.env.MONGO_URI);

module.exports = {
  name: 'mute',
  category: 'Moderation',
  description: '🔇Use this command to mute a user',
  slash: true,
  options: [
    {
      name: 'user',
      description: 'The user you want to kick',
      required: true,
      type: 6,
    },
    {
      name: 'time',
      description: 'How long you want the user to be muted for. (Minutes)',
      required: false,
      type: 4,
    },
    {
      name: 'reason',
      description: 'Why you want to kick the user',
      required: false,
      type: 3,
    },
  ],

  callback: async ({ interaction }) => {
    const colors = ['#008000', '#00ff00', '#32cd32', '#00a550'];
    let color = colors[Math.floor(Math.random() * 4)];

    const Embed = new EmbedBuilder()
      .setColor(color)
      .setAuthor({
        name: `Moderator: ${interaction.user.username}#${interaction.user.discriminator}`,
      })
      .setThumbnail(interaction.options.getUser('user').avatarURL())
      .setFooter({
        text: `Invoked by ${interaction.user.username}#${interaction.user.discriminator}`,
      })
      .setTimestamp()
      .addFields({
        name: 'User mute case',
        value: `The user **${
          interaction.options.getUser('user').username
        }** has been muted with the following reason:\n**${
          interaction.options.getString('reason') || 'No reason provided'
        }**`,
        inline: true,
      });

    //Getting mute time from interaction options and
    //Calculating the time in minutes
    const getMuteTime = interaction.options.getInteger('time');
    const muteTimeInMs = getMuteTime * 60000;

    //Getting guild and role id
    const guildQuerey = await Collection.find({});
    const muteRoleId = guildQuerey[0].muteRole;

    //Getting role from the guild and adding it to the user
    const roleResolver = interaction.guild.roles.cache.find(
      (r) => r.id === muteRoleId.slice(3, 21)
    );
    const role = interaction.guild.roles.resolve(roleResolver);
    const user = interaction.options.getUser('user');
    const member = interaction.guild.members.resolve(user);

    if (getMuteTime) {
      await interaction.reply({ embeds: [Embed] });

      member.roles.add(role);

      setTimeout(() => {
        member.roles.remove(role);
      }, muteTimeInMs);
    } else if (!getMuteTime) {
      await interaction.reply({ embeds: [Embed] });

      member.roles.add(role);
    }
  },
};
