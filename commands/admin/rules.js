const Discord = require(`discord.js`);
module.exports = {
    callback: async (bot, interaction) => {
        const rulesChannel = bot.channels.cache.get(`737211778072707153`);
        const acceptRulesButtonId = `acceptrules`;
        const refuseRulesButtonId = `refuserules`;
        const acceptRulesButtonLabel = `Accepter`;
        const refuseRulesButtonLabel = `Refuser`;
        const acceptButtonStyle = `Success`;
        const refuseButtonStyle = `Danger`;

        const acceptbutton = new Discord.ButtonBuilder()
            .setStyle(acceptButtonStyle)
            .setLabel(acceptRulesButtonLabel)
            .setCustomId(acceptRulesButtonId);

        const refusebutton = new Discord.ButtonBuilder()
            .setStyle(refuseButtonStyle)
            .setLabel(refuseRulesButtonLabel)
            .setCustomId(refuseRulesButtonId);

        const row = new Discord.ActionRowBuilder().addComponents(acceptbutton, refusebutton);
        const rules_embed = new Discord.EmbedBuilder()
            .setTitle(`Accepter le règlement !`)
            .setURL(`https://discord.com/channels/726428189978787872/737211778072707153/737221441967226900`)
            .setDescription(`Merci d'appuyer sur le bouton "accepter" pour vérifier ton compte.`)
            .setFooter({ text: `Si vous ne les acceptez pas, vous serez kick !` });

        await rulesChannel.send({
            embeds: [rules_embed], components: [row], ephemeral: false
        });
    },
    name: `rules`,
    description: `Commande pour envoyer le message qui demande d'accepter les règles sinon c'est un kick`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [],
    permissionsRequired: [Discord.PermissionFlagsBits.Administrator],
    botPermissions: [Discord.PermissionFlagsBits.Administrator]
};