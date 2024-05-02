module.exports = {
    name: `acceptButton`,
    description: `Bouton d'acceptation des règles du serveur`,
    buttonId: `acceptrules`,
    execute: async (bot, interaction) => {
        if (interaction.member.roles.cache.has(`824740975242117191`) || interaction.member.roles.cache.has(`726428189978787873`) || interaction.member.roles.cache.has(`726428190012211217`) || interaction.member.roles.cache.has(`726428190012211216`)) {
            return
        } else {
            await interaction.member.roles.add(`726428189978787873`);
            interaction.reply({
                ephemeral: true,
                embeds: [
                    {
                        title: `-->> Clique ici <<--`,
                        url: `https://discord.gg/8epEQyE`,
                        description: `Merci d'avoir accepter les règles, bienvenu sur le serveur !`,
                    }
                ]
            });
        }
    },
};
