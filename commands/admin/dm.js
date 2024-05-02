const Discord = require(`discord.js`);
module.exports = {
  callback: async (bot, interaction) => {
    const member = interaction.options.getUser(`membre`);
    if (!member) {
      return interaction.reply({ content: `Veuillez mentionner un membre.`, ephemeral: true });
    }
    const guild = interaction.guild
    const memberId = member.id;
    const memberUsername = member.username

    const existingChannel = await guild.channels.cache.find(
      (channel) => channel.name.startsWith(`${memberId}-`)
    );
    if (existingChannel) {
      interaction.reply({ content: `Canal de discussion déjà existant : ${existingChannel}`, ephemeral: true });
    } else {
      const finalChannel = await guild.channels.create({
        type: 0,
        name: `${memberId}-${memberUsername}`,
        topic: `<@${memberId}>`,
        parent: `1216748006448042076`,
        permissionOverwrites: [
          {
            id: guild.id,
            deny: [Discord.PermissionFlagsBits.ViewChannel],
          },
        ],
      });
      interaction.reply({ content: `Canal de discussion créé : ${finalChannel}`, ephemeral: true });
    }
    member.createDM();
  },
  name: `dm`,
  description: `Créer un canal privé pour parler en DM avec un membre en étant le bot`,
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: `membre`,
      description: `Le membre auquel vous souhaitez parler en DM via le bot`,
      type: Discord.ApplicationCommandOptionType.User,
      required: true,
    },
  ],
  permissionsRequired: [Discord.PermissionFlagsBits.Administrator],
  botPermissions: [Discord.PermissionFlagsBits.Administrator]
}