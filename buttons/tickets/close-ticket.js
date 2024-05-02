const Discord = require(`discord.js`);
const dbticket = require(`../../models/newTicket`);
module.exports = {
    name: `Close Ticket`,
    description: `Bouton de fermeture d'un ticket`,
    buttonId: `close_ticket`,
    execute: async (bot, interaction) => {
        const ticketsInfos = await dbticket.findOne({ NewTicket: `Ouverture d'un nouveau ticket(${interaction.channel.id})` })
        if (ticketsInfos) {
            const opennerId = await ticketsInfos.content[0].opennerId;
            if (interaction.user.id === opennerId) {
                const closeTicketModal = new Discord.ModalBuilder()
                    .setTitle(`Fermeture d'un ticket`)
                    .setCustomId(`closeticketmodal`)

                const closeTicketDescription = new Discord.TextInputBuilder()
                    .setCustomId(`closeticketdescription`)
                    .setRequired(true)
                    .setLabel(`Donne-nous une note !`)
                    .setPlaceholder(`Donne une note entre 0 et 10 pour la résolution de ton ticket et précise bien quel staff t'a aidé`)
                    .setStyle(Discord.TextInputStyle.Paragraph)

                const actionRow = new Discord.ActionRowBuilder().addComponents(closeTicketDescription)

                closeTicketModal.addComponents(actionRow)
                interaction.showModal(closeTicketModal);
            } else if (interaction.user.id != opennerId && interaction.member.roles.cache.has(`738812943613034566`) || interaction.member.roles.cache.has(`726428190024925207`)) {
                const infoTicketId = await ticketsInfos.content[0].messageId
                const ticketTitle = await ticketsInfos.content[0].ticketTitle
                const ticketDescription = await ticketsInfos.content[0].ticketDescription
                const ticketOpennerUserName = await ticketsInfos.content[0].opennerUsername
                const openticketembed2 = new Discord.EmbedBuilder()
                    .setAuthor({
                        name: `${interaction.user.username} à fermé le ticket de ${ticketOpennerUserName} !`,
                        iconURL: interaction.user.avatarURL(),
                    })
                    .setTitle(ticketTitle)
                    .setDescription(ticketDescription)
                    .setColor(`Red`)
                    .setTimestamp()
                const openticketedit = await bot.channels.cache.get(`787998388208533504`).messages.fetch(infoTicketId)
                openticketedit.edit({ embeds: [openticketembed2] })
                await dbticket.findOneAndDelete({ NewTicket: `Ouverture d'un nouveau ticket(${interaction.channel.id})` })
                interaction.reply({ content: `Ton ticket va disparître à jamais ^^`, ephemeral: true });
                await interaction.channel.delete()
            } else {
                return;
            }
        } else {
            return;
        }
    }
};