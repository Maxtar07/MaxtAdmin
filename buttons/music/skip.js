module.exports = {
    name: `Musique suivante`,
    description: `Passe à la musique suivante ou arrête le liste de lecture si elle est vide`,
    buttonId: `music_skip`,
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
        let time = queue.songs[0].duration - 0.01
        const NextSong = queue.songs[1];
        if (!NextSong) {
            if (queue.autoplay === true || queue.repeatMode === 1 || queue.repeatMode === 2) {
                return queue.seek(time);
            } else {
                return queue.stop()
            }
        } else {
            if (queue.repeatMode === 1 || queue.repeatMode === 2) {
                return queue.seek(time);
            } else {
                return queue.skip()
            }
        }
    },
};