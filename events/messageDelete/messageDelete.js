const Discord = require(`discord.js`);
module.exports = async (bot, message) => {
    if (message.channel.id === `726428190024925212`) return;
    const logchannel = await message.guild.channels.cache.find(c => c.id == `726428190024925212`)
    const fetchedLogs = await message.guild.fetchAuditLogs({
        after: Date.now() - 5000,
        type: Discord.AuditLogEvent.MessageDelete,
        limit: 1,
    });
    const firstEntry = await fetchedLogs.entries.first()
    if (!firstEntry) {
        const changeDate = require(`moment`)(new Date(message.createdTimestamp))
        const newDate = changeDate.format(`MM/DD/YYYY HH:mm A`)
        const delete_message_embed_by_author = new Discord.EmbedBuilder()
            .setColor(`DarkPurple`)
            .setAuthor({ name: `Message de ${message.author.username} supprimé`, iconURL: message.author.avatarURL() })
            .setDescription(`**Contenu du message**: ${message.content}\n**Envoyé le**: ${newDate}\n**Salon du message**: <#${message.channelId}>`)
            .setTimestamp()
            .setFooter({ text: `Supprimé par ${message.author.username}`, iconURL: message.author.avatarURL() })
        if (message.attachments.size > 0) {
            for (const attachment of attachments) {
                const url = attachment[1].url;
                const type = attachment[1].contentType;
                delete_message_embed_by_author.addFields({ name: type, value: url });
            }
        } else {
            delete_message_embed_by_author.addFields({ name: `Aucune pièce jointe trouvée`, value: `\u200b` })
        }
        if (embeds.length > 0) {
            delete_message_embed_by_author.addFields({ name: `Le message contenanit les embeds ci-dessous`, value: `\u200b` })
            let totalEmbeds = []
            totalEmbeds.push(delete_message_embed_by_author)
            for (const embed of embeds) {
                totalEmbeds.push(embed);
            }
            logchannel.send({ embeds: totalEmbeds });
        } else {
            logchannel.send({ embeds: [delete_message_embed_by_author] });
        }
    }
    let channelId = message.channelId ? message.channelId : firstEntry.extra.channel.id
    let guildId = message.guildId ? message.guildId : firstEntry.extra.channel.guildId
    let id = message.id ? message.id : `ID introuvable`
    let createdTimestamp = message.createdTimestamp ? message.createdTimestamp : `Date introuvable`
    let type = message.type ? message.type : `Type introuvable`
    let content = message.content ? message.content : `Contenu introuvable`
    let author = message.author ? message.author : firstEntry.target
    let embeds = message.embeds
    let attachments = message.attachments
    let executor = firstEntry.executor
    const changeDate = require(`moment`)(new Date(createdTimestamp))
    const newDate = changeDate.format(`MM/DD/YYYY HH:mm A`)
    let delete_message_embed = new Discord.EmbedBuilder()
        .setColor(`DarkPurple`)
        .setAuthor({ name: `Message de ${author.username} supprimé`, iconURL: author.avatarURL() })
        .setDescription(`**Contenu du message**: ${content}\n**Envoyé le**: ${newDate}\n**Salon du message**: <#${channelId}>`)
        .setTimestamp()
        .setFooter({ text: `Supprimé par ${executor.username}`, iconURL: executor.avatarURL() })
    if (attachments.size > 0) {
        for (const attachment of attachments) {
            const url = attachment[1].url;
            const type = attachment[1].contentType;
            delete_message_embed.addFields({ name: type, value: url });
        }
    } else {
        delete_message_embed.addFields({ name: `Aucune pièce jointe trouvée`, value: `\u200b` })
    }
    if (embeds.length > 0) {
        delete_message_embed.addFields({ name: `Le message contenanit les embeds ci-dessous`, value: `\u200b` })
        let totalEmbeds = []
        totalEmbeds.push(delete_message_embed)
        for (const embed of embeds) {
            totalEmbeds.push(embed);
        }
        logchannel.send({ embeds: totalEmbeds });
    } else {
        logchannel.send({ embeds: [delete_message_embed] });
    }
}