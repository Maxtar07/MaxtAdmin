module.exports = {
    name: `Volume -5`,
    description: `Baisse le volume de 5%`,
    buttonId: `music_downvolume`,
    execute: (bot, interaction) => {
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
        bot.music_volume = bot.music_volume - 5
        if (bot.music_volume < 0) return interaction.update({ content: `` })
        bot.music_embed.data.fields[0].value = `${bot.music_volume} %`
        bot.distube.setVolume(bot.music_voiceChannel, bot.music_volume);
        interaction.update({ embeds: [bot.music_embed] })
    },
};