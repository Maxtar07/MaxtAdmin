module.exports = {
    name: `rocketButton`,
    description: `Bouton pour avoir ou enlever le rôle Rocket League`,
    buttonId: `rocketrole`,
    execute: async (bot, interaction) => {
        var rocket = interaction.guild.roles.cache.find(x => x.id === `726428189991108671`);
        if (interaction.member.roles.cache.has(`726428189991108671`)) {
            await interaction.member.roles.remove(`726428189991108671`);
            interaction.reply({
                ephemeral: true,
                content: `Le rôle ${rocket} t'a été enlevé avec succès`
            });
        } else {
            await interaction.member.roles.add(`726428189991108671`);
            interaction.reply({
                ephemeral: true,
                content: `Tu as bien obtenu le rôle ${rocket}`
            });
        }
    },
};