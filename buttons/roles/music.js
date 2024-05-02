module.exports = {
    name: `musicButton`,
    description: `Bouton pour avoir ou enlever le rôle Musique`,
    buttonId: `musicrole`,
    execute: async (bot, interaction) => {
        var musicclean = interaction.guild.roles.cache.find(x => x.id === `867520012582518814`);
        if (interaction.member.roles.cache.has(`726428189978787879`)) {
            await interaction.member.roles.remove(`726428189978787879`);
            interaction.reply({
                ephemeral: true,
                content: `Le rôle ${musicclean} t'a été enlevé avec succès`
            });
        } else {
            await interaction.member.roles.add(`726428189978787879`);
            interaction.reply({
                ephemeral: true,
                content: `Tu as bien obtenu le rôle ${musicclean}\nRendez-vous dans ces différents salons : <#726428192403095624>, <#726428192403095625>, <#726428192403095629>`
            });
        }
    },
};