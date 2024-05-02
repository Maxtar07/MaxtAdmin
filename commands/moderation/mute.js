const Discord = require(`discord.js`);
const ms = require(`ms`);
module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Interaction} interaction 
     */
    callback: async (bot, interaction) => {
        const mentionnable = interaction.options.get(`membre`).value;
        const duration = interaction.options.get(`durée`).value;
        const reason = interaction.options.get(`raison`)?.value || `Aucune raison fournie`;
        await interaction.deferReply();
        const targetUser = await interaction.guild.members.fetch(mentionnable);
        if (!targetUser) {
            await interaction.editReply({ content: `Cet utilisateur n'existe pas sur ce serveur.` });
            return;
        }
        if (targetUser.user.bot) {
            await interaction.editReply({ content: `Je ne peux pas mute un bot.` });
            return;
        }
        const msDuration = ms(duration);
        if (isNaN(msDuration)) {
            await interaction.editReply({ content: `Le temps est invalide.` });
            return;
        }
        if (msDuration < 5000 || msDuration > 2.419e9) {
            await interaction.editReply({ content: `Le temps de mute doit être compris entre 5s et 28jours.` });
            return;
        }
        const targetUserRolePosition = targetUser.roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const guild = interaction.guild;
        const member = await guild.members.fetch(interaction.client.user.id);
        const botRolePosition = member.roles.highest.position;
        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply({ content: `Vous ne pouvez pas mute ce membre car il a un rôle plus élevé que vous.` });
            return;
        }
        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply({ content: `Je ne peux pas mute ce membre car il a un rôle plus élevé que moi.` });
            return;
        }
        const { default: prettyMs } = await import(`pretty-ms`);
        if (targetUser.isCommunicationDisabled()) {
            await targetUser.timeout(msDuration, reason);
            await interaction.editReply({ content: `Le membre ${targetUser} s'est vu mettre à jour son temps de silence.\nTemps restant: ${prettyMs(msDuration, { verbose: true })}\nRaison: '${reason}'` });
            return;
        }
        await targetUser.timeout(msDuration, reason);
        await interaction.editReply({ content: `Le membre ${targetUser} a été réduit au silence.\nTemps restant: ${prettyMs(msDuration, { verbose: true })}\nRaison: '${reason}'` });
    },
    name: `mute`,
    description: `Empêcher un membre d'écrire pendant un temps choisi`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `membre`,
            description: `Le membre à mute`,
            type: Discord.ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: `durée`,
            description: `La durée du mute (30s, 40m, 1h, 1 day...)`,
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: `raison`,
            description: `La raison du mute`,
            type: Discord.ApplicationCommandOptionType.String,
            required: false
        }
    ],
    permissionsRequired: [Discord.PermissionFlagsBits.MuteMembers],
    botPermissions: [Discord.PermissionFlagsBits.MuteMembers]
}