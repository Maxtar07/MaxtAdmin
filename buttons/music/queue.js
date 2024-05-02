const Discord = require(`discord.js`);
module.exports = {
    name: `Liste des musiques`,
    description: `Affiche la liste des musiques de la queue`,
    buttonId: `music_queue`,
    execute: async (bot, interaction) => {
        const embed = new Discord.EmbedBuilder()
        voiceChannel = bot.music_voiceChannel
        const queue = await bot.distube.getQueue(voiceChannel);
        if (!queue) {
            embed.setColor(`Red`).setDescription(`Il n'y a pas de queue`)
            return interaction.reply({ embeds: [embed], ephemeral: true })
        }
        embed.setColor(`Purple`).setDescription(`${queue.songs.map(
            (song, id) => `\n**${id + 1}.** ${song.name} -'${song.formattedDuration}'`
        )}`)
        return interaction.reply({ embeds: [embed], ephemeral: true })
    },
};
