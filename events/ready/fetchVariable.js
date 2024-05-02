const Discord = require(`discord.js`);
module.exports = async (bot) => {
    bot.intervalpresence = null
    bot.inviteloggercollection = new Discord.Collection();
};