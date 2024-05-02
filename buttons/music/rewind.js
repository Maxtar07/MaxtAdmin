module.exports = {
    name: `Reculer 5s`,
    description: `Reculer de 5 secondes la musique en cours`,
    buttonId: `music_rewind`,
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
        const queue = await bot.distube.getQueue(bot.music_voiceChannel);

        const currentSong = queue.songs[0];
        const formattedDuration = currentSong.formattedDuration;
        const duration = currentSong.duration;
        const current = queue.currentTime;
        const percentage = Math.floor((current / duration) * 100);
        const progressBar = `▬`.repeat(Math.floor(percentage / 5)) + `🔘` + `▬`.repeat(20 - Math.floor(percentage / 5));
        const progressBarString = `${progressBar}`;

        let time = queue.currentTime - 5.00;
        if (time < 0) {
            time = 0
        }

        queue.seek(time)
        bot.music_embed.setDescription(`${queue.formattedCurrentTime} | ${progressBarString} | ${formattedDuration}`)
        interaction.update({ embeds: [bot.music_embed] })
    },
};
