module.exports = {
    name: `notifButton`,
    description: `Bouton pour avoir ou enlever le rôle des notifications générales`,
    buttonId: `notifrole`,
    execute: async (bot, interaction) => {
        var notif = interaction.guild.roles.cache.find(x => x.id === `756244388413440171`);
        if (interaction.member.roles.cache.has(`756244388413440171`)) {
            await interaction.member.roles.remove(`756244388413440171`);
            interaction.reply({
                ephemeral: true,
                content: `Le rôle ${notif} t'a été enlevé avec succès`
            });
        } else {
            await interaction.member.roles.add(`756244388413440171`);
            interaction.reply({
                ephemeral: true,
                content: `Tu as bien obtenu le rôle ${notif}`
            });
        }
    },
};