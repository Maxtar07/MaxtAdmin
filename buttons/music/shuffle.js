module.exports = {
    name: `Shuffle`,
    description: `Mélanger la liste de lecture`,
    buttonId: `music_shuffle`,
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
        await queue.shuffle()
        const title = await queue.songs[0].name;
        const nextSong = await queue.songs[1]
        if (queue.repeatMode === 1) {
            bot.music_embed.setFooter({ text: `Musique suivante: ${title} (mode boucle activé)`, iconURL: queue.songs[0].thumbnail })
        }
        if (queue.repeatMode === 2) {
            if (nextSong) {
                bot.music_embed.setFooter({ text: `Musique suivante: ${nextSong.name} \n(+${queue.songs.length} musiques en boucle)`, iconURL: nextSong.thumbnail })
            } else {
                bot.music_embed.setFooter({ text: `Musique suivante: ${title} (mode boucle activé)`, iconURL: queue.songs[0].thumbnail })
            }
        }
        if (queue.repeatMode === 0) {
            if (nextSong) {
                if (queue.autoplay === true) {
                    bot.music_embed.setFooter({ text: `Musique suivante: ${nextSong.name} \n(+${queue.songs.length < 3 ? `pleins d'autres après (mode autoplay activé)` : queue.songs.length === 3 ? `${queue.songs.length - 2} de la liste et pleins d'autres après (mode autoplay activé)` : `${queue.songs.length - 2} de la liste et pleins d'autres après (mode autoplay activé)`})`, iconURL: nextSong.thumbnail })
                } else {
                    bot.music_embed.setFooter({ text: `Musique suivante: ${nextSong.name} \n(+${queue.songs.length < 3 ? `aucune autre après` : queue.songs.length === 3 ? `${queue.songs.length - 2} autre après` : `${queue.songs.length - 2} autres après`})`, iconURL: nextSong.thumbnail })
                }
            } else {
                if (queue.autoplay === true) {
                    bot.music_embed.setFooter({ text: `Musique suivante inconnue (mode autoplay activé)` })
                } else {
                    bot.music_embed.setFooter({ text: `Pas de musique suivante` })
                }
            }
        }
        return interaction.update({ embeds: [bot.music_embed] })
    },
};
