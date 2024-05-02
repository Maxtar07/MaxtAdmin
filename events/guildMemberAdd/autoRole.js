const Discord = require(`discord.js`);
const AutoRole = require(`../../models/AutoRole`);
/**
 * 
 * @param {Discord.Client} bot 
 * @param {Discord.GuildMember} member 
 */
module.exports = async (bot, member) => {
    const guild = member.guild;
    if (!guild) return;

    const autoRole = await AutoRole.findOne({ guildId: guild.id });
    if (!autoRole) return;

    const roles = [...autoRole.roles.values()];
    const roleIds = roles.map((role) => role.roleId);

    await member.roles.add(roleIds);
};