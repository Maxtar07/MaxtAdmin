module.exports = {
    name: `gamingButton`,
    description: `Bouton pour avoir ou enlever les rôles de gaming`,
    buttonId: `gamingrole`,
    execute: async (bot, interaction) => {
        var gamingboyclean = interaction.guild.roles.cache.find(x => x.id === `867519905947320351`);
        var gaminggirlclean = interaction.guild.roles.cache.find(x => x.id === `867519870324310036`);
        if (interaction.member.roles.cache.has(`726428190012211214`)) {
            await interaction.member.roles.remove(`726428190012211214`);
            interaction.reply({
                ephemeral: true,
                content: `Le rôle ${gaminggirlclean} t'a été enlevé avec succès`
            });
            return;
        }
        if (interaction.member.roles.cache.has(`726428190012211213`)) {
            await interaction.member.roles.remove(`726428190012211213`);
            interaction.reply({
                ephemeral: true,
                content: `Le rôle ${gamingboyclean} t'a été enlevé avec succès`
            });
            return;
        }
        if (interaction.member.roles.cache.has(`726428190012211217`) && !interaction.member.roles.cache.has(`726428190012211214`)) {
            await interaction.member.roles.add(`726428190012211214`);
            interaction.reply({
                ephemeral: true,
                content: `Tu as bien obtenu le rôle ${gaminggirlclean}\nRendez-vous dans ces différents salons : <#726428191568298005>, <#726428191568298006>, <#726428191568298008>`
            });
            return;
        }
        if (interaction.member.roles.cache.has(`726428190012211216`) && !interaction.member.roles.cache.has(`726428190012211213`)) {
            await interaction.member.roles.add(`726428190012211213`);
            interaction.reply({
                ephemeral: true,
                content: `Tu as bien obtenu le rôle ${gamingboyclean}\nRendez-vous dans ces différents salons : <#726428191568298005>, <#726428191568298006>, <#726428191568298008>`
            });
            return;
        }
    },
};