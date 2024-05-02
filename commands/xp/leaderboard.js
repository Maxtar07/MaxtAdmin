const Discord = require(`discord.js`);
const GuildInfos = require(`../../models/GuildInfos`);
const calculateLevelXp = require(`../../utils/calculateLevelXp`);
const { Font, LeaderboardBuilder } = require(`canvacord`);
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

        const fetchedGuildInfos = await GuildInfos.findOne({ guildId: interaction.guild.id });
        if (fetchedGuildInfos) {
            const users = Array.from(fetchedGuildInfos.users.values()).filter(user => !user.hasLeave);
            const sortedUsers = users.sort((a, b) => {
                if (a.level === b.level) {
                    return b.xp - a.xp;
                } else {
                    return b.level - a.level;
                }
            });
            // Chargement de la police par défaut
            await Font.loadDefault();

            //création de la liste des membres et leurs infos de niveaux
            const players = await Promise.all(sortedUsers.slice(0, 6).map(async (user, index) => {
                let discordUser = interaction.client.users.cache.get(user.userId);
                if (!discordUser) {
                    discordUser = await interaction.client.users.fetch(user.userId);
                }

                return {
                    avatar: discordUser.displayAvatarURL({ format: 'png' }),
                    username: discordUser.username,
                    displayName: discordUser.displayName,
                    level: user.level,
                    xp: user.xp,
                    rank: index + 1,
                };
            }));

            // Création du générateur de leaderboard
            const lb = new LeaderboardBuilder()
                // Définition du titre, de l'image et du sous-titre
                .setHeader({
                    title: interaction.guild.name,
                    image: interaction.guild.iconURL({ format: "png" }),
                    subtitle: `${users.length} membres`,
                })
                // Définition des joueurs
                .setPlayers(players)
                // Définition de l'image de fond
                .setBackground(`https://media.discordapp.net/attachments/503517615944237056/1221103445935915211/leaderboard.png?ex=662d0bb4&is=661a96b4&hm=d48b3bfdfbdeadba4509e29eb52f27bc23d92b902cb7ccf818de9decae9ae39a&quality=lossless&`)
                .setTextStyles({
                    level: `NIVEAU`,
                    xp: `XP`,
                    rank: ``
                })
            // Génération de l'image
            const image = await lb.build({ format: "png" });



            // Envoi de l'image
            interaction.reply({ files: [image] });
        } else {
            interaction.reply(`Il n'y a aucun membre sur ce serveur qui a un niveau.`);
        }
    },
    name: `leaderboard`,
    description: `Affiche le classement des niveaux des membres du serveur`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [],
    permissionsRequired: [],
    botPermissions: []
};