module.exports = async (bot, error) => {
    bot.music_textChannel.send(`Une erreur à surgit: ${error}`)
    console.error(error)
};