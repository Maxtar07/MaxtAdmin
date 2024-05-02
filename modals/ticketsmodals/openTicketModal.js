const Discord = require(`discord.js`);
const dbticket = require(`../../models/newTicket`);
module.exports = {
    name: `ticketmodal`,
    description: `Formulaire d'ouverture d'un ticket`,
    modalId: `ticketmodal`,
    execute: async (bot, interaction) => {
        const ticketTitle = interaction.fields.getTextInputValue(`tickettitle`);
        const ticketDescription = interaction.fields.getTextInputValue(`ticketdescription`);
        let ticketusername = interaction.user.username;
        let ticketcategoryID = `726428195187851316`
        let ticketchannel = await interaction.guild.channels.create({
            name: `Ticket-${ticketusername}`,
            type: Discord.ChannelType.GuildText,
            parent: interaction.guild.channels.cache.get(ticketcategoryID)
        })
        ticketchannel.permissionOverwrites.edit(interaction.guild.roles.everyone, { ViewChannel: false });
        ticketchannel.permissionOverwrites.edit(interaction.member, {
            ViewChannel: true,
            SendMessages: true,
            AttachFiles: true,
            ReadMessageHistory: true
        });
        ticketchannel.permissionOverwrites.edit(interaction.guild.roles.cache.find(role => role.id == `738812943613034566`), { ViewChannel: true, SendMessages: true, AttachFiles: true, ReadMessageHistory: true })
        ticketchannel.permissionOverwrites.edit(interaction.guild.roles.cache.find(role => role.id == `726428190024925207`), { ViewChannel: true, SendMessages: true, AttachFiles: true, ReadMessageHistory: true })
        const userSelectMenuId = `ticketuserselectmenu`;
        const userSelectMenuLabel = `Sélectionnez les membres à ajouter au ticket`;
        const userSelectMenu = new Discord.UserSelectMenuBuilder()
            .setCustomId(userSelectMenuId)
            .setPlaceholder(userSelectMenuLabel)
            .setMinValues(0)
            .setMaxValues(10)
        const selectmenurow = new Discord.ActionRowBuilder().addComponents(userSelectMenu);
        const closebutton = new Discord.ButtonBuilder()
            .setCustomId(`close_ticket`)
            .setLabel(`Fermer le ticket`)
            .setStyle(`Danger`)
        const closebuttonsrow = new Discord.ActionRowBuilder().addComponents(closebutton);
        const closeticketembed = new Discord.EmbedBuilder()
            .setColor(`DarkButNotBlack`)
            .setAuthor({
                name: `Voici ton salon privé ${ticketusername}`,
                iconURL: interaction.user.avatarURL(),
            })
            .setTitle(ticketTitle)
            .setDescription(ticketDescription)
            .addFields(
                {
                    name: `Tu veux ajouter plus d'informations ?`,
                    value: `Il te suffit simplement d'envoyer des messages dans ce salon pour ajouter des détails, des images, ou toutes autres éléments utiles.`
                },
                {
                    name: `Tu veux ajouter des membres à ce ticket ?`,
                    value: `Il te suffit simplement de les sélectionner dans le menu déroulant ci-dessous, il y seront ajoutés automatiquement.`,
                    inline: true
                })
            .setFooter({ text: `Appuyer sur le bouton rouge pour fermer ce salon !` })
        ticketchannel.send({ content: `${interaction.member}`, embeds: [closeticketembed], components: [closebuttonsrow, selectmenurow] })

        const openticketlogembed = new Discord.EmbedBuilder()
            .setAuthor({
                name: `${ticketusername} à ouvert un ticket !`,
                iconURL: interaction.user.avatarURL(),
            })
            .setTitle(ticketTitle)
            .setDescription(ticketDescription)
            .addFields({ name: `\u200b`, value: `Voici le salon : ${ticketchannel}` })
            .setColor(`Green`)
            .setTimestamp()
        let logchannel = interaction.guild.channels.cache.find(c => c.id == `787998388208533504`)
        if (!logchannel) return
        let infoticket = await logchannel.send({ embeds: [openticketlogembed] })
        interaction.reply({ content: `Ton ticket à bien été ouvert --> ${ticketchannel}`, ephemeral: true });
        var ticketsInfos = await dbticket.findOne({ NewTicket: `Ouverture d'un nouveau ticket(${ticketchannel.id})` })
        if (!ticketsInfos) {
            ticketsInfos = new dbticket({
                NewTicket: `Ouverture d'un nouveau ticket(${ticketchannel.id})`,
                content: [
                    {
                        channelId: ticketchannel.id,
                        messageId: infoticket.id,
                        opennerId: interaction.user.id,
                        opennerUsername: interaction.user.username,
                        ticketTitle: ticketTitle,
                        ticketDescription: ticketDescription
                    }
                ]
            })
        } else {
            const obj = {
                channelId: ticketchannel.id,
                messageId: infoticket.id,
                opennerId: interaction.user.id,
                opennerUsername: interaction.user.username,
                ticketTitle: ticketTitle,
                ticketDescription: ticketDescription
            }
            ticketsInfos.content.push(obj)
        }
        ticketsInfos.save()
    }
};
