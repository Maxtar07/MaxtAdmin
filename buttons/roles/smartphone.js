module.exports = {
    name: `smartphoneButton`,
    description: `Bouton pour avoir ou enlever le rôle Smartphone`,
    buttonId: `smartphonerole`,
    execute: async (bot, interaction) => {
        var smartphone = interaction.guild.roles.cache.find(x => x.id === `726428189991108676`);
        if (interaction.member.roles.cache.has(`726428189991108676`)) {
            await interaction.member.roles.remove(`726428189991108676`);
            interaction.reply({
                ephemeral: true,
                content: `Le rôle ${smartphone} t'a été enlevé avec succès`
            });
        } else {
            await interaction.member.roles.add(`726428189991108676`);
            interaction.reply({
                ephemeral: true,
                content: `Tu as bien obtenu le rôle ${smartphone}`
            });
        }
    },
};