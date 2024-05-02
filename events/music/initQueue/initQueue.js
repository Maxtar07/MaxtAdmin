const Discord = require(`discord.js`);
module.exports = async (bot, queue) => {
    const music_embed = new Discord.EmbedBuilder();
    console.log(`initQueue`);
    queue.volume = 50;
    let loopMode;
    let autoplay;

    bot.music_embed.setAuthor({ name: `Musique en cours` }).setColor(`Aqua`);
    const music_buttons1 = new Discord.ActionRowBuilder().addComponents(bot.previous, bot.rewind, bot.pause, bot.forward, bot.skip);
    const music_buttons2 = new Discord.ActionRowBuilder().addComponents(bot.downvolume, bot.loop, bot.stop, bot.autoplay, bot.upvolume);
    const music_buttons3 = new Discord.ActionRowBuilder().addComponents(bot.queue, bot.shuffle);
    const music_filtersselectmennu = new Discord.ActionRowBuilder().addComponents(bot.filters);

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
        loopMode = `Désactivé`;
    } else if (queue.repeatMode === 1) {
        loopMode = `Musique en boucle`;
    } else if (queue.repeatMode === 2) {
        loopMode = `Liste de lecture en boucle`;
    }

    if (queue.autoplay === true) {
        autoplay = `Activé`;
    } else if (queue.autoplay === false) {
        autoplay = `Désactivé`;
    }

    let total = duration;
    let current = queue.currentTime;
    const percentage = Math.floor((current / total) * 100);
    const progressBar = `▬`.repeat(Math.floor(percentage / 5)) + `` + `▬`.repeat(20 - Math.floor(percentage / 5));
    const progressBarString = `${progressBar}`;

    music_embed
        .setAuthor({ name: `Musique en cours` })
        .setColor(`Aqua`)
        .setTitle(`${title}`)
        .setURL(currentUrl)
        .setThumbnail(thumbnail)
        .addFields(
            { name: `Volume`, value: `${queue.volume} %`, inline: true },
            { name: `Mode de lecture en boucle`, value: `${loopMode}`, inline: true },
            { name: `AutoPlay`, value: `${autoplay}`, inline: true },
        )
        .setDescription(`${queue.formattedCurrentTime} | ${progressBarString} | ${formattedDuration}`)
        .setFooter({ text: `Pas de musique suivante` });

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

    bot.music_embed = music_embed;
    bot.music_message.edit({ embeds: [bot.music_embed], components: [music_buttons1, music_buttons2, music_buttons3, music_filtersselectmennu] });
};
