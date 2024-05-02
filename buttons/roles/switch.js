module.exports = {
    name: `switchButton`,
    description: `Bouton pour avoir ou enlever le rôle Switch`,
    buttonId: `switchrole`,
    execute: async (bot, interaction) => {
        var switchrole = interaction.guild.roles.cache.find(x => x.id === `726428189991108677`);
        if (interaction.member.roles.cache.has(`726428189991108677`)) {
            await interaction.member.roles.remove(`726428189991108677`);
            interaction.reply({
                ephemeral: true,
                content: `Le rôle ${switchrole} t'a été enlevé avec succès`
            });
        } else {
            await interaction.member.roles.add(`726428189991108677`);
            interaction.reply({
                ephemeral: true,
                content: `Tu as bien obtenu le rôle ${switchrole}`
            });
        }
    },
};