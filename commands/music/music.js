const Discord = require(`discord.js`);
const search = require(`yt-search`);
module.exports = {
    callback: async (bot, interaction) => {
        const { options } = interaction
        const query = options.getString(`query`);
        const embed = new Discord.EmbedBuilder()
        try {
            const searching = await search(`${query}`);
            const searchResults = searching.videos.slice(0, 5)
            bot.music_searchResults = searchResults

            const search_embed = new Discord.EmbedBuilder()
                .setColor(`White`)
                .setTitle(`Résultats de recherche YouTube`)
                .setDescription(`Voici les 5 résultats les plus pertinents pour \`${query}\`:`);

            for (let i = 0; i < searchResults.length; i++) {
                search_embed.addFields({
                    name: `Résultat ${i + 1}`,
                    value: `[${searchResults[i].title}](${searchResults[i].url})`
                });
            }
            const row = new Discord.ActionRowBuilder().addComponents(
                searchResults.map((result, index) =>
                    new Discord.ButtonBuilder()
                        .setCustomId(`result_${index}`)
                        .setLabel(`Sélectionner ${index + 1}`)
                        .setStyle(`Primary`)
                )
            );
            return interaction.reply({
                embeds: [search_embed], components: [row], ephemeral: true,
            });
        } catch (err) {
            console.log(err)
            embed.setColor(`Red`).setDescription(`Erreur !`)
            return interaction.reply({ embeds: [embed], ephemeral: true })
        }
    },
    name: `music`,
    description: `Affiche une liste de 5 résultats YouTube avec 5 boutons pour choisir laquelle jouer`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `query`,
            description: `La recherche à faire sur youtube`,
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    permissionsRequired: [],
    botPermissions: []
};
