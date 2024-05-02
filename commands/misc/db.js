const Discord = require(`discord.js`);
module.exports = {
    callback: async (bot, interaction) => {
        interaction.reply({ ephemeral: true, content: `https://cloud.mongodb.com/v2/6454c5f8077cd24a9f42573c#/metrics/replicaSet/6557c54253eae26d8404fb5e/explorer/test` });
    },
    name: `db`,
    description: `Permet d'envoyer le lien pour accéder à la db du bot`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [],
    permissionsRequired: [Discord.PermissionFlagsBits.Administrator],
    botPermissions: [Discord.PermissionFlagsBits.Administrator]
};
