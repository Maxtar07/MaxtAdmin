module.exports = {
    name: `maxcraftButton`,
    description: `Bouton pour avoir ou enlever le rôle Maxcraft`,
    buttonId: `maxcraftrole`,
    execute: async (bot, interaction) => {
        var maxcraft = interaction.guild.roles.cache.find(x => x.id === `738476660235698279`);
        if (interaction.member.roles.cache.has(`738476660235698279`)) {
            await interaction.member.roles.remove(`738476660235698279`);
            interaction.reply({
                ephemeral: true,
                content: `Le rôle ${maxcraft} t'a été enlevé avec succès`
            });
        } else {
            await interaction.member.roles.add(`738476660235698279`);
            interaction.reply({
                ephemeral: true,
                content: `Tu as bien obtenu le rôle ${maxcraft}`
            });
        }
    },
};