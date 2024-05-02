module.exports = {
    name: `refuseButton`,
    description: `Bouton de refus des règles du serveur`,
    buttonId: `refuserules`,
    execute: async (bot, interaction) => {
        try {
            await interaction.member.send({
                embeds: [
                    {
                        title: `Discord de Maxtar`,
                        url: `https://discord.gg/8epEQyE`,
                        description: `Tu as été kick du serveur car tu as refuser les règles !!`,
                    }
                ]
            });
            await interaction.member.kick(`Refus des règles`);
        } catch (e) {
            return;
        }
    },
};
