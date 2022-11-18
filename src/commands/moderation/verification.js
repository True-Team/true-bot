/* ========== VERIFICATION SYSTEM ========== */
// The verification system will help to secure your system.
// It will generate a random Captcha that the user has to
// solve. After solving the captcha, the user will be verified
// in the guild and will recive a Verified role.
const { EmbedBuilder } = require('discord.js');
const mongoose = require('mongoose');
const Collection = require('../../models/guildSettings');

mongoose.connect(process.env.MONGO_URI);

const superchargeString = require('@supercharge/strings');

module.exports = {
  name: 'verify',
  category: 'Moderation',
  description:
    '🙋‍♂️Verify yourself in the server by completing a simple Captcha.',
  slash: true,

  callback: async ({ interaction }) => {
    const guildSettings = await Collection.findOne({
      _id: interaction.guild.id,
    });

    const verifiedRoleID = guildSettings.verifiedRole;

    const user = interaction.guild.members.resolve(interaction.user.id);
    const captchaPassword = superchargeString.random(10);

    //Seding the user the Catpcha to solve
    const Embed = new EmbedBuilder()
      .setColor('Blue')
      .setAuthor({
        name: `${interaction.user.tag}`,
        iconURL: interaction.user.avatarURL(),
      })
      .setThumbnail(interaction.user.avatarURL())
      .setFooter({
        text: `Invoked by ${interaction.user.username}#${interaction.user.discriminator}`,
      })
      .setTimestamp()
      .addFields(
        {
          name: ':shield: Verification System',
          value: `${user} complete the following **Captcha** to get verified in the server.\nIn order to complete, **write in the chat the text that is showing you:**`,
          inline: true,
        },
        {
          name: 'CAPTCHA PASSWORD:',
          value: `**\`\`\`arm\n${captchaPassword}\`\`\`**`,
        }
      );

    await interaction.reply({ embeds: [Embed], ephemeral: true });

    //Getting the user input from the message channel
    const filter = (m) => {
      return (
        m.content === captchaPassword && m.author.id === interaction.user.id
      );
    };
    const collector = interaction.channel.createMessageCollector(filter, {
      time: 15000,
    });

    collector.on('collect', async (m) => {
      //Getting role and user
      const roleResolver = interaction.guild.roles.cache.find(
        (r) => r.id === verifiedRoleID.slice(3, 21)
      );
      const role = interaction.guild.roles.resolve(roleResolver);
      const user = interaction.guild.members.resolve(interaction.user.id);

      //Checking if the Captcha is right
      if (m.content === captchaPassword) {
        //Adding the role to the user
        user.roles.add(role);

        //Stopping collector
        collector.stop();

        await interaction.followUp(
          `Congrats ${interaction.user} you've completed the Captcha. You're now a verified member in the guild.`
        );
      } else {
        //Stopping collector
        collector.stop();

        //The Captcha is wrong
        await interaction.followUp(
          `${user} your Captcha is wrong. Please try again.`
        );
      }
    });
  },
};
