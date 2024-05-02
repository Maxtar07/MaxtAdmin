const Discord = require(`discord.js`);
const GuildInfos = require(`../../models/GuildInfos`);
const canvacord = require(`canvacord`);
const calculateLevelXp = require(`../../utils/calculateLevelXp`);
module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Interaction} interaction 
     */
    callback: async (bot, interaction) => {
        if (!interaction.inGuild()) {
            return interaction.editReply(`Vous pouvez exécuter cette commande uniquement dans un serveur.`);
        }

        await interaction.deferReply();
        const mentionUserId = interaction.options.get(`membre`)?.value;
        const targetUserId = mentionUserId || interaction.member.id;
        const targetUserObject = await interaction.guild.members.fetch(targetUserId);

        const fetchedGuildInfos = await GuildInfos.findOne({ guildId: interaction.guild.id });
        if (!fetchedGuildInfos) {
            return interaction.editReply(`Il n'y a aucun membre sur ce serveur qui a un niveau.`);
        }

        const users = Array.from(fetchedGuildInfos.users.values()).filter(user => !user.hasLeave);

        const matchingUsers = users.filter(user => user.userId === targetUserId);
        if (matchingUsers.length === 0) {
            return interaction.editReply(`${targetUserObject.user.tag} n'a pas encore de niveau.`);
        }

        const fetchedLevel = matchingUsers[0];
        users.sort((a, b) => {
            if (a.level === b.level) {
                return b.xp - a.xp;
            } else {
                return b.level - a.level;
            }
        });
        const currentRank = users.findIndex((lvl) => lvl.userId === targetUserId) + 1;

        await canvacord.Font.loadDefault()
        const rank = new canvacord.RankCardBuilder()
            .setAvatar(targetUserObject.user.displayAvatarURL({ size: 256 }))
            .setRank(currentRank)
            .setLevel(fetchedLevel.level)
            .setCurrentXP(fetchedLevel.xp)
            .setRequiredXP(calculateLevelXp(fetchedLevel.level))
            //.setStatus(targetUserObject.presence.status)
            .setUsername(targetUserObject.user.username)
            .setTextStyles({
                level: `NIVEAU:`,
                xp: `EXPÉRIENCE:`,
                rank: `CLASSEMENT:`
            })
        //.setFonts({
        //    username: {
        //      name: `Helvetica`,
        //      handle: `Arial`, // Optionnel
        //    },
        //    progress: {
        //      level: {
        //        text: `Helvetica`,
        //        value: `Arial`,
        //      },
        //      xp: {
        //        text: `Helvetica`,
        //        value: `Arial`,
        //      },
        //      rank: {
        //        text: `Helvetica`,
        //        value: `Arial`,
        //      },
        //    },
        //  })

        const data = await rank.build();
        await interaction.editReply({ files: [data] });
    },
    name: `level`,
    description: `Affiche votre niveau où celui d'un autre membre`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `membre`,
            description: `Le membre à qui vous voulez voir son niveau`,
            type: Discord.ApplicationCommandOptionType.User,
            required: false,
        }
    ],
    permissionsRequired: [],
    botPermissions: []
};
