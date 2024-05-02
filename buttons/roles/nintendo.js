module.exports = {
    name: `nintendoButton`,
    description: `Bouton pour avoir ou enlever le rôle Nintendo`,
    buttonId: `nintendorole`,
    execute: async (bot, interaction) => {
        var nintendo = interaction.guild.roles.cache.find(x => x.id === `726428189978787881`);
        if (interaction.member.roles.cache.has(`726428189978787881`)) {
            await interaction.member.roles.remove(`726428189978787881`);
            interaction.reply({
                ephemeral: true,
                content: `Le rôle ${nintendo} t'a été enlevé avec succès`
            });
        } else {
            await interaction.member.roles.add(`726428189978787881`);
            interaction.reply({
                ephemeral: true,
                content: `Tu as bien obtenu le rôle ${nintendo}`
            });
        }
    },
};