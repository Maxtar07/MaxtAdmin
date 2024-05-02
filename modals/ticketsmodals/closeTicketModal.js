const Discord = require(`discord.js`);
const dbticket = require(`../../models/newTicket`);
module.exports = {
    name: `closeticketmodal`,
    description: `Formulaire de fermeture d'un ticket`,
    modalId: `closeticketmodal`,
    execute: async (bot, interaction) => {
        const closeTicketDescription = interaction.fields.getTextInputValue(`closeticketdescription`);
        const ticketsInfos = await dbticket.findOne({ NewTicket: `Ouverture d'un nouveau ticket(${interaction.channel.id})` })
        if (ticketsInfos) {
            const opennerId = await ticketsInfos.content[0].opennerId;
            if (interaction.user.id === opennerId) {
                const infoTicketId = await ticketsInfos.content[0].messageId
                const ticketTitle = await ticketsInfos.content[0].ticketTitle
                const ticketDescription = await ticketsInfos.content[0].ticketDescription
                const openticketembed2 = new Discord.EmbedBuilder()
                    .setAuthor({
                        name: `${interaction.user.username} à fermé son ticket !`,
                        iconURL: interaction.user.avatarURL(),
                    })
                    .setTitle(ticketTitle)
                    .setDescription(ticketDescription)
                    .addFields(
                        {
                            name: `Note donnée à la résolution`,
                            value: closeTicketDescription
                        }
                    )
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
