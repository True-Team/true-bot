/* ========== TICKET SYSTEM ========== */
// The ticket system helps admin an moderators
// manage the issues in the server with an efficient
// and fast system
const {
  PermissionsBitField,
  EmbedBuilder,
  ChannelType,
} = require('discord.js');
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
        type: ChannelType.GuildText,
        topic: String(userIssue),
        nsfw: false,
        permissionOverwrites: [
          {
            //Permissions for all the users in the server
            id: everyoneRole.id,
            deny: [PermissionsBitField.Flahs.ViewChannel],
          },
          {
            //Permissions for the user and moderators
            id: interaction.user.id,
            allow: [
              PermissionsBitField.Flags.SendMessages,
              PermissionsBitField.Flags.Stream,
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.EmbedLinks,
              PermissionsBitField.Flags.ReadMessageHistory,
              PermissionsBitField.Flags.AddReactions,
              PermissionsBitField.Flags.SendTTSMessages,
              PermissionsBitField.Flags.AttachFiles,
              PermissionsBitField.Flags.UseApplicationCommands,
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
    const Embed = new EmbedBuilder()
      .setColor(interaction.user.hexAccentColor)
      .setTimestamp()
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.avatarURL(),
      })
      .setFooter({ text: `Invoked by ${interaction.user.tag}` })
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
