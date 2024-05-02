const Discord = require(`discord.js`);
module.exports = {
    callback: async (bot, interaction) => {
        const roleSelectMenuId = `testroleselectmenu`;
        const roleSelectMenuLabel = `Sélectionnez un role`;

        const roleSelectMenu = new Discord.RoleSelectMenuBuilder()
            .setCustomId(roleSelectMenuId)
            .setPlaceholder(roleSelectMenuLabel)

        const row = new Discord.ActionRowBuilder().addComponents(roleSelectMenu);

        interaction.reply({
            content: `Ceci est un message avec un Role Select Menu !`,
            components: [row], ephemeral: false,
        });
    },
    name: `roleselectmenu`,
    description: `Commande pour envoyer un Role Select Menu`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [],
    permissionsRequired: [Discord.PermissionFlagsBits.Administrator],
    botPermissions: [Discord.PermissionFlagsBits.Administrator]
};
