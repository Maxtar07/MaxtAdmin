const { Discord } = require(`../../utils/config`);
/**
 * 
 * @param {Discord.Client} bot 
 * @param {Error} error 
 */
module.exports = async (bot, error) => {
    console.error(error)
    const logChannel = bot.channels.cache.get(`726428190024925212`);
    logChannel.send({ content: `${error}` })
};
