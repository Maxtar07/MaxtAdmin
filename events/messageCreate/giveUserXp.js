const Discord = require(`discord.js`);
const GuildInfos = require(`../../models/GuildInfos`);
const cooldowns = new Set();
const calculateLevelXp = require(`../../utils/calculateLevelXp`);
/**
 * 
 * @param {Discord.Client} bot 
 * @param {Discord.Message} message 
 */
module.exports = async (bot, message) => {
  if (message.webhookId) return;
  if (!message.inGuild() || cooldowns.has(message.author.id)) return;

  const xpToGive = getRandomXp(5, 15);
  let guildLevel = await GuildInfos.findOne({ guildId: message.guild.id });

  if (guildLevel) {
    guildLevel.guildName = message.guild.name
    const users = Array.from(guildLevel.users.values());
    const matchingUsers = users.filter(user => user.userId === message.author.id);
    if (matchingUsers.length > 0) {
      let userLevel = matchingUsers[0];
      if (userLevel.userName !== message.author.username) {
        const newUsername = message.author.username;
        const oldUsername = userLevel.userName;
        // Supprimer l'ancienne entrée de la carte
        guildLevel.users.delete(oldUsername);
        // Mettre à jour le nom d'utilisateur et réinsérer l'entrée dans la carte
        userLevel.userName = newUsername;
        guildLevel.users.set(`${newUsername}`, userLevel);
      }
      userLevel.messages += 1;
      userLevel.xp += xpToGive;
      // Mise à jour du nom d'utilisateur uniquement si le nom a changé
      if (userLevel.xp > calculateLevelXp(userLevel.level)) {
        userLevel.xp = 0;
        userLevel.level += 1;
        const xp_embed = new Discord.EmbedBuilder()
          .setColor(`White`)
          .setAuthor({
            name: `⏫Niveau supérieur`,
            iconURL: message.author.avatarURL(),
          })
          .setDescription(`${message.author.globalName || message.author.username} viens de passer niveau **${userLevel.level}**`)
        message.channel.send({ embeds: [xp_embed] });
      }
    } else {
      guildLevel.users.set(message.author.username, {
        userName: message.author.username,
        globalName: message.author.globalName ? message.author.globalName : message.author.username,
        userId: message.author.id,
        hasLeave: false,
        messages: 1,
        xp: xpToGive,
        level: 0,
        warns: []
      });
    }
    guildLevel.markModified(`users`);
    await guildLevel.save();
  } else {
    const newGuildInfos = new GuildInfos({
      guildId: message.guild.id,
      guildName: message.guild.name,
      users: new Map([[message.author.username, {
        userName: message.author.username,
        globalName: message.author.globalName ? message.author.globalName : message.author.username,
        userId: message.author.id,
        hasLeave: false,
        messages: 1,
        xp: xpToGive,
        level: 0,
        warns: []
      }]])
    });
    await newGuildInfos.save();
  }
  cooldowns.add(message.author.id);
  setTimeout(() => {
    cooldowns.delete(message.author.id);
  }, 3000);
};
function getRandomXp(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}