module.exports = {
    name: `pubButton`,
    description: `Bouton pour avoir ou enlever le rôle Publicitaires`,
    buttonId: `pubrole`,
    execute: async (bot, interaction) => {
        var pubclean = interaction.guild.roles.cache.find(x => x.id === `867520064495288340`);
        if (interaction.member.roles.cache.has(`726428189978787874`)) {
            await interaction.member.roles.remove(`726428189978787874`);
            interaction.reply({
                ephemeral: true,
                content: `Le rôle ${pubclean} t'a été enlevé avec succès`
            });
        } else {
            await interaction.member.roles.add(`726428189978787874`);
            interaction.reply({
                ephemeral: true,
                content: `Tu as bien obtenu le rôle ${pubclean}\nRendez-vous dans ces diférents salons: <#726428195187851321>, <#726428195636903966>, <#726428195636903968>, <#726428195636903969>, <#726428195636903970>, <#726428195636903971>, <#726428195636903972>, <#726428195636903973>, <#726428195636903974>, `
            });
        }
    },
};