const Discord = require(`discord.js`);
module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Interaction} interaction 
     */
    callback: async (bot, interaction) => {
        const targetUserId = interaction.options.get(`membre`).value;
        const reason = interaction.options.get(`raison`)?.value || `La raison de l'exclusion n'a pas été précisée.`;
        const targetUser = await interaction.guild.members.fetch(targetUserId);
        if (!targetUser) {
            interaction.reply({ content: `Cet utilisateur n'existe pas sur ce serveur.`, ephemeral: true });
            return;
        }
        if (targetUser.id === interaction.guild.ownerId) {
            interaction.reply({ content: `Vous ne pouvez pas exclure ce membre car c'est le propriétaire du serveur.`, ephemeral: true });
            return;
        }
        const targetUserRolePosition = targetUser.roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const guild = interaction.guild;
        const member = await guild.members.fetch(interaction.client.user.id);
        const botRolePosition = member.roles.highest.position;
        if (targetUserRolePosition >= requestUserRolePosition) {
            interaction.reply({ content: `Vous ne pouvez pas exclure ce membre car il a un rôle plus élevé que vous.`, ephemeral: true });
            return;
        }
        if (targetUserRolePosition >= botRolePosition) {
            interaction.reply({ content: `Je ne peux pas exclure ce membre car il a un rôle plus élevé que moi.`, ephemeral: true });
            return;
        }
        await targetUser.kick(reason);
        interaction.reply({ content: `Le membre ${targetUser} a été exclu avec succès.\nRaison: '${reason}'` });
    },
    name: `kick`,
    description: `Exclure un membre du serveurs`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `membre`,
            description: `Le membre à exclure`,
            type: Discord.ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: `raison`,
            description: `La raison de l'exclusion`,
            type: Discord.ApplicationCommandOptionType.String,
            required: false
        }
    ],
    permissionsRequired: [Discord.PermissionFlagsBits.KickMembers],
    botPermissions: [Discord.PermissionFlagsBits.KickMembers]
}