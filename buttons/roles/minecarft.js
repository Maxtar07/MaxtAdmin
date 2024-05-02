module.exports = {
    name: `minecraftButton`,
    description: `Bouton pour avoir ou enlever le rôle Minecraft`,
    buttonId: `minecraftrole`,
    execute: async (bot, interaction) => {
        var minecraft = interaction.guild.roles.cache.find(x => x.id === `726428189991108674`);
        if (interaction.member.roles.cache.has(`726428189991108674`)) {
            await interaction.member.roles.remove(`726428189991108674`);
            interaction.reply({
                ephemeral: true,
                content: `Le rôle ${minecraft} t'a été enlevé avec succès`
            });
        } else {
            await interaction.member.roles.add(`726428189991108674`);
            interaction.reply({
                ephemeral: true,
                content: `Tu as bien obtenu le rôle ${minecraft}`
            });
        }
    },
};