const Discord = require(`discord.js`);
const moment = require(`moment`);
const GuildInfos = require(`../../models/GuildInfos`);
const calculateLevelXp = require(`../../utils/calculateLevelXp`);
module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Interaction} interaction 
     */
    callback: async (bot, interaction) => {
        await interaction.deferReply();

        const mentionUser = interaction.options.getUser(`membre`);
        const targetUserId = mentionUser ? mentionUser.id : interaction.user.id;
        const targetUserObject = await interaction.guild.members.fetch(targetUserId);

        const isBot = targetUserObject.user.bot;
        const username = targetUserObject.user.username;
        const nickname = targetUserObject.nickname
        const avatarURL = targetUserObject.user.displayAvatarURL({ size: 256 });
        const status = targetUserObject.presence === null ? `inconnu` : targetUserObject.presence.status
        var game
        if (status === `inconnu`) {
            game = `rien`
        } else {
            game = targetUserObject.presence.activities.length === 0 ? `rien` : targetUserObject.presence.activities
        }
        const accountCreationDate = targetUserObject.user.createdAt;
        const joinDate = targetUserObject.joinedAt;
        const fetchedGuildInfos = await GuildInfos.findOne({ guildId: interaction.guild.id });
        let messages = 0;
        let xp = 0;
        let level = 0;
        let requiredXp = 0;
        if (fetchedGuildInfos) {
            const users = Array.from(fetchedGuildInfos.users.values());
            const matchingUsers = users.filter(user => user.userId === targetUserId);
            if (matchingUsers.length > 0) {
                const fetchedLevel = matchingUsers[0];
                messages = fetchedLevel.messages;
                xp = fetchedLevel.xp;
                level = fetchedLevel.level;
                requiredXp = calculateLevelXp(level + 1) - xp;
            }
        }
        const roles2 = targetUserObject.roles.cache.sort((a, b) => b.position - a.position).map(roles => `${roles}`).join(`,\n`)

        const embed = new Discord.EmbedBuilder()
            .setColor(`#FFC300`)
            .setThumbnail(avatarURL)
            .addFields(
                { name: `Voici quelques infos et statistiques sur ${username} ${nickname === null ? `` : `aka **${nickname}**`}`, value: `\u200b`, inline: false },
                { name: `Bot`, value: `${isBot ? `OUI` : `NON`}`, inline: true },
                { name: `Statut`, value: `${status}`, inline: true },
                { name: `Joue actuellement à`, value: `${game}`, inline: true },
                { name: `Compte Discord créé le`, value: `${moment(accountCreationDate).format(`lll`)}`, inline: true },
                { name: `À rejoin le serveur le`, value: `${moment(joinDate).format(`lll`)}`, inline: true },
                { name: `Expérience`, value: `${username} a ${xp} points d'expérience et est au niveau ${level} grâce à ces ${messages} messages envoyés.\nIl lui manque ${requiredXp} points d'expérience pour monter de niveau.`, inline: false },
                { name: `Rôles possédés`, value: `${roles2}`, inline: false }
            )
            .setTimestamp();

        if (mentionUser && mentionUser.id === bot.user.id) {
            const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
            const uptime = process.uptime();

            embed.addFields(
                { name: `Mémoire utilisée`, value: `${memoryUsage.toFixed(2)} MB`, inline: true },
                { name: `Temps d'activité`, value: formatUptime(uptime), inline: true },
                { name: `Lien utile !`, value: `[Twitch](https://twitch.tv/maxtar)`, inline: true }
            );
        }

        interaction.followUp({ embeds: [embed] });
    },
    name: `statistiques`,
    description: `Affiche les informations de soi-même, d'un membre ou d'un bot`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `membre`,
            description: `Le membre dont vous voulez voir les informations`,
            type: Discord.ApplicationCommandOptionType.User,
            required: false,
        }
    ],
    permissionsRequired: [],
    botPermissions: []
};
/**
 * Format the uptime value into a human-readable format.
 * @param {number} uptime - Uptime value in seconds.
 * @returns {string} - Formatted uptime string.
 */
function formatUptime(uptime) {
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor(uptime / 3600) % 24;
    const minutes = Math.floor(uptime / 60) % 60;
    const seconds = Math.floor(uptime) % 60;
    return `${days} jours, ${hours} heures, ${minutes} minutes, ${seconds} secondes`;
}
