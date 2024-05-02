const Discord = require(`discord.js`);
const GuildInfos = require(`../../models/GuildInfos`);
module.exports = {
    callback: async (bot, interaction) => {
        const targetUserId = interaction.options.get(`membre`).value;
        const removeAll = interaction.options.get(`supprimer-tous`)?.value || false;
        const specificWarnNumber = interaction.options.get(`numéro-avertissement`)?.value || null;
        const targetUser = await interaction.guild.members.fetch(targetUserId);

        let guildInfos = await GuildInfos.findOne({ guildId: interaction.guild.id });

        if (guildInfos) {
            if (!targetUser) {
                interaction.reply({ content: `Cet utilisateur n'existe pas sur ce serveur.` });
                return;
            }
            guildInfos.guildName = interaction.guild.name;
            const users = Array.from(guildInfos.users.values());
            const matchingUsers = users.filter(user => user.userId === targetUserId);
            if (matchingUsers.length > 0) {
                const userWarn = matchingUsers[0];
                const warns = userWarn.warns || new Map();

                if (removeAll) {
                    userWarn.warns = new Map();
                    guildInfos.markModified(`users`);
                    await guildInfos.save();
                    interaction.reply({ content: `Tous les avertissements de ${targetUser} ont été supprimés.` });
                    return;
                }

                if (specificWarnNumber) {
                    if (isNaN(specificWarnNumber)) {
                        interaction.reply({ content: `Veuillez saisir un numéro valide.` });
                        return;
                    }
                    if (!(warns.has(`warn numéro ${specificWarnNumber}`))) {
                        interaction.reply({ content: `Il n'y a aucun avertissement de numéro ${specificWarnNumber} ` });
                        return;
                    }
                    warns.delete(`warn numéro ${specificWarnNumber}`);

                    const keys = Array.from(warns.keys());
                    keys.sort((a, b) => {
                        const warnNumberA = parseInt(a.split(` `)[2]);
                        const warnNumberB = parseInt(b.split(` `)[2]);
                        return warnNumberA - warnNumberB;
                    });

                    const newWarns = new Map();
                    keys.forEach((key, index) => {
                        const warn = warns.get(key);
                        newWarns.set(`warn numéro ${index + 1}`, warn);
                    });

                    userWarn.warns = newWarns;
                    guildInfos.markModified(`users`);
                    await guildInfos.save();
                    interaction.reply({ content: `l'avertissement numéro ${specificWarnNumber} de ${targetUser} a été supprimé.` });
                    return;
                }

                const lastKey = Array.from(warns.keys()).pop();
                if (lastKey) {
                    warns.delete(lastKey);
                    userWarn.warns = warns;
                    guildInfos.markModified(`users`);
                    await guildInfos.save();
                    interaction.reply({ content: `Le dernier avertissement de ${targetUser} a été supprimé.` });
                } else {
                    interaction.reply({ content: `${targetUser} n'a aucun avertissement à supprimer.` });
                }
            } else {
                interaction.reply({ content: `${targetUser} n'a aucun avertissement à supprimer.` });
            }
        } else {
            interaction.reply({ content: `Impossible de trouver les informations du serveur.` });
        }
    },
    name: `unwarn`,
    description: `Supprimer un avertissement d'un membre du serveur`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `membre`,
            description: `Le membre concerné`,
            type: Discord.ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: `supprimer-tous`,
            description: `Supprimer tous les avertissements du membre`,
            type: Discord.ApplicationCommandOptionType.Boolean,
            required: false
        },
        {
            name: `numéro-avertissement`,
            description: `Supprimer un avertissement spécifique`,
            type: Discord.ApplicationCommandOptionType.Integer,
            required: false
        }
    ],
    permissionsRequired: [Discord.PermissionFlagsBits.MuteMembers],
    botPermissions: [Discord.PermissionFlagsBits.MuteMembers]
};
