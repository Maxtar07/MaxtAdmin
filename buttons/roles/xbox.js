module.exports = {
    name: `xboxButton`,
    description: `Bouton pour avoir ou enlever le rôle Xbox`,
    buttonId: `xboxrole`,
    execute: async (bot, interaction) => {
        var xbox = interaction.guild.roles.cache.find(x => x.id === `726428190012211210`);
        if (interaction.member.roles.cache.has(`726428190012211210`)) {
            await interaction.member.roles.remove(`726428190012211210`);
            interaction.reply({
                ephemeral: true,
                content: `Le rôle ${xbox} t'a été enlevé avec succès`
            });
        } else {
            await interaction.member.roles.add(`726428190012211210`);
            interaction.reply({
                ephemeral: true,
                content: `Tu as bien obtenu le rôle ${xbox}`
            });
        }
    },
};