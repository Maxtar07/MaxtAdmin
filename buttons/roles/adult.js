module.exports = {
    name: `adultButton`,
    description: `Bouton pour avoir ou enlever le rôle Coin des grands`,
    buttonId: `adultrole`,
    execute: async (bot, interaction) => {
        var adultclean = interaction.guild.roles.cache.find(x => x.id === `867520038768345088`);
        if (interaction.member.roles.cache.has(`726428189978787878`)) {
            await interaction.member.roles.remove(`726428189978787878`);
            interaction.reply({
                ephemeral: true,
                content: `Le rôle ${adultclean} t'a été enlevé avec succès`
            });
        } else {
            await interaction.member.roles.add(`726428189978787878`);
            interaction.reply({
                ephemeral: true,
                content: `Tu as bien obtenu le rôle ${adultclean}\nRendez-vous dans ces différents salons : <#726428194705768490>, <#726428194705768491>`
            });
        }
    },
};