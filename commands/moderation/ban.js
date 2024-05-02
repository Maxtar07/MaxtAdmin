const Discord = require(`discord.js`);
module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Interaction} interaction 
     */
    callback: async (bot, interaction) => {
        const targetUserId = interaction.options.get(`membre`).value;
        if (!targetUserId) {
            interaction.reply({ content: `Cet utilisateur n'existe pas sur ce serveur.`, ephemeral: true });
            return;
        }
        const reason = interaction.options.get(`raison`)?.value || `La raison du ban n'a pas été précisée.`;
        const targetUser = await interaction.guild.members.fetch(targetUserId);
        if (!targetUser) {
            interaction.reply({ content: `Cet utilisateur n'existe pas sur ce serveur.`, ephemeral: true });
            return;
        }
        if (targetUser.id === interaction.guild.ownerId) {
            interaction.reply({ content: `Vous ne pouvez pas bannir ce membre car c'est le propriétaire du serveur.`, ephemeral: true });
            return;
        }
        const targetUserRolePosition = targetUser.roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const guild = interaction.guild;
        const member = await guild.members.fetch(interaction.client.user.id);
        const botRolePosition = member.roles.highest.position;
        if (targetUserRolePosition >= requestUserRolePosition) {
            interaction.reply({ content: `Vous ne pouvez pas bannir ce membre car il à un rôle plus élevé que vous.`, ephemeral: true });
            return;
        }
        if (targetUserRolePosition >= botRolePosition) {
            interaction.reply({ content: `Vous ne pouvez pas bannir ce membre car il à un rôle plus élevé que moi.`, ephemeral: true });
            return;
        }
        await targetUser.ban({ reason: reason });
        interaction.reply({ content: `Le membre ${targetUser} a été banni avec succès.\nRaison: '${reason}'` });
    },
    name: `ban`,
    description: `Bannir un membre du serveur`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `membre`,
            description: `Le membre à bannir`,
            type: Discord.ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: `raison`,
            description: `La raison du bannissement`,
            type: Discord.ApplicationCommandOptionType.String,
            required: false
        }
    ],
    permissionsRequired: [Discord.PermissionFlagsBits.BanMembers],
    botPermissions: [Discord.PermissionFlagsBits.BanMembers]
}