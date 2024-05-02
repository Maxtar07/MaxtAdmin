const Discord = require(`discord.js`);
module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Interaction} interaction 
     */
    callback: async (bot, interaction) => {
        const channel = interaction.options.get(`salon`)?.channel || interaction.channel;
        const amount = interaction.options.get(`nombre`).value;
        await interaction.deferReply({ ephemeral: true });
        if (isNaN(amount) || amount < 1 || amount > 1000) {
            await interaction.editReply({ content: `Veuillez spécifier un nombre entre 1 et 1000 pour effacer les messages.`, ephemeral: true });
            return;
        }
        const totalAmount = Math.min(amount, 1000);
        let messagesDeleted = 0;
        let totalmessages = 0;
        let messages;
        let iterations = Math.ceil(totalAmount / 100);
        for (let i = 0; i < iterations; i++) {
            const messagesToFetch = Math.min(totalAmount - messagesDeleted, 100);
            const fetchedMessages = await channel.messages.fetch({ limit: messagesToFetch });
            messages = await channel.bulkDelete(fetchedMessages, true);
            totalmessages += messages.size;
            messagesDeleted += messagesToFetch;
        }
        if (totalmessages === 0) {
            await interaction.editReply({ content: `Aucun message n'a été effacé`, ephemeral: true });
        } else if (totalmessages === 1) {
            await interaction.editReply({ content: `**${totalmessages}** message a été effacé avec succès.`, ephemeral: true });
        } else {
            await interaction.editReply({ content: `**${totalmessages}** messages ont été effacés avec succès.`, ephemeral: true });
        }
    },
    name: `clear`,
    description: `Effacer un certain nombre de messages dans le canal actuel`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `nombre`,
            description: `Le nombre de messages à effacer (entre 1 et 1000)`,
            type: Discord.ApplicationCommandOptionType.Integer,
            required: true
        },
        {
            name: `salon`,
            description: `Le salon où effacer les messages`,
            type: Discord.ApplicationCommandOptionType.Channel,
            channelTypes: [Discord.ChannelType.GuildText], required: false
        }
    ],
    permissionsRequired: [Discord.PermissionFlagsBits.ManageMessages],
    botPermissions: [Discord.PermissionFlagsBits.ManageMessages]
}
