const Discord = require(`discord.js`);
module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Interaction} interaction 
     */
    callback: async (bot, interaction) => {
        await interaction.deferReply({ ephemeral: true });
        let code = interaction.options.getString(`code`);
        code.replace(`discord.gg/`, ``);
        code.replace(`https://discord.gg/`, ``);
        code.replace(`http://discord.gg/`, ``);
        let invite;
        try {
            invite = await bot.fetchInvite(code, { withCounts: true });
        } catch (e) {
            await interaction.editReply({ content: `Je ne trouve pas de serveur associé à ce code: '${code}'` });
        }
        if (!invite) return;

        const invite_infos_embed = new Discord.EmbedBuilder()
            .setColor(`Blurple`)
            .setTitle(invite.guild.name)
            .setThumbnail(invite.guild.iconURL())
            .addFields(
                { name: `Caractéristiques du serveur`, value: `> *${invite.guild.features.join(`\n> `)}*` },
                { name: `Boosts: '${invite.guild.premiumSubscriptionCount}'`, value: ` ` },
                { name: `Nombre de membres: '${invite.memberCount}'`, value: ` ` },
                { name: `Identifiant du serveur: '${invite.guild.id}'`, value: ` ` },
                { name: `Description du serveur`, value: `*${invite.guild.description ?? `aucune`}*` },
                { name: `Code d'invitation personnalisé: '${invite.guild.vanityURLCode ?? `aucun`}'`, value: ` ` },
            )
            .setImage(invite.guild.bannerURL({ size: 2048 }))
            .setTimestamp()
            .setFooter({ text: `Informations du code` })

        await interaction.editReply({ embeds: [invite_infos_embed], ephemeral: true })
    },
    name: `inviteinfos`,
    description: `Obtenir des infos sur un code d'invitation d'un serveur discord`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `code`,
            description: `Le code d'invitation (discord.gg/XXXXXXX)`,
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],
    permissionsRequired: [],
    botPermissions: []
};
