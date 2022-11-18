/* ========== WARN COMMAND ========== */
// The command will warn in DMs a user
module.exports = {
  name: 'warn',
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
    {
      name: 'text',
      description: 'Why you want to alert the user',
      required: false,
      type: 3,
    },
  ],

  callback: async ({ interaction }) => {
    const user = interaction.options.getUser('user');
    const text = interaction.options.getString('text');

    user.send(text);

    await interaction.reply(
      `${interaction.user} the user has been warned successfully.`
    );
  },
};
