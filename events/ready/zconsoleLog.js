module.exports = (bot) => {
    console.log(`${bot.user.tag} is online`)
    const logChannel = bot.channels.cache.get(`726428190024925212`);
    logChannel.send({ content: `Je suis opérationnel !` });
};