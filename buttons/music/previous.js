module.exports = {
    name: `Musique précédente`,
    description: `Remet la musique précédente`,
    buttonId: `music_previous`,
    execute: async (bot, interaction) => {
        const member = interaction.member;
        if (!member.roles.cache.has(`827181449551544371`)) {
            return interaction.reply({
                ephemeral: true,
                embeds: [
                    {
                        description: `Vous n'avez pas le rôle requis (<@&827181449551544371>) pour utiliser ce bouton.`,
                    }
                ]
            });
        }
        interaction.update({ content: `` })
        const queue = await bot.distube.getQueue(bot.music_voiceChannel);
        const PreviousSong = queue.previousSongs[0];
        if (!PreviousSong) return queue.seek(0);
        queue.previous()
    },
};

