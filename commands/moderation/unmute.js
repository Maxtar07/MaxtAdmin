const Discord = require(`discord.js`);
module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Interaction} interaction 
     */
    callback: async (bot, interaction) => {
        const user = interaction.options.get(`membre`).value;
        const reason = interaction.options.get(`raison`)?.value || `Aucune raison fournie`;

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(user);

        if (!targetUser) {
            await interaction.editReply({ content: `Cet utilisateur n'existe pas sur ce serveur.` });
            return;
        }

        if (targetUser.user.bot) {
            await interaction.editReply({ content: `Je ne peux pas unmute un bot.` });
            return;
        }

        if (!targetUser.isCommunicationDisabled()) {
            await interaction.editReply({ content: `Ce membre n'est pas actuellement mute.` });
            return;
        }

        await targetUser.timeout(5000, reason);

        await interaction.editReply({ content: `Le membre ${targetUser} sera unmute dans 5 secondes.\nRaison: '${reason}'` });
    },
    name: `unmute`,
    description: `Réactive l'écriture pour un membre précédemment mute`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `membre`,
            description: `Le membre à unmute`,
            type: Discord.ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: `raison`,
            description: `La raison du unmute`,
            type: Discord.ApplicationCommandOptionType.String,
            required: false
        }
    ],
    permissionsRequired: [Discord.PermissionFlagsBits.MuteMembers],
    botPermissions: [Discord.PermissionFlagsBits.MuteMembers]
};
