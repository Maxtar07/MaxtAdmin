const Discord = require(`discord.js`);
module.exports = {
  /**
   * 
   * @param {Discord.Client} bot 
   * @param {Discord.Interaction} interaction 
   */
  callback: async (bot, interaction) => {
    const color_embed = new Discord.EmbedBuilder()
      .setColor(`Random`)
      .setTitle(`Voici la liste des couleurs`)
      .setDescription(`Pour écrire en couleur, il faut copier/coller le code et remplacer \`Votre message\` par ce que vous voulez écrire.`)
      .addFields(
        {
          name: `Surligné en Rouge :`, value: `\` \`\`\`diff\n-Votre message\n\`\`\` \``, inline: true
        },
        {
          name: `Bleu`, value: `\` \`\`\`md\n#Votre message\n\`\`\` \``, inline: true
        },
        {
          name: `Turquoise`, value: `\` \`\`\`py\n"Votre message"\n\`\`\` \``, inline: true
        },
        {
          name: `\u200b`, value: `\u200b`, inline: false
        },
        {
          name: `Bleu clair`, value: `\` \`\`\`cs\n#Votre message\n\`\`\` \``, inline: true
        },
        {
          name: `Gris`, value: `\` \`\`\`js\n//Votre message\n\`\`\` \``, inline: true
        },
        {
          name: `Bleu clair`, value: `\` \`\`\`fix\nVotre message\n\`\`\` \``, inline: true
        },
      )
    interaction.reply({ ephemeral: true, embeds: [color_embed] });
  },
  name: `couleurs`,
  description: `Envoi un embed qui répertorie toutes les manière d'écrire des textes colorés sur discord.`,
  type: Discord.ApplicationCommandType.ChatInput,
  options: [],
  permissionsRequired: [],
  botPermissions: []
};
