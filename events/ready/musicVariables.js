const Discord = require(`discord.js`);
const { DisTube } = require(`distube`);
const distubeEventsHandler = require(`../../handlers/distubeEventsHandler`);
module.exports = async (bot) => {
    bot.distube = new DisTube(bot, {
        emitNewSongOnly: true,
        savePreviousSongs: true,
        leaveOnFinish: true,
        leaveOnEmpty: false,
        emitAddSongWhenCreatingQueue: false,
    });
    bot.pause = new Discord.ButtonBuilder()
        .setCustomId(`music_pause`)
        .setEmoji(`⏸️`)
        .setLabel(`Pause`)
        .setStyle(`Success`)
    bot.resume = new Discord.ButtonBuilder()
        .setCustomId(`music_resume`)
        .setEmoji(`▶️`)
        .setLabel(`Reprendre`)
        .setStyle(`Success`)
    bot.stop = new Discord.ButtonBuilder()
        .setCustomId(`music_stop`)
        .setEmoji(`⏹️`)
        .setLabel(`Stop`)
        .setStyle(`Danger`)
    bot.skip = new Discord.ButtonBuilder()
        .setCustomId(`music_skip`)
        .setEmoji(`⏭️`)
        .setLabel(`Musique Suivante`)
        .setStyle(`Secondary`)
    bot.queue = new Discord.ButtonBuilder()
        .setCustomId(`music_queue`)
        .setEmoji(`📜`)
        .setLabel(`Liste des musiques`)
        .setStyle(`Secondary`)
    bot.upvolume = new Discord.ButtonBuilder()
        .setCustomId(`music_upvolume`)
        .setEmoji(`🔊`)
        .setLabel(`Volume +5 %`)
        .setStyle(`Primary`)
    bot.downvolume = new Discord.ButtonBuilder()
        .setCustomId(`music_downvolume`)
        .setEmoji(`🔉`)
        .setLabel(`Volume -5 %`)
        .setStyle(`Primary`)
    bot.forward = new Discord.ButtonBuilder()
        .setCustomId(`music_forward`)
        .setEmoji(`⏩`)
        .setLabel(`Avancer de 5s`)
        .setStyle(`Primary`)
    bot.rewind = new Discord.ButtonBuilder()
        .setCustomId(`music_rewind`)
        .setEmoji(`⏪`)
        .setLabel(`Reculer de 5s`)
        .setStyle(`Primary`)
    bot.loop = new Discord.ButtonBuilder()
        .setCustomId(`music_loop`)
        .setEmoji(`🔁`)
        .setLabel(`Modes de lecture en Boucle`)
        .setStyle(`Secondary`)
    bot.shuffle = new Discord.ButtonBuilder()
        .setCustomId(`music_shuffle`)
        .setEmoji(`🔀`)
        .setLabel(`Mélanger la liste de lecture`)
        .setStyle(`Secondary`)
    bot.previous = new Discord.ButtonBuilder()
        .setCustomId(`music_previous`)
        .setEmoji(`⏮️`)
        .setLabel(`Musique Précédente`)
        .setStyle(`Secondary`)
    bot.autoplay = new Discord.ButtonBuilder()
        .setCustomId(`music_autoplay`)
        .setEmoji(`♾️`)
        .setLabel(`AutoPlay`)
        .setStyle(`Secondary`)
    bot.filters = new Discord.StringSelectMenuBuilder()
        .setCustomId(`musicfiltersstringselectmenu`)
        .setPlaceholder(`Sélectionner les filtres à ajouter`)
        .setMinValues(0)
        .setMaxValues(15)
        .addOptions([
            {
                label: `Pas de filtre`,
                description: `Applique aucun filtre à la musique`,
                value: `aucun`,
                //emoji: `🟥`
            }, {
                label: `3D`,
                description: `Applique un effet 3d à la musique`,
                value: `3d`,
                //emoji: `🟥`
            },
            {
                label: `Bassboost`,
                description: `Applique un effet bassboost à la musique`,
                value: `bassboost`,
                //emoji: `🟩`
            },
            {
                label: `Echo`,
                description: `Applique un effet echo à la musique`,
                value: `echo`,
                //emoji: `🟦`
            },
            {
                label: `Flanger`,
                description: `Applique un effet flanger à la musique`,
                value: `flanger`,
                //emoji: `🟦`
            },
            {
                label: `Gate`,
                description: `Applique un effet gate à la musique`,
                value: `gate`,
                //emoji: `🟦`
            },
            {
                label: `Haas`,
                description: `Applique un effet haas à la musique`,
                value: `haas`,
                //emoji: `🟦`
            },
            {
                label: `Karaoke`,
                description: `Applique un effet karaoke à la musique`,
                value: `karaoke`,
                //emoji: `🟦`
            },
            {
                label: `Nightcore`,
                description: `Applique un effet nightcore à la musique`,
                value: `nightcore`,
                //emoji: `🟦`
            },
            {
                label: `Reverse`,
                description: `Applique un effet reverse à la musique`,
                value: `reverse`,
                //emoji: `🟦`
            },
            {
                label: `Vaporwave`,
                description: `Applique un effet vaporwave à la musique`,
                value: `vaporwave`,
                //emoji: `🟦`
            },
            {
                label: `Mcompand`,
                description: `Applique un effet mcompand à la musique`,
                value: `mcompand`,
                //emoji: `🟦`
            },
            {
                label: `Phaser`,
                description: `Applique un effet phaser à la musique`,
                value: `phaser`,
                //emoji: `🟦`
            },
            {
                label: `Tremolo`,
                description: `Applique un effet tremolo à la musique`,
                value: `tremolo`,
                //emoji: `🟦`
            },
            {
                label: `Surround`,
                description: `Applique un effet surround à la musique`,
                value: `surround`,
                //emoji: `🟦`
            },
            {
                label: `Earwax`,
                description: `Applique un effet earwax à la musique`,
                value: `earwax`,
                //emoji: `🟦`
            },

        ])
    bot.intervalmusic = null
    bot.music_searchResults = undefined
    bot.music_embed = new Discord.EmbedBuilder()
    bot.music_volume = 50
    bot.music_textChannel = bot.channels.cache.get(`726428192403095625`)
    bot.music_message = await bot.music_textChannel.messages.fetch(`1112809376680521878`)
    bot.music_voiceChannel = bot.channels.cache.get(`726428192403095629`)

    distubeEventsHandler(bot);
};