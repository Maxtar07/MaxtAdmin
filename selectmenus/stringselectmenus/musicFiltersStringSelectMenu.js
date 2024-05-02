module.exports = {
    name: `musicFiltersStringSelectMenu`,
    description: `String Select Menu pour mettre des filtres sur les musiques`,
    stringSelectMenuId: `musicfiltersstringselectmenu`,
    execute: async (bot, interaction) => {
        let pause;
        const queue = await bot.distube.getQueue(bot.music_voiceChannel);
        if (queue.paused) {
            pause = true
        } else {
            queue.pause();
        }
        const member = interaction.member;
        if (!member.roles.cache.has(`827181449551544371`)) {
            return interaction.reply({
                ephemeral: true,
                embeds: [
                    {
                        description: `Vous n'avez pas le rôle requis (<@&827181449551544371>) pour utiliser ce bouton.`,
                    }
                ]
            });
        }
        const selectedOptions = await interaction.values;
        const deselectedOptions = await interaction.customId.split(`-`).slice(1);

        const addedFilters = new Set(selectedOptions.filter(option => !deselectedOptions.includes(option)));
        await queue.filters.clear();
        addedFilters.forEach(async option => {
            if (option === `aucun`) return;
            await queue.filters.add(option);
        });
        if (pause != true) {
            queue.resume();
        }
        const filterNames = Object.keys(bot.distube.filters);
        let filterList = [];

        // Itérer par groupes de 5 filtres
        for (let i = 0; i < filterNames.length; i += 5) {
            const currentFilters = filterNames.slice(i, i + 5);
            const filterString = currentFilters.map((filter) => `${queue.filters.has(filter) ? `✅` : `❌`} ${filter}`).join(`, `);
            filterList.push(filterString);
        }

        bot.music_embed.data.fields[3].value = filterList.join(`,\n`)
        interaction.update({ embeds: [bot.music_embed] })
    }
};
