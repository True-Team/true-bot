//Base database template for guid settings features
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guildSettingsSchema = new Schema(
  {
    _id: String,
    serverOwner: String,
    staffRole: String,
    verifyChannel: String,
    loggingChannel: String,
    verifiedRole: String,
    muteRole: String,
  },
  { collection: 'Guild_Settings' }
);

const GuildSchema = mongoose.model('GuildSchema', guildSettingsSchema);

module.exports = GuildSchema;
