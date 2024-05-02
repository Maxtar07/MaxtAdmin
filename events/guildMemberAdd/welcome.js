const Discord = require(`discord.js`);
/**
 * 
 * @param {Discord.Client} bot 
 * @param {Discord.GuildMember} member 
 */
module.exports = async (bot, member) => {
  var boy = member.guild.roles.cache.find(x => x.id === `726428190012211216`);
  var girl = member.guild.roles.cache.find(x => x.id === `726428190012211217`);
  var nb = member.guild.roles.cache.find(x => x.id === `824740975242117191`);
  const boyButtonId = `boyrole`;
  const boyButtonLabel = `Garçon`;
  const boyButtonStyle = `Primary`;
  const girlButtonId = `girlrole`;
  const girlButtonLabel = `Fille`;
  const girlButtonStyle = `Primary`;
  const nbButtonId = `nbrole`;
  const nbButtonLabel = `Non-binaire`;
  const nbButtonStyle = `Primary`;
  const boybutton = new Discord.ButtonBuilder()
    .setStyle(boyButtonStyle)
    .setEmoji(`👦`)
    .setLabel(boyButtonLabel)
    .setCustomId(boyButtonId);
  const girlbutton = new Discord.ButtonBuilder()
    .setStyle(girlButtonStyle)
    .setEmoji(`👧`)
    .setLabel(girlButtonLabel)
    .setCustomId(girlButtonId);
  const nbbutton = new Discord.ButtonBuilder()
    .setStyle(nbButtonStyle)
    .setEmoji(`🏳️‍🌈`)
    .setLabel(nbButtonLabel)
    .setCustomId(nbButtonId);
  const invites = bot.inviteloggercollection
  const guild = member.guild;
  if (!guild) return;
  const welcomeChannel = guild.channels.cache.get(`726428190427447360`);
  if (!welcomeChannel) return;
  const newInvites = await member.guild.invites.fetch();
  const oldInvites = await invites.get(member.guild.id);
  const invite = newInvites.find(i => i.uses > oldInvites.get(i.code));
  let inviter;
  if (!member.bot) inviter = await bot.users.fetch(invite.inviter.id)
  const boygirlnbrow = new Discord.ActionRowBuilder().addComponents(nbbutton, girlbutton, boybutton);

  const welcomeEmbedInviter = new Discord.EmbedBuilder()
    .setColor(`DarkGreen`)
    .setTitle(`Bienvenue ${member.user.globalName} !`)
    .setDescription(`**Réagit avec un des boutons ci-dessous selon ce qui te correspond pour pouvoir accéder au reste du serveur:**
🏳️‍🌈 - Pour obtenir le rôle ${nb}
👧 - Pour obtenir le rôle ${girl}
👦 - Pour obtenir le rôle ${boy}\n
Pour découvrir les différentes catégories disponibles sur le serveur, aller dans <#726428190427447365> pour voir quelques petites explications en plus.
`)
    .setThumbnail(member.user.displayAvatarURL())
    .setFooter({ text: `à rejoin grâce à ${inviter.globalName} avec son code: '${invite.code}'. (${inviter.globalName} cumule maintenant ${invite.uses} invitations)` })

  const welcomeEmbed = new Discord.EmbedBuilder()
    .setColor(`DarkGreen`)
    .setTitle(`Bienvenue ${member.user.globalName} `)
    .setDescription(`**Réagit avec un des boutons ci-dessous selon ce qui te correspond pour pouvoir accéder au reste du serveur:**
🏳️‍🌈 - Pour obtenir le rôle ${nb}
👧 - Pour obtenir le rôle ${girl}
👦 - Pour obtenir le rôle ${boy}\n
Pour découvrir les différentes catégories disponibles sur le serveur, aller dans <#726428190427447365> pour voir quelques petites explications en plus.
`)
    .setThumbnail(member.user.displayAvatarURL())
    .setFooter({ text: `à rejoin le serveur grâce à une invitation inconnue !` })

  inviter
    ? welcomeChannel.send({
      embeds: [welcomeEmbedInviter], components: [boygirlnbrow]
    })
    : welcomeChannel.send({
      embeds: [welcomeEmbed], components: [boygirlnbrow]
    })
      .catch(console.error);
};