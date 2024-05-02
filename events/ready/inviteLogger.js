const Discord = require(`discord.js`);
module.exports = async (bot) => {
    const invites = bot.inviteloggercollection
    await bot.guilds.cache.forEach(async (guild) => {
        const botMember = guild.members.cache.get(bot.user.id);
        if (!botMember.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) return;
        const firstInvites = await guild.invites.fetch().catch(err => { console.log(err) });
        invites.set(guild.id, new Discord.Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
    });
};