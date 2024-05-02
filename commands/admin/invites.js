const Discord = require(`discord.js`);
module.exports = {
  callback: async (bot, interaction) => {
    const member = interaction.options.getUser(`membre`);
    let invites = await interaction.guild.invites.fetch()
    let userInv = invites.filter(inv => inv.inviter && inv.inviter.id === member.id);
    let i = 0;
    userInv.forEach(inv => (i += inv.uses));
    const invites_embed = new Discord.EmbedBuilder()
      .setTitle(`${member.username} a sur le serveur:`)
      .setDescription(`${i} invitation(s)`)
      .setColor(`#0099ff`)
      .setTimestamp();
    interaction.reply({ ephemerals: true, embeds: [invites_embed] });
  },
  name: `invites`,
  description: `Obtenir le nombre d'invitation qu'un membre a eu sur le serveur`,
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: `membre`,
      description: `Le membre à qui on veut regarder ses invitations`,
      type: Discord.ApplicationCommandOptionType.User,
      required: true,
    },
  ],
  permissionsRequired: [Discord.PermissionFlagsBits.Administrator],
  botPermissions: [Discord.PermissionFlagsBits.Administrator]
};
