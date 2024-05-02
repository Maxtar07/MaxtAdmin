const Discord = require(`discord.js`);
module.exports = {
    callback: async (bot, interaction) => {
        const mentionableSelectMenuId = `testmentionableselectmenu`;
        const mentionableSelectMenuLabel = `Sélectionnez un mentionable`;

        const mentionableSelectMenu = new Discord.MentionableSelectMenuBuilder()
            .setCustomId(mentionableSelectMenuId)
            .setPlaceholder(mentionableSelectMenuLabel)

        const row = new Discord.ActionRowBuilder().addComponents(mentionableSelectMenu);

        interaction.reply({
            content: `Ceci est un message avec un Mentionable Select Menu !`,
            components: [row], ephemeral: false,
        });
    },
    name: `mentionableselectmenu`,
    description: `Commande pour envoyer un Mentionable Select Menu`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [],
    permissionsRequired: [Discord.PermissionFlagsBits.Administrator],
    botPermissions: [Discord.PermissionFlagsBits.Administrator]
};
