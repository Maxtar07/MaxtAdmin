const Discord = require(`discord.js`);
const GuildInfos = require(`../../models/GuildInfos`);
const calculateLevelXp = require(`../../utils/calculateLevelXp`);
module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Interaction} interaction 
     */
    callback: async (bot, interaction) => {
        if (!interaction.inGuild()) {
            interaction.reply({ content: `Vous pouvez exécuter cette commande uniquement dans un serveur.` });
            return;
        }

        await interaction.deferReply();

        const targetUserId = interaction.options.get(`membre`).value;
        const action = interaction.options.get(`action`).value;
        const unit = interaction.options.get(`unité`).value;
        const amount = parseInt(interaction.options.get(`nombre`).value);

        if (isNaN(amount)) {
            interaction.editReply(`Veuillez saisir un nombre valide pour la quantité.`);
            return;
        }

        const targetUserObject = await interaction.guild.members.fetch(targetUserId);
        const fetchedGuildInfos = await GuildInfos.findOne({ guildId: interaction.guild.id });

        if (fetchedGuildInfos) {
            const users = Array.from(fetchedGuildInfos.users.values());
            const matchingUsers = users.filter(user => user.userId === targetUserId);

            if (matchingUsers.length > 0) {
                const targetUserLevel = matchingUsers[0];
                let newValue;

                switch (action) {
                    case `add`:
                        switch (unit) {
                            case `xp`:
                                newValue = targetUserLevel.xp + amount;
                                break;
                            case `level`:
                                newValue = targetUserLevel.level + amount;
                                break;
                        }
                        break;
                    case `remove`:
                        switch (unit) {
                            case `xp`:
                                newValue = targetUserLevel.xp - amount;
                                break;
                            case `level`:
                                newValue = targetUserLevel.level - amount;
                                break;
                        }
                        break;
                }

                if (newValue < 0) {
                    newValue = 0;
                }

                switch (unit) {
                    case `xp`:
                        targetUserLevel.xp = newValue;

                        const currentXp = targetUserLevel.xp;
                        const nextLevelXp = calculateLevelXp(targetUserLevel.level);
                        const xpNeeded = nextLevelXp - currentXp;

                        if (targetUserLevel.xp > calculateLevelXp(targetUserLevel.level)) {
                            targetUserLevel.xp = 0;
                            targetUserLevel.level += 1;
                            interaction.editReply(`${targetUserObject.user.tag} est maintenant niveau ${targetUserLevel.level} (Il lui manque ${xpNeeded} XP pour atteindre le niveau ${targetUserLevel.level + 1})`);
                        } else {
                            interaction.editReply(`${targetUserObject.user.tag} a maintenant ${newValue} XP (Il lui manque ${xpNeeded} XP pour atteindre le niveau ${targetUserLevel.level + 1})`);
                        }
                        break;
                    case `level`:
                        targetUserLevel.level = newValue;
                        interaction.editReply(`${targetUserObject.user.tag} est maintenant niveau ${newValue}`);
                        break;
                }

                fetchedGuildInfos.markModified(`users`);
                await fetchedGuildInfos.save();
            } else {
                interaction.editReply(`${targetUserObject.user.tag} n'a pas encore de niveau`);
            }
        } else {
            interaction.editReply(`Il n'y a aucun membre sur ce serveur qui à un niveau`);
        }
    },
    name: `xp`,
    description: `Ajouter ou enlever de l'xp ou des niveaux à un membre`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `membre`,
            description: `Le membre à qui vous voulez ajouter ou enlever de l'xp ou des niveaux`,
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: `action`,
            description: `Action à effectuer (add ou remove)`,
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: `Add`,
                    value: `add`
                },
                {
                    name: `Remove`,
                    value: `remove`
                }
            ],
        },
        {
            name: `unité`,
            description: `Unité de la quantité (xp ou level)`,
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: `XP`,
                    value: `xp`
                },
                {
                    name: `Niveau`,
                    value: `level`
                }
            ],
        },
        {
            name: `nombre`,
            description: `Quantité à ajouter ou à retirer`,
            type: Discord.ApplicationCommandOptionType.Number,
            required: true,
        },
    ],
    permissionsRequired: [Discord.PermissionFlagsBits.ModerateMembers],
    botPermissions: [Discord.PermissionFlagsBits.ModerateMembers]
};
