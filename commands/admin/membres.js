const Discord = require(`discord.js`);
module.exports = {
    callback: async (bot, interaction) => {
        var boy = interaction.guild.roles.cache.find(x => x.id === `726428190012211216`);
        var girl = interaction.guild.roles.cache.find(x => x.id === `726428190012211217`);
        var nb = interaction.guild.roles.cache.find(x => x.id === `824740975242117191`);
        var members = interaction.guild.roles.cache.find(m => m.id === `726428189978787873`);
        const boyButtonId = `boyrole`;
        const boyButtonLabel = `Garçon`;
        const boyButtonStyle = `Primary`;
        const girlButtonId = `girlrole`;
        const girlButtonLabel = `Fille`;
        const girlButtonStyle = `Primary`;
        const nbButtonId = `nbrole`;
        const nbButtonLabel = `Non-binaire`;
        const nbButtonStyle = `Primary`;
        const boybutton = new Discord.ButtonBuilder()
            .setStyle(boyButtonStyle)
            .setEmoji(`👦`)
            .setLabel(boyButtonLabel)
            .setCustomId(boyButtonId);
        const girlbutton = new Discord.ButtonBuilder()
            .setStyle(girlButtonStyle)
            .setEmoji(`👧`)
            .setLabel(girlButtonLabel)
            .setCustomId(girlButtonId);
        const nbbutton = new Discord.ButtonBuilder()
            .setStyle(nbButtonStyle)
            .setEmoji(`🏳️‍🌈`)
            .setLabel(nbButtonLabel)
            .setCustomId(nbButtonId);

        var rappel_embed = new Discord.EmbedBuilder()
            .setColor(`#CCD638`)
            .setTitle(`Petit rappel pour les nouveaux`)
            .addFields(
                {
                    name: `Si tu n'as pas encore fait ton choix et si tu veux accéder au reste du serveur, il te suffit de cliquer sur le bouton qui te convient :`,
                    value: `
🏳️‍🌈 - Pour obtenir le rôle ${nb}
👧 - pour obtenir le rôle ${girl}
👦 - pour obtenir le rôle ${boy}\n
Pour découvrir les différentes catégories disponibles sur le serveur, aller dans <#726428190427447365> pour voir quelques petites explications en plus.
`
                }
            )
        const membersrow = new Discord.ActionRowBuilder().addComponents(nbbutton, girlbutton, boybutton);
        await bot.channels.cache.get(`726428190427447361`).send({
            content: `${members}`,
            embeds: [rappel_embed], components: [membersrow], ephemeral: false
        });
    },
    name: `membres`,
    description: `Envoi une notif aux members pour les inviter à choisir un rôle pour accéder au reste du serveur`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [],
    permissionsRequired: [Discord.PermissionFlagsBits.Administrator],
    botPermissions: [Discord.PermissionFlagsBits.Administrator]
};
