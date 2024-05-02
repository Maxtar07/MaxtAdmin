const Discord = require(`discord.js`);
const moment = require(`moment`);
module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Interaction} interaction 
     */
    callback: async (bot, interaction) => {
        await interaction.deferReply();

        const guild = interaction.guild;
        const guildName = guild.name;
        const guildIconURL = guild.iconURL({ dynamic: true, size: 256 });
        const owner = guild.ownerId;

        guild.members.fetch({ withPresences: true }).then(fetchAll => {
            const offline = fetchAll.filter(m => m.presence?.status === `offline` || m.presence === null).filter(m => !m.user.bot)
            const online = fetchAll.filter(m => m.presence?.status === `online`).filter(m => !m.user.bot)
            const embed = new Discord.EmbedBuilder()
                .setColor(`#FFC300`)
                .setThumbnail(guildIconURL)
                .setTitle(`Plus d'infos à propos du serveur __** ${guildName} **__:`)
                .setDescription(guild.description)
                .addFields({
                    name: `\u200b`,
                    value: `
- **ID du serveur:** ${guild.id}
- **Boss:** Le boss du serveur est <@${owner}>
- **Rôles:** Il y a ${guild.roles.cache.size} rôles sur le serveur.
- **Serveur créé le:** ${moment.utc(guild.createdAt).format(`LL`)}
- **Nombre de bots:** ${guild.members.cache.filter(m => m.user.bot).size}
- **Nombre de membres:** ${guild.members.cache.filter(m => !m.user.bot).size}
- **Nombre de membres en ligne:** ${online.size}
- **Nombre de filles:** ${guild.roles.cache.find(r => r.id === `726428190012211217`).members.size}
- **Nombre de filles en ligne:** ${guild.roles.cache.find(r => r.id === `726428190012211217`).members.filter(m => m.presence?.status === `online`).size}
- **Nombre de garçons :** ${guild.roles.cache.find(r => r.id === `726428190012211216`).members.size}
- **Nombre de garçons en ligne:** ${guild.roles.cache.find(r => r.id === `726428190012211216`).members.filter(m => m.presence?.status === `online`).size}
- **Nombre de non-binaires :** ${guild.roles.cache.find(r => r.id === `824740975242117191`).members.size}
- **Nombre de non-binaires en ligne:** ${guild.roles.cache.find(r => r.id === `824740975242117191`).members.filter(m => m.presence?.status === `online`).size}
- **Nombre de membres hors ligne:** ${offline.size}
- **Nombre de catégories:** ${guild.channels.cache.filter(chan => chan.type === Discord.ChannelType.GuildCategory).size}
- **Nombre de salons textuels:** ${guild.channels.cache.filter(chan => chan.type === Discord.ChannelType.GuildText).size}
- **Nombre de salons vocaux:** ${guild.channels.cache.filter(chan => chan.type === Discord.ChannelType.GuildVoice).size}
`})
                .setTimestamp();

            interaction.followUp({ embeds: [embed] });
        })
    },
    name: `serverinfo`,
    description: `Affiche les informations du serveur Discord`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [],
    permissionsRequired: [],
    botPermissions: []
};
