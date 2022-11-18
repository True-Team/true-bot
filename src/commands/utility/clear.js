/* ========== CLEAR COMMAND ========== */
// The command will purge a text channel in the
// guild. In no amount will be specified, the bot
// will automatically delete 100 messages
module.exports = {
  name: 'clear',
  category: 'Utility',
  description: '🧹Deletes some messages in a text channel',
  slash: true,
  options: [
    {
      name: 'amount',
      description: 'How many messages you want to delete',
      required: false,
      type: 4,
    },
  ],

  callback: async ({ interaction }) => {
    const amount = interaction.options.getInteger('amount');

    if (isNaN(amount)) {
      interaction.reply('Not a valid number. Please try again.');
    } else {
      if (amount > 100) {
        //Amount is greater thab 100
        await interaction.reply("You can't delete more than 100 messages.");
      } else if (amount === 0 || amount === null || amount === undefined) {
        //No amount paramater has been passed
        interaction.channel.bulkDelete(100, true);
        await interaction.reply('```arm\n100 messages have been deleted.```');
      } else {
        //Amount paramter has been passed
        interaction.channel.bulkDelete(amount, true);
        await interaction.reply(
          `\`\`\`arm\n${amount || 0} messages have been deleted.\`\`\``
        );

        const time = 5000;

        setTimeout(() => {
          interaction.channel.bulkDelete(1);
        }, time);
      }
    }
  },
};
