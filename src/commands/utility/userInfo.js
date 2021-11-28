/* ========== USER INFO COMMAND ========== */
// The command will return some useful informations
// about the user you've selected
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'whois',
  category: 'Utility',
  description: '📋Return all the informations about a User',
  slash: true,
  options: [
    {
      name: 'user',
      description: 'The user you want to ban',
      required: true,
      type: 6,
    },
  ],
  callback: async ({ interaction }) => {
    //Getting the user from the options
    const user = interaction.options.getUser('user');
    const member = interaction.guild.members.resolve(user);

    const Embed = new MessageEmbed()
      .setColor('#ff4500')
      .setThumbnail(user.avatarURL())
      .setAuthor(user.tag, user.avatarURL())
      .setTimestamp()
      .setFooter(
        `Invoked by ${interaction.user.username}#${interaction.user.discriminator}`
      )
      .addFields(
        {
          name: `📋User Informations`,
          value: '**==============================**',
        },
        {
          name: '🙋‍♂️Username',
          value: `${user.tag} - ${user}`,
        },
        {
          name: '🐍Bot',
          value: `${String(user.bot).toUpperCase()}`,
        },
        {
          name: '⌚Created Discord account',
          value: new Date(user.createdTimestamp).toLocaleDateString(),
        },
        {
          name: '💂‍♂️Number of roles',
          value: `${member.roles.cache.size - 1}`,
        }
      );

    await interaction.reply({ embeds: [Embed] });
  },
};
