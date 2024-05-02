const { Discord } = require(`../../utils/config`);
/**
 * 
 * @param {Discord.Client} bot 
 * @param {Discord.Message} message 
 */
module.exports = async (bot, message) => {
  if (message.author.bot) return;
  if (message.webhookId) return;
  if (message.inGuild() === false) return;

  const channelName = message.channel.name;
  const memberId = channelName.split(`-`)[0];

  if (!memberId || isNaN(memberId)) return;
  const member = await bot.users.fetch(memberId);

  let urls = [];
  if (message.attachments.size > 0) {
    for (const attachment of message.attachments) {
      urls.push(attachment[1].url);
    }
    member.send({ content: message.content, files: urls });
  } else {
    member.send({ content: message.content })
  }
};
