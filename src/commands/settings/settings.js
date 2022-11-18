/* ========== SETTINGS SYSTEM ========== */
// The settings command will show the user
// all the settings of the guild with their
// values
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const mongoose = require('mongoose');
const Collection = require('../../models/guildSettings');
const MissingDatabaseConnection = require('../../errors/dbErrors');

mongoose.connect(process.env.MONGO_URI);

module.exports = {
  name: 'settings',
  category: 'Settings',
  description: "🚧Get the True's current guild's preferences and settings",
  slash: true,

  callback: async ({ interaction }) => {
    async function main(guild) {
      //Creating the Embeds to display the settings for the guild
      const Embed = new EmbedBuilder()
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.avatarURL(),
        })
        .setColor('Orange')
        .setTimestamp()
        .setThumbnail(interaction.guild.iconURL())
        .setFooter({ text: `Invoked by ${interaction.user.tag}` })
        .addFields(
          {
            name: `🔐${interaction.guild.name} Settings`,
            value: `${interaction.user} in this page you'll see the preferences and settings for the following guild.`,
          },
          {
            name: '🛰 True Bot Preferences',
            value: `**Server Owner:** ${
              guild.serverOwner || 'No server owner has been set'
            }\n**Staff Role:** ${
              guild.staffRole || 'No Staff role has been set'
            }\n**Verified Role:** ${
              guild.verifiedRole || 'No verified role has been set.'
            }\n**Mute Role:** ${
              guild.muteRole || 'No mute role has been set.'
            }\n**Verify channel:** ${
              guild.verifyChannel || 'No verify channel has been set.'
            }\n**Logging Channel:** ${
              guild.loggingChannel || 'No logging channel has been set.'
            }`,
          }
        );

      const Embed2 = new EmbedBuilder()
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.avatarURL(),
        })
        .setColor('Orange')
        .setTimestamp()
        .setThumbnail(interaction.guild.iconURL())
        .setFooter(`Invoked by ${interaction.user.tag}`)
        .addFields(
          {
            name: '🚄True Bot Systems',
            value: `Check if your guild has enabled all True's systems in order to get the best performances and security.`,
          },
          {
            name: '✅Verification System',
            value:
              "The verification system has been enabled and it's working correctly.",
            inline: true,
          },
          {
            name: '✅Logging System',
            value:
              "The verification system has been enabled and it's working correctly.",
            inline: true,
          },
          {
            name: '🙋‍♂️Final verdict',
            value:
              'The guild is **COMPLETELY Secure** and has a protection and efficiency rate of **100%**.',
          }
        );

      const Embed3 = new EmbedBuilder()
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.avatarURL(),
        })
        .setColor('Orange')
        .setTimestamp()
        .setThumbnail(interaction.guild.iconURL())
        .setFooter(`Invoked by ${interaction.user.tag}`)
        .addFields(
          {
            name: '🚄True Bot Systems',
            value: `Check if your guild has enabled all True's systems in order to get the best performances and security.`,
          },
          {
            name: '❌Verification System',
            value: "The verification system hasn't been enabled.",
            inline: true,
          },
          {
            name: '❌Logging System',
            value: "The verification system hasn't been enabled.",
            inline: true,
          },
          {
            name: '🙋‍♂️Final verdict',
            value:
              'The guild is **NOT Secure** and has a protection and efficiency rate of **0%**.\n\nIn order to get better performances and the best security, we suggest you to enable both Verification and Logging System.',
          }
        );

      const Embed4 = new EmbedBuilder()
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.avatarURL(),
        })
        .setColor('Orange')
        .setTimestamp()
        .setThumbnail(interaction.guild.iconURL())
        .setFooter(`Invoked by ${interaction.user.tag}`)
        .addFields(
          {
            name: '🚄True Bot Systems',
            value: `Check if your guild has enabled all True's systems in order to get the best performances and security.`,
          },
          {
            name: '❌Verification System',
            value: "The verification system hasn't been enabled.",
            inline: true,
          },
          {
            name: '✅Logging System',
            value:
              "The verification system has been enabled and it's working correctly.",
            inline: true,
          },
          {
            name: '🙋‍♂️Final verdict',
            value:
              'The guild is **PARTIALLY Secure** and has a protection and efficiency rate of **40%**.\n\nIn order to get the best security, we suggest you to enable the Verification System.',
          }
        );

      const Embed5 = new EmbedBuilder()
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.avatarURL(),
        })
        .setColor('Orange')
        .setTimestamp()
        .setThumbnail(interaction.guild.iconURL())
        .setFooter(`Invoked by ${interaction.user.tag}`)
        .addFields(
          {
            name: '🚄True Bot Systems',
            value: `Check if your guild has enabled all True's systems in order to get the best performances and security.`,
          },
          {
            name: '✅Verification System',
            value:
              "The verification system has been enabled and it's working correctly.",
            inline: true,
          },
          {
            name: '❌Logging System',
            value: "The logging system hasn't been enabled.",
            inline: true,
          },
          {
            name: '🙋‍♂️Final verdict',
            value:
              'The guild is **PARTIALLY Secure** and has a protection and efficiency rate of **60%**.\n\nIn order to get better performances and have an extended control over the guild, we suggest you to enable the Logging System.',
          }
        );

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel('▶')
          .setStyle('Primary')
          .setCustomId('go-ahead-button')
      );

      interaction.reply({
        embeds: [Embed],
        components: [row],
      });

      //Creating an event listener for the button click
      const filter = (i) => {
        return i.customId === 'go-ahead-button';
      };

      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        time: 60000,
      });

      collector.on('collect', (i) => {
        if (i.customId === 'go-ahead-button') {
          if (
            interaction.guild.channels.cache.get(
              String(guild.verifyChannel).slice(2, 20)
            ) &&
            interaction.guild.channels.cache.get(
              String(guild.loggingChannel).slice(2, 20)
            )
          ) {
            //The guild has both Verification and Logging System
            interaction.followUp({ embeds: [Embed2] });

            //Stopping collector
            collector.stop();
          } else if (
            !interaction.guild.channels.cache.get(
              String(guild.verifiedRole).slice(3, 21)
            ) &&
            !interaction.guild.channels.cache.get(
              String(guild.loggingChannel).slice(2, 20)
            )
          ) {
            //The guild doesn't have both Verifaction and Logging System
            interaction.followUp({ embeds: [Embed3] });

            //Stopping collector
            collector.stop();
          } else if (
            interaction.guild.channels.cache.get(
              String(guild.verifiedRole).slice(3, 21)
            ) &&
            !interaction.guild.channels.cache.get(
              String(guild.loggingChannel).slice(2, 20)
            )
          ) {
            //The guild has only the Logging system
            interaction.followUp({ embeds: [Embed4] });

            //Stopping collector
            collector.stop();
          } else if (
            !interaction.guild.channels.cache.get(
              String(guild.verifiedRole).slice(3, 21)
            ) &&
            interaction.guild.channels.cache.get(
              String(guild.loggingChannel).slice(2, 20)
            )
          ) {
            //The guild has only the Verification system
            interaction.followUp({ embeds: [Embed5] });

            //Stopping collector
            collector.stop();
          }
        }
      });
    }

    Collection.findOne(
      { _id: interaction.guild.id },
      async function (error, data) {
        if (error) {
          MissingDatabaseConnection(interaction);
        } else {
          main(data);
        }
      }
    );
  },
};
