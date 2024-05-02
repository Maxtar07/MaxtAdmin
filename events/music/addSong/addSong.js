const Discord = require(`discord.js`);
module.exports = async (bot, queue, song) => {
    console.log(`addSong`);
    let music_embed = new Discord.EmbedBuilder()
    let music_buttons1;
    let music_buttons2;
    let music_buttons3;
    let music_filtersselectmennu;
    let loopMode;
    let autoplay;

    if (queue.paused) {
        music_embed.setAuthor({ name: `Musique en pause` }).setColor(`Orange`)
        music_buttons1 = new Discord.ActionRowBuilder().addComponents(bot.previous, bot.rewind, bot.resume, bot.forward, bot.skip)
        music_buttons2 = new Discord.ActionRowBuilder().addComponents(bot.downvolume, bot.loop, bot.stop, bot.autoplay, bot.upvolume)
        music_buttons3 = new Discord.ActionRowBuilder().addComponents(bot.queue, bot.shuffle)
        music_filtersselectmennu = new Discord.ActionRowBuilder().addComponents(bot.filters)
    } else {
        music_embed.setAuthor({ name: `Musique en cours` }).setColor(`Aqua`)
        music_buttons1 = new Discord.ActionRowBuilder().addComponents(bot.previous, bot.rewind, bot.pause, bot.forward, bot.skip)
        music_buttons2 = new Discord.ActionRowBuilder().addComponents(bot.downvolume, bot.loop, bot.stop, bot.autoplay, bot.upvolume)
        music_buttons3 = new Discord.ActionRowBuilder().addComponents(bot.queue, bot.shuffle)
        music_filtersselectmennu = new Discord.ActionRowBuilder().addComponents(bot.filters)
    }

    const nextSong = queue.songs[1];
    const currentSong = queue.songs[0];
    const title = currentSong.name;
    const duration = currentSong.duration;
    const formattedDuration = currentSong.formattedDuration;
    const currentUrl = currentSong.url;
    const thumbnail = currentSong.thumbnail;
    const views = currentSong.views;
    const likes = currentSong.likes;
    const authorName = currentSong.uploader.name;
    const authorUrl = currentSong.uploader.url;

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

    let total = duration;
    let current = queue.currentTime;
    const percentage = Math.floor((current / total) * 100);
    const progressBar = `▬`.repeat(Math.floor(percentage / 5)) + `🔘` + `▬`.repeat(20 - Math.floor(percentage / 5));
    const progressBarString = `${progressBar}`;

    music_embed
        .setTitle(`${title}`)
        .setURL(currentUrl)
        .setThumbnail(thumbnail)
        .addFields(
            { name: `Volume`, value: `${queue.volume} %`, inline: true },
            { name: `Mode de lecture en boucle`, value: `${loopMode}`, inline: true },
            { name: `AutoPlay`, value: `${autoplay}`, inline: true },
        )
        .setDescription(`${queue.formattedCurrentTime} | ${progressBarString} | ${formattedDuration}`)
    if (queue.repeatMode === 1) {
        music_embed.setFooter({ text: `Musique suivante: ${title} (mode boucle activé)`, iconURL: currentSong.thumbnail })
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
                music_embed.setFooter({ text: `Musique suivante: ${nextSong.name} \n(+${queue.songs.length < 3 ? `pleins d'autres après (mode autoplay activé)` : `${queue.songs.length - 2} de la liste et pleins d'autres après (mode autoplay activé)`})`, iconURL: nextSong.thumbnail })
            } else {
                music_embed.setFooter({ text: `Musique suivante: ${nextSong.name} \n(+${queue.songs.length < 3 ? `aucune autre après` : queue.songs.length === 3 ? `${queue.songs.length - 2} autre après` : `${queue.songs.length - 2} autres après`})`, iconURL: nextSong.thumbnail })
            }
        } else {
            if (queue.autoplay === true) {
                music_embed.setFooter({ text: `Musique suivante inconnue (mode autoplay activé)` })
            } else {
                music_embed.setFooter({ text: `Pas de musique suivante` })
            }
        }
    }
    const filterNames = Object.keys(bot.distube.filters);
    let filterList = [];

    for (let i = 0; i < filterNames.length; i += 5) {
        const currentFilters = filterNames.slice(i, i + 5);
        const filterString = currentFilters.map((filter) => `${queue.filters.has(filter) ? `✅` : `❌`} ${filter}`).join(`, `);
        filterList.push(filterString);
    }

    music_embed.addFields({
        name: `Filtres`, value: filterList.join(`,\n`)
    });
    bot.music_embed = music_embed
    bot.music_message.edit({ embeds: [bot.music_embed], components: [music_buttons1, music_buttons2, music_buttons3, music_filtersselectmennu] })
};