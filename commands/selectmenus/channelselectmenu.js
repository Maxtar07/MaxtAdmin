const Discord = require(`discord.js`);
module.exports = {
    callback: async (bot, interaction) => {
        const channelSelectMenuId = `testchannelselectmenu`;
        const channelSelectMenuLabel = `Sélectionnez un channel`;

        const channelSelectMenu = new Discord.ChannelSelectMenuBuilder()
            .setCustomId(channelSelectMenuId)
            .setPlaceholder(channelSelectMenuLabel)
            .setChannelTypes(Discord.ChannelType.GuildText)

        const row = new Discord.ActionRowBuilder().addComponents(channelSelectMenu);

        interaction.reply({
            content: `Ceci est un message avec un Channel Select Menu !`,
            components: [row], ephemeral: false,
        });
    },
    name: `channelselectmenu`,
    description: `Commande pour envoyer un Channel Select Menu`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [],
    permissionsRequired: [Discord.PermissionFlagsBits.Administrator],
    botPermissions: [Discord.PermissionFlagsBits.Administrator]
};
