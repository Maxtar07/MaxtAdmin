const { Discord } = require(`../../utils/config`);
/**
 * 
 * @param {Discord.Client} bot 
 * @param {Discord.Message} message 
 */
module.exports = async (bot, message) => {
  if (message.author.bot) return;
  if (message.inGuild() === false) return;
  if (message.channel.id === `726428192403095625`) message.delete()
};
