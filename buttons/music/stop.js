module.exports = {
    name: `Stop`,
    description: `Arrête toute la liste de lecture et quitte le salon`,
    buttonId: `music_stop`,
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
        interaction.update({ content: `` })
        const queue = await bot.distube.getQueue(bot.music_voiceChannel);
        queue.stop()
    },
};