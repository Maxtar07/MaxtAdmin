const Discord = require(`discord.js`);
module.exports = {
  /**
   * 
   * @param {Discord.Client} bot 
   * @param {Discord.Interaction} interaction 
   */
  callback: async (bot, interaction) => {
    const text_embed = new Discord.EmbedBuilder()
      .setColor(`Random`)
      .setTitle(`Voici la liste des textes moddés`)
      .setDescription(`Pour écrire en texte moddé, il faut copier/coller le code et remplacer \`Votre message\` par ce que vous voulez écrire !!`)
      .addFields(
        {
          name: `Italique :`, value: `\`*Votre message*\``, inline: true
        },
        {
          name: `Gras :`, value: `\`**Votre message**\``, inline: true
        },
        {
          name: `Barré :`, value: `\`~~Votre message~~\``, inline: true
        },
        {
          name: `\u200b`, value: `\u200b`, inline: false
        },
        {
          name: `Souligné :`, value: `\`__Votre message__\``, inline: true
        },
        {
          name: `Italique + Gras :`, value: `\`***Votre message***\``, inline: true
        },
        {
          name: `Italique + Barré :`, value: `\`~~*Votre message*~~\``, inline: true
        },
        {
          name: `\u200b`, value: `\u200b`, inline: false
        },
        {
          name: `Italique + Souligné :`, value: `\`__*Votre message*__\``, inline: true
        },
        {
          name: `Gras + Barré :`, value: `\`~~**Votre message**~~\``, inline: true
        },
        {
          name: `Gras + Souligné :`, value: `\`__**Votre message**__\``, inline: true
        },
        {
          name: `\u200b`, value: `\u200b`, inline: false
        },
        {
          name: `Barré + Souligné :`, value: `\`__~~Votre message~~__\``, inline: true
        },
        {
          name: `Italique + Gras + Barré :`, value: `\`~~***Votre message***~~\``, inline: true
        },
        {
          name: `\u200b`, value: `\u200b`, inline: false
        },
        {
          name: `Italique + Gras + Souligné :`, value: `\`__***Votre message***__\``, inline: true
        },
        {
          name: `Italique + Barré + Souligné :`, value: `\`__~~*Votre message*~~__\``, inline: true
        },
        {
          name: `\u200b`, value: `\u200b`, inline: false
        },
        {
          name: `Gras + Barré + Souligné :`, value: `\`__~~**Votre message**~~__\``, inline: true
        },
        {
          name: `Italique + Gras + Barré + Souligné :`, value: `\`__~~***Votre message***~~__\``, inline: true
        },
      )
      .setFooter({ text: `Menu des textes moddés` })
    interaction.reply({ ephemeral: true, embeds: [text_embed] });
  },
  name: `textes`,
  description: `Envoi la liste de tous les textes "moddés" sur discord (souligné, barré, etc.).`,
  type: Discord.ApplicationCommandType.ChatInput,
  options: [],
  permissionsRequired: [],
  botPermissions: []
};
