const Discord = require(`discord.js`);
const GuildInfos = require(`../../models/GuildInfos`);
/**
 * 
 * @param {Discord.Client} bot 
 * @param {Discord.Interaction} interaction 
 */
module.exports = {
    callback: async (bot, interaction) => {
        const targetUserId = interaction.options.get(`membre`).value;
        const reason = interaction.options.get(`raison`)?.value || `Aucune raison spécifiée`;
        const targetUser = await interaction.guild.members.fetch(targetUserId);
        const warn_embed = new Discord.EmbedBuilder()
            .setColor(`Orange`)
            .setAuthor({
                name: `⚠ Nouveau warn !`,
                iconURL: interaction.user.avatarURL(),
            })
            .setDescription(`Le membre ${targetUser} a reçu un avertissement.\nRaison: '${reason}'`)

        let guildInfos = await GuildInfos.findOne({ guildId: interaction.guild.id });

        if (guildInfos) {
            if (!targetUser) {
                interaction.reply({ content: `Cet utilisateur n'existe pas sur ce serveur.`, ephemeral: true });
                return;
            }
            guildInfos.guildName = interaction.guild.name
            const users = Array.from(guildInfos.users.values());
            const matchingUsers = users.filter(user => user.userId === targetUserId);
            if (matchingUsers.length > 0) {
                let warnCount = 1;
                const userWarn = matchingUsers[0];
                const warns = userWarn.warns || new Map();

                if (warns.size > 0) {
                    const lastKey = Array.from(warns.keys()).pop();
                    const lastWarnNumber = parseInt(lastKey.split(` `)[2]);
                    warnCount = lastWarnNumber + 1;
                }

                warns.set(`warn numéro ${warnCount}`, { reason: reason, warnerId: interaction.user.id, warnerName: interaction.user.username, date: new Date().toLocaleString(`fr-FR`, { weekday: `long`, day: `numeric`, month: `long`, year: `numeric`, hour: `numeric`, minute: `numeric` }) });
                warnCount++;

                userWarn.warns = warns;

                guildInfos.markModified(`users`);
                await guildInfos.save();

                interaction.reply({ embeds: [warn_embed] });
            } else {
                guildInfos.users.set(interaction.options.get(`membre`).user.username, {
                    userName: interaction.options.get(`membre`).user.username,
                    globalName: interaction.options.get(`membre`).user.globalName ? interaction.options.get(`membre`).user.globalName : interaction.options.get(`membre`).user.username,
                    userId: targetUserId,
                    hasLeave: false,
                    messages: 0,
                    xp: 0,
                    level: 0,
                    warns: new Map([[`warn numéro 1`, {
                        reason: reason,
                        warnerId: interaction.user.id,
                        warnerName: interaction.user.username,
                        date: new Date().toLocaleString(`fr-FR`, { weekday: `long`, day: `numeric`, month: `long`, year: `numeric`, hour: `numeric`, minute: `numeric` })
                    }]])
                });
                interaction.reply({ embeds: [warn_embed] });
            }
            await guildInfos.markModified(`users`);
            await guildInfos.save();
        } else {
            const newGuildInfos = new GuildInfos({
                guildId: interaction.guild.id,
                guildName: interaction.guild.name,
                users: new Map([[interaction.options.get(`membre`).user.username, {
                    userName: interaction.options.get(`membre`).user.username,
                    globalName: interaction.options.get(`membre`).user.globalName ? interaction.options.get(`membre`).user.globalName : interaction.options.get(`membre`).user.username,
                    userId: targetUserId,
                    hasLeave: false,
                    messages: 0,
                    xp: 0,
                    level: 0,
                    warns: new Map([[`warn numéro 1`, {
                        reason: reason,
                        warnerId: interaction.user.id,
                        warnerName: interaction.user.username,
                        date: new Date().toLocaleString(`fr-FR`, { weekday: `long`, day: `numeric`, month: `long`, year: `numeric`, hour: `numeric`, minute: `numeric` })
                    }]])
                }]])
            });
            await newGuildInfos.save();
            interaction.reply({ embeds: [warn_embed] });
        }
    },
    name: `warn`,
    description: `Avertir un membre du serveur`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `membre`,
            description: `Le membre à avertir`,
            type: Discord.ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: `raison`,
            description: `La raison de l'avertissement`,
            type: Discord.ApplicationCommandOptionType.String,
            required: false
        }
    ],
    permissionsRequired: [Discord.PermissionFlagsBits.MuteMembers],
    botPermissions: [Discord.PermissionFlagsBits.MuteMembers]
};
