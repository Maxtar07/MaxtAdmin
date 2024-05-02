const Discord = require(`discord.js`);
module.exports = (bot, interaction) => {
    const music_added_embed = new Discord.EmbedBuilder()
        .setDescription(`Votre musique à bien été ajoutée à la liste de lecture`)
        .setColor(`DarkGreen`)
    interaction.update({ embeds: [music_added_embed], components: [] })
    const resultIndex = parseInt(interaction.customId.split(`_`)[1]);
    const selectedResult = bot.music_searchResults[resultIndex];
    const url = selectedResult.url;
    const voiceChannel = bot.music_voiceChannel;
    bot.distube.play(voiceChannel, url).catch(err => {
        interaction.reply(err)
    })
}