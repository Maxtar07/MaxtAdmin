const { Discord, config } = require(`../../utils/config`);
const GuildInfos = require(`../../models/GuildInfos`);
/**
 * 
 * @param {Discord.Client} bot 
 * @param {Discord.Message} message 
 */
module.exports = async (bot, message) => {
  if (message.author.bot) return;
  if (message.inGuild() === false) return;
  //antipub discord
  if ((!(message.channel.id === `726428195636903972` ||
    message.member.roles.cache.find(m => m.id === `844991387668709416`))) && (message.content.toLocaleLowerCase().includes(`twitch.tv`))) {
    await message.delete({ timeout: 0 })
    const targetUserId = message.member.user.id
    const reason = `Attention, les pubs pour Twitch c'est pas ici !`;
    const targetUser = await message.member.guild.members.fetch(targetUserId);
    const warn_embed = new Discord.EmbedBuilder()
      .setColor(`Orange`)
      .setAuthor({
        name: `⚠ Nouveau warn !`,
        iconURL: message.author.avatarURL(),
      })
      .setDescription(`Le membre ${targetUser} a reçu un avertissement.\nRaison: '${reason}'`)

    let guildInfos = await GuildInfos.findOne({ guildId: message.member.guild.id });

    if (guildInfos) {
      guildInfos.guildName = message.member.guild.name
      const users = Array.from(guildInfos.users.values());
      const matchingUsers = users.filter(user => user.userId === targetUserId);
      if (matchingUsers.length > 0) {
        let warnCount = 1;
        const userWarn = matchingUsers[0];
        const warns = userWarn.warns || new Map();

        if (warns.size > 0) {
          const lastKey = Array.from(warns.keys()).pop();
          const lastWarnNumber = parseInt(lastKey.split(` `)[2]);
          warnCount = lastWarnNumber + 1;
        }

        warns.set(`warn numéro ${warnCount}`, { reason: reason, warnerId: bot.user.id, warnerName: bot.user.username, date: new Date().toLocaleString(`fr-FR`, { weekday: `long`, day: `numeric`, month: `long`, year: `numeric`, hour: `numeric`, minute: `numeric` }) });
        warnCount++;

        userWarn.warns = warns;

        guildInfos.markModified(`users`);
        await guildInfos.save();

        await message.channel.send({ embeds: [warn_embed] })
      } else {
        guildInfos.users.set(message.member.user.username, {
          userName: message.member.user.username,
          globalName: message.member.user.globalName ? message.member.user.globalName : message.member.user.username,
          userId: targetUserId,
          hasLeave: false,
          messages: 0,
          xp: 0,
          level: 0,
          warns: new Map([[`warn numéro 1`, {
            reason: reason,
            warnerId: bot.user.id,
            warnerName: bot.user.username,
            date: new Date().toLocaleString(`fr-FR`, { weekday: `long`, day: `numeric`, month: `long`, year: `numeric`, hour: `numeric`, minute: `numeric` })
          }]])
        });
        await message.channel.send({ embeds: [warn_embed] })
      }
      guildInfos.markModified(`users`);
      await guildInfos.save();
    } else {
      const newGuildInfos = new GuildInfos({
        guildId: message.member.guild.id,
        guildName: message.member.guild.name,
        users: new Map([[message.member.user.username, {
          userName: message.member.user.username,
          globalName: message.member.user.globalName ? message.member.user.globalName : message.member.user.username,
          userId: targetUserId,
          hasLeave: false,
          messages: 0,
          xp: 0,
          level: 0,
          warns: new Map([[`warn numéro 1`, {
            reason: reason,
            warnerId: bot.user.id,
            warnerName: bot.user.username,
            date: new Date().toLocaleString(`fr-FR`, { weekday: `long`, day: `numeric`, month: `long`, year: `numeric`, hour: `numeric`, minute: `numeric` })
          }]])
        }]])
      });
      await newGuildInfos.save();
      await message.channel.send({ embeds: [warn_embed] })
    }
  }
};
