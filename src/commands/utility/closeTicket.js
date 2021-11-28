/* ========== CLOSE TICKET COMMAND ========== */
// The command will close a previoously created
// ticket channel
module.exports = {
  name: 'close',
  category: 'Utility',
  description: '🔒Close an existing ticket',
  slash: true,
  permissions: ['BAN_MEMBERS'],

  callback: async ({ interaction }) => {
    await interaction.reply(
      'The channel will be deleted in the next 5 seconds.'
    );

    //Deleting the channel
    setTimeout(() => {
      interaction.channel.delete('Closing the current ticket');
    }, 5000);
  },
};
