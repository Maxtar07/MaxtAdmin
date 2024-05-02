const Discord = require(`discord.js`);
module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Interaction} interaction 
     */
    callback: async (bot, interaction) => {
        const targetUserId = interaction.options.get(`membre`).value;
        await interaction.deferReply();
        const bannedUsers = await interaction.guild.bans.fetch();
        const targetUser = bannedUsers.find(user => user.user.id === targetUserId);
        if (!targetUser) {
            await interaction.editReply({ content: `Cet utilisateur n'est pas banni sur ce serveur.` });
            return;
        }
        await interaction.guild.members.unban(targetUser.user, `Demande de débannissement`);
        await interaction.editReply({ content: `Le membre <@${targetUser.user.id}> a été débanni avec succès.` });
    },
    name: `unban`,
    description: `Débannir un membre du serveur`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `membre`,
            description: `Le membre à débannir`,
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],
    permissionsRequired: [Discord.PermissionFlagsBits.BanMembers],
    botPermissions: [Discord.PermissionFlagsBits.BanMembers]
}
