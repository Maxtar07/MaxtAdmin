module.exports = {
    name: `detenteButton`,
    description: `Bouton pour avoir ou enlever le rôle Détente`,
    buttonId: `detenterole`,
    execute: async (bot, interaction) => {
        var detenteclean = interaction.guild.roles.cache.find(x => x.id === `867519988520976385`);
        if (interaction.member.roles.cache.has(`726428190012211215`)) {
            await interaction.member.roles.remove(`726428190012211215`);
            interaction.reply({
                ephemeral: true,
                content: `Le rôle ${detenteclean} t'a été enlevé avec succès`
            });
        } else {
            await interaction.member.roles.add(`726428190012211215`);
            interaction.reply({
                ephemeral: true,
                content: `Tu as bien obtenu le rôle ${detenteclean}\nRendez-vous dans ces différents salons : <#726428191186485386>, <#726428191186485387>, <#726428191186485388> pour te détendre et t'amuser !!`
            });
        }
    },
};