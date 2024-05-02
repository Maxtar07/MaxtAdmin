const Discord = require(`discord.js`);
module.exports = {
    name: `Pause`,
    description: `Mettre en pause la musique`,
    buttonId: `music_pause`,
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
        const music_buttons1 = new Discord.ActionRowBuilder().addComponents(bot.previous, bot.rewind, bot.resume, bot.forward, bot.skip)
        const music_buttons2 = new Discord.ActionRowBuilder().addComponents(bot.downvolume, bot.loop, bot.stop, bot.autoplay, bot.upvolume)
        const music_buttons3 = new Discord.ActionRowBuilder().addComponents(bot.queue, bot.shuffle)
        const music_filtersselectmennu = new Discord.ActionRowBuilder().addComponents(bot.filters)
        const queue = await bot.distube.getQueue(bot.music_voiceChannel);

        const currentSong = queue.songs[0];
        const formattedDuration = currentSong.formattedDuration;
        const duration = currentSong.duration;
        const current = queue.currentTime;
        const percentage = Math.floor((current / duration) * 100);
        const progressBar = `▬`.repeat(Math.floor(percentage / 5)) + `🔘` + `▬`.repeat(20 - Math.floor(percentage / 5));
        const progressBarString = `${progressBar}`;

        queue.pause()
        bot.music_embed.setAuthor({ name: `Musique en pause` }).setColor(`Orange`).setDescription(`${queue.formattedCurrentTime} | ${progressBarString} | ${formattedDuration}`)
        interaction.update({ embeds: [bot.music_embed], components: [music_buttons1, music_buttons2, music_buttons3, music_filtersselectmennu] })
    },
};
