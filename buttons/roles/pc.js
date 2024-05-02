module.exports = {
    name: `pcButton`,
    description: `Bouton pour avoir ou enlever le rôle PC`,
    buttonId: `pcrole`,
    execute: async (bot, interaction) => {
        var pc = interaction.guild.roles.cache.find(x => x.id === `726428190012211212`);
        if (interaction.member.roles.cache.has(`726428190012211212`)) {
            await interaction.member.roles.remove(`726428190012211212`);
            interaction.reply({
                ephemeral: true,
                content: `Le rôle ${pc} t'a été enlevé avec succès`
            });
        } else {
            await interaction.member.roles.add(`726428190012211212`);
            interaction.reply({
                ephemeral: true,
                content: `Tu as bien obtenu le rôle ${pc}`
            });
        }
    },
};