module.exports = {
    name: `gtavButton`,
    description: `Bouton pour avoir ou enlever le rôle GTA V`,
    buttonId: `gtavrole`,
    execute: async (bot, interaction) => {
        var gtav = interaction.guild.roles.cache.find(x => x.id === `726428189991108669`);
        if (interaction.member.roles.cache.has(`726428189991108669`)) {
            await interaction.member.roles.remove(`726428189991108669`);
            interaction.reply({
                ephemeral: true,
                content: `Le rôle ${gtav} t'a été enlevé avec succès`
            });
        } else {
            await interaction.member.roles.add(`726428189991108669`);
            interaction.reply({
                ephemeral: true,
                content: `Tu as bien obtenu le rôle ${gtav}`
            });
        }
    },
};