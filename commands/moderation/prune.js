const Discord = require(`discord.js`);
module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Interaction} interaction 
     */
    callback: async (bot, interaction) => {
        const member = interaction.options.get(`membre`).member;
        const channel = interaction.options.get(`salon`)?.channel || interaction.channel;
        const amount = interaction.options.get(`nombre`).value;
        await interaction.deferReply({ ephemeral: true });
        if (isNaN(amount) || amount < 1 || amount > 1000) {
            await interaction.editReply({ content: `Veuillez spécifier un nombre entre 1 et 1000 pour effacer les messages.`, ephemeral: true });
            return;
        }
        const totalAmount = Math.min(amount, 1000);
        let messagesDeleted = 0;
        let totalMessages = 0;
        let iterations = Math.ceil(totalAmount / 100);
        for (let i = 0; i < iterations; i++) {
            const messagesToFetch = Math.min(totalAmount - messagesDeleted, 100);
            const fetchedMessages = await channel.messages.fetch({ limit: messagesToFetch });
            const memberMessages = fetchedMessages.filter(message => message.author.id === member.id);
            const messages = await channel.bulkDelete(memberMessages, true);
            totalMessages += messages.size;
            messagesDeleted += messagesToFetch;
        }
        if (totalMessages === 0) {
            await interaction.editReply({ content: `Aucun message de ${member} n'a été effacé`, ephemeral: true });
        } else if (totalMessages === 1) {
            await interaction.editReply({ content: `**${totalMessages}** message de ${member} a été effacé avec succès.`, ephemeral: true });
        } else {
            await interaction.editReply({ content: `**${totalMessages}** messages de ${member} ont été effacés avec succès.`, ephemeral: true });
        }
    },
    name: `prune`,
    description: `Supprimer un certain nombre de messages d'un membre dans le salon spécifié`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `nombre`,
            description: `Le nombre de messages à effacer (entre 1 et 1000)`,
            type: Discord.ApplicationCommandOptionType.Integer,
            required: true
        },
        {
            name: `membre`,
            description: `Le membre dont les messages doivent être supprimés`,
            type: Discord.ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: `salon`,
            description: `Le salon où effacer les messages`,
            type: Discord.ApplicationCommandOptionType.Channel,
            channelTypes: [Discord.ChannelType.GuildText],
            required: false
        }
    ],
    permissionsRequired: [Discord.PermissionFlagsBits.ManageMessages],
    botPermissions: [Discord.PermissionFlagsBits.ManageMessages]
}
