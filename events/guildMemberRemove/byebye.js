const Discord = require(`discord.js`);
const GuildInfos = require(`../../models/GuildInfos`);
/**
 * 
 * @param {Discord.Client} bot 
 * @param {Discord.GuildMember} member 
 */
module.exports = async (bot, member) => {
  const guild = member.guild;
  if (!guild) return;

  const channelId = `726428190427447362`;

  const byebyeChannel = guild.channels.cache.get(channelId);
  if (!byebyeChannel) return;

  const byebyeEmbed = new Discord.EmbedBuilder()
    .setColor(`#ff0000`)
    .setTitle(`Au revoir`)
    .setDescription(`Aller va t'en ${member.user.globalName} !`)
    .setThumbnail(member.user.displayAvatarURL());

  byebyeChannel.send({ embeds: [byebyeEmbed] })
};
