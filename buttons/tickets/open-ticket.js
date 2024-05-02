const Discord = require(`discord.js`);
module.exports = {
    name: `Open Ticket`,
    description: `Bouton d'ouverture d'un ticket`,
    buttonId: `open_ticket`,
    execute: async (bot, interaction) => {
        const ticketModal = new Discord.ModalBuilder()
            .setTitle(`Ouverture d'un ticket`)
            .setCustomId(`ticketmodal`)

        const ticketTitle = new Discord.TextInputBuilder()
            .setCustomId(`tickettitle`)
            .setRequired(true)
            .setLabel(`Donne un titre à ton ticket`)
            .setStyle(Discord.TextInputStyle.Short)

        const ticketDescription = new Discord.TextInputBuilder()
            .setCustomId(`ticketdescription`)
            .setRequired(true)
            .setLabel(`Explique de manière détaillée ton problème`)
            .setPlaceholder(`Tu pourra ajouter des fichiers ensuite, dans le salon`)
            .setStyle(Discord.TextInputStyle.Paragraph)

        const firstActionRow = new Discord.ActionRowBuilder().addComponents(ticketTitle)
        const secondActionRow = new Discord.ActionRowBuilder().addComponents(ticketDescription)

        ticketModal.addComponents(firstActionRow, secondActionRow)
        interaction.showModal(ticketModal)
    },
};