const Discord = require(`discord.js`);
module.exports = async (bot, queue) => {
    console.log(`deleteQueue`)
    const stop_embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `Liste de lecture arrêtée` })
        .setDescription(`Pour jouer de nouveau de la musique, effectuer la commande /music <recherche à faire sur YouTube>`)
        .setColor(`Red`)
    return bot.music_message.edit({ embeds: [stop_embed], components: [] })
};