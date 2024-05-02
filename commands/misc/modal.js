const Discord = require(`discord.js`);
module.exports = {
    callback: async (bot, interaction) => {
        const modal = new Discord.ModalBuilder()
            .setTitle(`Formulaire de test`)
            .setCustomId(`testmodal`)

        const name = new Discord.TextInputBuilder()
            .setCustomId(`testname`)
            .setRequired(true)
            .setLabel(`Donne ton nom (test)`)
            .setStyle(Discord.TextInputStyle.Short)

        const about = new Discord.TextInputBuilder()
            .setCustomId(`testabout`)
            .setRequired(true)
            .setLabel(`Donne une description de toi (test)`)
            .setStyle(Discord.TextInputStyle.Paragraph)

        const firstActionRow = new Discord.ActionRowBuilder().addComponents(name)
        const secondActionRow = new Discord.ActionRowBuilder().addComponents(about)

        modal.addComponents(firstActionRow, secondActionRow)
        interaction.showModal(modal)
    },
    name: `modal`,
    description: `Commande pour envoyer un formulaire`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [],
    permissionsRequired: [Discord.PermissionFlagsBits.Administrator],
    botPermissions: [Discord.PermissionFlagsBits.Administrator]
};
