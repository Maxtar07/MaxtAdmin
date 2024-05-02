const Discord = require(`discord.js`);
module.exports = {
    callback: async (bot, interaction) => {
        const userSelectMenuId = `testuserselectmenu`;
        const userSelectMenuLabel = `Sélectionnez un user`;

        const userSelectMenu = new Discord.UserSelectMenuBuilder()
            .setCustomId(userSelectMenuId)
            .setPlaceholder(userSelectMenuLabel)

        const row = new Discord.ActionRowBuilder().addComponents(userSelectMenu);

        interaction.reply({
            content: `Ceci est un message avec un User Select Menu !`,
            components: [row], ephemeral: false,
        });
    },
    name: `userselectmenu`,
    description: `Commande pour envoyer un User Select Menu`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [],
    permissionsRequired: [Discord.PermissionFlagsBits.Administrator],
    botPermissions: [Discord.PermissionFlagsBits.Administrator]
};
