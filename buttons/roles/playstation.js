module.exports = {
    name: `playstationButton`,
    description: `Bouton pour avoir ou enlever le rôle Playstation`,
    buttonId: `playstationrole`,
    execute: async (bot, interaction) => {
        var playstation = interaction.guild.roles.cache.find(x => x.id === `726428190012211211`);
        if (interaction.member.roles.cache.has(`726428190012211211`)) {
            await interaction.member.roles.remove(`726428190012211211`);
            interaction.reply({
                ephemeral: true,
                content: `Le rôle ${playstation} t'a été enlevé avec succès`
            });
        } else {
            await interaction.member.roles.add(`726428190012211211`);
            interaction.reply({
                ephemeral: true,
                content: `Tu as bien obtenu le rôle ${playstation}`
            });
        }
    },
};