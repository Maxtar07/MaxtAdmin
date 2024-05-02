const { Discord, config } = require(`../../utils/config`);
/**
 * 
 * @param {Discord.Client} bot 
 * @param {Discord.Message} message 
 */
module.exports = async (bot, message) => {
    if (message.author.bot) return;
    if (message.inGuild() === true) return;
    let finalChannel;
    const guild = bot.guilds.cache.get(config.guild_id);
    const author = message.author;
    const currentUsername = author.username;

    finalChannel = await guild.channels.cache.find(
        (channel) => channel.name.startsWith(`${author.id}-`)
    );

    if (!finalChannel) {
        finalChannel = await guild.channels.create({
            type: 0,
            name: `${author.id}-${author.username}`,
            topic: `<@${author.id}>`,
            parent: `1216748006448042076`,
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: [Discord.PermissionFlagsBits.ViewChannel],
                },
            ],
        });
    } else {
        if (!finalChannel.name.endsWith(`-${currentUsername}`)) {
            await finalChannel.setName(`${author.id}-${currentUsername}`);
        }
    }
    let urls = [];
    if (message.attachments.size > 0) {
        for (const attachment of message.attachments) {
            urls.push(attachment[1].url);
        }
        finalChannel.send({ content: message.content, files: urls });
    } else {
        finalChannel.send({ content: message.content })
    }
};
