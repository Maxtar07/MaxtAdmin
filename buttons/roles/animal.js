module.exports = {
    name: `animalCrossingButton`,
    description: `Bouton pour avoir ou enlever le rôle Animal Crossing`,
    buttonId: `animalcrossingrole`,
    execute: async (bot, interaction) => {
        var animal = interaction.guild.roles.cache.find(x => x.id === `726428189978787880`);
        if (interaction.member.roles.cache.has(`726428189978787880`)) {
            await interaction.member.roles.remove(`726428189978787880`);
            interaction.reply({
                ephemeral: true,
                content: `Le rôle ${animal} t'a été enlevé avec succès`
            });
        } else {
            await interaction.member.roles.add(`726428189978787880`);
            interaction.reply({
                ephemeral: true,
                content: `Tu as bien obtenu le rôle ${animal}`
            });
        }
    },
};