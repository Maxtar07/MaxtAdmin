require(`dotenv`).config();
const Discord = require(`discord.js`);
const config = {
  port: process.env.PORT,

  token: process.env.BOT_TOKEN,
  intents: process.env.DISCORD_INTENTS,
  bot_id: process.env.BOT_ID,

  twitch_oauth: process.env.TWITCH_OAUTH_TOKEN,
  twitch_client_id: process.env.TWITCH_CLIENT_ID,
  twitch_client_secret: process.env.TWITCH_CLIENT_SECRET,
  twitch_streamer_name: process.env.STREAMER_NAME,
  twitch_webhooks_secret: process.env.TWITCH_WEBHOOKS_SECRET,

  youtube_api_key: process.env.YOUTUBE_API_KEY,

  owner_id: process.env.OWNER_ID,
  guild_id: process.env.GUILD_ID,
  log_channel_id: process.env.LOG_CHANNEL_ID,
  twitch_channel_id: process.env.TWITCH_CHANNEL_ID,
  twitch_chat_channel_id: process.env.TWITCH_CHAT_CHANNEL_ID,

  mongo_uri_vps: process.env.MONGO_URI_VPS,
  mongo_uri_vscode: process.env.MONGO_URI_VSCODE,
};
module.exports = { Discord, config };