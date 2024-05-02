const Discord = require(`discord.js`);
module.exports = {
    callback: async (bot, interaction) => {
        const buttonId = `testbutton`;
        const buttonLabel = `Cliquez ici`;
        const buttonStyle = `Primary`;

        const button = new Discord.ButtonBuilder()
            .setStyle(buttonStyle)
            .setLabel(buttonLabel)
            .setCustomId(buttonId);

        const row = new Discord.ActionRowBuilder().addComponents(button);

        interaction.reply({
            content: `Ceci est un message avec un bouton !`,
            components: [row], ephemeral: true,
        });
    },
    name: `button`,
    description: `Commande pour envoyer un bouton`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [],
    permissionsRequired: [Discord.PermissionFlagsBits.Administrator],
    botPermissions: [Discord.PermissionFlagsBits.Administrator]
};
