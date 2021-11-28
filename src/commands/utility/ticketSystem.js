/* ========== TICKET SYSTEM ========== */
// The ticket system helps admin an moderators
// manage the issues in the server with an efficient
// and fast system
const { Permissions, MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Collection = require('../../models/guildSettings');

mongoose.connect(process.env.MONGO_URI);

module.exports = {
  name: 'ticket',
  category: 'Utility',
  description: '✋Creates a private ticket for support',
  slash: true,
  options: [
    {
      name: 'issue',
      description: 'Talk about your problem',
      required: true,
      type: 3,
    },
  ],

  callback: async ({ interaction }) => {
    Collection.find({});

    const everyoneRole = interaction.guild.roles.cache.find(
      (r) => r.name === '@everyone'
    );

    const userIssue = interaction.options.getString('issue');

    //Creating the ticket channel
    const ticketChannel = await interaction.guild.channels.create(
      `❗${interaction.user.tag}-ticket`,
      {
        type: 'GUILD_TEXT',
        topic: String(userIssue),
        nsfw: false,
        permissionOverwrites: [
          {
            //Permissions for all the users in the server
            id: everyoneRole.id,
            deny: [Permissions.FLAGS.VIEW_CHANNEL],
          },
          {
            //Permissions for the user and moderators
            id: interaction.user.id,
            allow: [
              Permissions.FLAGS.SEND_MESSAGES,
              Permissions.FLAGS.STREAM,
              Permissions.FLAGS.VIEW_CHANNEL,
              Permissions.FLAGS.EMBED_LINKS,
              Permissions.FLAGS.READ_MESSAGE_HISTORY,
              Permissions.FLAGS.ADD_REACTIONS,
              Permissions.FLAGS.SEND_TTS_MESSAGES,
              Permissions.FLAGS.ATTACH_FILES,
              Permissions.FLAGS.USE_APPLICATION_COMMANDS,
            ],
          },
        ],
      }
    );

    //Sending the ticket confirm to the user
    await interaction.reply(
      `${interaction.user} your channel has been created: ${ticketChannel}`
    );

    //Sending a quick resume for moderators
    const Embed = new MessageEmbed()
      .setColor(interaction.user.hexAccentColor)
      .setTimestamp()
      .setAuthor(interaction.user.tag, interaction.user.avatarURL())
      .setFooter(`Invoked by ${interaction.user.tag}`)
      .setThumbnail(interaction.user.avatarURL())
      .addFields(
        {
          name: `Quick resume about **${interaction.user.tag}** Issues`,
          value: `**Created at: ${new Date().toLocaleDateString()}**`,
        },
        {
          name: "👮‍♂️User's details",
          value: `${interaction.user} - ${interaction.user.tag}`,
        },
        {
          name: "🙋‍♂️User's Issue",
          value: userIssue,
        }
      );

    ticketChannel.send({
      content: `${interaction.user} - Quick resume about the Ticket`,
      embeds: [Embed],
    });
  },
};
