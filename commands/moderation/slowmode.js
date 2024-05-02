const Discord = require(`discord.js`);
module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Interaction} interaction 
     */
    callback: async (bot, interaction) => {
        const duration = interaction.options.getInteger(`durée`);
        const channel = interaction.options.getChannel(`salon`) || interaction.channel
        const embed = new Discord.EmbedBuilder()
            .setColor(`Blue`)
            .setDescription(`:white_check_mark: ${channel} à maintenant un slowmode de ${duration} seconds`)

        channel.setRateLimitPerUser(duration)
        interaction.reply({ embeds: [embed], ephemeral: true })
    },
    name: `slowmode`,
    description: `Activer un slowmode dans un salon`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `durée`,
            description: `Le temps du slowmode`,
            type: Discord.ApplicationCommandOptionType.Integer,
            required: true
        },
        {
            name: `salon`,
            description: `Le salon dans lequel activer le slowmode`,
            type: Discord.ApplicationCommandOptionType.Channel,
            channelTypes: [Discord.ChannelType.GuildText],
            required: false
        },
    ],
    permissionsRequired: [Discord.PermissionFlagsBits.ManageChannels],
    botPermissions: [Discord.PermissionFlagsBits.ManageChannels]
}