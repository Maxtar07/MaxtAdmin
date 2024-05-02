const Discord = require(`discord.js`);
module.exports = {
  callback: async (bot, interaction) => {
    const text = interaction.options.getString(`texte`);
    const channel = interaction.options.getChannel(`channel`) || interaction.channel;

    if (!text) {
      return interaction.reply({ content: `Veuillez spécifier un texte valide.`, ephemeral: true });
    }

    channel.send({ content: text, ephemeral: true });
    interaction.reply({ content: `Message envoyé dans ${channel}.`, ephemeral: true });
  },
  name: `say`,
  description: `Envoyer un message dans un channel spécifié`,
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: `texte`,
      description: `Le texte à envoyer`,
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: `channel`,
      description: `Le channel dans lequel envoyer le message`,
      type: Discord.ApplicationCommandOptionType.Channel,
      channelTypes: [Discord.ChannelType.GuildText],
      required: false,
    },
  ],
  permissionsRequired: [Discord.PermissionFlagsBits.Administrator],
  botPermissions: [Discord.PermissionFlagsBits.Administrator]
};
