const Discord = require(`discord.js`);
module.exports = {
    callback: async (bot, interaction) => {

        const embed = new Discord.EmbedBuilder()
            .setColor(`#FF0000`)
            .setTitle(`Ouverture salon privé avec l'équipe de gestion (admins, modos, etc.)`)
            .setDescription(`Cliquez sur le bouton pour ouvrir un salon privé avec l'équipe de gestion`);

        const button = new Discord.ButtonBuilder()
            .setCustomId(`open_ticket`)
            .setEmoji(`📩`)
            .setLabel(`Ouvrir un ticket`)
            .setStyle(`Primary`)

        const row = new Discord.ActionRowBuilder().addComponents(button);

        const channelId = `726428195187851317`;
        const channel = bot.channels.cache.get(channelId);
        if (!channel) return console.log(`Le canal avec l'ID ${channelId} n'a pas été trouvé.`);

        await channel.send({ embeds: [embed], components: [row] });

        interaction.reply(`Le message de ticket a été envoyé.`);
    },
    name: `ticket`,
    description: `Crée un message de ticket avec un bouton pour ouvrir un ticket`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [],
    permissionsRequired: [Discord.PermissionFlagsBits.Administrator],
    botPermissions: [Discord.PermissionFlagsBits.Administrator]
};
