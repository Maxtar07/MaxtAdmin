const Discord = require(`discord.js`);
const GuildInfos = require(`../../models/GuildInfos`);
/**
 * 
 * @param {Discord.Client} bot 
 * @param {Discord.GuildMember} member 
 */
module.exports = async (bot, member) => {
    const guild = await GuildInfos.findOne({ guildId: member.guild.id });
    if (guild) {
        const users = Array.from(guild.users.values());
        const matchingUsers = users.filter(user => user.userId === member.user.id);
        if (matchingUsers.length > 0) {
            let user = matchingUsers[0];
            // Mise à jour du nom d'utilisateur uniquement si le nom a changé
            if (user.userName !== member.user.username) {
                const newUsername = member.user.username;
                const oldUsername = user.userName;
                // Supprimer l'ancienne entrée de la carte
                guild.users.delete(oldUsername);
                // Mettre à jour le nom d'utilisateur et réinsérer l'entrée dans la carte
                user.userName = newUsername;
                guild.users.set(`${newUsername}`, user);
            }
            user.hasLeave = true
            user.globalName = member.user.globalName ? member.user.globalName : member.user.username
        } else {
            guild.users.set(member.user.username, {
                userName: member.user.username,
                globalName: member.user.globalName ? member.user.globalName : member.user.username,
                userId: member.user.id,
                hasLeave: true,
                messages: 0,
                xp: 0,
                level: 0,
                warns: []
            });
        }
    }
    guild.markModified(`users`);
    await guild.save();
};