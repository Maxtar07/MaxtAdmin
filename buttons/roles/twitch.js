module.exports = {
    name: `twitchButton`,
    description: `Bouton pour avoir ou enlever le rôle des notifications Twitch`,
    buttonId: `twitchrole`,
    execute: async (bot, interaction) => {
        var twitch = interaction.guild.roles.cache.find(x => x.id === `756243894894854294`);
        if (interaction.member.roles.cache.has(`756243894894854294`)) {
            await interaction.member.roles.remove(`756243894894854294`);
            interaction.reply({
                ephemeral: true,
                content: `Le rôle ${twitch} t'a été enlevé avec succès`
            });
        } else {
            await interaction.member.roles.add(`756243894894854294`);
            interaction.reply({
                ephemeral: true,
                content: `Tu as bien obtenu le rôle ${twitch}`
            });
        }
    },
};