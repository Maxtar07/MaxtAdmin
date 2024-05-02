const Discord = require(`discord.js`);
module.exports = async (bot, queue, song) => {
    console.log(`playSong`)
    let music_buttons1;
    let music_buttons2;
    let music_buttons3;
    let loopMode;
    let autoplay;

    if (queue.paused) {
        bot.music_embed.setAuthor({ name: `Musique en pause` }).setColor(`Orange`)
        music_buttons1 = new Discord.ActionRowBuilder().addComponents(bot.previous, bot.rewind, bot.resume, bot.forward, bot.skip)
        music_buttons2 = new Discord.ActionRowBuilder().addComponents(bot.downvolume, bot.loop, bot.stop, bot.autoplay, bot.upvolume)
        music_buttons3 = new Discord.ActionRowBuilder().addComponents(bot.queue, bot.shuffle)
    } else {
        bot.music_embed.setAuthor({ name: `Musique en cours` }).setColor(`Aqua`)
        music_buttons1 = new Discord.ActionRowBuilder().addComponents(bot.previous, bot.rewind, bot.pause, bot.forward, bot.skip)
        music_buttons2 = new Discord.ActionRowBuilder().addComponents(bot.downvolume, bot.loop, bot.stop, bot.autoplay, bot.upvolume)
        music_buttons3 = new Discord.ActionRowBuilder().addComponents(bot.queue, bot.shuffle)
    }

    const nextSong = queue.songs[1];
    const title = song.name;
    const duration = song.duration;
    const formattedDuration = song.formattedDuration;
    const currentUrl = song.url;
    const thumbnail = song.thumbnail;
    const views = song.views;
    const likes = song.likes;
    const authorName = song.uploader.name;
    const authorUrl = song.uploader.url;

    if (queue.repeatMode === 0) {
        loopMode = `Désactivé`
    } else if (queue.repeatMode === 1) {
        loopMode = `Musique en boucle`
    } else if (queue.repeatMode === 2) {
        loopMode = `Liste de lecture en boucle`
    }

    if (queue.autoplay === true) {
        autoplay = `Activé`
    } else if (queue.autoplay === false) {
        autoplay = `Désactivé`
    }

    const current = queue.currentTime;
    const percentage = Math.floor((current / duration) * 100);
    const progressBar = `▬`.repeat(Math.floor(percentage / 5)) + `🔘` + `▬`.repeat(20 - Math.floor(percentage / 5));
    const progressBarString = `${progressBar}`;

    bot.music_embed
        .setTitle(`${title}`)
        .setURL(currentUrl)
        .setThumbnail(thumbnail)
        .setDescription(`${queue.formattedCurrentTime} | ${progressBarString} | ${formattedDuration}`)
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
    bot.music_embed.data.fields[0].value = `${queue.volume} %`
    bot.music_embed.data.fields[1].value = `${loopMode}`
    bot.music_embed.data.fields[2].value = `${autoplay}`

    bot.music_embed.setDescription(`${queue.formattedCurrentTime} | ${progressBarString} | ${formattedDuration}`)
    bot.music_message.edit({ embeds: [bot.music_embed] })
};