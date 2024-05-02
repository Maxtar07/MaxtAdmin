const Discord = require(`discord.js`);
const GuildInfos = require(`../../models/GuildInfos`);
module.exports = {
    callback: async (bot, interaction) => {
        const targetUserId = interaction.options.get(`membre`)?.value || interaction.user.id;
        const targetUser = await interaction.guild.members.fetch(targetUserId);

        let guildInfos = await GuildInfos.findOne({ guildId: interaction.guild.id });

        if (guildInfos) {
            if (!targetUser) {
                interaction.reply({ content: `Cet utilisateur n'existe pas sur ce serveur.` });
                return;
            }

            const users = Array.from(guildInfos.users.values());
            const matchingUsers = users.filter(user => user.userId === targetUserId);

            if (matchingUsers.length > 0) {
                const userWarn = matchingUsers[0];
                const warns = userWarn.warns || new Map();

                if (warns.size === 0) {
                    interaction.reply({ content: `Ce membre n'a aucun avertissement.` });
                    return;
                }

                const embed = new Discord.EmbedBuilder()
                    .setColor(`Orange`)
                    .setTitle(`Avertissements de ${targetUser.user.username}`)
                    .setDescription(`Voici la liste des avertissements :`);

                for (const [key, value] of warns.entries()) {
                    embed.addFields(
                        { name: `${key}`, value: `**__Raison :__** ${value.reason}\n**__Avertisseur :__** ${value.warnerName}\n**__Date :__** ${value.date}` }
                    );
                }

                interaction.reply({ embeds: [embed] });
            } else {
                interaction.reply({ content: `Ce membre n'a aucun avertissement.` });
            }
        } else {
            interaction.reply({ content: `Il n'y a pas d'informations de guilde enregistrées.` });
        }
    },
    name: `seewarns`,
    description: `Voir les avertissements d'un membre ou de soi-même`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `membre`,
            description: `Le membre dont vous souhaitez voir les avertissements`,
            type: Discord.ApplicationCommandOptionType.User,
            required: false
        }
    ],
    permissionsRequired: [],
    botPermissions: []
};
