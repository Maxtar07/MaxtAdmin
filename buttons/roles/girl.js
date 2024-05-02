module.exports = {
    name: `girlButton`,
    description: `Bouton pour avoir ou enlever le rôle Fille`,
    buttonId: `girlrole`,
    execute: async (bot, interaction) => {
        var girl = interaction.guild.roles.cache.find(x => x.id === `726428190012211217`);
        if (interaction.member.roles.cache.has(`726428190012211216`) || interaction.member.roles.cache.has(`726428190012211217`) || interaction.member.roles.cache.has(`824740975242117191`)) return;
        await interaction.member.roles.add(`726428190012211217`);
        await interaction.member.roles.remove(`726428189978787873`);
        interaction.reply({
            ephemeral: true,
            content: `Bien joué !\nTu as maintenant ton rôle ${girl}, il va te permettre de te ballader comme bon te semble sur l'ensemble du serveur.`
        });
        if (interaction.channelId === `726428190427447360`) {
            const message = await interaction.message
            message.edit({ components: [] });
        }
    },
};